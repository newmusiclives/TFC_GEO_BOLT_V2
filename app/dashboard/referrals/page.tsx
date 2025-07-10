'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Link, Users, DollarSign, Copy, ExternalLink, Share2 } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReferralStats } from '@/components/referral/referral-stats'
import { ReferralTree } from '@/components/referral/referral-tree'
import { toast } from 'sonner'

export default function ReferralsPage() {
  // Mock data - in a real app, this would come from an API call
  const mockUserId = '55555555-5555-5555-5555-555555555555'
  
  const mockReferralStats = {
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
  
  const mockReferralTree = {
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
      },
      {
        id: '88888888-8888-8888-8888-888888888888',
        displayName: 'Venue Manager',
        role: 'venue_owner',
        createdAt: '2024-06-01',
        totalEarningsGenerated: 15.00
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
      },
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'Electronic Vibes',
        slug: 'electronic-vibes',
        avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150',
        createdAt: '2024-06-05',
        totalEarningsGenerated: 35.50
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
    // Generate referral link based on user ID
    const baseUrl = window.location.origin
    setReferralLink(`${baseUrl}/signup?ref=${mockUserId}`)
  }, [])
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success('Referral link copied to clipboard')
  }
  
  const shareReferralLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join TrueFans CONNECT',
          text: 'Support artists and earn referral commissions with TrueFans CONNECT!',
          url: referralLink
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      copyReferralLink()
    }
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
                <h1 className="text-3xl font-bold text-white mb-2">Referral Program</h1>
                <p className="text-gray-300">Earn commissions by referring artists, venues, and fans</p>
              </div>
            </div>
          </motion.div>
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard variant="elevated">
                <div className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">${mockReferralStats.totalEarnings.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">Total Earnings</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{mockReferralStats.totalReferrals}</div>
                  <div className="text-sm text-gray-400">Total Referrals</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-6 text-center">
                  <Link className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">2.5% + 2.5%</div>
                  <div className="text-sm text-gray-400">Commission Rate</div>
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
                <h3 className="text-xl font-semibold text-white mb-4">Share Your Referral Link</h3>
                
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 text-sm text-gray-300 overflow-hidden overflow-ellipsis">
                    {referralLink}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={copyReferralLink}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    
                    <Button 
                      onClick={shareReferralLink}
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
                
                <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-4 text-sm text-purple-200">
                  <p className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Earn 2.5% of all donations made to artists you refer, plus 2.5% from artists 
                      referred by people you refer!
                    </span>
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
          
          {/* Tabs for Referral Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 border border-white/20">
                <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Earnings Overview
                </TabsTrigger>
                <TabsTrigger value="network" className="data-[state=active]:bg-purple-600">
                  <Users className="w-4 h-4 mr-2" />
                  Referral Network
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <ReferralStats userId={mockUserId} stats={mockReferralStats} />
              </TabsContent>
              
              <TabsContent value="network">
                <ReferralTree 
                  directReferrals={mockReferralTree.directReferrals}
                  artistsReferred={mockReferralTree.artistsReferred}
                  venuesReferred={mockReferralTree.venuesReferred}
                />
              </TabsContent>
            </Tabs>
          </motion.div>
          
          {/* Marketing Materials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <GlassCard variant="elevated">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Marketing Materials</h3>
                <p className="text-gray-300 mb-4">
                  Use these resources to help promote TrueFans CONNECT and grow your referral network.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="text-center mb-3">
                      <ExternalLink className="w-8 h-8 text-purple-400 mx-auto" />
                    </div>
                    <h4 className="font-medium text-white text-center mb-1">Social Media Kit</h4>
                    <p className="text-xs text-gray-400 text-center">
                      Graphics, copy templates, and hashtags for social media promotion
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="text-center mb-3">
                      <ExternalLink className="w-8 h-8 text-blue-400 mx-auto" />
                    </div>
                    <h4 className="font-medium text-white text-center mb-1">Email Templates</h4>
                    <p className="text-xs text-gray-400 text-center">
                      Ready-to-use email templates for reaching out to artists and venues
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="text-center mb-3">
                      <ExternalLink className="w-8 h-8 text-green-400 mx-auto" />
                    </div>
                    <h4 className="font-medium text-white text-center mb-1">Promotional Videos</h4>
                    <p className="text-xs text-gray-400 text-center">
                      Short videos explaining the benefits of TrueFans CONNECT
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </GradientBg>
  )
}