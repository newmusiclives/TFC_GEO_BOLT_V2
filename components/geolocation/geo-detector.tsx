'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Music, Users, Clock, Navigation, AlertCircle, CheckCircle, RefreshCw, Settings, ArrowLeft } from 'lucide-react'
import { GeoLocationService, type ShowWithDetails } from '@/lib/supabase/geolocation'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GeolocationLoader } from '@/components/ui/loading-states'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { GeoSettings } from '@/components/geolocation/geo-settings'
import { useGeolocation } from '@/lib/hooks/useGeolocation'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'
import { isSupabaseConfigured, mockConfig, getConfigStatus } from '@/lib/supabase/config'
import { formatDistance, formatTimeAgo } from '@/lib/utils/format'
import { GEOLOCATION_CONFIG } from '@/lib/constants'
import type { GeolocationStatus } from '@/lib/types'

interface GeoDetectorProps {
  onBack?: () => void
}

export function GeoDetector({ onBack }: GeoDetectorProps) {
  const [shows, setShows] = useState<ShowWithDetails[]>([])
  const [geoService] = useState(() => new GeoLocationService())
  const [retryCount, setRetryCount] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  // Get user's geolocation settings
  const [geoSettings] = useLocalStorage('truefans_geo_settings', {
    radius: GEOLOCATION_CONFIG.defaultRadius,
    timeWindow: GEOLOCATION_CONFIG.timeWindow,
    highAccuracy: GEOLOCATION_CONFIG.highAccuracy,
    autoDetect: true
  })

  const { location, status, error, refetch } = useGeolocation({
    enableHighAccuracy: geoSettings.highAccuracy,
    timeout: GEOLOCATION_CONFIG.timeout,
    maximumAge: GEOLOCATION_CONFIG.maxAge
  })

  useEffect(() => {
    if (!location) return

    const detectShows = async () => {
      try {
        // Show development notice if Supabase is not configured
        if (!isSupabaseConfigured()) {
          const configStatus = getConfigStatus()
          console.log('🚀 Development Mode: Using mock data', configStatus)
        }

        // Add mock delay in development mode
        if (mockConfig.enableMockData) {
          await new Promise(resolve => setTimeout(resolve, mockConfig.mockDelay))
        }

        const nearbyShows = await geoService.findNearbyShows(
          location.lat,
          location.lng,
          geoSettings.radius,
          geoSettings.timeWindow
        )

        console.log('🎵 Found nearby shows:', nearbyShows)
        setShows(nearbyShows)

        // Auto-redirect logic for high-confidence single show
        if (nearbyShows.length === 1 && nearbyShows[0].confidence_score > GEOLOCATION_CONFIG.confidenceThresholds.high) {
          setTimeout(() => {
            window.location.href = `/artist/${nearbyShows[0].show_data.artist.slug}/donate?show=${nearbyShows[0].show_data.id}`
          }, 2000)
        } else if (nearbyShows.length > 1) {
          // Scroll to the top of the page to show multiple shows
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Reset retry count on success
        setRetryCount(0)
      } catch (serviceError) {
        console.error('Geolocation service error:', serviceError)
        setShows([])
      }
    }

    detectShows()
  }, [location, geoService, geoSettings])

  useEffect(() => {
    if (!location || shows.length === 0 || !isSupabaseConfigured()) return

    // Set up real-time subscriptions for each nearby show
    const unsubscribers = shows.map(show => 
      geoService.subscribeToShowUpdates(show.show_data.id, (payload) => {
        console.log('Real-time update:', payload)
        // Handle real-time updates for live show stats
      })
    )

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe())
    }
  }, [location, shows, geoService])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    refetch()
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      window.history.back()
    }
  }

  const getStatusInfo = () => {
    const isDev = !isSupabaseConfigured()
    
    switch (status) {
      case 'detecting':
        return {
          icon: <GeolocationLoader />,
          title: isDev ? 'Demo Mode: Detecting Location' : 'Detecting Your Location',
          message: isDev ? 'Using mock data for demonstration...' : `Finding live shows within ${formatDistance(geoSettings.radius)}...`,
          showDevNote: isDev
        }
      case 'found':
        if (shows.length === 0) {
          return {
            icon: <MapPin className="w-8 h-8 text-gray-400" />,
            title: 'No Shows Nearby',
            message: `We couldn't find any live shows within ${formatDistance(geoSettings.radius)} of your location`
          }
        } else if (shows.length === 1 && shows[0].confidence_score > GEOLOCATION_CONFIG.confidenceThresholds.high) {
          return {
            icon: <CheckCircle className="w-8 h-8 text-green-400" />,
            title: 'Show Found!',
            message: 'Redirecting to donation page...'
          }
        } else {
          return {
            icon: <Music className="w-8 h-8 text-purple-300" />,
            title: isDev ? 'Demo: Multiple Shows' : 'Multiple Shows Nearby',
            message: 'Choose which show you\'re attending'
          }
        }
      case 'permission-denied':
        return {
          icon: <AlertCircle className="w-8 h-8 text-orange-400" />,
          title: 'Location Permission Needed',
          message: 'Please enable location access in your browser to find nearby shows',
          instructions: [
            'Click the location icon in your browser\'s address bar',
            'Select "Allow" for location access',
            'Refresh the page or try again'
          ]
        }
      case 'timeout':
        return {
          icon: <Clock className="w-8 h-8 text-yellow-400" />,
          title: 'Location Timeout',
          message: 'Location detection is taking longer than expected',
          instructions: [
            'Make sure location services are enabled',
            'Try moving to an area with better signal',
            'Check your device\'s location settings'
          ]
        }
      case 'error':
        return {
          icon: <AlertCircle className="w-8 h-8 text-red-400" />,
          title: 'Location Error',
          message: error || 'Failed to detect location',
          showRetryCount: retryCount > 0
        }
      default:
        return {
          icon: <MapPin className="w-8 h-8 text-gray-400" />,
          title: 'Unknown Status',
          message: 'Something unexpected happened'
        }
    }
  }

  const statusInfo = getStatusInfo()

  // Show settings if requested
  if (showSettings) {
    return (
      <GeoSettings 
        onClose={() => setShowSettings(false)}
        onSettingsChange={() => {
          // Trigger a new search with updated settings
          if (location) {
            refetch()
          }
        }}
      />
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header with Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <Button
              onClick={handleBack}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowSettings(true)}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              
              {/* Current Settings Display */}
              <div className="flex gap-1">
                <Badge className="bg-purple-500/20 text-purple-300">
                  {formatDistance(geoSettings.radius)}
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-300">
                  {geoSettings.timeWindow}h
                </Badge>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard variant="elevated" className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mb-6"
                >
                  {statusInfo.icon}
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {statusInfo.title}
                </h2>
                
                <p className="text-purple-200 mb-4">
                  {statusInfo.message}
                </p>

                {statusInfo.showDevNote && (
                  <p className="text-sm text-yellow-300 mb-4">
                    💡 Configure Supabase to enable real venue detection
                  </p>
                )}

                {statusInfo.instructions && (
                  <div className="text-sm text-gray-300 space-y-1 mb-4">
                    {statusInfo.instructions.map((instruction, index) => (
                      <p key={index}>• {instruction}</p>
                    ))}
                  </div>
                )}

                {statusInfo.showRetryCount && (
                  <p className="text-sm text-gray-300 mb-4">
                    Retry attempt: {retryCount}
                  </p>
                )}
                
                {location && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 text-sm text-purple-200"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Navigation className="w-4 h-4" />
                      <span>Accuracy: {formatDistance(location.accuracy)}</span>
                    </div>
                  </motion.div>
                )}

                {(status === 'error' || status === 'permission-denied' || status === 'timeout') && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-3 justify-center mt-6"
                  >
                    <Button 
                      onClick={handleRetry}
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={status === 'detecting'}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => window.location.href = '/discover'}
                    >
                      Search Manually
                    </Button>
                  </motion.div>
                )}
              </GlassCard>

              {status === 'found' && shows.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid gap-4 md:grid-cols-2"
                >
                  {shows.map((show, index) => (
                    <motion.div
                      key={show.show_data.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <ShowCard key={show.show_data.id} show={show} />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {status === 'found' && shows.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <GlassCard className="text-center">
                    <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Explore Live Music
                    </h3>
                    <p className="text-gray-300 mb-6">
                      No shows found within {formatDistance(geoSettings.radius)}. Try increasing your search radius or explore other options.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button 
                        onClick={() => setShowSettings(true)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Adjust Settings
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => window.location.href = '/artists'}
                      >
                        Browse Artists
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => window.location.href = '/discover'}
                      >
                        Search Shows
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ErrorBoundary>
  )
}

function ShowCard({ show }: { show: ShowWithDetails }) {
  const { show_data, confidence_score, travel_time_minutes } = show
  const startTime = new Date(show_data.start_time)
  
  return (
    <GlassCard className="hover:bg-white/15 transition-all duration-300 cursor-pointer group">
      <div className="flex items-start gap-4">
        <Avatar className="w-16 h-16 ring-2 ring-purple-400/30">
          <AvatarImage src={show_data.artist.avatar_url || ''} alt={show_data.artist.name} />
          <AvatarFallback className="bg-purple-500 text-white">
            {show_data.artist.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-white truncate">
              {show_data.artist.name}
            </h3>
            {show_data.artist.is_verified && (
              <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
            )}
          </div>
          
          <p className="text-purple-200 text-sm mb-2">{show_data.title}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{show_data.venue.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{new Date(show_data.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge 
                variant="secondary" 
                className={`${confidence_score > GEOLOCATION_CONFIG.confidenceThresholds.high ? 'bg-green-500/20 text-green-300' : 
                  confidence_score > GEOLOCATION_CONFIG.confidenceThresholds.medium ? 'bg-yellow-500/20 text-yellow-300' : 
                  'bg-gray-500/20 text-gray-300'}`}
              >
                {Math.round(confidence_score)}% match
              </Badge>
              <Badge variant="outline" className="border-purple-400/30 text-purple-200">
                {formatDistance(show_data.distance_meters)} away
              </Badge>
            </div>
            
            <Button 
              size="sm" 
              className="bg-purple-600 hover:bg-purple-700 group-hover:scale-105 transition-transform"
              onClick={() => window.location.href = `/artist/${show_data.artist.slug}/donate?show=${show_data.id}`}
            >
              Support Artist
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}