'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Music, Calendar, MapPin, Users, Heart, ArrowLeft, FileText, Plus, Edit } from 'lucide-react'
import { createClient } from '@/lib/supabase/demo-client'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SetlistManager } from '@/components/setlist/setlist-manager'
import { SongRequestDashboard } from '@/components/setlist/song-request-dashboard'
import { toast } from 'sonner'
import Link from 'next/link'

export default function ArtistShowDetailPage() {
  const params = useParams()
  const showId = params.id as string
  const supabase = createClient()
  
  const [show, setShow] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [artistId, setArtistId] = React.useState<string | null>(null)
  const [isEditingSetlist, setIsEditingSetlist] = React.useState(false)
  
  React.useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setArtistId(user.id)
        loadShowDetails(showId)
      }
    }
    
    getCurrentUser()
  }, [showId])
  
  const loadShowDetails = async (id: string) => {
    setIsLoading(true)
    
    // For demo mode, always create mock show data to ensure it works
    if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
      console.log('Creating mock show data for artist dashboard, ID:', id)
      const mockShow = {
        id: id,
        title: 'Acoustic Evening with Luna Rodriguez',
        status: 'upcoming',
        start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        live_stats: { total_donations: 125, fan_count: 15, energy_level: 85 },
        venue: { 
          name: 'The Blue Note', 
          city: 'New York', 
          state: 'NY' 
        },
        setlist: {
          id: '11111111-aaaa-1111-aaaa-111111111111',
          title: 'Acoustic Evening 2025',
          description: 'My standard acoustic set with a mix of originals and covers',
          setlist_songs: [
            { id: '1', title: 'Midnight Whispers', artist: null, is_cover: false, duration: '4:15', position: 1 },
            { id: '2', title: 'Landslide', artist: 'Fleetwood Mac', is_cover: true, duration: '3:20', position: 2 },
            { id: '3', title: 'Ocean Memories', artist: null, is_cover: false, duration: '3:45', position: 3 },
            { id: '4', title: 'Fast Car', artist: 'Tracy Chapman', is_cover: true, duration: '4:55', position: 4 },
            { id: '5', title: 'Hallelujah', artist: 'Leonard Cohen', is_cover: true, duration: '5:30', position: 5 },
            { id: '6', title: 'City Lights Fading', artist: null, is_cover: false, duration: '5:10', position: 6 },
            { id: '7', title: 'Skinny Love', artist: 'Bon Iver', is_cover: true, duration: '3:55', position: 7 },
            { id: '8', title: 'Both Sides Now', artist: 'Joni Mitchell', is_cover: true, duration: '4:05', position: 8 },
            { id: '9', title: 'Jolene', artist: 'Dolly Parton', is_cover: true, duration: '3:40', position: 9 },
            { id: '10', title: 'Whispers in the Wind', artist: null, is_cover: false, duration: '4:30', position: 10 }
          ]
        }
      };
      setShow(mockShow);
      setIsLoading(false);
      return;
    }
    
    try {
      // Real Supabase query for production
      const { data, error } = await supabase
        .from('shows')
        .select(`
          *,
          venue:venues(*),
          setlist:setlists(
            *,
            setlist_songs:setlist_songs(*)
          )
        `)
        .eq('id', id)
        .single()
      
      if (error) throw error
      
      setShow(data)
    } catch (error) {
      console.error('Error loading show details:', error)
      toast.error('Failed to load show details')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSetlistSaved = (setlistId: string) => {
    setIsEditingSetlist(false)
    loadShowDetails(showId)
    toast.success('Setlist updated successfully')
  }
  
  if (isLoading) {
    return (
      <GradientBg variant="primary">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading show details...</p>
          </div>
        </div>
      </GradientBg>
    )
  }
  
  if (!show) {
    return (
      <GradientBg variant="primary">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Show Not Found</h2>
            <p className="text-gray-300 mb-6">The show you're looking for doesn't exist or you don't have permission to view it.</p>
            <Link href="/dashboard/artist">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </GradientBg>
    )
  }
  
  // If we're editing the setlist, show the setlist manager
  if (isEditingSetlist) {
    return (
      <GradientBg variant="primary">
        <div className="container mx-auto px-4 py-8">
          <Link 
            href={`/dashboard/artist/show/${showId}`}
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Show Details
          </Link>
          
          <SetlistManager
            artistId={artistId || ''}
            setlistId={show.setlist?.id}
            showId={showId}
            onSave={handleSetlistSaved}
            onCancel={() => setIsEditingSetlist(false)}
          />
        </div>
      </GradientBg>
    )
  }
  
  return (
    <GradientBg variant="primary">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href="/dashboard/artist"
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </motion.div>
        
        {/* Show Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard variant="elevated">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-white">{show.title}</h1>
                    <Badge className={`
                      ${show.status === 'live' ? 'bg-red-500 animate-pulse' : 
                        show.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300' :
                        show.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                        'bg-gray-500/20 text-gray-300'}
                    `}>
                      {show.status.charAt(0).toUpperCase() + show.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span>
                        {new Date(show.start_time).toLocaleDateString()} at {' '}
                        {new Date(show.start_time).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span>
                        {show.venue.name}, {show.venue.city}, {show.venue.state}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link href={`/artist/${artistId}/donate?show=${showId}`} target="_blank">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Heart className="w-4 h-4 mr-2" />
                      Donation Page
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Show Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-green-400">
                    ${show.live_stats?.total_donations || 0}
                  </div>
                  <div className="text-xs text-gray-400">Total Donations</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-blue-400">
                    {show.live_stats?.fan_count || 0}
                  </div>
                  <div className="text-xs text-gray-400">Fans Checked In</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-purple-400">
                    {show.live_stats?.donation_count || 0}
                  </div>
                  <div className="text-xs text-gray-400">Donation Count</div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-yellow-400">
                    {show.live_stats?.energy_level || 0}%
                  </div>
                  <div className="text-xs text-gray-400">Energy Level</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Setlist Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard variant="elevated">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    Setlist
                  </h2>
                  
                  {show.setlist ? (
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => setIsEditingSetlist(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Setlist
                    </Button>
                  ) : (
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => setIsEditingSetlist(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Setlist
                    </Button>
                  )}
                </div>
                
                {show.setlist ? (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="font-medium text-white">{show.setlist.title}</h3>
                      <Badge className="bg-blue-500/20 text-blue-300">
                        {show.setlist.setlist_songs.length} songs
                      </Badge>
                    </div>
                    
                    {show.setlist.description && (
                      <p className="text-gray-300 text-sm mb-4">{show.setlist.description}</p>
                    )}
                    
                    <div className="space-y-2">
                      {show.setlist.setlist_songs
                        .sort((a: any, b: any) => a.position - b.position)
                        .map((song: any, index: number) => (
                          <div 
                            key={song.id}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                          >
                            <div className="w-6 text-center text-sm text-gray-400">
                              {song.position}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-white">{song.title}</div>
                              {song.is_cover && song.artist && (
                                <div className="text-xs text-gray-400">
                                  Originally by {song.artist}
                                </div>
                              )}
                            </div>
                            {song.duration && (
                              <div className="text-sm text-gray-400">
                                {song.duration}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white/5 rounded-lg">
                    <Music className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-300 mb-4">No setlist added yet</p>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => setIsEditingSetlist(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Setlist
                    </Button>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>
          
          {/* Song Requests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {show.setlist ? (
              <SongRequestDashboard showId={showId} artistId={artistId || ''} />
            ) : (
              <GlassCard variant="elevated">
                <div className="p-6 text-center">
                  <Heart className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Song Requests Unavailable</h3>
                  <p className="text-gray-300 mb-6">
                    Add a setlist to enable fan song requests and dedications.
                  </p>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => setIsEditingSetlist(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Setlist Now
                  </Button>
                </div>
              </GlassCard>
            )}
          </motion.div>
        </div>
      </div>
    </GradientBg>
  )
}