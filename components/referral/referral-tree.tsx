'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Music, Building, User, DollarSign, Calendar } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface ReferralEntity {
  id: string
  name: string
  displayName?: string
  role?: string
  slug?: string
  avatar?: string
  createdAt: string
  totalEarningsGenerated: number
}

interface ReferralTreeProps {
  directReferrals: ReferralEntity[]
  artistsReferred: ReferralEntity[]
  venuesReferred: ReferralEntity[]
}

export function ReferralTree({
  directReferrals = [],
  artistsReferred = [],
  venuesReferred = []
}: ReferralTreeProps) {
  return (
    <div className="space-y-6">
      <GlassCard variant="elevated">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Your Referral Network
          </h3>
          
          {/* Direct Referrals */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-white mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              Direct Referrals ({directReferrals.length})
            </h4>
            
            {directReferrals.length > 0 ? (
              <div className="grid gap-3">
                {directReferrals.map((referral, index) => (
                  <motion.div
                    key={referral.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={referral.avatar} />
                        <AvatarFallback className="bg-purple-500 text-white">
                          {referral.displayName?.charAt(0) || referral.name?.charAt(0) || '?'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white">{referral.displayName || referral.name}</p>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${referral.role === 'artist' ? 'border-purple-400/30 text-purple-300' : 
                                referral.role === 'venue_owner' ? 'border-blue-400/30 text-blue-300' : 
                                'border-green-400/30 text-green-300'}
                            `}
                          >
                            {referral.role === 'artist' ? 'Artist' : 
                             referral.role === 'venue_owner' ? 'Venue' : 'Fan'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>Joined {new Date(referral.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-green-400">${referral.totalEarningsGenerated.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">earnings generated</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400 bg-white/5 rounded-lg">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No direct referrals yet</p>
              </div>
            )}
          </div>
          
          {/* Artists Referred */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-white mb-3 flex items-center gap-2">
              <Music className="w-4 h-4 text-purple-400" />
              Artists Referred ({artistsReferred.length})
            </h4>
            
            {artistsReferred.length > 0 ? (
              <div className="grid gap-3">
                {artistsReferred.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={artist.avatar} />
                        <AvatarFallback className="bg-purple-500 text-white">
                          {artist.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <p className="font-medium text-white">{artist.name}</p>
                        <p className="text-xs text-gray-400">@{artist.slug}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-green-400">${artist.totalEarningsGenerated.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">earnings generated</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400 bg-white/5 rounded-lg">
                <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No artists referred yet</p>
              </div>
            )}
          </div>
          
          {/* Venues Referred */}
          <div>
            <h4 className="text-md font-medium text-white mb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-400" />
              Venues Referred ({venuesReferred.length})
            </h4>
            
            {venuesReferred.length > 0 ? (
              <div className="grid gap-3">
                {venuesReferred.map((venue, index) => (
                  <motion.div
                    key={venue.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-white">{venue.name}</p>
                      <p className="text-xs text-gray-400">{venue.slug}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-green-400">${venue.totalEarningsGenerated.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">earnings generated</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400 bg-white/5 rounded-lg">
                <Building className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No venues referred yet</p>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
      
      {/* Referral Earnings Explanation */}
      <GlassCard variant="minimal">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            How Referral Earnings Work
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Music className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Artist Referrals</p>
                <p className="text-sm text-gray-300">
                  When you refer an artist, you earn 2.5% of all donations they receive through our platform.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Tier 2 Referrals</p>
                <p className="text-sm text-gray-300">
                  You also earn 2.5% from donations to artists who were referred by people you referred.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="font-medium text-white mb-1">Lifetime Earnings</p>
                <p className="text-sm text-gray-300">
                  Your referral connection never expires - you'll continue to earn as long as your referred 
                  artists receive donations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}