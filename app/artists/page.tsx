'use client'

import { motion } from 'framer-motion'
import { Music, Users, MapPin, Calendar, Star, CheckCircle } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ArtistsPage() {
  // Mock data - in production this would come from Supabase
  const featuredArtists = [
    {
      id: '1',
      name: 'Luna Rodriguez',
      slug: 'luna-rodriguez',
      genre: 'Indie Folk',
      bio: 'Acoustic storyteller with a voice that captivates audiences nationwide.',
      avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
      banner: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
      verified: true,
      followers: 12500,
      total_donations: 8750,
      upcoming_shows: 3,
      rating: 4.8
    },
    {
      id: '2',
      name: 'The Midnight Echoes',
      slug: 'midnight-echoes',
      genre: 'Alternative Rock',
      bio: 'Four-piece rock band bringing raw energy and honest lyrics to every stage.',
      avatar: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200',
      banner: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
      verified: false,
      followers: 8200,
      total_donations: 5420,
      upcoming_shows: 2,
      rating: 4.6
    },
    {
      id: '3',
      name: 'DJ Cosmic',
      slug: 'dj-cosmic',
      genre: 'Electronic',
      bio: 'Electronic music producer and DJ creating otherworldly soundscapes.',
      avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=200',
      banner: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
      verified: true,
      followers: 25000,
      total_donations: 15200,
      upcoming_shows: 5,
      rating: 4.9
    }
  ]

  return (
    <GradientBg variant="primary">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Featured Artists
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Discover and support talented musicians in your area
          </p>
        </motion.div>

        {/* Artists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ArtistCard artist={artist} />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <GlassCard variant="elevated" className="max-w-2xl mx-auto">
            <Music className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Are You an Artist?
            </h2>
            <p className="text-purple-200 mb-6">
              Join TrueFans GeoConnect and start receiving support from fans at your live shows.
              Set up instant donations and connect with your audience like never before.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Sign Up as Artist
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}

function ArtistCard({ artist }: { artist: any }) {
  return (
    <GlassCard variant="elevated" className="group cursor-pointer hover:scale-105 transition-all duration-300">
      {/* Banner Image */}
      <div className="relative -m-6 mb-4 rounded-t-xl overflow-hidden">
        <img
          src={artist.banner}
          alt={`${artist.name} banner`}
          className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Avatar */}
        <div className="absolute -bottom-8 left-6">
          <Avatar className="w-16 h-16 ring-4 ring-white/20 group-hover:ring-purple-400/50 transition-all">
            <AvatarImage src={artist.avatar} alt={artist.name} />
            <AvatarFallback className="bg-purple-500 text-white text-lg">
              {artist.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Content */}
      <div className="pt-8">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-white">{artist.name}</h3>
          {artist.verified && (
            <CheckCircle className="w-5 h-5 text-blue-400" />
          )}
        </div>
        
        <Badge variant="secondary" className="mb-3 bg-purple-500/20 text-purple-300">
          {artist.genre}
        </Badge>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {artist.bio}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <Users className="w-4 h-4" />
            <span>{artist.followers.toLocaleString()} followers</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-4 h-4" />
            <span>{artist.upcoming_shows} shows</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{artist.rating}/5 rating</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-green-400">$</span>
            <span>${artist.total_donations.toLocaleString()} raised</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            onClick={() => window.location.href = `/artist/${artist.slug}`}
          >
            View Profile
          </Button>
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10"
            onClick={() => window.location.href = `/artist/${artist.slug}/donate`}
          >
            Support
          </Button>
        </div>
      </div>
    </GlassCard>
  )
}