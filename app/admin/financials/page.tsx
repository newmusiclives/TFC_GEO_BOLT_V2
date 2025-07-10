'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  Download, 
  Calendar, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart,
  BarChart,
  FileText,
  Filter,
  Search
} from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function FinancialsPage() {
  const [dateRange, setDateRange] = useState('30')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock financial data
  const financialSummary = {
    totalRevenue: 125000.75,
    platformFees: 18750.11,
    processingFees: 3625.02,
    referralFees: 6250.04,
    artistPayouts: 96375.58,
    pendingPayouts: 12500.00,
    completedPayouts: 83875.58,
    monthlyGrowth: 15.2,
    dailyRevenue: [
      { date: '2024-06-25', amount: 4500.25 },
      { date: '2024-06-24', amount: 3755.50 },
      { date: '2024-06-23', amount: 5257.75 },
      { date: '2024-06-22', amount: 4100.00 },
      { date: '2024-06-21', amount: 3902.25 },
      { date: '2024-06-20', amount: 4805.50 },
      { date: '2024-06-19', amount: 4207.75 }
    ]
  }

  // Mock transactions
  const recentTransactions = [
    {
      id: 'tx-1',
      type: 'donation',
      amount: 50.00,
      fee: 7.50,
      artistPayout: 42.50,
      artistName: 'Luna Rodriguez',
      fanName: 'Sarah Johnson',
      date: '2024-06-25T14:30:00Z',
      status: 'completed'
    },
    {
      id: 'tx-2',
      type: 'donation',
      amount: 25.00,
      fee: 3.75,
      artistPayout: 21.25,
      artistName: 'The Midnight Echoes',
      fanName: 'Anonymous',
      date: '2024-06-25T12:15:00Z',
      status: 'completed'
    },
    {
      id: 'tx-3',
      type: 'payout',
      amount: 500.00,
      fee: 0,
      artistPayout: 500.00,
      artistName: 'DJ Cosmic',
      fanName: null,
      date: '2024-06-24T18:45:00Z',
      status: 'processing'
    },
    {
      id: 'tx-4',
      type: 'donation',
      amount: 100.00,
      fee: 15.00,
      artistPayout: 85.00,
      artistName: 'Luna Rodriguez',
      fanName: 'Mike Davis',
      date: '2024-06-24T16:20:00Z',
      status: 'completed'
    },
    {
      id: 'tx-5',
      type: 'refund',
      amount: 35.00,
      fee: 0,
      artistPayout: -35.00,
      artistName: 'The Midnight Echoes',
      fanName: 'Emily Wilson',
      date: '2024-06-23T09:10:00Z',
      status: 'completed'
    }
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
                <h1 className="text-3xl font-bold text-white mb-2">Financial Management</h1>
                <p className="text-gray-300">Monitor revenue, fees, and payouts across the platform</p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Reports
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
              <TabsTrigger value="transactions" className="data-[state=active]:bg-purple-600">
                <CreditCard className="w-4 h-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-purple-600">
                <FileText className="w-4 h-4 mr-2" />
                Reports
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
                            +{financialSummary.monthlyGrowth}%
                          </Badge>
                        </div>
                        <h3 className="text-sm text-gray-400 mb-1">Total Revenue</h3>
                        <div className="text-2xl font-bold text-white">${financialSummary.totalRevenue.toLocaleString()}</div>
                        <div className="text-xs text-gray-400 mt-2">
                          Platform lifetime revenue
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
                            <DollarSign className="w-6 h-6 text-purple-400" />
                          </div>
                          <Badge className="bg-purple-500/20 text-purple-300">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            +12.3%
                          </Badge>
                        </div>
                        <h3 className="text-sm text-gray-400 mb-1">Platform Fees</h3>
                        <div className="text-2xl font-bold text-white">${financialSummary.platformFees.toLocaleString()}</div>
                        <div className="text-xs text-gray-400 mt-2">
                          15% of total revenue
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
                            <CreditCard className="w-6 h-6 text-blue-400" />
                          </div>
                          <Badge className="bg-blue-500/20 text-blue-300">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            +8.7%
                          </Badge>
                        </div>
                        <h3 className="text-sm text-gray-400 mb-1">Artist Payouts</h3>
                        <div className="text-2xl font-bold text-white">${financialSummary.artistPayouts.toLocaleString()}</div>
                        <div className="text-xs text-gray-400 mt-2">
                          80% of total revenue
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
                        <h3 className="text-sm text-gray-400 mb-1">Pending Payouts</h3>
                        <div className="text-2xl font-bold text-white">${financialSummary.pendingPayouts.toLocaleString()}</div>
                        <div className="text-xs text-gray-400 mt-2">
                          Awaiting processing
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>

                {/* Revenue Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-green-400/30 text-green-300">
                            Revenue
                          </Button>
                          <Button variant="outline" size="sm" className="border-purple-400/30 text-purple-300">
                            Platform Fees
                          </Button>
                          <Button variant="outline" size="sm" className="border-blue-400/30 text-blue-300">
                            Artist Payouts
                          </Button>
                        </div>
                      </div>

                      {/* Chart Placeholder */}
                      <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                          <p className="text-gray-400">Revenue chart visualization would appear here</p>
                        </div>
                      </div>

                      {/* Daily Revenue Table */}
                      <div className="mt-6">
                        <h4 className="text-md font-medium text-white mb-3">Daily Revenue</h4>
                        <div className="space-y-2">
                          {financialSummary.dailyRevenue.map((day, index) => (
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

                {/* Revenue Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-6">Revenue Distribution</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Pie Chart Placeholder */}
                        <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <PieChart className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                            <p className="text-gray-400">Revenue distribution chart would appear here</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-white/5 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-white">Artist Payouts</span>
                              </div>
                              <span className="font-bold text-white">80%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-white/5 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span className="text-white">Platform Fees</span>
                              </div>
                              <span className="font-bold text-white">15%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-white/5 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span className="text-white">Referral Fees</span>
                              </div>
                              <span className="font-bold text-white">5%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions">
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
                          placeholder="Search transactions by ID, artist, or fan..."
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

                {/* Transactions List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-6">Recent Transactions</h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">ID</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Type</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Amount</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Artist</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Fan</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentTransactions.map((tx, index) => (
                              <tr 
                                key={tx.id} 
                                className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                                  index % 2 === 0 ? 'bg-white/[0.02]' : ''
                                }`}
                              >
                                <td className="py-3 px-4 text-sm text-gray-300">{tx.id}</td>
                                <td className="py-3 px-4">
                                  <Badge 
                                    className={`
                                      ${tx.type === 'donation' ? 'bg-green-500/20 text-green-300' : 
                                        tx.type === 'payout' ? 'bg-blue-500/20 text-blue-300' : 
                                        'bg-red-500/20 text-red-300'}
                                    `}
                                  >
                                    {tx.type}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4 text-sm font-medium text-white">${tx.amount.toFixed(2)}</td>
                                <td className="py-3 px-4 text-sm text-gray-300">{tx.artistName}</td>
                                <td className="py-3 px-4 text-sm text-gray-300">{tx.fanName || '-'}</td>
                                <td className="py-3 px-4 text-sm text-gray-300">
                                  {new Date(tx.date).toLocaleString()}
                                </td>
                                <td className="py-3 px-4">
                                  <Badge 
                                    className={`
                                      ${tx.status === 'completed' ? 'bg-green-500/20 text-green-300' : 
                                        tx.status === 'processing' ? 'bg-yellow-500/20 text-yellow-300' : 
                                        'bg-red-500/20 text-red-300'}
                                    `}
                                  >
                                    {tx.status}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-6 flex justify-center">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          Load More
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-6">Financial Reports</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">Revenue Report</h4>
                              <p className="text-xs text-gray-400">Detailed breakdown of all revenue sources</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="border-white/20 text-white">
                              CSV, PDF, XLSX
                            </Badge>
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">Artist Payout Report</h4>
                              <p className="text-xs text-gray-400">Complete payout history by artist</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="border-white/20 text-white">
                              CSV, PDF, XLSX
                            </Badge>
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">Tax Summary</h4>
                              <p className="text-xs text-gray-400">Annual tax reporting for platform fees</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="border-white/20 text-white">
                              CSV, PDF, XLSX
                            </Badge>
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">Referral Earnings Report</h4>
                              <p className="text-xs text-gray-400">Detailed breakdown of referral commissions</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="border-white/20 text-white">
                              CSV, PDF, XLSX
                            </Badge>
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <h4 className="text-md font-medium text-white mb-4">Custom Report</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Report Type
                            </label>
                            <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white">
                              <option value="revenue">Revenue Report</option>
                              <option value="payouts">Payout Report</option>
                              <option value="fees">Fee Breakdown</option>
                              <option value="referrals">Referral Earnings</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Date Range
                            </label>
                            <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white">
                              <option value="7">Last 7 Days</option>
                              <option value="30">Last 30 Days</option>
                              <option value="90">Last 90 Days</option>
                              <option value="year">This Year</option>
                              <option value="custom">Custom Range</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Format
                            </label>
                            <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white">
                              <option value="csv">CSV</option>
                              <option value="pdf">PDF</option>
                              <option value="xlsx">Excel (XLSX)</option>
                            </select>
                          </div>
                        </div>
                        
                        <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                          <Download className="w-4 h-4 mr-2" />
                          Generate Custom Report
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