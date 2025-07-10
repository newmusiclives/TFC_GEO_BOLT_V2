'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Filter, MoreHorizontal, Shield, Ban, CheckCircle, Mail, Calendar } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')

  // Mock user data
  const users = [
    {
      id: '1',
      name: 'Luna Rodriguez',
      email: 'luna@example.com',
      role: 'artist',
      status: 'active',
      verified: true,
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150',
      stats: { shows: 12, donations: 2450 }
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'fan',
      status: 'active',
      verified: false,
      joinDate: '2024-02-20',
      lastActive: '1 day ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      stats: { donations: 125, artists: 8 }
    },
    {
      id: '3',
      name: 'Blue Note Manager',
      email: 'manager@bluenote.com',
      role: 'venue_owner',
      status: 'active',
      verified: true,
      joinDate: '2024-01-10',
      lastActive: '5 hours ago',
      avatar: null,
      stats: { venues: 1, shows: 45 }
    },
    {
      id: '4',
      name: 'DJ Cosmic',
      email: 'cosmic@example.com',
      role: 'artist',
      status: 'pending',
      verified: false,
      joinDate: '2024-03-01',
      lastActive: '3 days ago',
      avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150',
      stats: { shows: 3, donations: 890 }
    }
  ]

  const roles = [
    { id: 'all', label: 'All Users', count: users.length },
    { id: 'artist', label: 'Artists', count: users.filter(u => u.role === 'artist').length },
    { id: 'fan', label: 'Fans', count: users.filter(u => u.role === 'fan').length },
    { id: 'venue_owner', label: 'Venue Owners', count: users.filter(u => u.role === 'venue_owner').length }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    return matchesSearch && matchesRole
  })

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
                <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                <p className="text-gray-300">Manage users, roles, and permissions across the platform</p>
              </div>
              <Link href="/admin/dashboard">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search users by name or email..."
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
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Role Filter Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard variant="elevated">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Filter by Role</h3>
                  <div className="space-y-2">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedRole === role.id
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                            : 'hover:bg-white/5 text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{role.label}</span>
                          <Badge variant="outline" className="border-white/20">
                            {role.count}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Users List */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard variant="elevated">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">
                        Users ({filteredUsers.length})
                      </h3>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Add User
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {filteredUsers.map((user, index) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={user.avatar || ''} alt={user.name} />
                                <AvatarFallback className="bg-purple-500 text-white">
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>

                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-white">{user.name}</h4>
                                  {user.verified && (
                                    <CheckCircle className="w-4 h-4 text-blue-400" />
                                  )}
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${
                                      user.role === 'artist' ? 'border-purple-400/30 text-purple-300' :
                                      user.role === 'fan' ? 'border-green-400/30 text-green-300' :
                                      user.role === 'venue_owner' ? 'border-blue-400/30 text-blue-300' :
                                      'border-gray-400/30 text-gray-300'
                                    }`}
                                  >
                                    {user.role.replace('_', ' ')}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <div className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    <span>{user.email}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>Joined {user.joinDate}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <Badge
                                  className={`${
                                    user.status === 'active' ? 'bg-green-500/20 text-green-300' :
                                    user.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-red-500/20 text-red-300'
                                  }`}
                                >
                                  {user.status}
                                </Badge>
                                <p className="text-xs text-gray-400 mt-1">
                                  Active {user.lastActive}
                                </p>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/20 text-white hover:bg-white/10"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* User Stats */}
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex gap-6 text-sm">
                              {user.role === 'artist' && (
                                <>
                                  <div>
                                    <span className="text-gray-400">Shows: </span>
                                    <span className="text-white font-medium">{user.stats.shows}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Earned: </span>
                                    <span className="text-green-400 font-medium">${user.stats.donations}</span>
                                  </div>
                                </>
                              )}
                              {user.role === 'fan' && (
                                <>
                                  <div>
                                    <span className="text-gray-400">Donated: </span>
                                    <span className="text-green-400 font-medium">${user.stats.donations}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Artists Supported: </span>
                                    <span className="text-white font-medium">{user.stats.artists}</span>
                                  </div>
                                </>
                              )}
                              {user.role === 'venue_owner' && (
                                <>
                                  <div>
                                    <span className="text-gray-400">Venues: </span>
                                    <span className="text-white font-medium">{user.stats.venues}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Shows Hosted: </span>
                                    <span className="text-white font-medium">{user.stats.shows}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {filteredUsers.length === 0 && (
                      <div className="text-center py-12">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400">No users found matching your criteria</p>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </GradientBg>
  )
}