'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, DollarSign, TrendingUp, Link as LinkIcon } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface ReferralStatsProps {
  userId: string
  stats: {
    totalEarnings: number
    directReferralEarnings: number
    tier2ReferralEarnings: number
    totalReferrals: number
    directReferrals: number
    earningsCount: number
    recentEarnings: Array<{
      date: string
      amount: number
      type: 'direct_referral' | 'tier2_referral'
      entityType: 'artist' | 'venue' | 'fan'
    }>
  }
}

export function ReferralStats({ userId, stats }: ReferralStatsProps) {
  const [referralLink, setReferralLink] = React.useState<string>('')
  
  React.useEffect(() => {
    // Generate referral link based on user ID
    const baseUrl = window.location.origin
    setReferralLink(`${baseUrl}/signup?ref=${userId}`)
  }, [userId])
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success('Referral link copied to clipboard')
  }
  
  return (
    <div className="space-y-6">
      {/* Referral Link */}
      <GlassCard variant="elevated">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Your Referral Link</h3>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 text-sm text-gray-300 overflow-hidden overflow-ellipsis">
              {referralLink}
            </div>
            <Button 
              onClick={copyReferralLink}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Share this link to earn 2.5% of all donations made to artists you refer, 
            plus 2.5% from artists referred by people you refer!
          </p>
        </div>
      </GlassCard>
      
      {/* Earnings Overview */}
      <GlassCard variant="elevated">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Earnings Overview</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">${stats.totalEarnings.toFixed(2)}</div>
                <div className="text-xs text-gray-400">Total Earnings</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{stats.totalReferrals}</div>
                <div className="text-xs text-gray-400">Total Referrals</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <DollarSign className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">${stats.directReferralEarnings.toFixed(2)}</div>
                <div className="text-xs text-gray-400">Direct Earnings</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <TrendingUp className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">${stats.tier2ReferralEarnings.toFixed(2)}</div>
                <div className="text-xs text-gray-400">Tier 2 Earnings</div>
              </div>
            </motion.div>
          </div>
          
          {/* Recent Earnings */}
          <h4 className="text-md font-medium text-white mb-3">Recent Earnings</h4>
          
          {stats.recentEarnings && stats.recentEarnings.length > 0 ? (
            <div className="space-y-3">
              {stats.recentEarnings.map((earning, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={earning.type === 'direct_referral' 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'bg-yellow-500/20 text-yellow-300'
                        }
                      >
                        {earning.type === 'direct_referral' ? 'Direct' : 'Tier 2'}
                      </Badge>
                      <Badge variant="outline" className="border-white/20 text-white">
                        {earning.entityType}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(earning.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">${earning.amount.toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No earnings yet. Start referring artists and fans!</p>
            </div>
          )}
        </div>
      </GlassCard>
      
      {/* How It Works */}
      <GlassCard variant="minimal">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">How Referrals Work</h3>
          
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-300">1</span>
              </div>
              <p>Share your unique referral link with artists, venues, and fans</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-300">2</span>
              </div>
              <p>When they sign up using your link, they're permanently connected to your account</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-300">3</span>
              </div>
              <p>Earn 2.5% of all donations made to artists you refer</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-300">4</span>
              </div>
              <p>Earn an additional 2.5% from donations to artists referred by people you referred</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-300">5</span>
              </div>
              <p>Earnings are automatically added to your account balance and can be withdrawn anytime</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}