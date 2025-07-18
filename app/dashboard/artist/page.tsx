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
import { useEffect } from 'react'

export default function ArtistDashboardPage() {
  const supabase = createClient()
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [upcomingShows, setUpcomingShows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [referralLink, setReferralLink] = useState('')
  const [editProfile, setEditProfile] = useState(false)
  const [profileForm, setProfileForm] = useState<any>({})
  const [savingProfile, setSavingProfile] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) throw new Error('User not found')

        // Fetch artist profile
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        if (profileError) throw profileError
        setProfile(profileData)
        setProfileForm(profileData)

        // Fetch shows for the artist
        const { data: shows, error: showsError } = await supabase
          .from('shows')
          .select('*')
          .eq('artist_id', user.id)
          .order('start_time', { ascending: true })
        if (showsError) throw showsError
        setUpcomingShows(shows || [])

        // Example stats calculation (customize for your schema)
        setStats({
          totalShows: shows?.length || 0,
          // Add more stats as needed
        })
      } catch (err: any) {
        setError(err.message || 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (profile?.id) {
      const baseUrl = window.location.origin;
      setReferralLink(`${baseUrl}/signup?ref=${profile.id}`);
    }
  }, [profile?.id]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value })
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingProfile(true)
    setError(null)
    try {
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update(profileForm)
        .eq('id', profile.id)
      if (updateError) throw updateError
      setProfile(profileForm)
      setEditProfile(false)
      toast.success('Profile updated!')
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setSavingProfile(false)
    }
  }

  // Placeholder for updateRequestPrice (implement as needed)
  const updateRequestPrice = (newPrice: number) => {
    // Implement request price update logic here
    alert('Update request price not implemented.');
  };

  // Placeholder for copyReferralLink (implement as needed)
  const copyReferralLink = (link: string) => {
    if (link) {
      navigator.clipboard.writeText(link);
      alert('Referral link copied to clipboard!');
    }
  };

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

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
                <AvatarImage src={profile?.avatar_url} alt={profile?.display_name || profile?.name} />
                <AvatarFallback className="bg-purple-500 text-white">
                  {profile?.display_name?.charAt(0) || profile?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">{profile?.display_name || profile?.name}</h2>
                  {profile?.is_verified && (
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2 mt-1">
                  {profile?.genres?.map((genre: string) => (
                    <Badge key={genre} variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Link href={`/artist/${profile?.slug}`}>
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
                  <div className="text-xl font-bold text-white">${profile?.total_earnings || 0}</div>
                  <div className="text-xs text-gray-400">Total Earnings</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{profile?.total_donations || 0}</div>
                  <div className="text-xs text-gray-400">Donations</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Music className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{profile?.total_shows || 0}</div>
                  <div className="text-xs text-gray-400">Shows</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{profile?.total_fans || 0}</div>
                  <div className="text-xs text-gray-400">Fans</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Calendar className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{upcomingShows.length}</div>
                  <div className="text-xs text-gray-400">Upcoming Shows</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">+{profile?.monthly_growth || 0}%</div>
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
                      Current minimum: <span className="text-green-400 font-bold">${profile?.request_price || 5}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      value={profile?.request_price || 5}
                      onChange={(e) => {
                        const newPrice = parseFloat(e.target.value);
                        if (!isNaN(newPrice) && newPrice >= 1) {
                          updateRequestPrice(newPrice);
                        }
                      }}
                      className="w-24 bg-white/10 border-white/20 text-white"
                    />
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => updateRequestPrice(profile?.request_price || 5)}
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
                    {profile?.referral_link}
                  </div>
                  
                  <Button 
                    onClick={() => copyReferralLink(profile?.referral_link)}
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
                                {new Date(show.start_time).toLocaleDateString()}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-300 mb-3">
                              <span>{show.venue_name}, {show.venue_city}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">
                                {show.tickets_sold}/{show.capacity} tickets sold
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
                        {/* Mock data for recent donations */}
                        {/* In a real app, this would fetch from Supabase */}
                        {Array.from({ length: 3 }).map((_, index) => (
                          <div key={index} className="p-4 bg-white/5 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={`https://via.placeholder.com/50?text=${profile?.display_name?.charAt(0) || 'A'}`} />
                                  <AvatarFallback className="bg-purple-500 text-white text-xs">
                                    {profile?.display_name?.charAt(0) || 'A'}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold text-white">{profile?.display_name || 'Anonymous'}</h4>
                                  <p className="text-xs text-gray-400">
                                    {new Date().toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-green-500/20 text-green-300">
                                ${Math.floor(Math.random() * 100) + 10}
                              </Badge>
                            </div>
                            {/* Mock message */}
                            <p className="text-sm text-gray-300 mt-2">"Love your music!"</p>
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
                      
                      {/* Mock data for setlist */}
                      {/* In a real app, this would fetch from Supabase */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <h4 className="font-medium text-white">Acoustic Evening</h4>
                          <Badge className="bg-blue-500/20 text-blue-300">
                            5 songs
                          </Badge>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-4">A collection of acoustic covers and originals.</p>
                        
                        <div className="grid md:grid-cols-2 gap-2">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <div 
                              key={index}
                              className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                            >
                              <div className="w-6 text-center text-sm text-gray-400">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-white">Song {index + 1}</div>
                                {/* Mock cover and artist */}
                                {index % 2 === 0 && (
                                  <div className="text-xs text-gray-400">
                                    Cover by Artist {index + 1}
                                  </div>
                                )}
                              </div>
                              {/* Mock duration */}
                              <div className="text-sm text-gray-400">
                                3:45
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
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
                      <SongRequestDashboard showId="show-1" artistId={profile?.id} />
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </TabsContent>
            
            {/* Referrals Tab */}
            <TabsContent value="referrals">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {/* Mock referral stats */}
                  <ReferralStats userId={profile?.id} stats={{
                    totalEarnings: profile?.total_earnings || 0,
                    directReferralEarnings: profile?.direct_referral_earnings || 0,
                    tier2ReferralEarnings: profile?.tier2_referral_earnings || 0,
                    totalReferrals: profile?.total_referrals || 0,
                    directReferrals: profile?.direct_referrals || 0,
                    earningsCount: profile?.earnings_count || 0,
                    recentEarnings: profile?.recent_earnings || []
                  }} />
                </div>
                <div>
                  {/* Mock referral tree */}
                  <ReferralTree 
                    directReferrals={profile?.direct_referrals || []}
                    artistsReferred={profile?.artists_referred || []}
                    venuesReferred={profile?.venues_referred || []}
                  />
                </div>
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <GlassCard variant="elevated">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Profile Settings</h3>
                  <form onSubmit={handleProfileSave} className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="display_name" className="text-sm font-medium text-white">Display Name</label>
                      <Input
                        id="display_name"
                        name="display_name"
                        value={profileForm.display_name || ''}
                        onChange={handleProfileChange}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="avatar_url" className="text-sm font-medium text-white">Avatar URL</label>
                      <Input
                        id="avatar_url"
                        name="avatar_url"
                        value={profileForm.avatar_url || ''}
                        onChange={handleProfileChange}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="bio" className="text-sm font-medium text-white">Bio</label>
                      <Input
                        id="bio"
                        name="bio"
                        value={profileForm.bio || ''}
                        onChange={handleProfileChange}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <Button type="submit" disabled={savingProfile} className="bg-purple-600 hover:bg-purple-700">
                      {savingProfile ? 'Saving...' : 'Save Profile'}
                    </Button>
                    {editProfile && (
                      <Button type="button" onClick={() => setEditProfile(false)} className="bg-red-600 hover:bg-red-700">
                        Cancel
                      </Button>
                    )}
                  </form>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </GradientBg>
  )
}