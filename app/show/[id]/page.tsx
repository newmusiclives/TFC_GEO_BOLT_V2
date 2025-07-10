'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, MapPin, Calendar, Clock, Users, Zap, ArrowLeft, Music, Star, FileMusic } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/demo-client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ShowPage() {
  const params = useParams()
  const id = params.id as string
  const supabase = createClient()

  // Create a default show with the provided ID
  const createDefaultShow = (showId: string, showType: number = 1) => {
    // Different show types for variety
    if (showType === 1) {
      return {
        id: showId,
        title: 'Acoustic Evening with Luna Rodriguez',
        description: 'An intimate evening of storytelling through song. Luna will perform songs from her latest album plus some unreleased acoustic arrangements.',
        start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
        status: 'upcoming',
        poster_path: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
        ticket_price: 25.00,
        is_free: false,
        age_restriction: '18+',
        artist: {
          id: '11111111-1111-1111-1111-111111111111',
          name: 'Luna Rodriguez',
          slug: 'luna-rodriguez',
          avatar_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
          is_verified: true,
          bio: 'Acoustic storyteller with a voice that captivates audiences nationwide.',
          genres: ['indie', 'folk', 'acoustic']
        },
        venue: {
          id: '1',
          name: 'The Blue Note',
          address: '131 W 3rd St',
          city: 'New York',
          state: 'NY',
          capacity: 200,
          venue_type: 'music_venue'
        },
        live_stats: {
          total_donations: 125,
          donation_count: 8,
          fan_count: 15,
          energy_level: 85,
          peak_concurrent_fans: 18
        }
      };
    } else if (showType === 2) {
      return {
        id: showId,
        title: 'Rock Revival Night',
        description: 'The Midnight Echoes bring their electrifying energy to Underground Hall for a night of pure rock and roll.',
        start_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
        status: 'upcoming',
        poster_path: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
        ticket_price: 35.00,
        is_free: false,
        age_restriction: '21+',
        artist: {
          id: '22222222-2222-2222-2222-222222222222',
          name: 'The Midnight Echoes',
          slug: 'midnight-echoes',
          avatar_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200',
          is_verified: false,
          bio: 'Four-piece alternative rock band bringing raw energy and honest lyrics to every stage.',
          genres: ['rock', 'alternative', 'indie']
        },
        venue: {
          id: '2',
          name: 'Underground Hall',
          address: '456 Brooklyn Ave',
          city: 'Brooklyn',
          state: 'NY',
          capacity: 350,
          venue_type: 'club'
        },
        live_stats: {
          total_donations: 0,
          donation_count: 0,
          fan_count: 0,
          energy_level: 0,
          peak_concurrent_fans: 0
        }
      };
    } else {
      return {
        id: showId,
        title: 'Cosmic Frequencies',
        description: 'DJ Cosmic takes you on a journey through space and time with his signature ambient techno sets.',
        start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
        status: 'upcoming',
        poster_path: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
        ticket_price: 40.00,
        is_free: false,
        age_restriction: '18+',
        artist: {
          id: '33333333-3333-3333-3333-333333333333',
          name: 'DJ Cosmic',
          slug: 'dj-cosmic',
          avatar_url: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=200',
          is_verified: true,
          bio: 'Electronic music producer and DJ creating otherworldly soundscapes.',
          genres: ['electronic', 'techno', 'ambient']
        },
        venue: {
          id: '3',
          name: 'Electric Garden',
          address: '789 Dance Floor St',
          city: 'Manhattan',
          state: 'NY',
          capacity: 500,
          venue_type: 'club'
        },
        live_stats: {
          total_donations: 0,
          donation_count: 0,
          fan_count: 0,
          energy_level: 0,
          peak_concurrent_fans: 0
        }
      };
    }
  };

  // Mock show data for when database doesn't have the show
  const getMockShowData = (id: string) => {
    // For specific IDs, return specific shows
    if (id === '1' || id === 'show-1' || id === 'demo-show-1') {
      return createDefaultShow(id, 1);
    } else if (id === '2' || id === 'show-2' || id === 'demo-show-2') {
      return createDefaultShow(id, 2);
    } else if (id === '3' || id === 'show-3' || id === 'demo-show-3') {
      return createDefaultShow(id, 3);
    } else if (id === '4' || id === 'show-4' || id === 'demo-show-4') {
      // Summer Sunset Sessions
      return {
        id: id,
        title: 'Summer Sunset Sessions',
        description: 'Free outdoor concert series featuring local and touring artists. Luna opens the summer season.',
        start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
        status: 'upcoming',
        poster_path: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
        ticket_price: 0.00,
        is_free: true,
        age_restriction: 'All Ages',
        artist: {
          id: '11111111-1111-1111-1111-111111111111',
          name: 'Luna Rodriguez',
          slug: 'luna-rodriguez',
          avatar_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
          is_verified: true,
          bio: 'Acoustic storyteller with a voice that captivates audiences nationwide.',
          genres: ['indie', 'folk', 'acoustic']
        },
        venue: {
          id: '4',
          name: 'Central Park Bandshell',
          address: 'Central Park',
          city: 'New York',
          state: 'NY',
          capacity: 1000,
          venue_type: 'outdoor'
        },
        live_stats: {
          total_donations: 0,
          donation_count: 0,
          fan_count: 0,
          energy_level: 0,
          peak_concurrent_fans: 0
        }
      };
    }
    
    // For any other ID, create a default show with that ID
    // This ensures we always return something in demo mode
    return createDefaultShow(id, Math.floor(Math.random() * 3) + 1);
  }

  // Always use mock data first, then try database as fallback
  const { data: show, isLoading, refetch } = useQuery({
    queryKey: ['show', id],
    queryFn: async () => {
      console.log('🎭 Show Page - Fetching data for ID:', id)
      
      // First, try to get mock data
      const mockData = getMockShowData(id)
      if (mockData) {
        console.log('🎭 Show Page - Using mock data for ID:', id, mockData)
        return mockData
      }

      // If no mock data, try database (this will work when Supabase is properly configured)
      try {
        console.log('🎭 Show Page - Trying database for:', id)
        const { data, error } = await supabase
          .from('shows')
          .select(`
            *,
            artist:artists(
              name,
              slug,
              avatar_url,
              is_verified,
              bio
            ),
            venue:venues(
              name,
              address,
              city,
              state,
              capacity,
              venue_type
            )
          `)
          .eq('id', id!)
          .single()

        if (error) {
          console.log('🎭 Show Page - Database error:', error.message)
          return null
        }
        
        console.log('🎭 Show Page - Found in database:', data)
        return data
      } catch (error) {
        console.log('🎭 Show Page - Database query failed:', error)
        return null
      }
    },
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500" />
      </div>
    )
  }

  if (!show) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Show Not Found</h1>
          <p className="text-gray-300 mb-6">
            We couldn't find the show you're looking for.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/discover">
              <Button>Discover Shows</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isLive = show.status === 'live'
  const isUpcoming = show.status === 'upcoming'
  const showDate = new Date(show.start_time)
  const showEndDate = show.end_time ? new Date(show.end_time) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section with Poster */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        {show.poster_path && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${show.poster_path})` }}
          />
        )}
        
        <div className="container mx-auto relative z-10">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link 
              href={`/artist/${show.artist.slug}`}
              className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {show.artist.name}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {show.title}
              </h1>
              {isLive && (
                <Badge className="bg-red-500 animate-pulse text-lg px-4 py-2">
                  🔴 LIVE
                </Badge>
              )}
              {isUpcoming && (
                <Badge variant="outline" className="border-green-400 text-green-400 text-lg px-4 py-2">
                  Upcoming
                </Badge>
              )}
            </div>

            <Link 
              href={`/artist/${show.artist.slug}`}
              className="text-2xl text-purple-300 hover:text-white transition-colors mb-4 inline-block"
            >
              by {show.artist.name}
              {show.artist.is_verified && ' ✓'}
            </Link>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {show.description}
            </p>

            {/* Key Show Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <MapPin className="w-6 h-6 text-purple-400" />
                <div className="text-left">
                  <div className="font-medium text-white">{show.venue.name}</div>
                  <div className="text-sm">
                    {show.venue.address && `${show.venue.address}, `}
                    {show.venue.city}, {show.venue.state}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 text-gray-300">
                <Calendar className="w-6 h-6 text-blue-400" />
                <div className="text-left">
                  <div className="font-medium text-white">
                    {showDate.toLocaleDateString()}
                  </div>
                  <div className="text-sm">
                    {showDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {showEndDate && ` - ${showEndDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 text-gray-300">
                <Users className="w-6 h-6 text-green-400" />
                <div className="text-left">
                  <div className="font-medium text-white">
                    {show.venue.capacity} capacity
                  </div>
                  <div className="text-sm">
                    {show.age_restriction}
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket/Support Button */}
            <div className="flex gap-4 justify-center">
              <Link href={`/artist/${show.artist.slug}/donate?show=${show.id}`}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-xl px-8 py-4"
                >
                  <Heart className="w-6 h-6 mr-2" />
                  Support Artist
                </Button>
              </Link>
              
              <Link href={`/show/${show.id}/song-request`}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-purple-400 text-purple-400 hover:bg-purple-400/10 text-xl px-8 py-4"
                >
                  <FileMusic className="w-6 h-6 mr-2" />
                  Request a Song
                </Button>
              </Link>

              {!show.is_free && (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-green-400 text-green-400 hover:bg-green-400/10 text-xl px-8 py-4"
                >
                  Get Tickets - ${show.ticket_price}
                </Button>
              )}

              {show.is_free && (
                <Badge className="bg-green-500/20 text-green-300 text-xl px-6 py-3">
                  FREE EVENT
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Stats */}
            {isLive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-white/5 backdrop-blur border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      Live Performance Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">
                          ${show.live_stats?.total_donations || 0}
                        </div>
                        <div className="text-sm text-gray-400">Total Raised</div>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">
                          {show.live_stats?.fan_count || 0}
                        </div>
                        <div className="text-sm text-gray-400">Fans Here</div>
                      </div>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">
                          {show.live_stats?.energy_level || 0}%
                        </div>
                        <div className="text-sm text-gray-400">Energy Level</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Artist Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    About the Artist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={show.artist.avatar_url} alt={show.artist.name} />
                      <AvatarFallback className="text-xl bg-purple-500 text-white">
                        {show.artist.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-white">{show.artist.name}</h3>
                        {show.artist.is_verified && (
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                            <Star className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-300 mb-4">{show.artist.bio}</p>
                      
                      {show.artist.genres && (
                        <div className="flex gap-2">
                          {show.artist.genres.map((genre: string) => (
                            <Badge key={genre} variant="secondary" className="bg-purple-500/20 text-purple-300">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - Support */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-4 space-y-6"
            >
              <Card className="bg-white/5 backdrop-blur border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    Support This Show
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={show.artist.avatar_url} />
                      <AvatarFallback className="text-xl">{show.artist.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-white">{show.artist.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {show.artist.bio?.substring(0, 100)}...
                    </p>
                  </div>

                  <Link href={`/artist/${show.artist.slug}/donate?show=${show.id}`}>
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Send Support
                    </Button>
                  </Link>

                  {/* Show Details */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Venue Capacity</span>
                      <span className="text-white">
                        {show.venue.capacity ? `${show.venue.capacity.toLocaleString()} people` : 'N/A'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Venue Type</span>
                      <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                        {show.venue.venue_type.replace('_', ' ')}
                      </Badge>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Age Restriction</span>
                      <span className="text-white">{show.age_restriction}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Show Status</span>
                      <Badge 
                        variant={isLive ? 'default' : 'outline'}
                        className={isLive ? 'bg-red-500' : 'border-green-400 text-green-400'}
                      >
                        {show.status.toUpperCase()}
                      </Badge>
                    </div>

                    {!show.is_free && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Ticket Price</span>
                        <span className="text-green-400 font-bold">${show.ticket_price}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Supporters */}
              {isLive && show.live_stats && show.live_stats.donation_count > 0 && (
                <Card className="bg-white/5 backdrop-blur border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Supporters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'Sarah J.', amount: 25, message: 'Amazing performance!', time: '2 minutes ago' },
                        { name: 'Anonymous', amount: 15, message: 'Keep it up!', time: '5 minutes ago' },
                        { name: 'Mike R.', amount: 50, message: 'Love this song!', time: '8 minutes ago' }
                      ].map((supporter, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {supporter.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-medium">{supporter.name}</span>
                              <span className="text-green-400 font-bold">${supporter.amount}</span>
                            </div>
                            <p className="text-sm text-gray-300 mb-1">"{supporter.message}"</p>
                            <p className="text-xs text-gray-400">{supporter.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}