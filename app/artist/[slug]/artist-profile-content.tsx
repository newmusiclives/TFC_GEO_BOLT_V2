'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, MapPin, Calendar, ExternalLink, Verified, Music } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/demo-client'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ArtistProfileContent() {
  const params = useParams()
  const slug = params.slug as string
  const supabase = createClient()

  // Mock artist data for when database doesn't have the artist
  const getMockArtistData = (slug: string) => {
    const mockArtists = {
      'luna-rodriguez': {
        id: '11111111-1111-1111-1111-111111111111',
        slug: 'luna-rodriguez',
        name: 'Luna Rodriguez',
        bio: 'Acoustic storyteller with a voice that captivates audiences nationwide. Luna combines folk traditions with modern indie sensibilities to create deeply personal and universally relatable music.',
        avatar_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
        banner_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
        is_verified: true,
        genres: ['indie', 'folk', 'acoustic'],
        social_links: {
          spotify: 'https://open.spotify.com/artist/luna',
          instagram: '@lunamusic',
          website: 'https://lunamusic.com'
        },
        shows: [
          {
            id: 'show-1',
            title: 'Acoustic Evening with Luna Rodriguez',
            start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            status: 'upcoming',
            live_stats: { total_donations: 125, fan_count: 15, energy_level: 85 },
            venue: { name: 'The Blue Note', city: 'New York', state: 'NY' }
          },
          {
            id: 'show-2',
            title: 'Summer Sunset Sessions',
            start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'upcoming',
            live_stats: { total_donations: 0, fan_count: 0, energy_level: 0 },
            venue: { name: 'Central Park Bandshell', city: 'New York', state: 'NY' }
          }
        ],
        donations: [
          { amount: 25, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
          { amount: 50, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
          { amount: 15, created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() }
        ]
      },
      'midnight-echoes': {
        id: '22222222-2222-2222-2222-222222222222',
        slug: 'midnight-echoes',
        name: 'The Midnight Echoes',
        bio: 'Four-piece alternative rock band bringing raw energy and honest lyrics to every stage. Known for their dynamic live performances and connection with their audience.',
        avatar_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200',
        banner_url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
        is_verified: false,
        genres: ['rock', 'alternative', 'indie'],
        social_links: {
          bandcamp: 'https://midnightechoes.bandcamp.com',
          facebook: 'MidnightEchoesBand'
        },
        shows: [
          {
            id: 'show-3',
            title: 'Rock Revival Night',
            start_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'upcoming',
            live_stats: { total_donations: 0, fan_count: 0, energy_level: 0 },
            venue: { name: 'Underground Hall', city: 'Brooklyn', state: 'NY' }
          }
        ],
        donations: [
          { amount: 35, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
          { amount: 20, created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() }
        ]
      },
      'dj-cosmic': {
        id: '33333333-3333-3333-3333-333333333333',
        slug: 'dj-cosmic',
        name: 'DJ Cosmic',
        bio: 'Electronic music producer and DJ creating otherworldly soundscapes that transport listeners to new dimensions. Specializes in ambient techno and experimental electronic music.',
        avatar_url: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=200',
        banner_url: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
        is_verified: true,
        genres: ['electronic', 'techno', 'ambient'],
        social_links: {
          soundcloud: 'https://soundcloud.com/djcosmic',
          mixcloud: 'https://mixcloud.com/djcosmic'
        },
        shows: [
          {
            id: 'show-4',
            title: 'Cosmic Frequencies',
            start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'upcoming',
            live_stats: { total_donations: 0, fan_count: 0, energy_level: 0 },
            venue: { name: 'Electric Garden', city: 'Manhattan', state: 'NY' }
          }
        ],
        donations: [
          { amount: 75, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
          { amount: 40, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
          { amount: 60, created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() }
        ]
      },
      'sarahs-acoustic-corner': {
        id: '44444444-4444-4444-4444-444444444444',
        slug: 'sarahs-acoustic-corner',
        name: 'Sarah\'s Acoustic Corner',
        bio: 'Local acoustic performer and songwriter bringing heartfelt original songs and intimate covers to cozy venues. Known for her warm stage presence and ability to connect with audiences through personal storytelling.',
        avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        banner_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800',
        is_verified: false,
        genres: ['acoustic', 'folk', 'singer-songwriter'],
        social_links: {
          instagram: '@sarahacoustic',
          youtube: 'SarahAcousticCorner'
        },
        shows: [
          {
            id: 'show-5',
            title: 'Intimate Evening at Coffee House',
            start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'upcoming',
            live_stats: { total_donations: 0, fan_count: 0, energy_level: 0 },
            venue: { name: 'Local Coffee House', city: 'Brooklyn', state: 'NY' }
          }
        ],
        donations: [
          { amount: 10, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
          { amount: 15, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }
        ]
      }
    }

    return mockArtists[slug as keyof typeof mockArtists] || null
  }

  // Always use mock data first, then try database as fallback
  const { data: artist, isLoading } = useQuery({
    queryKey: ['artist', slug],
    queryFn: async () => {
      console.log('🎭 Artist Profile - Fetching data for slug:', slug)
      
      // First, try to get mock data
      const mockData = getMockArtistData(slug)
      if (mockData) {
        console.log('🎭 Artist Profile - Using mock data for:', slug)
        return mockData
      }

      // If no mock data, try database (this will work when Supabase is properly configured)
      try {
        console.log('🎭 Artist Profile - Trying database for:', slug)
        const { data, error } = await supabase
          .from('artists')
          .select(`
            *,
            shows:shows(
              id,
              title,
              start_time,
              status,
              live_stats,
              venue:venues(name, city, state)
            ),
            donations:donations(amount, created_at)
          `)
          .eq('slug', slug)
          .single()

        if (error) {
          console.log('🎭 Artist Profile - Database error:', error.message)
          return null
        }
        
        console.log('🎭 Artist Profile - Found in database:', data)
        return data
      } catch (error) {
        console.log('🎭 Artist Profile - Database query failed:', error)
        return null
      }
    },
    enabled: !!slug,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500" />
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist Not Found</h1>
          <p className="text-gray-300 mb-6">
            The artist "{slug}" could not be found.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/discover">
              <Button>Discover Artists</Button>
            </Link>
            <Link href="/artists">
              <Button variant="outline">Browse All Artists</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const upcomingShows = artist.shows?.filter((show: any) => show.status === 'upcoming') || []
  const liveShows = artist.shows?.filter((show: any) => show.status === 'live') || []
  const totalEarnings = artist.donations?.reduce((sum: number, donation: any) => sum + donation.amount, 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {artist.banner_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${artist.banner_url})` }}
          />
        )}
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row items-start gap-8"
          >
            <Avatar className="w-32 h-32 border-4 border-white/20">
              <AvatarImage src={artist.avatar_url} />
              <AvatarFallback className="text-4xl">{artist.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {artist.name}
                </h1>
                {artist.is_verified && (
                  <Badge className="bg-blue-500 flex items-center gap-1">
                    <Verified className="w-4 h-4" />
                    Verified
                  </Badge>
                )}
              </div>

              <p className="text-xl text-gray-300 mb-6 max-w-2xl leading-relaxed">
                {artist.bio}
              </p>

              {/* Genres */}
              {artist.genres && artist.genres.length > 0 && (
                <div className="flex gap-2 mb-6">
                  {artist.genres.map((genre: string) => (
                    <Badge key={genre} variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {genre}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Link href={`/artist/${artist.slug}/donate`}>
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Heart className="w-5 h-5 mr-2" />
                    Support Artist
                  </Button>
                </Link>

                {artist.social_links?.spotify && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-green-400 text-green-400 hover:bg-green-400/10"
                    onClick={() => window.open(artist.social_links.spotify, '_blank')}
                  >
                    <Music className="w-5 h-5 mr-2" />
                    Spotify
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Shows */}
            {liveShows.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-white/5 backdrop-blur border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      Live Now
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {liveShows.map((show: any) => (
                      <Link key={show.id} href={`/show/${show.id}`}>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-white">{show.title}</h3>
                            <Badge className="bg-red-500">LIVE</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-300">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{show.venue.name}, {show.venue.city}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4 text-green-400" />
                              <span>${show.live_stats?.total_donations || 0} raised</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Upcoming Shows */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Shows
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingShows.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingShows.map((show: any) => (
                        <Link key={show.id} href={`/show/${show.id}`}>
                          <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-white">{show.title}</h3>
                              <span className="text-sm text-gray-400">
                                {new Date(show.start_time).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-300">
                              <MapPin className="w-4 h-4" />
                              <span>{show.venue.name}, {show.venue.city}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">
                      No upcoming shows scheduled
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white/5 backdrop-blur border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Artist Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      ${totalEarnings.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-400">Total Earnings</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-400">
                        {artist.shows?.length || 0}
                      </div>
                      <div className="text-xs text-gray-400">Shows</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-400">
                        {artist.donations?.length || 0}
                      </div>
                      <div className="text-xs text-gray-400">Supporters</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links */}
            {artist.social_links && Object.keys(artist.social_links).length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-white/5 backdrop-blur border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Connect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(artist.social_links).map(([platform, url]) => (
                      <Button
                        key={platform}
                        variant="outline"
                        className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                        onClick={() => window.open(url as string, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}