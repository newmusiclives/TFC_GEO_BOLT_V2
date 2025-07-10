'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Music, DollarSign, Calendar, Activity, Globe, Link as LinkIcon, Settings, FileText, Palette } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card' 
import { Button } from '@/components/ui/button' 
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function AdminDashboard() {
  const platformStats = {
    totalUsers: 15247,
    totalArtists: 2543,
    totalVenues: 892,
    totalShows: 8234,
    totalRevenue: 125000,
    totalReferralEarnings: 12500,
    totalReferrers: 125,
    monthlyGrowth: 12.5,
    activeShows: 23,
    avgDonation: 28.50
  }

  return (
    <GradientBg variant="primary">
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-300">Platform overview and management</p>
            </div>
            <Badge className="bg-purple-500/20 text-purple-300 text-lg px-4 py-2">
              Admin Portal
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard variant="elevated" className="h-full">
              <div className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">${platformStats.totalRevenue.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Total Revenue</div>
                <div className="text-xs text-green-400 mt-1">+{platformStats.monthlyGrowth}% this month</div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard variant="elevated" className="h-full">
              <div className="p-4 text-center">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{platformStats.totalUsers.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Total Users</div>
                <div className="text-xs text-green-400 mt-1">+{platformStats.monthlyGrowth}% this month</div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard variant="elevated" className="h-full">
              <div className="p-4 text-center">
                <Music className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{platformStats.activeShows}</div>
                <div className="text-xs text-gray-400">Active Shows</div>
                <div className="text-xs text-green-400 mt-1">+{platformStats.monthlyGrowth}% this month</div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard variant="elevated" className="h-full">
              <div className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{platformStats.monthlyGrowth}%</div>
                <div className="text-xs text-gray-400">Platform Growth</div>
                <div className="text-xs text-green-400 mt-1">Month over month</div>
              </div>
            </GlassCard>
          </motion.div>
            
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard variant="elevated" className="h-full">
              <div className="p-4 text-center">
                <LinkIcon className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">${platformStats.totalReferralEarnings.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Referral Earnings</div>
                <div className="text-xs text-green-400 mt-1">+22% this month</div>
              </div>
            </GlassCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard variant="elevated" className="h-full">
              <div className="p-4 text-center">
                <Calendar className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">{platformStats.totalShows}</div>
                <div className="text-xs text-gray-400">Total Shows</div>
                <div className="text-xs text-green-400 mt-1">All time</div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2"
          >
            <GlassCard variant="elevated">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    Platform Overview
                  </h3>
                  <Badge className="bg-blue-500/20 text-blue-300">
                    Real-time Data
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-blue-400">{platformStats.totalUsers.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Total Users</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-purple-400">{platformStats.totalArtists.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Artists</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-green-400">{platformStats.totalVenues}</div>
                    <div className="text-xs text-gray-400">Venues</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-yellow-400">{platformStats.totalReferrers}</div>
                    <div className="text-xs text-gray-400">Referrers</div>
                  </div>
                </div>
                
                {/* Chart Placeholder */}
                <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400">Platform growth visualization</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">User Growth</span>
                      <span className="text-green-400">+{platformStats.monthlyGrowth}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${platformStats.monthlyGrowth * 5}%` }}></div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Revenue Growth</span>
                      <span className="text-green-400">+18%</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <GlassCard variant="elevated">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    Quick Actions
                  </h3>
                  <Badge className="bg-green-500/20 text-green-300">
                    Admin Tools
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <Link href="/admin/analytics">
                      <div className="flex flex-col items-center text-center">
                        <Activity className="w-8 h-8 text-blue-400 mb-2" />
                        <h4 className="font-medium text-white mb-1">Analytics</h4>
                        <p className="text-xs text-gray-400">Platform metrics and insights</p>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <Link href="/admin/affiliates">
                      <div className="flex flex-col items-center text-center">
                        <LinkIcon className="w-8 h-8 text-yellow-400 mb-2" />
                        <h4 className="font-medium text-white mb-1">Affiliates</h4>
                        <p className="text-xs text-gray-400">Manage referral program</p>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <Link href="/admin/users">
                      <div className="flex flex-col items-center text-center">
                        <Users className="w-8 h-8 text-purple-400 mb-2" />
                        <h4 className="font-medium text-white mb-1">Users</h4>
                        <p className="text-xs text-gray-400">User management</p>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <Link href="/admin/financials">
                      <div className="flex flex-col items-center text-center">
                        <DollarSign className="w-8 h-8 text-green-400 mb-2" />
                        <h4 className="font-medium text-white mb-1">Financials</h4>
                        <p className="text-xs text-gray-400">Financial management</p>
                      </div>
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <Link href="/admin/artists">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      <Music className="w-4 h-4 mr-2" />
                      Artists
                    </Button>
                  </Link>
                  <Link href="/admin/venues">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      <Calendar className="w-4 h-4 mr-2" />
                      Venues
                    </Button>
                  </Link>
                  <Link href="/admin/integrations">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      <Settings className="w-4 h-4 mr-2" />
                      Integrations
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <Link href="/admin/brand-kit">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      <Palette className="w-4 h-4 mr-2" />
                      Brand Kit
                    </Button>
                  </Link>
                  <Link href="/admin/resources">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      <FileText className="w-4 h-4 mr-2" />
                      Resources
                    </Button>
                  </Link>
                  <Link href="/status">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      <Activity className="w-4 h-4 mr-2" />
                      Status
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
        
        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <GlassCard variant="elevated">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-400" />
                  System Status
                </h3>
                <Badge className="bg-green-500/20 text-green-300">
                  All Systems Operational
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">API Services</span>
                    <Badge className="bg-green-500/20 text-green-300">
                      Operational
                    </Badge>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full">
                    <div className="bg-green-500 h-1 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Geolocation</span>
                    <Badge className="bg-green-500/20 text-green-300">
                      Operational
                    </Badge>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full">
                    <div className="bg-green-500 h-1 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Payments</span>
                    <Badge className="bg-green-500/20 text-green-300">
                      Operational
                    </Badge>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full">
                    <div className="bg-green-500 h-1 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Real-time</span>
                    <Badge className="bg-green-500/20 text-green-300">
                      Operational
                    </Badge>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full">
                    <div className="bg-green-500 h-1 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Link href="/status">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    View Detailed Status
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </motion.div>
        </div>
      </div>
    </GradientBg>
  )
}