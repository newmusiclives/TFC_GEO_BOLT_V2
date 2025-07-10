'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Music, TrendingUp, Users, Heart, ExternalLink, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function DiscoverPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Updated mock data with correct slugs that match existing artist pages
  const trendingArtists = [
    {
      id: '1',
      name: 'Luna Rodriguez',
      slug: 'luna-rodriguez', // This matches the existing artist page
      genre: 'Indie Folk',
      avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true,
      followers: 12500,
      upcoming_shows: 3,
      bio: 'Acoustic storyteller with a voice that captivates audiences nationwide.',
      rating: 4.8,
      total_donations: 8750
    },
    {
      id: '2', 
      name: 'The Midnight Echoes',
      slug: 'midnight-echoes', // This matches the existing artist page
      genre: 'Alternative Rock',
      avatar: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: false,
      followers: 8200,
      upcoming_shows: 2,
      bio: 'Four-piece rock band bringing raw energy and honest lyrics to every stage.',
      rating: 4.6,
      total_donations: 5420
    },
    {
      id: '3',
      name: 'DJ Cosmic',
      slug: 'dj-cosmic', // This matches the existing artist page
      genre: 'Electronic',
      avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true,
      followers: 25000,
      upcoming_shows: 5,
      bio: 'Electronic music producer and DJ creating otherworldly soundscapes.',
      rating: 4.9,
      total_donations: 15200
    },
    {
      id: '4',
      name: 'Sarah\'s Acoustic Corner',
      slug: 'sarahs-acoustic-corner', // Fixed: Now has its own unique slug
      genre: 'Folk',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: false,
      followers: 1200,
      upcoming_shows: 1,
      bio: 'Local acoustic performer with heartfelt original songs.',
      rating: 4.3,
      total_donations: 890
    }
  ]

  const upcomingShows = [
    {
      id: '1',
      title: 'Acoustic Evening with Luna Rodriguez',
      artist: 'Luna Rodriguez',
      artistSlug: 'luna-rodriguez', // Correct slug
      artistAvatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150',
      venue: 'The Blue Note',
      venueCity: 'New York, NY',
      date: '2024-01-15',
      time: '20:00',
      price: 25,
      status: 'upcoming',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
      ticketsAvailable: true,
      expectedAttendance: 180
    },
    {
      id: '2',
      title: 'Rock Revival Night',
      artist: 'The Midnight Echoes',
      artistSlug: 'midnight-echoes', // Correct slug
      artistAvatar: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=150',
      venue: 'Underground Hall',
      venueCity: 'Brooklyn, NY',
      date: '2024-01-16',
      time: '21:30',
      price: 35,
      status: 'upcoming',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
      ticketsAvailable: true,
      expectedAttendance: 320
    },
    {
      id: '3',
      title: 'Cosmic Frequencies',
      artist: 'DJ Cosmic',
      artistSlug: 'dj-cosmic', // Correct slug
      artistAvatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150',
      venue: 'Electric Garden',
      venueCity: 'Manhattan, NY',
      date: '2024-01-18',
      time: '22:00',
      price: 40,
      status: 'upcoming',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
      ticketsAvailable: true,
      expectedAttendance: 450
    },
    {
      id: '4',
      title: 'Summer Sunset Sessions',
      artist: 'Luna Rodriguez',
      artistSlug: 'luna-rodriguez', // Correct slug
      artistAvatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150',
      venue: 'Central Park Bandshell',
      venueCity: 'New York, NY',
      date: '2024-01-20',
      time: '19:00',
      price: 0,
      status: 'upcoming',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
      ticketsAvailable: true,
      expectedAttendance: 800
    }
  ]

  const categories = [
    { id: 'all', label: 'All', icon: Music },
    { id: 'rock', label: 'Rock', icon: Music },
    { id: 'electronic', label: 'Electronic', icon: Music },
    { id: 'folk', label: 'Folk', icon: Music },
    { id: 'jazz', label: 'Jazz', icon: Music }
  ]

  const handleArtistClick = (artistSlug: string) => {
    console.log('Navigating to artist:', artistSlug) // Debug log
    
    // Check if the artist has a dedicated page, otherwise show a placeholder
    if (['luna-rodriguez', 'midnight-echoes', 'dj-cosmic'].includes(artistSlug)) {
      router.push(`/artist/${artistSlug}`)
    } else {
      // For artists without dedicated pages, show a coming soon message or redirect to a generic page
      alert(`${artistSlug} profile page coming soon! For now, you can support them through our platform.`)
    }
  }

  const handleShowClick = (showId: string, artistSlug: string) => {
    console.log('Navigating to show:', showId) // Debug log
    
    // Make sure we're using a valid show ID format for the demo
    // This ensures the show page can properly handle the ID
    if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
      // For demo mode, use one of our known good IDs
      const demoShowId = showId.startsWith('show-') ? showId : `show-${showId}`;
      console.log('Demo mode: using show ID:', demoShowId);
      router.push(`/show/${demoShowId}`);
    } else {
      router.push(`/show/${showId}`);
    }
  }

  const handleSupportArtist = (e: React.MouseEvent, artistSlug: string) => {
    e.stopPropagation() // Prevent triggering the artist click
    console.log('Supporting artist:', artistSlug) // Debug log
    
    // Check if the artist has a dedicated page for donations
    if (['luna-rodriguez', 'midnight-echoes', 'dj-cosmic'].includes(artistSlug)) {
      router.push(`/artist/${artistSlug}/donate`)
    } else {
      // For artists without dedicated pages, show a message or redirect to a generic donation flow
      alert(`Support for ${artistSlug} coming soon! We're working on setting up their donation page.`)
    }
  }

  const handleFollowArtist = (e: React.MouseEvent, artistId: string) => {
    e.stopPropagation() // Prevent triggering the artist click
    // TODO: Implement follow functionality
    console.log('Following artist:', artistId)
  }

  const handleGetTickets = (e: React.MouseEvent, showId: string) => {
    e.stopPropagation() // Prevent triggering the show click
    // TODO: Implement ticket purchasing
    console.log('Getting tickets for show:', showId)
  }

  return (
    <GradientBg variant="secondary">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover Live Music
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Find amazing artists and shows in your area
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <GlassCard variant="minimal" className="p-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search artists, venues, or shows..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Search
                </Button>
              </div>
            </GlassCard>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex gap-2 justify-center flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trending Artists */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <GlassCard variant="elevated">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Trending Artists</h2>
              </div>
              
              <div className="grid gap-4">
                {trendingArtists.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                    onClick={() => handleArtistClick(artist.slug)}
                  >
                    <Avatar className="w-16 h-16 ring-2 ring-purple-400/30 group-hover:ring-purple-400/50 transition-all">
                      <AvatarImage src={artist.avatar} alt={artist.name} />
                      <AvatarFallback className="bg-purple-500 text-white">
                        {artist.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                          {artist.name}
                        </h3>
                        {artist.verified && (
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                            <Star className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-purple-200 text-sm mb-2">{artist.genre}</p>
                      <p className="text-gray-400 text-xs mb-2 line-clamp-1">{artist.bio}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{artist.followers.toLocaleString()} followers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{artist.upcoming_shows} upcoming shows</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{artist.rating}/5</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={(e) => handleFollowArtist(e, artist.id)}
                      >
                        Follow
                      </Button>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={(e) => handleSupportArtist(e, artist.slug)}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        Support
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => router.push('/artists')}
                >
                  View All Artists
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Upcoming Shows */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard variant="elevated">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Upcoming Shows</h2>
              </div>
              
              <div className="space-y-4">
                {upcomingShows.map((show, index) => (
                  <motion.div
                    key={show.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="group cursor-pointer"
                    onClick={() => handleShowClick(show.id, show.artistSlug)}
                  >
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src={show.image}
                        alt={show.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 text-white">
                        <p className="text-sm font-medium group-hover:text-purple-300 transition-colors">
                          {show.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-4 h-4">
                            <AvatarImage src={show.artistAvatar} alt={show.artist} />
                            <AvatarFallback className="text-xs">{show.artist.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="text-xs opacity-90">{show.artist}</p>
                        </div>
                      </div>
                      {show.price === 0 && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                            FREE
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span>{show.venue}, {show.venueCity}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-purple-200">
                          {new Date(show.date).toLocaleDateString()} • {show.time}
                        </div>
                        {show.price > 0 ? (
                          <Badge variant="outline" className="border-green-400/30 text-green-300">
                            ${show.price}
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500/20 text-green-300">
                            FREE
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{show.expectedAttendance} expected</span>
                        {show.ticketsAvailable && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-400/30 text-purple-300 hover:bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => handleGetTickets(e, show.id)}
                          >
                            Get Tickets
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button 
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
                onClick={() => router.push('/shows')}
              >
                View All Shows
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </GlassCard>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <GlassCard variant="elevated">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-gray-300 mb-6">
                Explore more options or get personalized recommendations
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => router.push('/artists')}
                >
                  Browse All Artists
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => router.push('/venues/partner')}
                >
                  Find Venues
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => router.push('/support')}
                >
                  Support Music
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}