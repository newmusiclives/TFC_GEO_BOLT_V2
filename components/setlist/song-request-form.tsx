'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music, Heart, Send, DollarSign, User as UserIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { DonationBreakdown } from '@/components/donation/donation-breakdown'
import { toast } from 'sonner'
import type { SetlistSong } from '@/lib/types'

interface SongRequestFormProps {
  showId: string
  artistName: string
  requestPrice?: number
  onRequestSubmitted?: () => void
}

export function SongRequestForm({
  showId,
  artistName,
  requestPrice = 5, // Default minimum price
  onRequestSubmitted
}: SongRequestFormProps) {
  const supabase = createClient()
  const [songs, setSongs] = useState<SetlistSong[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null)
  const [fanName, setFanName] = useState('')
  const [dedication, setDedication] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [donationAmount, setDonationAmount] = useState<number>(requestPrice)
  const [customAmount, setCustomAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [songRequestCounts, setSongRequestCounts] = useState<Record<string, number>>({})
  
  useEffect(() => {
    loadSetlistSongs()
    loadSongRequestCounts()
    
    // Try to get user's name from local storage or auth
    const getUserName = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.user_metadata?.display_name) {
          setFanName(user.user_metadata.display_name)
        }
      } catch (error) {
        console.log('Not logged in or no display name')
      }
    }
    
    getUserName()
  }, [showId])
  
  const loadSetlistSongs = async () => {
    setIsLoading(true)
    try {
      // For demo mode, create mock setlist songs
      if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
        const mockSongs: SetlistSong[] = [
          { id: '1', title: 'Midnight Whispers', artist: undefined, isCover: false, duration: '4:15' },
          { id: '2', title: 'Landslide', artist: 'Fleetwood Mac', isCover: true, duration: '3:20' },
          { id: '3', title: 'Ocean Memories', artist: undefined, isCover: false, duration: '3:45' },
          { id: '4', title: 'Fast Car', artist: 'Tracy Chapman', isCover: true, duration: '4:55' },
          { id: '5', title: 'Hallelujah', artist: 'Leonard Cohen', isCover: true, duration: '5:30' },
          { id: '6', title: 'City Lights Fading', artist: undefined, isCover: false, duration: '5:10' },
          { id: '7', title: 'Skinny Love', artist: 'Bon Iver', isCover: true, duration: '3:55' },
          { id: '8', title: 'Both Sides Now', artist: 'Joni Mitchell', isCover: true, duration: '4:05' },
          { id: '9', title: 'Jolene', artist: 'Dolly Parton', isCover: true, duration: '3:40' },
          { id: '10', title: 'Whispers in the Wind', artist: undefined, isCover: false, duration: '4:30' }
        ]
        
        setSongs(mockSongs)
      } else {
        // First get the setlist_id for this show
        const { data: show, error: showError } = await supabase
          .from('shows')
          .select('setlist_id')
          .eq('id', showId)
          .single()
        
        if (showError) throw showError
        
        if (!show.setlist_id) {
          setIsLoading(false)
          return
        }
        
        // Now get the songs for this setlist
        const { data: songsData, error: songsError } = await supabase
          .from('setlist_songs')
          .select('*')
          .eq('setlist_id', show.setlist_id)
          .order('position', { ascending: true })
        
        if (songsError) throw songsError
        
        // Map to our SetlistSong type
        const formattedSongs: SetlistSong[] = songsData.map(song => ({
          id: song.id,
          title: song.title,
          artist: song.artist || undefined,
          isCover: song.is_cover,
          duration: song.duration || undefined
        }))
        
        setSongs(formattedSongs)
      }
    } catch (error) {
      console.error('Error loading setlist songs:', error)
      toast.error('Failed to load setlist')
    } finally {
      setIsLoading(false)
    }
  }
  
  const loadSongRequestCounts = async () => {
    try {
      // For demo mode, create mock request counts
      if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
        // Mock request counts
        const mockCounts: Record<string, number> = {
          '1': 2, // Midnight Whispers
          '4': 3, // Fast Car
          '5': 5, // Hallelujah
          '9': 1  // Jolene
        };
        
        setSongRequestCounts(mockCounts);
      } else {
        const { data, error } = await supabase.rpc('get_song_request_counts', {
          p_show_id: showId
        })
        
        if (error) throw error
        
        // Convert to record for easy lookup
        const counts: Record<string, number> = {}
        data.forEach((item: { song_id: string, request_count: number }) => {
          counts[item.song_id] = item.request_count
        })
        
        setSongRequestCounts(counts)
      }
    } catch (error) {
      console.error('Error loading song request counts:', error)
    }
  }
  
  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount)
    setCustomAmount('')
  }
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and decimal points
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value)
      if (value) {
        const numValue = parseFloat(value)
        setDonationAmount(numValue)
      } else {
        setDonationAmount(requestPrice)
      }
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedSongId) {
      toast.error('Please select a song')
      return
    }
    
    if (!fanName.trim()) {
      toast.error('Please enter your name')
      return
    }
    
    if (donationAmount < requestPrice) {
      toast.error(`Minimum donation amount is $${requestPrice}`)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // For demo mode, just simulate the request
      if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        // Get current user ID if logged in 
        const { data: { user } } = await supabase.auth.getUser()
        
        // Submit the song request with donation
        const { error } = await supabase
          .from('song_requests')
          .insert({
            show_id: showId,
            song_id: selectedSongId,
            fan_id: user?.id || null,
            fan_name: fanName.trim(),
            dedication: dedication.trim() || null,
            is_anonymous: isAnonymous,
            donation_amount: donationAmount
          })
        
        if (error) throw error
        
        // Process the donation
        const { error: donationError } = await supabase.rpc('process_song_request_donation', {
          p_show_id: showId,
          p_artist_id: null, // Will be looked up by the function
          p_donor_id: user?.id || null,
          p_amount: donationAmount,
          p_donor_name: fanName.trim(),
          p_donor_message: dedication.trim() || `Song request: ${songs.find(s => s.id === selectedSongId)?.title}`,
          p_is_anonymous: isAnonymous
        })
        
        if (donationError) throw donationError
      }
      
      toast.success(`Song request submitted with $${donationAmount.toFixed(2)} donation!`)
      
      // Reset form
      setSelectedSongId(null)
      setDedication('')
      setIsAnonymous(false)
      setDonationAmount(requestPrice)
      setCustomAmount('')
      
      // Update request counts
      loadSongRequestCounts()
      
      // Callback
      if (onRequestSubmitted) {
        onRequestSubmitted()
      }
    } catch (error) {
      console.error('Error submitting song request:', error)
      toast.error('Failed to submit song request')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isLoading) {
    return (
      <GlassCard variant="elevated">
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading setlist...</p>
        </div>
      </GlassCard>
    )
  }
  
  if (songs.length === 0) {
    return (
      <GlassCard variant="elevated">
        <div className="p-6 text-center">
          <Music className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Setlist Available</h3>
          <p className="text-gray-300">
            {artistName} hasn't uploaded a setlist for this show yet.
          </p>
        </div>
      </GlassCard>
    )
  }
  
  return (
    <GlassCard variant="elevated">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Music className="w-5 h-5 text-purple-400" />
          Request a Song
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select a Song
            </label>
            <div className="grid gap-2">
              {songs.map((song) => (
                <motion.div
                  key={song.id}
                  whileHover={{ scale: 1.01 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSongId === song.id
                      ? 'bg-purple-500/20 border-purple-400 text-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedSongId(song.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">{song.title}</div>
                      {song.isCover && song.artist && (
                        <div className="text-xs text-gray-400">
                          Originally by {song.artist}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {songRequestCounts[song.id] && (
                        <Badge className="bg-purple-500/20 text-purple-300">
                          {songRequestCounts[song.id]} {songRequestCounts[song.id] === 1 ? 'request' : 'requests'}
                        </Badge>
                      )}
                      {song.duration && (
                        <Badge variant="outline" className="border-white/20 text-gray-300">
                          {song.duration}
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={fanName}
                onChange={(e) => setFanName(e.target.value)}
                placeholder="Enter your name"
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              Donation Amount (Minimum ${requestPrice})
            </label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[requestPrice, requestPrice * 2, requestPrice * 5].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`p-4 rounded-lg border ${
                    donationAmount === amount && !customAmount
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
            
            {donationAmount >= requestPrice && (
              <div className="mb-4">
                <DonationBreakdown amount={donationAmount} />
              </div>
            )}
            
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Dedication or Message (Optional)
            </label>
            <textarea
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              placeholder="Add a special message or dedication..."
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 resize-none"
              rows={3}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-300">
              Make this request anonymous
            </label>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            disabled={isSubmitting || !selectedSongId}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Submitting...
              </div>
            ) : (
              <>
                <Heart className="w-5 h-5 mr-2" />
                Request Song
              </>
            )}
            <div className="text-xs text-gray-400 mt-2 text-center">
              Includes ${donationAmount.toFixed(2)} donation to {artistName}
            </div>
          </Button>
        </form>
      </div>
    </GlassCard>
  )
}