'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Search, Building, Users, Calendar, Settings } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function VenueManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock venue data
  const venues = [
    {
      id: '1',
      name: 'The Blue Note',
      address: '131 W 3rd St, New York, NY',
      type: 'music_venue',
      capacity: 200,
      status: 'active',
      owner: 'Blue Note Manager',
      totalShows: 45,
      monthlyShows: 8,
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
      geofenceStatus: 'configured'
    },
    {
      id: '2',
      name: 'Underground Hall',
      address: '456 Brooklyn Ave, Brooklyn, NY',
      type: 'club',
      capacity: 350,
      status: 'active',
      owner: 'Underground Events LLC',
      totalShows: 32,
      monthlyShows: 6,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
      geofenceStatus: 'configured'
    },
    {
      id: '3',
      name: 'Electric Garden',
      address: '789 Dance Floor St, Manhattan, NY',
      type: 'club',
      capacity: 500,
      status: 'pending',
      owner: 'Electric Entertainment',
      totalShows: 12,
      monthlyShows: 3,
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
      geofenceStatus: 'pending'
    },
    {
      id: '4',
      name: 'Central Park Bandshell',
      address: 'Central Park, New York, NY',
      type: 'outdoor',
      capacity: 1000,
      status: 'active',
      owner: 'NYC Parks Department',
      totalShows: 28,
      monthlyShows: 4,
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
      geofenceStatus: 'configured'
    }
  ]

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venue.address.toLowerCase().includes(searchQuery.toLowerCase())
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
                <h1 className="text-3xl font-bold text-white mb-2">Venue Management</h1>
                <p className="text-gray-300">Manage venues and geofencing settings</p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Add Venue
                </Button>
                <Link href="/admin/dashboard">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search venues by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
          </motion.div>

          {/* Venues Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <GlassCard variant="elevated" className="overflow-hidden hover:bg-white/15 transition-all">
                  {/* Venue Image */}
                  <div className="relative -m-6 mb-4">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge
                        className={`${
                          venue.status === 'active' ? 'bg-green-500/20 text-green-300' :
                          venue.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {venue.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{venue.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{venue.address}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Venue Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Type:</span>
                        <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                          {venue.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Capacity:</span>
                        <span className="text-white font-medium">{venue.capacity} people</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Owner:</span>
                        <span className="text-white">{venue.owner}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Geofence:</span>
                        <Badge
                          className={`${
                            venue.geofenceStatus === 'configured' ? 'bg-green-500/20 text-green-300' :
                            venue.geofenceStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }`}
                        >
                          {venue.geofenceStatus}
                        </Badge>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{venue.totalShows}</div>
                        <div className="text-xs text-gray-400">Total Shows</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">{venue.monthlyShows}</div>
                        <div className="text-xs text-gray-400">This Month</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                        Manage
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {filteredVenues.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No venues found matching your search</p>
            </motion.div>
          )}
        </div>
      </div>
    </GradientBg>
  )
}