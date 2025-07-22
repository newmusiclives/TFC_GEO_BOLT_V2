'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, Users, DollarSign, Copy, ExternalLink, Share2 } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReferralStats } from '@/components/referral/referral-stats'
import { ReferralTree } from '@/components/referral/referral-tree'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

export default function ReferralsPage() {
  const supabase = createClient()
  const [stats, setStats] = useState<any>(null)
  const [tree, setTree] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        const isDemoMode = typeof window !== 'undefined' && sessionStorage.getItem('demo_mode') === 'true';
        if ((userError || !user) && !isDemoMode) throw new Error('User not found')

        // Fetch referral stats (customize for your schema)
        const { data: statsData, error: statsError } = await supabase
          .from('referral_stats')
          .select('*')
          .eq('user_id', user.id)
          .single()
        if (statsError) throw statsError
        setStats(statsData)

        // Fetch referral tree (customize for your schema)
        const { data: treeData, error: treeError } = await supabase
          .from('referral_tree')
          .select('*')
          .eq('user_id', user.id)
          .single()
        if (treeError) throw treeError
        setTree(treeData)
      } catch (err: any) {
        setError(err.message || 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

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
                  <div className="text-2xl font-bold text-white">${stats?.totalEarnings?.toFixed(2) || '0.00'}</div>
                  <div className="text-sm text-gray-400">Total Earnings</div>
                </div>
              </GlassCard>
              
              <GlassCard variant="elevated">
                <div className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats?.totalReferrals || 0}</div>
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
                    {/* Referral link generation logic removed */}
                    {/* For now, a placeholder or a message */}
                    <p>Referral link will be generated here.</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => toast.info('Referral link generation not implemented yet')}
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    
                    <Button 
                      onClick={() => toast.info('Referral link sharing not implemented yet')}
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10"
                      disabled
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
                <ReferralStats userId={''} stats={stats} />
              </TabsContent>
              
              <TabsContent value="network">
                <ReferralTree 
                  directReferrals={tree?.directReferrals || []}
                  artistsReferred={tree?.artistsReferred || []}
                  venuesReferred={tree?.venuesReferred || []}
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