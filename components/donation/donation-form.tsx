'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Send, CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DonationBreakdown } from '@/components/donation/donation-breakdown'
import { DONATION_CONFIG } from '@/lib/constants'
import { manifestClient } from '@/lib/payment/manifest-client'
import { toast } from 'sonner'

interface DonationFormProps {
  artistId: string
  artistName: string
  showId?: string
  onSuccess?: (donationId: string, amount: number) => void
  onCancel?: () => void
}

export function DonationForm({
  artistId,
  artistName,
  showId,
  onSuccess,
  onCancel
}: DonationFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  // Get donation amount options from constants
  const donationAmounts = DONATION_CONFIG.defaultAmounts
  
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and decimal points
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value)
      setSelectedAmount(null)
    }
  }
  
  const getAmount = (): number => {
    if (selectedAmount) return selectedAmount
    if (customAmount) return parseFloat(customAmount)
    return 0
  }
  
  const isValidAmount = (): boolean => {
    const amount = getAmount()
    return amount >= DONATION_CONFIG.minAmount && amount <= DONATION_CONFIG.maxAmount
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValidAmount()) {
      toast.error(`Please enter an amount between $${DONATION_CONFIG.minAmount} and $${DONATION_CONFIG.maxAmount}`)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // In a real implementation, this would create a payment intent with Manifest
      // and then use their SDK to collect payment details
      const amount = getAmount()
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate successful payment
      console.log('Donation submitted:', {
        artistId,
        showId,
        amount,
        message,
        isAnonymous
      })
      
      // Show success state
      setIsSuccess(true)
      
      // Call success callback
      if (onSuccess) {
        onSuccess('simulated-donation-id', amount)
      }
    } catch (error) {
      console.error('Error processing donation:', error)
      toast.error('There was an error processing your donation. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleReset = () => {
    setSelectedAmount(null)
    setCustomAmount('')
    setMessage('')
    setIsAnonymous(false)
    setIsSuccess(false)
  }
  
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-300 mb-6">
          Your support means the world to {artistName}. 
          {showId ? " They'll feel the love during their performance!" : ""}
        </p>
        
        <div className="flex gap-3 justify-center">
          <Button 
            onClick={handleReset}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Heart className="w-4 h-4 mr-2" />
            Support Again
          </Button>
          
          {onCancel && (
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
              onClick={onCancel}
            >
              Close
            </Button>
          )}
        </div>
      </motion.div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Selection */}
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-3">
            Choose Amount
          </label>
          <div className="grid grid-cols-3 gap-3">
            {donationAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handleAmountSelect(amount)}
                className={`p-4 rounded-lg border ${
                  selectedAmount === amount 
                    ? 'border-purple-400 bg-purple-500/20 text-white font-medium' 
                    : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-purple-400/50 transition-all text-white font-medium'
                }`}
              >
                ${amount}
              </button>
            ))}
            <div className="p-1 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 hover:border-purple-400/50 transition-all">
              <input
                type="text"
                placeholder="Custom"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="w-full h-full bg-transparent text-white text-center focus:outline-none"
              />
            </div>
          </div>
        </div>
        
        {/* Donation Breakdown */}
        {isValidAmount() && (
          <DonationBreakdown amount={getAmount()} />
        )}
        
        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            Message (Optional)
          </label>
          <textarea
            placeholder="Leave a message for the artist..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 resize-none"
            rows={3}
          />
        </div>
        
        {/* Anonymous Option */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
          />
          <label htmlFor="anonymous" className="text-sm text-purple-200">
            Make this donation anonymous
          </label>
        </div>
        
        {/* Submit Button */}
        <div className="flex gap-3">
          <Button 
            type="submit"
            disabled={!isValidAmount() || isSubmitting}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-6"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Processing...
              </div>
            ) : (
              <>
                <Heart className="w-5 h-5 mr-2" />
                Send Support
              </>
            )}
          </Button>
          
          {onCancel && (
            <Button 
              type="button"
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        {/* Security Note */}
        <p className="text-xs text-gray-400 text-center">
          Secure payment processing. Your information is protected.
        </p>
      </form>
    </motion.div>
  )
}