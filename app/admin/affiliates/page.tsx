'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  DollarSign, 
  TrendingUp,
  User,
  BarChart, 
  PieChart, 
  Download, 
  Search, 
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Link as LinkIcon,
  UserPlus,
  Music,
  Building,
} from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function AffiliateAdminPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState('30')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for affiliate program summary
  const affiliateSummary = {
    totalReferralEarnings: 12500.75,
    directReferralEarnings: 7500.50,
    tier2ReferralEarnings: 5000.25,
    totalReferrers: 125,
    totalReferredArtists: 85,
    totalReferredVenues: 15,
    totalReferredFans: 250,
    dailyEarnings: [
      { date: '2024-06-25', amount: 450.25 },
      { date: '2024-06-24', amount: 375.50 },
      { date: '2024-06-23', amount: 525.75 },
      { date: '2024-06-22', amount: 410.00 },
      { date: '2024-06-21', amount: 390.25 },
      { date: '2024-06-20', amount: 480.50 },
      { date: '2024-06-19', amount: 420.75 }
    ]
  }

  // Mock data for top referrers
  const topReferrers = [
    {
      userId: '1',
      displayName: 'Sarah Johnson',
      role: 'fan',
      totalEarnings: 1250.75,
      directReferrals: 12,
      tier2Referrals: 8,
      totalReferredArtists: 5,
      totalReferredVenues: 1,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      userId: '2',
      displayName: 'Mike Davis',
      role: 'artist',
      totalEarnings: 950.50,
      directReferrals: 8,
      tier2Referrals: 5,
      totalReferredArtists: 3,
      totalReferredVenues: 2,
      avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      userId: '3',
      displayName: 'Venue Manager',
      role: 'venue_owner',
      totalEarnings: 875.25,
      directReferrals: 7,
      tier2Referrals: 4,
      totalReferredArtists: 4,
      totalReferredVenues: 0,
      avatar: null
    },
    {
      userId: '4',
      displayName: 'John Smith',
      role: 'fan',
      totalEarnings: 750.00,
      directReferrals: 6,
      tier2Referrals: 3,
      totalReferredArtists: 2,
      totalReferredVenues: 1,
      avatar: null
    },
    {
      userId: '5',
      displayName: 'Emily Wilson',
      role: 'artist',
      totalEarnings: 625.50,
      directReferrals: 5,
      tier2Referrals: 2,
      totalReferredArtists: 1,
      totalReferredVenues: 1,
      avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ]

  // Mock data for referral conversion metrics
  const conversionMetrics = {
    artistConversionRate: 35.2,
    venueConversionRate: 28.5,
    fanConversionRate: 42.7,
    avgEarningsPerReferral: 45.75,
    topEarningReferralType: 'artist'
  }

  // Filter top referrers based on search query
  const filteredReferrers = topReferrers.filter(referrer =>
    referrer.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
                <h1 className="text-3xl font-bold text-white mb-2">Affiliate Program Management</h1>
                <p className="text-gray-300">Monitor and manage the 2-tier affiliate referral system</p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Link href="/admin/dashboard">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 flex gap-2">
                <Button
                  variant={dateRange === '7' ? 'default' : 'outline'}
                  className={dateRange === '7' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
                  onClick={() => setDateRange('7')}
                >
                  7 Days
                </Button>
                <Button
                  variant={dateRange === '30' ? 'default' : 'outline'}
                  className={dateRange === '30' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
                  onClick={() => setDateRange('30')}
                >
                  30 Days
                </Button>
                <Button
                  variant={dateRange === '90' ? 'default' : 'outline'}
                  className={dateRange === '90' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
                  onClick={() => setDateRange('90')}
                >
                  90 Days
                </Button>
                <Button
                  variant={dateRange === 'all' ? 'default' : 'outline'}
                  className={dateRange === 'all' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
                  onClick={() => setDateRange('all')}
                >
                  All Time
                </Button>
              </div>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="date"
                    className="pl-10 bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="date"
                    className="pl-10 bg-white/10 border-white/20 text-white"
                  />
                </div>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Apply
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
                <BarChart className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="referrers" className="data-[state=active]:bg-purple-600">
                <Users className="w-4 h-4 mr-2" />
                Top Referrers
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
                <PieChart className="w-4 h-4 mr-2" />
                Conversion Analytics
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="space-y-8">
                {/* Key Metrics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <GlassCard variant="elevated">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-green-400" />
                          </div>
                          <Badge className="bg-green-500/20 text-green-300">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            +12.5%
                          </Badge>
                        </div>
                        <h3 className="text-sm text-gray-400 mb-1">Total Referral Earnings</h3>
                        <div className="text-2xl font-bold text-white">${affiliateSummary.totalReferralEarnings.toLocaleString()}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="text-xs text-gray-400">
                            <span className="text-green-400 font-medium">${affiliateSummary.directReferralEarnings.toLocaleString()}</span> direct
                          </div>
                          <div className="text-xs text-gray-400">
                            <span className="text-blue-400 font-medium">${affiliateSummary.tier2ReferralEarnings.toLocaleString()}</span> tier 2
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <GlassCard variant="elevated">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-400" />
                          </div>
                          <Badge className="bg-purple-500/20 text-purple-300">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            +8.3%
                          </Badge>
                        </div>
                        <h3 className="text-sm text-gray-400 mb-1">Active Referrers</h3>
                        <div className="text-2xl font-bold text-white">{affiliateSummary.totalReferrers}</div>
                        <div className="text-xs text-gray-400 mt-2">
                          From {affiliateSummary.totalReferredArtists + affiliateSummary.totalReferredVenues + affiliateSummary.totalReferredFans} total referrals
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <GlassCard variant="elevated">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Music className="w-6 h-6 text-blue-400" />
                          </div>
                          <Badge className="bg-blue-500/20 text-blue-300">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            +15.2%
                          </Badge>
                        </div>
                        <h3 className="text-sm text-gray-400 mb-1">Referred Artists</h3>
                        <div className="text-2xl font-bold text-white">{affiliateSummary.totalReferredArtists}</div>
                        <div className="text-xs text-gray-400 mt-2">
                          {conversionMetrics.artistConversionRate}% conversion rate
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <GlassCard variant="elevated">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-yellow-400" />
                          </div>
                          <Badge className="bg-yellow-500/20 text-yellow-300">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            +5.7%
                          </Badge>
                        </div>
                        <h3 className="text-sm text-gray-400 mb-1">Avg. Earnings/Referral</h3>
                        <div className="text-2xl font-bold text-white">${conversionMetrics.avgEarningsPerReferral}</div>
                        <div className="text-xs text-gray-400 mt-2">
                          Per successful referral
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>

                {/* Earnings Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Referral Earnings Trend</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-purple-400/30 text-purple-300">
                            Direct
                          </Button>
                          <Button variant="outline" size="sm" className="border-blue-400/30 text-blue-300">
                            Tier 2
                          </Button>
                        </div>
                      </div>

                      {/* Chart Placeholder */}
                      <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                          <p className="text-gray-400">Earnings chart visualization would appear here</p>
                        </div>
                      </div>

                      {/* Daily Earnings Table */}
                      <div className="mt-6">
                        <h4 className="text-md font-medium text-white mb-3">Daily Earnings</h4>
                        <div className="space-y-2">
                          {affiliateSummary.dailyEarnings.map((day, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                              <span className="text-gray-300">{new Date(day.date).toLocaleDateString()}</span>
                              <span className="font-bold text-green-400">${day.amount.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Referral Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-6">Referral Distribution</h3>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-4 relative">
                            <div className="absolute inset-0 rounded-full bg-purple-500/20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Music className="w-10 h-10 text-purple-400" />
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-1">Artists</h4>
                          <div className="text-2xl font-bold text-purple-400 mb-1">{affiliateSummary.totalReferredArtists}</div>
                          <p className="text-sm text-gray-400">
                            {conversionMetrics.artistConversionRate}% conversion
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-4 relative">
                            <div className="absolute inset-0 rounded-full bg-blue-500/20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Building className="w-10 h-10 text-blue-400" />
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-1">Venues</h4>
                          <div className="text-2xl font-bold text-blue-400 mb-1">{affiliateSummary.totalReferredVenues}</div>
                          <p className="text-sm text-gray-400">
                            {conversionMetrics.venueConversionRate}% conversion
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-4 relative">
                            <div className="absolute inset-0 rounded-full bg-green-500/20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Users className="w-10 h-10 text-green-400" />
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-1">Fans</h4>
                          <div className="text-2xl font-bold text-green-400 mb-1">{affiliateSummary.totalReferredFans}</div>
                          <p className="text-sm text-gray-400">
                            {conversionMetrics.fanConversionRate}% conversion
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </TabsContent>

            {/* Top Referrers Tab */}
            <TabsContent value="referrers">
              <div className="space-y-6">
                {/* Search and Filter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlassCard variant="minimal" className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          placeholder="Search referrers by name..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                        />
                      </div>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Top Referrers List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-6">Top Referrers</h3>
                      
                      <div className="space-y-4">
                        {filteredReferrers.map((referrer, index) => (
                          <motion.div
                            key={referrer.userId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-500/20 flex items-center justify-center">
                                  {referrer.avatar ? (
                                    <img src={referrer.avatar} alt={referrer.displayName} className="w-full h-full object-cover" />
                                  ) : (
                                    <User className="w-6 h-6 text-purple-300" />
                                  )}
                                </div>
                                
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium text-white">{referrer.displayName}</h4>
                                    <Badge 
                                      variant="outline" 
                                      className={`
                                        ${referrer.role === 'artist' ? 'border-purple-400/30 text-purple-300' : 
                                          referrer.role === 'venue_owner' ? 'border-blue-400/30 text-blue-300' : 
                                          'border-green-400/30 text-green-300'}
                                      `}
                                    >
                                      {referrer.role === 'artist' ? 'Artist' : 
                                       referrer.role === 'venue_owner' ? 'Venue' : 'Fan'}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                      <Users className="w-3 h-3 text-blue-400" />
                                      <span>{referrer.directReferrals} direct</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <UserPlus className="w-3 h-3 text-green-400" />
                                      <span>{referrer.tier2Referrals} tier 2</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Music className="w-3 h-3 text-purple-400" />
                                      <span>{referrer.totalReferredArtists} artists</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Building className="w-3 h-3 text-yellow-400" />
                                      <span>{referrer.totalReferredVenues} venues</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="text-xl font-bold text-green-400">${referrer.totalEarnings.toFixed(2)}</div>
                                <div className="text-xs text-gray-400">total earnings</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Referral Link Management */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Referral Link Management</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="font-medium text-white mb-1">Default Referral Link Structure</h4>
                            <p className="text-sm text-gray-400">https://truefans.ai/signup?ref=[user_id]</p>
                          </div>
                          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            <LinkIcon className="w-4 h-4 mr-2" />
                            Customize
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="font-medium text-white mb-1">Vanity URLs</h4>
                            <p className="text-sm text-gray-400">Allow top referrers to create custom referral links</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-400 mr-2">Enabled</span>
                            <div className="w-12 h-6 rounded-full bg-purple-500 relative">
                              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="font-medium text-white mb-1">UTM Parameter Tracking</h4>
                            <p className="text-sm text-gray-400">Track referral sources with UTM parameters</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-400 mr-2">Enabled</span>
                            <div className="w-12 h-6 rounded-full bg-purple-500 relative">
                              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </TabsContent>

            {/* Conversion Analytics Tab */}
            <TabsContent value="analytics">
              <div className="space-y-6">
                {/* Conversion Metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-6">Conversion Metrics</h3>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-4 relative">
                            <div className="absolute inset-0 rounded-full bg-purple-500/20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-2xl font-bold text-white">{conversionMetrics.artistConversionRate}%</div>
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-1">Artist Conversion</h4>
                          <p className="text-sm text-gray-400">
                            Percentage of artists who signed up via referral
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-4 relative">
                            <div className="absolute inset-0 rounded-full bg-blue-500/20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-2xl font-bold text-white">{conversionMetrics.venueConversionRate}%</div>
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-1">Venue Conversion</h4>
                          <p className="text-sm text-gray-400">
                            Percentage of venues who signed up via referral
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-4 relative">
                            <div className="absolute inset-0 rounded-full bg-green-500/20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-2xl font-bold text-white">{conversionMetrics.fanConversionRate}%</div>
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-1">Fan Conversion</h4>
                          <p className="text-sm text-gray-400">
                            Percentage of fans who signed up via referral
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Earnings Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-6">Earnings Distribution</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          {/* Chart Placeholder */}
                          <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center mb-4">
                            <div className="text-center">
                              <PieChart className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                              <p className="text-gray-400">Earnings distribution chart would appear here</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-3 bg-white/5 rounded-lg">
                              <div className="text-lg font-bold text-purple-400">60%</div>
                              <div className="text-xs text-gray-400">Direct Referrals</div>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <div className="text-lg font-bold text-blue-400">40%</div>
                              <div className="text-xs text-gray-400">Tier 2 Referrals</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-md font-medium text-white mb-3">Referral Type Breakdown</h4>
                          
                          <div className="space-y-4">
                            <div className="p-4 bg-white/5 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Music className="w-4 h-4 text-purple-400" />
                                  <span className="text-white">Artist Referrals</span>
                                </div>
                                <span className="font-bold text-green-400">65%</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                              </div>
                            </div>
                            
                            <div className="p-4 bg-white/5 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Building className="w-4 h-4 text-blue-400" />
                                  <span className="text-white">Venue Referrals</span>
                                </div>
                                <span className="font-bold text-green-400">15%</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                              </div>
                            </div>
                            
                            <div className="p-4 bg-white/5 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-green-400" />
                                  <span className="text-white">Fan Referrals</span>
                                </div>
                                <span className="font-bold text-green-400">20%</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Affiliate Program Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Affiliate Program Settings</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="font-medium text-white mb-1">Direct Referral Commission</h4>
                            <p className="text-sm text-gray-400">Percentage earned from direct referrals</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value="2.5"
                              className="w-20 bg-white/10 border-white/20 text-white text-right"
                            />
                            <span className="text-white">%</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="font-medium text-white mb-1">Tier 2 Referral Commission</h4>
                            <p className="text-sm text-gray-400">Percentage earned from tier 2 referrals</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value="2.5"
                              className="w-20 bg-white/10 border-white/20 text-white text-right"
                            />
                            <span className="text-white">%</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="font-medium text-white mb-1">Artist Payout Percentage</h4>
                            <p className="text-sm text-gray-400">Percentage of donation that goes to artist</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value="80"
                              className="w-20 bg-white/10 border-white/20 text-white text-right"
                            />
                            <span className="text-white">%</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="font-medium text-white mb-1">Platform Fee</h4>
                            <p className="text-sm text-gray-400">Platform fee percentage (includes referral fees)</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value="15"
                              className="w-20 bg-white/10 border-white/20 text-white text-right"
                            />
                            <span className="text-white">%</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="font-medium text-white mb-1">Processing Fee</h4>
                            <p className="text-sm text-gray-400">Payment processing fee (added on top)</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value="2.9"
                              className="w-20 bg-white/10 border-white/20 text-white text-right"
                            />
                            <span className="text-white">% + $</span>
                            <Input
                              type="number"
                              value="0.30"
                              className="w-20 bg-white/10 border-white/20 text-white text-right"
                            />
                          </div>
                        </div>
                        
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 mt-2">
                          Save Settings
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </GradientBg>
  )
}