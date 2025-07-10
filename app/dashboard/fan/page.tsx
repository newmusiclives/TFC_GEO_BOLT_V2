'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Calendar, 
  DollarSign, 
  Music, 
  TrendingUp, 
  Link as LinkIcon, 
  ExternalLink,
  Copy,
  Users
} from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReferralStats } from '@/components/referral/referral-stats'
import { ReferralTree } from '@/components/referral/referral-tree'
import { toast } from 'sonner'
import Link from 'next/link'

export default function FanDashboardPage() {
  // Mock data - in a real app, this would come from Supabase
  const fan = {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'Sarah Johnson',
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  }

  const stats = {
    totalDonated: 125,
    artistsSupported: 8,
    showsAttended: 12,
    upcomingShows: 3
  }

  const supportedArtists = [
    {
      id: '1',
      name: 'Luna Rodriguez',
      slug: 'luna-rodriguez',
      avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150',
      totalDonated: 50,
      lastDonation: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      name: 'The Midnight Echoes',
      slug: 'midnight-echoes',
      avatar: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=150',
      totalDonated: 35,
      lastDonation: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      name: 'DJ Cosmic',
      slug: 'dj-cosmic',
      avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150',
      totalDonated: 40,
      lastDonation: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  const upcomingShows = [
    {
      id: 'show-1',
      title: 'Acoustic Evening with Luna Rodriguez',
      artist: { name: 'Luna Rodriguez', slug: 'luna-rodriguez' },
      venue: { name: 'The Blue Note', city: 'New York', state: 'NY' },
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'show-2',
      title: 'Rock Revival Night',
      artist: { name: 'The Midnight Echoes', slug: 'midnight-echoes' },
      venue: { name: 'Underground Hall', city: 'Brooklyn', state: 'NY' },
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'show-3',
      title: 'Cosmic Frequencies',
      artist: { name: 'DJ Cosmic', slug: 'dj-cosmic' },
      venue: { name: 'Electric Garden', city: 'Manhattan', state: 'NY' },
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  // Mock referral data
  const referralStats = {
    totalEarnings: 75.25,
    directReferralEarnings: 50.75,
    tier2ReferralEarnings: 24.50,
    totalReferrals: 4,
    directReferrals: 2,
    earningsCount: 8,
    recentEarnings: [
      {
        date: '2024-06-21',
        amount: 10.50,
        type: 'direct_referral' as const,
        entityType: 'artist' as const
      },
      {
        date: '2024-06-19',
        amount: 5.25,
        type: 'tier2_referral' as const,
        entityType: 'fan' as const
      },
      {
        date: '2024-06-15',
        amount: 8.00,
        type: 'direct_referral' as const,
        entityType: 'fan' as const
      }
    ]
  }

  const referralTree = {
    directReferrals: [
      {
        id: '66666666-6666-6666-6666-666666666666',
        displayName: 'John Smith',
        role: 'fan',
        createdAt: '2024-05-15',
        totalEarningsGenerated: 25.50
      },
      {
        id: '77777777-7777-7777-7777-777777777777',
        displayName: 'Emily Davis',
        role: 'artist',
        createdAt: '2024-05-20',
        totalEarningsGenerated: 50.75
      }
    ],
    artistsReferred: [
      {
        id: '99999999-9999-9999-9999-999999999999',
        name: 'The Jazz Quartet',
        slug: 'jazz-quartet',
        avatar: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=150',
        createdAt: '2024-05-25',
        totalEarningsGenerated: 35.75
      }
    ],
    venuesReferred: []
  }

  const [activeTab, setActiveTab] = React.useState('overview')
  const [referralLink, setReferralLink] = React.useState('')
  
  React.useEffect(() => {
    // Generate referral link based on fan ID
    const baseUrl = window.location.origin
    setReferralLink(`${baseUrl}/signup?ref=${fan.id}`)
  }, [fan.id])
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success('Referral link copied to clipboard')
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
                <h1 className="text-3xl font-bold text-white mb-2">Fan Dashboard</h1>
                <p className="text-gray-300">Track your support and discover new shows</p>
              </div>
              <div className="flex gap-3">
                <Link href="/discover">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Discover Shows
                  </Button>
                </Link>
              </div>
            </div>

            {/* Fan Info */}
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-purple-500/50">
                <AvatarImage src={fan.avatar_url} alt={fan.name} />
                <AvatarFallback className="bg-purple-500 text-white">
                  {fan.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-white">{fan.name}</h2>
                <p className="text-gray-300">Music Enthusiast</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">${stats.totalDonated}</div>
                  <div className="text-xs text-gray-400">Total Donated</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Music className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats.artistsSupported}</div>
                  <div className="text-xs text-gray-400">Artists Supported</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats.showsAttended}</div>
                  <div className="text-xs text-gray-400">Shows Attended</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats.upcomingShows}</div>
                  <div className="text-xs text-gray-400">Upcoming Shows</div>
                </div>
              </GlassCard>
            </div>
          </motion.div>

          {/* Referral Link Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <GlassCard variant="elevated">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <LinkIcon className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Your Fan Referral Link</h3>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 text-sm text-gray-300 overflow-hidden overflow-ellipsis">
                    {referralLink}
                  </div>
                  
                  <Button 
                    onClick={copyReferralLink}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-4 text-sm text-green-200">
                  <p className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Share this link with your friends and favorite artists! You'll earn 2.5% of all donations made to artists you refer, 
                      plus 2.5% from artists referred by people you refer.
                    </span>
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/10 border border-white/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-green-600">
                <Heart className="w-4 h-4 mr-2" />
                Support & Shows
              </TabsTrigger>
              <TabsTrigger value="referrals" className="data-[state=active]:bg-green-600">
                <LinkIcon className="w-4 h-4 mr-2" />
                Referral Program
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-green-600">
                <Users className="w-4 h-4 mr-2" />
                Profile & Settings
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Supported Artists */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Artists You Support</h3>
                        <Link href="/artists">
                          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            Discover More
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="space-y-4">
                        {supportedArtists.map((artist) => (
                          <div key={artist.id} className="p-4 bg-white/5 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={artist.avatar} alt={artist.name} />
                                  <AvatarFallback className="bg-purple-500 text-white">
                                    {artist.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <Link href={`/artist/${artist.slug}`}>
                                    <h4 className="font-semibold text-white hover:text-purple-300 transition-colors">
                                      {artist.name}
                                    </h4>
                                  </Link>
                                  <p className="text-xs text-gray-400">
                                    Last supported: {new Date(artist.lastDonation).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-green-500/20 text-green-300">
                                ${artist.totalDonated}
                              </Badge>
                            </div>
                            <div className="flex justify-end">
                              <Link href={`/artist/${artist.slug}/donate`}>
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                  <Heart className="w-3 h-3 mr-1" />
                                  Support
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
                
                {/* Upcoming Shows */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Upcoming Shows</h3>
                        <Link href="/discover">
                          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            Find Shows
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="space-y-4">
                        {upcomingShows.map((show) => (
                          <div key={show.id} className="p-4 bg-white/5 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-white">{show.title}</h4>
                                <div className="flex items-center gap-1 text-sm text-gray-300">
                                  <Link href={`/artist/${show.artist.slug}`} className="text-purple-300 hover:underline">
                                    {show.artist.name}
                                  </Link>
                                  <span>•</span>
                                  <span>{show.venue.name}, {show.venue.city}</span>
                                </div>
                              </div>
                              <Badge className="bg-blue-500/20 text-blue-300">
                                {new Date(show.date).toLocaleDateString()}
                              </Badge>
                            </div>
                            <div className="flex justify-end">
                              <Link href={`/show/${show.id}`}>
                                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </TabsContent>
            
            {/* Referrals Tab */}
            <TabsContent value="referrals">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <ReferralStats userId={fan.id} stats={referralStats} />
                </div>
                <div>
                  <ReferralTree 
                    directReferrals={referralTree.directReferrals}
                    artistsReferred={referralTree.artistsReferred}
                    venuesReferred={referralTree.venuesReferred}
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <GlassCard variant="elevated">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Profile Settings</h3>
                  <p className="text-gray-300">Profile settings would go here</p>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </GradientBg>
  )
}