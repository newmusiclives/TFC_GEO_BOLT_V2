'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Music, DollarSign, Calendar, Activity, Globe } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function AnalyticsPage() {
  // Mock analytics data
  const platformStats = {
    totalUsers: 15247,
    totalArtists: 2543,
    totalVenues: 892,
    totalShows: 8234,
    totalRevenue: 125000,
    monthlyGrowth: 12.5,
    activeShows: 23,
    avgDonation: 28.50
  }

  const recentActivity = [
    { type: 'user_signup', count: 45, timeframe: 'today', change: '+12%' },
    { type: 'donations', count: 127, timeframe: 'today', change: '+8%' },
    { type: 'shows_created', count: 8, timeframe: 'today', change: '+15%' },
    { type: 'venues_added', count: 3, timeframe: 'today', change: '+25%' }
  ]

  const topArtists = [
    { name: 'Luna Rodriguez', earnings: 5200, shows: 12, growth: '+15%' },
    { name: 'DJ Cosmic', earnings: 4800, shows: 8, growth: '+22%' },
    { name: 'The Midnight Echoes', earnings: 3400, shows: 6, growth: '+8%' },
    { name: 'Sarah\'s Corner', earnings: 2100, shows: 4, growth: '+35%' }
  ]

  const topVenues = [
    { name: 'The Blue Note', shows: 45, revenue: 12500, utilization: '85%' },
    { name: 'Underground Hall', shows: 32, revenue: 8900, utilization: '72%' },
    { name: 'Electric Garden', shows: 28, revenue: 7600, utilization: '68%' },
    { name: 'Central Park Bandshell', shows: 25, revenue: 6200, utilization: '60%' }
  ]

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
                <h1 className="text-3xl font-bold text-white mb-2">Platform Analytics</h1>
                <p className="text-gray-300">Comprehensive insights and metrics</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Export Data
                </Button>
                <Link href="/admin/dashboard">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard variant="elevated">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Users</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {platformStats.totalUsers.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-400">+{platformStats.monthlyGrowth}% this month</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard variant="elevated">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-400">
                      ${platformStats.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-400">+18% this month</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard variant="elevated">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Shows</p>
                    <p className="text-2xl font-bold text-red-400">
                      {platformStats.activeShows}
                    </p>
                    <p className="text-xs text-gray-400">Live right now</p>
                  </div>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard variant="elevated">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Avg Donation</p>
                    <p className="text-2xl font-bold text-purple-400">
                      ${platformStats.avgDonation}
                    </p>
                    <p className="text-xs text-green-400">+5% this month</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-400" />
                </div>
              </GlassCard>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassCard variant="elevated">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Activity className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                  </div>

                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="font-medium text-white capitalize">
                            {activity.type.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-gray-400">{activity.timeframe}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-purple-400">{activity.count}</p>
                          <p className="text-xs text-green-400">{activity.change}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Platform Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard variant="elevated">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Platform Overview</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Total Artists</span>
                      <span className="text-white font-medium">{platformStats.totalArtists.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Total Venues</span>
                      <span className="text-white font-medium">{platformStats.totalVenues.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Total Shows</span>
                      <span className="text-white font-medium">{platformStats.totalShows.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Monthly Growth</span>
                      <Badge className="bg-green-500/20 text-green-300">
                        +{platformStats.monthlyGrowth}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Top Artists */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <GlassCard variant="elevated">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Music className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">Top Artists</h3>
                  </div>

                  <div className="space-y-4">
                    {topArtists.map((artist, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{artist.name}</p>
                          <p className="text-sm text-gray-400">{artist.shows} shows</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-400">${artist.earnings.toLocaleString()}</p>
                          <p className="text-xs text-green-400">{artist.growth}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Top Venues */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <GlassCard variant="elevated">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Top Venues</h3>
                  </div>

                  <div className="space-y-4">
                    {topVenues.map((venue, index) => (
                      <div key={index} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-white">{venue.name}</p>
                          <Badge variant="outline" className="border-blue-400/30 text-blue-300">
                            {venue.utilization}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">{venue.shows} shows</span>
                          <span className="text-green-400 font-medium">${venue.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </GradientBg>
  )
}