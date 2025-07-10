'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Heart, Zap, Users } from 'lucide-react'
import { manifestClient } from '@/lib/payment/manifest-client'
import { DONATION_CONFIG } from '@/lib/constants'

interface DonationBreakdownProps {
  amount: number
  showDetails?: boolean
  className?: string
}

export function DonationBreakdown({ 
  amount, 
  showDetails = true,
  className = ''
}: DonationBreakdownProps) {
  // Calculate donation breakdown
  const breakdown = manifestClient.calculateDonationBreakdown(amount)
  
  // Calculate what the fan actually pays (donation + processing fee)
  const processingFeePercent = amount * DONATION_CONFIG.processingFeeRate
  const processingFeeFixed = DONATION_CONFIG.processingFeeCents
  const processingFee = processingFeePercent + processingFeeFixed
  const fanPayment = amount + processingFee
  
  return (
    <div className={`text-sm ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300">You Pay</span>
        <span className="font-medium text-white">${fanPayment.toFixed(2)}</span>
      </div>
      
      {showDetails && (
        <>
          <div className="space-y-1 mb-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Donation Amount</span>
              <span className="text-gray-400">${breakdown.gross.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-blue-400" />
                Processing Fee ({(DONATION_CONFIG.processingFeeRate * 100).toFixed(1)}% + ${DONATION_CONFIG.processingFeeCents.toFixed(2)})
              </span>
              <span className="text-gray-400">+${processingFee.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-2 mb-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Donation Breakdown</span>
              <span className="font-medium text-white">${breakdown.gross.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="space-y-1 mb-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-purple-400" />
                Platform Fee ({(DONATION_CONFIG.platformFeeRate * 100).toFixed(1)}%)
              </span>
              <span className="text-gray-400">-${breakdown.platformFee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-green-400" />
                Referral Fees ({(DONATION_CONFIG.referralFeeRate * 100).toFixed(1)}%)
              </span>
              <span className="text-gray-400">-${breakdown.referralFee.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-400" />
                Artist Receives
              </span>
              <span className="font-bold text-green-400">${breakdown.artistNet.toFixed(2)} (80%)</span>
            </div>
          </div>
        </>
      )}
      
      {!showDetails && (
        <div className="flex justify-between items-center">
          <span className="text-gray-300 flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-400" />
            Artist Receives
          </span>
          <span className="font-bold text-green-400">${breakdown.artistNet.toFixed(2)}</span>
        </div>
      )}
    </div>
  )
}

export function AnimatedDonationBreakdown({ 
  amount, 
  showDetails = true 
}: DonationBreakdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <DonationBreakdown amount={amount} showDetails={showDetails} />
    </motion.div>
  )
}