'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Building, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Music, 
  Link as LinkIcon, 
  ExternalLink,
  Copy
} from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReferralStats } from '@/components/referral/referral-stats'
import { ReferralTree } from '@/components/referral/referral-tree'
import { toast } from 'sonner'
import Link from 'next/link'

export default function VenueDashboardPage() {
  // Mock data - in a real app, this would come from Supabase
  const venue = {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'The Blue Note',
    slug: 'blue-note-nyc',
    address: '131 W 3rd St',
    city: 'New York',
    state: 'NY',
    capacity: 200,
    venue_type: 'music_venue',
    images: ['https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400']
  }

  const stats = {
    totalRevenue: 45000,
    totalShows: 156,
    totalArtists: 78,
    totalAttendees: 12500,
    upcomingShows: 8,
    monthlyGrowth: 12
  }

  const upcomingShows = [
    {
      id: 'show-1',
      title: 'Jazz Night at The Blue Note',
      artist: { name: 'Luna Rodriguez', slug: 'luna-rodriguez' },
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      ticketsSold: 45,
      capacity: 200
    },
    {
      id: 'show-2',
      title: 'Rock Revival Night',
      artist: { name: 'The Midnight Echoes', slug: 'midnight-echoes' },
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      ticketsSold: 120,
      capacity: 200
    },
    {
      id: 'show-3',
      title: 'Cosmic Frequencies',
      artist: { name: 'DJ Cosmic', slug: 'dj-cosmic' },
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      ticketsSold: 80,
      capacity: 200
    }
  ]

  // Mock referral data
  const referralStats = {
    totalEarnings: 250.50,
    directReferralEarnings: 175.25,
    tier2ReferralEarnings: 75.25,
    totalReferrals: 8,
    directReferrals: 5,
    earningsCount: 18,
    recentEarnings: [
      {
        date: '2024-06-22',
        amount: 15.50,
        type: 'direct_referral' as const,
        entityType: 'artist' as const
      },
      {
        date: '2024-06-20',
        amount: 12.25,
        type: 'tier2_referral' as const,
        entityType: 'venue' as const
      },
      {
        date: '2024-06-18',
        amount: 20.00,
        type: 'direct_referral' as const,
        entityType: 'artist' as const
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
        totalEarningsGenerated: 85.25
      }
    ],
    artistsReferred: [
      {
        id: '99999999-9999-9999-9999-999999999999',
        name: 'The Jazz Quartet',
        slug: 'jazz-quartet',
        avatar: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=150',
        createdAt: '2024-05-25',
        totalEarningsGenerated: 65.75
      }
    ],
    venuesReferred: [
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        name: 'Downtown Music Hall',
        slug: 'downtown-music-hall',
        createdAt: '2024-06-10',
        totalEarningsGenerated: 24.50
      }
    ]
  }

  const [activeTab, setActiveTab] = React.useState('overview')
  const [referralLink, setReferralLink] = React.useState('')
  
  React.useEffect(() => {
    // Generate referral link based on venue ID
    const baseUrl = window.location.origin
    setReferralLink(`${baseUrl}/signup?ref=${venue.id}`)
  }, [venue.id])
  
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
                <h1 className="text-3xl font-bold text-white mb-2">Venue Dashboard</h1>
                <p className="text-gray-300">Manage your venue, shows, and partnerships</p>
              </div>
              <div className="flex gap-3">
                <Link href="/dashboard/venue/submission-form">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Submission Form
                  </Button>
                </Link>
              </div>
            </div>

            {/* Venue Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Building className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{venue.name}</h2>
                <p className="text-gray-300">
                  {venue.address}, {venue.city}, {venue.state} • {venue.capacity} capacity
                </p>
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">${stats.totalRevenue}</div>
                  <div className="text-xs text-gray-400">Total Revenue</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats.totalShows}</div>
                  <div className="text-xs text-gray-400">Total Shows</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Music className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats.totalArtists}</div>
                  <div className="text-xs text-gray-400">Artists Hosted</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Users className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats.totalAttendees}</div>
                  <div className="text-xs text-gray-400">Total Attendees</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Calendar className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats.upcomingShows}</div>
                  <div className="text-xs text-gray-400">Upcoming Shows</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">+{stats.monthlyGrowth}%</div>
                  <div className="text-xs text-gray-400">Monthly Growth</div>
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
                  <LinkIcon className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Your Venue Referral Link</h3>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 text-sm text-gray-300 overflow-hidden overflow-ellipsis">
                    {referralLink}
                  </div>
                  
                  <Button 
                    onClick={copyReferralLink}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4 text-sm text-blue-200">
                  <p className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Share this link with artists and other venues! You'll earn 2.5% of all donations made to artists you refer, 
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
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                <Calendar className="w-4 h-4 mr-2" />
                Shows & Events
              </TabsTrigger>
              <TabsTrigger value="referrals" className="data-[state=active]:bg-blue-600">
                <LinkIcon className="w-4 h-4 mr-2" />
                Referral Program
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-blue-600">
                <Building className="w-4 h-4 mr-2" />
                Venue Settings
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard variant="elevated">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">Upcoming Shows</h3>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Schedule New Show
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {upcomingShows.map((show) => (
                        <div key={show.id} className="p-4 bg-white/5 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-white">{show.title}</h4>
                              <div className="flex items-center gap-1 text-sm text-gray-300">
                                <Link href={`/artist/${show.artist.slug}`} className="text-blue-300 hover:underline">
                                  {show.artist.name}
                                </Link>
                              </div>
                            </div>
                            <Badge className="bg-blue-500/20 text-blue-300">
                              {new Date(show.date).toLocaleDateString()}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">
                              {show.ticketsSold}/{show.capacity} tickets sold
                            </span>
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </TabsContent>
            
            {/* Referrals Tab */}
            <TabsContent value="referrals">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <ReferralStats userId={venue.id} stats={referralStats} />
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
                  <h3 className="text-lg font-semibold text-white mb-6">Venue Settings</h3>
                  <p className="text-gray-300">Venue settings would go here</p>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </GradientBg>
  )
}