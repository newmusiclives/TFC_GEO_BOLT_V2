'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Music, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Heart, 
  Link as LinkIcon, 
  ExternalLink,
  Copy,
  FileMusic,
  List
} from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { ReferralStats } from '@/components/referral/referral-stats'
import { ReferralTree } from '@/components/referral/referral-tree'
import { toast } from 'sonner'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { SongRequestDashboard } from '@/components/setlist/song-request-dashboard'

export default function ArtistDashboardPage() {
  // Initialize Supabase client
  const supabase = createClient()
  
  // Mock data - in a real app, this would come from Supabase
  const artist = {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Luna Rodriguez',
    slug: 'luna-rodriguez',
    bio: 'Acoustic storyteller with a voice that captivates audiences nationwide.',
    avatar_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
    banner_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    is_verified: true,
    genres: ['indie', 'folk', 'acoustic']
  }

  const stats = {
    totalEarnings: 5200,
    totalDonations: 125,
    totalShows: 12,
    totalFans: 2450,
    upcomingShows: 3,
    monthlyGrowth: 15
  }

  const upcomingShows = [
    {
      id: 'show-1',
      title: 'Acoustic Evening with Luna Rodriguez',
      venue: { name: 'The Blue Note', city: 'New York', state: 'NY' },
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      ticketsSold: 45,
      capacity: 200
    },
    {
      id: 'show-2',
      title: 'Summer Sunset Sessions',
      venue: { name: 'Central Park Bandshell', city: 'New York', state: 'NY' },
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      ticketsSold: 120,
      capacity: 1000
    }
  ]

  const recentDonations = [
    {
      id: 'donation-1',
      amount: 25,
      fan: { name: 'Sarah J.', avatar: null },
      message: 'Love your music!',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'donation-2',
      amount: 50,
      fan: { name: 'Anonymous', avatar: null },
      message: 'Amazing performance tonight!',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'donation-3',
      amount: 15,
      fan: { name: 'Mike R.', avatar: null },
      message: 'Keep creating!',
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  // Mock referral data
  const referralStats = {
    totalEarnings: 125.75,
    directReferralEarnings: 85.25,
    tier2ReferralEarnings: 40.50,
    totalReferrals: 5,
    directReferrals: 3,
    earningsCount: 12,
    recentEarnings: [
      {
        date: '2024-06-20',
        amount: 12.50,
        type: 'direct_referral' as const,
        entityType: 'artist' as const
      },
      {
        date: '2024-06-18',
        amount: 7.25,
        type: 'tier2_referral' as const,
        entityType: 'artist' as const
      },
      {
        date: '2024-06-15',
        amount: 15.00,
        type: 'direct_referral' as const,
        entityType: 'artist' as const
      }
    ]
  }

  const referralTree = {
    directReferrals: [
      {
        id: '66666666-6666-6666-6666-666666666666',
        name: 'John Smith',
        displayName: 'John Smith',
        role: 'fan',
        createdAt: '2024-05-15',
        totalEarningsGenerated: 25.50
      },
      {
        id: '77777777-7777-7777-7777-777777777777',
        name: 'Emily Davis',
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
    venuesReferred: []
  }

  const [activeTab, setActiveTab] = React.useState('overview')
  const [referralLink, setReferralLink] = React.useState('')
  
  // State for setlist display (using React.useState for consistency)
  const [setlist, setSetlist] = React.useState<any>(null)
  const [isLoadingSetlist, setIsLoadingSetlist] = React.useState(true)
  const [requestPrice, setRequestPrice] = React.useState(5)
  
  
  React.useEffect(() => {
    // Generate referral link based on artist ID
    const baseUrl = window.location.origin
    setReferralLink(`${baseUrl}/signup?ref=${artist.id}`)
    
    // Load setlist data
    loadArtistSetlist()
  }, [artist.id])

  React.useEffect(() => {
    // Load request price
    loadRequestPrice()
  }, [])
  
  const loadArtistSetlist = async () => {
    try {
      console.log('Loading artist setlist...')
      // For demo mode, create mock setlist
      if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
        console.log('Creating mock setlist for demo mode')
        const mockSetlist = {
          id: '11111111-aaaa-1111-aaaa-111111111111',
          title: 'Acoustic Evening 2025',
          description: 'My standard acoustic set with a mix of originals and covers',
          songs: [
            { id: '1', title: 'Midnight Whispers', artist: null, isCover: false, duration: '4:15', position: 1 },
            { id: '2', title: 'Landslide', artist: 'Fleetwood Mac', isCover: true, duration: '3:20', position: 2 },
            { id: '3', title: 'Ocean Memories', artist: null, isCover: false, duration: '3:45', position: 3 },
            { id: '4', title: 'Fast Car', artist: 'Tracy Chapman', isCover: true, duration: '4:55', position: 4 },
            { id: '5', title: 'Hallelujah', artist: 'Leonard Cohen', isCover: true, duration: '5:30', position: 5 },
            { id: '6', title: 'City Lights Fading', artist: null, isCover: false, duration: '5:10', position: 6 },
            { id: '7', title: 'Skinny Love', artist: 'Bon Iver', isCover: true, duration: '3:55', position: 7 },
            { id: '8', title: 'Both Sides Now', artist: 'Joni Mitchell', isCover: true, duration: '4:05', position: 8 },
            { id: '9', title: 'Jolene', artist: 'Dolly Parton', isCover: true, duration: '3:40', position: 9 },
            { id: '10', title: 'Whispers in the Wind', artist: null, isCover: false, duration: '4:30', position: 10 }
          ]
        }
        setSetlist(mockSetlist)
        console.log('Mock setlist created:', mockSetlist)
      } else {
        // For non-demo mode, you would typically fetch setlist from database
        // For now, we'll use a default empty setlist
        setSetlist(null)
      }
    } catch (error) {
      console.error('Error loading setlist:', error)
    } finally {
      setIsLoadingSetlist(false)
    }
  }
  
  const loadRequestPrice = async () => {
    try {
      // For demo mode, use default price
      if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
        setRequestPrice(5)
      } else {
        // Get artist's request price from database
        const { data, error } = await supabase
          .from('artists')
          .select('request_price')
          .eq('id', artist.id)
          .single()
        
        if (error) throw error
        
        if (data && data.request_price) {
          setRequestPrice(data.request_price)
        }
      }
    } catch (error) {
      console.error('Error loading request price:', error)
    }
  }
  
  const updateRequestPrice = async (newPrice: number) => {
    if (newPrice < 1) {
      toast.error('Minimum request price is $1')
      return
    }
    
    try {
      if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
        // Just update local state in demo mode
        setRequestPrice(newPrice)
        toast.success('Request price updated successfully')
      } else {
        // Update in database
        const { error } = await supabase
          .from('artists')
          .update({ request_price: newPrice })
          .eq('id', artist.id)
        
        if (error) throw error
        
        setRequestPrice(newPrice)
        toast.success('Request price updated successfully')
      }
    } catch (error) {
      console.error('Error updating request price:', error)
      toast.error('Failed to update request price')
    }
  }
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success('Referral link copied to clipboard!')
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
                <h1 className="text-3xl font-bold text-white mb-2">Artist Dashboard</h1>
                <p className="text-gray-300">Manage your music, shows, and earnings</p>
                <p className="text-gray-300 mt-2">In this dashboard you can see all your stats, financials and important links, using the link Manage Setlists you can create your setlists enabling fans to make song requests and dedications during shows.</p>
              </div>
            </div>

            {/* Artist Info */}
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-purple-500/50">
                <AvatarImage src={artist.avatar_url} alt={artist.name} />
                <AvatarFallback className="bg-purple-500 text-white">
                  {artist.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">{artist.name}</h2>
                  {artist.is_verified && (
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2 mt-1">
                  {artist.genres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Link href={`/artist/${artist.slug}`}>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </Link>
                <Link href="/dashboard/artist/setlists">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <FileMusic className="w-4 h-4 mr-2" />
                    Manage Setlists
                  </Button>
                </Link>
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
                  <div className="text-xl font-bold text-white">${stats.totalEarnings}</div>
                  <div className="text-xs text-gray-400">Total Earnings</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats.totalDonations}</div>
                  <div className="text-xs text-gray-400">Donations</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Music className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats.totalShows}</div>
                  <div className="text-xs text-gray-400">Shows</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats.totalFans}</div>
                  <div className="text-xs text-gray-400">Fans</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Calendar className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
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
          
          {/* Song Request Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <GlassCard variant="elevated">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    Song Request Settings
                  </h3>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex-1">
                    <p className="text-gray-300 mb-2">
                      Set the minimum donation amount required for fans to request songs during your shows.
                    </p>
                    <p className="text-sm text-gray-400">
                      Current minimum: <span className="text-green-400 font-bold">${requestPrice.toFixed(2)}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      value={requestPrice}
                      onChange={(e) => setRequestPrice(parseFloat(e.target.value))}
                      className="w-24 bg-white/10 border-white/20 text-white"
                    />
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => updateRequestPrice(requestPrice)}
                    >
                      Update Price
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
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
                  <LinkIcon className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Your Referral Link</h3>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 text-sm text-gray-300 overflow-hidden overflow-ellipsis">
                    {referralLink}
                  </div>
                  
                  <Button 
                    onClick={copyReferralLink}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-4 text-sm text-purple-200">
                  <p className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Share this link with other artists and fans! You'll earn 2.5% of all donations made to artists you refer, 
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
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
                <Music className="w-4 h-4 mr-2" />
                Shows & Earnings
              </TabsTrigger>
              <TabsTrigger value="referrals" className="data-[state=active]:bg-purple-600">
                <LinkIcon className="w-4 h-4 mr-2" />
                Referral Program
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
                <Users className="w-4 h-4 mr-2" />
                Profile & Settings
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Upcoming Shows */}
                <div>
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Upcoming Shows</h3>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          Add Show
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {upcomingShows.map((show) => (
                          <div key={show.id} className="p-4 bg-white/5 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-white">{show.title}</h4>
                              <Badge className="bg-purple-500/20 text-purple-300">
                                {new Date(show.date).toLocaleDateString()}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-300 mb-3">
                              <span>{show.venue.name}, {show.venue.city}</span>
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
                </div>
                
                {/* Recent Donations */}
                <div>
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Recent Donations</h3>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          View All
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        {recentDonations.map((donation) => (
                          <div key={donation.id} className="p-4 bg-white/5 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={donation.fan.avatar || ''} />
                                  <AvatarFallback className="bg-purple-500 text-white text-xs">
                                    {donation.fan.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold text-white">{donation.fan.name}</h4>
                                  <p className="text-xs text-gray-400">
                                    {new Date(donation.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-green-500/20 text-green-300">
                                ${donation.amount}
                              </Badge>
                            </div>
                            {donation.message && (
                              <p className="text-sm text-gray-300 mt-2">"{donation.message}"</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </div>
                
                {/* Current Setlist */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="lg:col-span-2"
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <List className="w-5 h-5 text-purple-400" />
                          Current Setlist
                        </h3>
                        <Link href="/dashboard/artist/setlists">
                          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            <FileMusic className="w-4 h-4 mr-2" />
                            Manage Setlists
                          </Button>
                        </Link>
                      </div>
                      
                      {isLoadingSetlist ? (
                        <div className="text-center py-6">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
                          <p className="text-gray-300">Loading setlist...</p>
                        </div>
                      ) : setlist ? (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <h4 className="font-medium text-white">{setlist.title}</h4>
                            <Badge className="bg-blue-500/20 text-blue-300">
                              {setlist.songs.length} songs
                            </Badge>
                          </div>
                          
                          {setlist.description && (
                            <p className="text-gray-300 text-sm mb-4">{setlist.description}</p>
                          )}
                          
                          <div className="grid md:grid-cols-2 gap-2">
                            {setlist.songs.map((song: any) => (
                              <div 
                                key={song.id}
                                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                              >
                                <div className="w-6 text-center text-sm text-gray-400">
                                  {song.position}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-white">{song.title}</div>
                                  {song.isCover && song.artist && (
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
                          <p className="text-gray-300 mb-4">No setlist created yet</p>
                          <Link href="/dashboard/artist/setlists">
                            <Button className="bg-purple-600 hover:bg-purple-700">
                              <FileMusic className="w-4 h-4 mr-2" />
                              Create Setlist
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Live Song Requests View */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="lg:col-span-2"
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                        <Heart className="w-5 h-5 text-red-400" />
                        Live Song Requests
                      </h3>
                      {/* For demo, use show-1 and artist.id */}
                      <SongRequestDashboard showId="show-1" artistId={artist.id} />
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </TabsContent>
            
            {/* Referrals Tab */}
            <TabsContent value="referrals">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <ReferralStats userId={artist.id} stats={referralStats} />
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
                  <p className="text-gray-300">Profile settings and preferences would go here</p>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </GradientBg>
  )
}