'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Music, Zap, Heart, ArrowRight, Star, CheckCircle, Settings, Building } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GlassCard } from '@/components/ui/glass-card'
import { GeoDetector } from '@/components/geolocation/geo-detector'

export default function HomePage() {
  const supabase = createClient()
  const [showGeoDetector, setShowGeoDetector] = useState(false)

  // Fetch featured artists (verified artists for now, can be enhanced with featured flag)
  const { data: featuredArtists } = useQuery({
    queryKey: ['featured-artists'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('artists')
          .select(`
            *,
            shows:shows(
              id,
              status,
              start_time,
              live_stats,
              venue:venues(name, city)
            )
          `)
          .eq('is_verified', true)
          .order('created_at', { ascending: false })
          .limit(6)

        if (error) {
          console.log('Database error, using mock data:', error)
          return getMockFeaturedArtists()
        }
        
        return data && data.length > 0 ? data : getMockFeaturedArtists()
      } catch (error) {
        console.log('Query failed, using mock data:', error)
        return getMockFeaturedArtists()
      }
    },
  })

  // Fetch live shows
  const { data: liveShows } = useQuery({
    queryKey: ['live-shows'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('shows')
          .select(`
            *,
            artist:artists(name, slug, avatar_url, is_verified),
            venue:venues(name, city, state)
          `)
          .eq('status', 'live')
          .order('start_time', { ascending: true })
          .limit(4)

        if (error) {
          console.log('Database error, using mock data:', error)
          return getMockLiveShows()
        }
        
        return data || []
      } catch (error) {
        console.log('Query failed, using mock data:', error)
        return getMockLiveShows()
      }
    },
  })

  // Mock data function for featured artists
  function getMockFeaturedArtists() {
    return [
      {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Luna Rodriguez',
        slug: 'luna-rodriguez',
        bio: 'Acoustic storyteller with a voice that captivates audiences nationwide.',
        avatar_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
        banner_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
        is_verified: true,
        genres: ['indie', 'folk', 'acoustic'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        shows: [
          {
            id: '1',
            status: 'upcoming',
            start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            live_stats: { total_donations: 125, fan_count: 15 },
            venue: { name: 'The Blue Note', city: 'New York' }
          }
        ]
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        name: 'The Midnight Echoes',
        slug: 'midnight-echoes',
        bio: 'Four-piece rock band bringing raw energy and honest lyrics to every stage.',
        avatar_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200',
        banner_url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
        is_verified: false,
        genres: ['rock', 'alternative', 'indie'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        shows: [
          {
            id: '2',
            status: 'upcoming',
            start_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            live_stats: { total_donations: 0, fan_count: 0 },
            venue: { name: 'Underground Hall', city: 'Brooklyn' }
          }
        ]
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        name: 'DJ Cosmic',
        slug: 'dj-cosmic',
        bio: 'Electronic music producer and DJ creating otherworldly soundscapes.',
        avatar_url: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=200',
        banner_url: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
        is_verified: true,
        genres: ['electronic', 'techno', 'ambient'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        shows: [
          {
            id: '3',
            status: 'upcoming',
            start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            live_stats: { total_donations: 0, fan_count: 0 },
            venue: { name: 'Electric Garden', city: 'Manhattan' }
          }
        ]
      }
    ]
  }

  // Mock data function for live shows
  function getMockLiveShows() {
    return [
      {
        id: '1',
        title: 'Acoustic Evening with Luna Rodriguez',
        artist: {
          name: 'Luna Rodriguez',
          slug: 'luna-rodriguez',
          avatar_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
          is_verified: true
        },
        venue: {
          name: 'The Blue Note',
          city: 'New York',
          state: 'NY'
        },
        start_time: new Date().toISOString(),
        live_stats: {
          total_donations: 125,
          fan_count: 15,
          energy_level: 85
        }
      }
    ]
  }

  const handleFindShowsNearMe = () => {
    setShowGeoDetector(true)
  }

  // If geolocation detector is active, show it
  if (showGeoDetector) {
    return <GeoDetector />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#162961] via-[#48517F] to-[#162961]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#48517F]/20 to-[#F98017]/20" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Right Now Money
              <span className="block bg-gradient-to-r from-[#48517F] to-[#F98017] bg-clip-text text-transparent">
                and Fans Forever
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover live shows near you and directly support artists with instant donations. 
              No delays – just pure support for the music you love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
                onClick={handleFindShowsNearMe}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Find Shows
              </Button>
              
              <Link href="/signup/artist">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/signup/artist/benefits';
                  }}
                >
                  <Music className="w-5 h-5 mr-2" />
                  I'm an Artist
                </Button>
              </Link>
              
              <Link href="/venues/partner">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  <Building className="w-5 h-5 mr-2" />
                  For Venues
                </Button>
              </Link>
            </div>

            {/* Distance Settings Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-6 text-sm text-purple-200"
            >
              <p className="flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                Searches within 5m radius • Configurable in settings
              </p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-purple-400/30"
        >
          <Music className="w-24 h-24" />
        </motion.div>
        
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 text-pink-400/30"
        >
          <Heart className="w-20 h-20" />
        </motion.div>
      </section>

      {/* Featured Artists Section - FIRST */}
      <section className="py-16 px-4 mb-0 pb-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Artists
            </h2>
            <p className="text-gray-300 text-lg">
              Discover verified artists and support their musical journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtists?.map((artist: any, index: any) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/artist/${artist.slug}`}>
                  <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden">
                    <div className="relative">
                      {artist.banner_url && (
                        <div 
                          className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 bg-cover bg-center"
                          style={{ backgroundImage: `url(${artist.banner_url})` }}
                        />
                      )}
                      <Avatar className="absolute -bottom-8 left-6 w-16 h-16 border-4 border-white/20">
                        <AvatarImage src={artist.avatar_url} />
                        <AvatarFallback className="text-lg">{artist.name[0]}</AvatarFallback>
                      </Avatar>
                    </div>

                    <CardContent className="pt-12 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                          {artist.name}
                        </h3>
                        {artist.is_verified && (
                          <Badge className="bg-blue-500">
                            <Star className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>

                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {artist.bio || 'No bio available'}
                      </p>

                      {/* Genres */}
                      {artist.genres && Array.isArray(artist.genres) && artist.genres.length > 0 && (
                        <div className="flex gap-2 mb-4">
                          {artist.genres.slice(0, 2).map((genre: any) => (
                            <Badge key={genre} variant="secondary" className="bg-purple-500/20 text-purple-300">
                              {genre}
                            </Badge>
                          ))}
                          {artist.genres.length > 2 && (
                            <Badge variant="secondary" className="bg-gray-500/20 text-gray-300">
                              +{artist.genres.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          {artist.shows?.length || 0} shows
                        </div>
                        <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Artists Button */}
          <div className="text-center mt-12">
            <Link href="/artists">
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                size="lg"
              >
                View All Artists
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Shows Near Me Section */}
      <section className="py-8 px-4 mb-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Shows Near You
            </h2>
            <p className="text-gray-300 text-lg">
              Discover live performances happening in your area
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveShows?.slice(0, 5).map((show: any, index: any) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LiveShowCard show={show} />
              </motion.div>
            ))}
            
            {(!liveShows || liveShows.length === 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-3 text-center"
              >
                <GlassCard variant="elevated" className="p-8">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Shows Found Nearby</h3>
                  <p className="text-gray-300 mb-6">
                    We couldn't detect any live shows in your area right now. Try enabling location services or explore other options.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={handleFindShowsNearMe}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Find Shows
                    </Button>
                    <Link href="/discover">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        Browse All Shows
                      </Button>
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>
          
          {liveShows && liveShows.length > 0 && (
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={handleFindShowsNearMe}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Find Shows
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-300 text-lg">
              Supporting artists has never been this simple. 
              Our smart geolocation system finds live shows happening near you in real-time
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Detect Shows</h3>
              <p className="text-gray-300">
                Searches within a 5 mile radius. Configurable in settings
              </p>
              <p className="text-gray-300">
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Support Artists</h3>
              <p className="text-gray-300">
                Send instant donations directly to performing artists with just a few taps
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Real-Time Impact</h3>
              <p className="text-gray-300">
                Watch your support boost the energy and excitement of live performances
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Live Show Card Component matching Featured Artists styling
function LiveShowCard({ show }: { show: any }) {
  return (
    <Link href={`/show/${show.id}`}>
      <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden">
        {/* Banner with Live indicator */}
        <div className="relative h-32 bg-gradient-to-r from-red-500 to-pink-500">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 right-3">
            <Badge className="bg-red-500 animate-pulse">
              🔴 LIVE
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="font-semibold text-lg group-hover:text-red-300 transition-colors">
              {show.title || `${show.artist?.name} Live`}
            </h3>
          </div>
        </div>

        {/* Artist Avatar */}
        <div className="relative -mt-8 ml-6 mb-4">
          <Avatar className="w-16 h-16 border-4 border-white/20">
            <AvatarImage src={show.artist?.avatar_url} alt={show.artist?.name} />
            <AvatarFallback className="text-lg bg-red-500 text-white">
              {show.artist?.name?.charAt(0) || '?'}
            </AvatarFallback>
          </Avatar>
        </div>

        <CardContent className="pt-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors">
              {show.artist?.name}
            </h4>
            {show.artist?.is_verified && (
              <Badge className="bg-blue-500">
                <Star className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          <p className="text-gray-300 text-sm mb-4">
            <MapPin className="w-4 h-4 inline mr-1" />
            {show.venue?.name}, {show.venue?.city}
          </p>

          {/* Live Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">
                ${show.live_stats?.total_donations || 0}
              </div>
              <div className="text-xs text-gray-400">Raised</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">
                {show.live_stats?.fan_count || 0}
              </div>
              <div className="text-xs text-gray-400">Fans Here</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-red-400 font-medium">Live Now</span>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 group-hover:scale-105 transition-transform"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = `/artist/${show.artist?.slug}/donate?show=${show.id}`
              }}
            >
              <Heart className="w-4 h-4 mr-1" />
              Support Live
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}