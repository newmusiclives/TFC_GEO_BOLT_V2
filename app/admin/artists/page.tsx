'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Search, CheckCircle, X, Clock, Star, TrendingUp, MoreHorizontal } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default function ArtistVerificationPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock artist verification data
  const artists = [
    {
      id: '1',
      name: 'Luna Rodriguez',
      email: 'luna@example.com',
      status: 'verified',
      submittedAt: '2024-01-15',
      avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Acoustic storyteller with a voice that captivates audiences nationwide.',
      genres: ['indie', 'folk', 'acoustic'],
      socialLinks: { spotify: 'luna-music', instagram: '@lunamusic' },
      stats: { shows: 12, followers: 2450, earnings: 5200 },
      isFeatured: true // New field for featured status
    },
    {
      id: '2',
      name: 'The Midnight Echoes',
      email: 'band@midnightechoes.com',
      status: 'pending',
      submittedAt: '2024-03-10',
      avatar: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Four-piece alternative rock band bringing raw energy to every stage.',
      genres: ['rock', 'alternative', 'indie'],
      socialLinks: { bandcamp: 'midnightechoes', facebook: 'MidnightEchoesBand' },
      stats: { shows: 3, followers: 890, earnings: 1200 },
      isFeatured: false
    },
    {
      id: '3',
      name: 'DJ Cosmic',
      email: 'cosmic@example.com',
      status: 'verified',
      submittedAt: '2024-03-15',
      avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Electronic music producer creating otherworldly soundscapes.',
      genres: ['electronic', 'techno', 'ambient'],
      socialLinks: { soundcloud: 'djcosmic', mixcloud: 'djcosmic' },
      stats: { shows: 8, followers: 1500, earnings: 3400 },
      isFeatured: true
    },
    {
      id: '4',
      name: 'Sarah\'s Acoustic Corner',
      email: 'sarah.acoustic@example.com',
      status: 'rejected',
      submittedAt: '2024-02-28',
      avatar: null,
      bio: 'Local acoustic performer and songwriter.',
      genres: ['acoustic', 'folk'],
      socialLinks: { instagram: '@sarahacoustic' },
      stats: { shows: 1, followers: 45, earnings: 25 },
      isFeatured: false
    }
  ]

  const statusFilters = [
    { id: 'all', label: 'All Artists', count: artists.length },
    { id: 'pending', label: 'Pending Review', count: artists.filter(a => a.status === 'pending').length },
    { id: 'verified', label: 'Verified', count: artists.filter(a => a.status === 'verified').length },
    { id: 'rejected', label: 'Rejected', count: artists.filter(a => a.status === 'rejected').length },
    { id: 'featured', label: 'Featured', count: artists.filter(a => a.isFeatured).length }
  ]

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artist.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'featured' ? artist.isFeatured : artist.status === selectedStatus)
    return matchesSearch && matchesStatus
  })

  const handleVerifyArtist = (artistId: string) => {
    console.log('Verifying artist:', artistId)
    // In production, this would make an API call
  }

  const handleRejectArtist = (artistId: string) => {
    console.log('Rejecting artist:', artistId)
    // In production, this would make an API call
  }

  const handleToggleFeatured = (artistId: string) => {
    console.log('Toggling featured status for artist:', artistId)
    // In production, this would make an API call to update the featured status
  }

  return (
    <GradientBg variant="primary">
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Artist Management</h1>
                <p className="text-gray-300">Review, approve, and manage featured artist status</p>
              </div>
              <Link href="/admin/dashboard">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search artists by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Status Filter Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard variant="elevated">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Filter by Status</h3>
                  <div className="space-y-2">
                    {statusFilters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedStatus(filter.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedStatus === filter.id
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                            : 'hover:bg-white/5 text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{filter.label}</span>
                          <Badge variant="outline" className="border-white/20">
                            {filter.count}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Artists List */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard variant="elevated">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">
                        Artists ({filteredArtists.length})
                      </h3>
                    </div>

                    <div className="space-y-6">
                      {filteredArtists.map((artist, index) => (
                        <motion.div
                          key={artist.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="p-6 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="w-16 h-16">
                                <AvatarImage src={artist.avatar || ''} alt={artist.name} />
                                <AvatarFallback className="bg-purple-500 text-white text-lg">
                                  {artist.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>

                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="text-xl font-semibold text-white">{artist.name}</h4>
                                  {artist.status === 'verified' && (
                                    <Badge className="bg-green-500/20 text-green-300">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                  {artist.isFeatured && (
                                    <Badge className="bg-yellow-500/20 text-yellow-300">
                                      <Star className="w-3 h-3 mr-1" />
                                      Featured
                                    </Badge>
                                  )}
                                  {artist.status === 'pending' && (
                                    <Badge className="bg-yellow-500/20 text-yellow-300">
                                      <Clock className="w-3 h-3 mr-1" />
                                      Pending
                                    </Badge>
                                  )}
                                  {artist.status === 'rejected' && (
                                    <Badge className="bg-red-500/20 text-red-300">
                                      <X className="w-3 h-3 mr-1" />
                                      Rejected
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-gray-300 mb-2">{artist.email}</p>
                                <p className="text-gray-400 text-sm">
                                  Submitted: {new Date(artist.submittedAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              {artist.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleVerifyArtist(artist.id)}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-400/30 text-red-300 hover:bg-red-500/10"
                                    onClick={() => handleRejectArtist(artist.id)}
                                  >
                                    <X className="w-4 h-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {artist.status === 'verified' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className={`${
                                    artist.isFeatured 
                                      ? 'border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/10' 
                                      : 'border-white/20 text-white hover:bg-white/10'
                                  }`}
                                  onClick={() => handleToggleFeatured(artist.id)}
                                >
                                  <Star className="w-4 h-4 mr-1" />
                                  {artist.isFeatured ? 'Remove Featured' : 'Make Featured'}
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Artist Details */}
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-sm font-medium text-gray-300 mb-2">Bio</h5>
                              <p className="text-gray-400 text-sm">{artist.bio}</p>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium text-gray-300 mb-2">Genres</h5>
                              <div className="flex gap-2">
                                {artist.genres.map((genre) => (
                                  <Badge key={genre} variant="outline" className="border-purple-400/30 text-purple-300">
                                    {genre}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium text-gray-300 mb-2">Social Links</h5>
                              <div className="flex gap-4 text-sm">
                                {Object.entries(artist.socialLinks).map(([platform, handle]) => (
                                  <div key={platform} className="text-gray-400">
                                    <span className="capitalize">{platform}:</span> <span className="text-blue-400">{handle}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="pt-4 border-t border-white/10">
                              <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                  <div className="text-lg font-bold text-purple-400">{artist.stats.shows}</div>
                                  <div className="text-xs text-gray-400">Shows</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold text-blue-400">{artist.stats.followers}</div>
                                  <div className="text-xs text-gray-400">Followers</div>
                                </div>
                                <div>
                                  <div className="text-lg font-bold text-green-400">${artist.stats.earnings}</div>
                                  <div className="text-xs text-gray-400">Earnings</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {filteredArtists.length === 0 && (
                      <div className="text-center py-12">
                        <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No artists found matching your criteria</p>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </GradientBg>
  )
}