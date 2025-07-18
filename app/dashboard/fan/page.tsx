'use client'

import React, { useEffect, useState } from 'react'
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
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'

export default function FanDashboardPage() {
  const supabase = createClient()
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [supportedArtists, setSupportedArtists] = useState<any[]>([])
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

        // Fetch fan profile
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        if (profileError) throw profileError
        setProfile(profileData)
        setProfileForm(profileData)

        // Fetch supported artists (customize for your schema)
        const { data: donations, error: donationsError } = await supabase
          .from('donations')
          .select('artist_id')
          .eq('fan_id', user.id)
        if (donationsError) throw donationsError
        const artistIds = donations?.map((d: any) => d.artist_id) || []
        let artists: any[] = []
        if (artistIds.length > 0) {
          const { data: artistData, error: artistError } = await supabase
            .from('artists')
            .select('*')
            .in('id', artistIds)
          if (artistError) throw artistError
          artists = artistData || []
        }
        setSupportedArtists(artists)

        // Fetch upcoming shows (customize for your schema)
        const { data: shows, error: showsError } = await supabase
          .from('shows')
          .select('*')
          .order('start_time', { ascending: true })
        if (showsError) throw showsError
        setUpcomingShows(shows || [])

        // Example stats calculation (customize for your schema)
        setStats({
          totalDonated: donations?.length || 0,
          artistsSupported: artists.length,
          showsAttended: 0, // Add logic if you track attendance
          upcomingShows: shows?.length || 0
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

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success('Referral link copied to clipboard')
  }

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
                <AvatarImage src={profile?.avatar_url} alt={profile?.display_name || profile?.name} />
                <AvatarFallback className="bg-purple-500 text-white">
                  {profile?.display_name?.charAt(0) || profile?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-white">{profile?.display_name || profile?.name}</h2>
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
                  <div className="text-xl font-bold text-white">${stats?.totalDonated}</div>
                  <div className="text-xs text-gray-400">Total Donated</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Music className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats?.artistsSupported}</div>
                  <div className="text-xs text-gray-400">Artists Supported</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats?.showsAttended}</div>
                  <div className="text-xs text-gray-400">Shows Attended</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stats?.upcomingShows}</div>
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
                                  <AvatarImage src={artist.avatar_url} alt={artist.name} />
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
                                    Last supported: {new Date(artist.last_donation_at).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-green-500/20 text-green-300">
                                ${artist.total_donated}
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
                                  <Link href={`/artist/${show.artist_slug}`} className="text-purple-300 hover:underline">
                                    {show.artist_name}
                                  </Link>
                                  <span>•</span>
                                  <span>{show.venue_name}, {show.venue_city}</span>
                                </div>
                              </div>
                              <Badge className="bg-blue-500/20 text-blue-300">
                                {new Date(show.start_time).toLocaleDateString()}
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
                  {/* <ReferralStats userId={profile?.id} stats={referralStats} /> */}
                </div>
                <div>
                  {/* <ReferralTree 
                    directReferrals={referralTree.directReferrals}
                    artistsReferred={referralTree.artistsReferred}
                    venuesReferred={referralTree.venuesReferred}
                  /> */}
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