'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Music, ArrowLeft, Heart } from 'lucide-react'
import { createClient } from '@/lib/supabase/demo-client'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { SongRequestForm } from '@/components/setlist/song-request-form'
import { DollarSign } from 'lucide-react'
import { toast } from 'sonner'

export default function ShowSongRequestPage() {
  const params = useParams()
  const router = useRouter()
  const showId = params.id as string
  const supabase = createClient()
  
  const [show, setShow] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [requestPrice, setRequestPrice] = useState(5) // Default minimum price
  
  useEffect(() => {
    // Always enable demo mode for song requests
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo_mode', 'true');
    }
    // Attach a demo setlist to show-1
    if (typeof window !== 'undefined' && (showId === 'show-1' || localStorage.getItem('demo_mode') === 'true')) {
      const mockShow = {
        id: showId,
        title: 'Acoustic Evening with Luna Rodriguez',
        status: 'upcoming',
        start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        artist: {
          id: '11111111-1111-1111-1111-111111111111',
          name: 'Luna Rodriguez',
          request_price: 5,
          slug: 'luna-rodriguez',
          avatar_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
          is_verified: true
        },
        venue: {
          name: 'The Blue Note',
          city: 'New York',
          state: 'NY'
        },
        setlist: {
          id: '11111111-aaaa-1111-aaaa-111111111111',
          title: 'Acoustic Evening 2025',
          description: 'My standard acoustic set with a mix of originals and covers',
          setlist_songs: [
            { id: '1', title: 'Midnight Whispers', artist: null, is_cover: false, duration: '4:15', position: 1 },
            { id: '2', title: 'Landslide', artist: 'Fleetwood Mac', is_cover: true, duration: '3:20', position: 2 },
            { id: '3', title: 'Ocean Memories', artist: null, is_cover: false, duration: '3:45', position: 3 },
            { id: '4', title: 'Fast Car', artist: 'Tracy Chapman', is_cover: true, duration: '4:55', position: 4 },
            { id: '5', title: 'Hallelujah', artist: 'Leonard Cohen', is_cover: true, duration: '5:30', position: 5 },
            { id: '6', title: 'City Lights Fading', artist: null, is_cover: false, duration: '5:10', position: 6 },
            { id: '7', title: 'Skinny Love', artist: 'Bon Iver', is_cover: true, duration: '3:55', position: 7 },
            { id: '8', title: 'Both Sides Now', artist: 'Joni Mitchell', is_cover: true, duration: '4:05', position: 8 },
            { id: '9', title: 'Jolene', artist: 'Dolly Parton', is_cover: true, duration: '3:40', position: 9 },
            { id: '10', title: 'Whispers in the Wind', artist: null, is_cover: false, duration: '4:30', position: 10 }
          ]
        }
      }
      setShow(mockShow)
      setIsLoading(false)
      setRequestPrice(mockShow.artist.request_price || 5)
      return
    }
    loadShowDetails()
  }, [showId])
  
  const loadShowDetails = async () => {
    setIsLoading(true)
    
    try {
      // Regular database query for production
      const { data, error } = await supabase
        .from('shows')
        .select(`
          id,
          title,
          status,
          start_time,
          artist:artists(id, name, slug, avatar_url, is_verified, request_price),
          venue:venues(name, city, state),
          setlist:setlists(id, title)
        `)
        .eq('id', showId)
        .single()
      
      if (error) throw error
      
      setShow(data)
      setRequestPrice(data.artist?.request_price || 5)
    } catch (error) {
      console.error('Error loading show details:', error)
      toast.error('Failed to load show details')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleRequestSubmitted = () => {
    toast.success('Your song request has been submitted!')
    // Optionally redirect back to show page after a delay
    setTimeout(() => {
      router.push(`/show/${showId}`)
    }, 2000)
  }
  
  if (isLoading) {
    return (
      <GradientBg variant="primary">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading show details...</p>
          </div>
        </div>
      </GradientBg>
    )
  }

  if (!show) {
    return (
      <GradientBg variant="primary">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Show Not Found</h2>
            <p className="text-gray-300 mb-6">The show you're looking for doesn't exist or is unavailable. Please check the link or try again later.</p>
            <Link href="/discover">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Discover Shows
              </Button>
            </Link>
          </div>
        </div>
      </GradientBg>
    )
  }

  if (!show.setlist) {
    return (
      <GradientBg variant="primary">
        <div className="container mx-auto px-4 py-8">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link 
              href={`/show/${showId}`}
              className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Show
            </Link>
          </motion.div>
          <GlassCard variant="elevated">
            <div className="p-6 text-center">
              <Music className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">No Setlist Available</h2>
              <p className="text-gray-300 mb-6">
                {show.artist?.name || 'The artist'} hasn't uploaded a setlist for this show yet. Song requests are unavailable.
              </p>
              <Link href={`/show/${showId}`}>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Support Artist
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </GradientBg>
    )
  }
  
  return (
    <GradientBg variant="primary">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href={`/show/${showId}`}
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Show
          </Link>
        </motion.div>
        
        {/* Show Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard variant="elevated">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-white mb-2">{show.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div className="font-medium text-purple-300">
                  {show.artist.name}
                </div>
                <div>
                  {show.venue.name}, {show.venue.city}
                </div>
                <div>
                  {new Date(show.start_time).toLocaleDateString()}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
        
        {/* Share Setlist Link Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard variant="elevated">
            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Share this Setlist with Fans</h3>
                <p className="text-gray-300 text-sm">Share this link so fans can request songs for your show.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:items-center w-full md:w-auto">
                <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-gray-300 overflow-x-auto max-w-full md:max-w-xs select-all" id="share-link">
                  {typeof window !== 'undefined' ? window.location.href : ''}
                </div>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      navigator.clipboard.writeText(window.location.href)
                      toast.success('Link copied to clipboard!')
                    }
                  }}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
        {/* Song Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SongRequestForm 
            showId={showId} 
            artistName={show.artist.name}
            requestPrice={requestPrice}
            onRequestSubmitted={handleRequestSubmitted}
          />
        </motion.div>
        
        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}  
          className="mt-8"
        >
          <GlassCard variant="minimal">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">About Song Requests</h3>
              
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    Support with Donations
                  </h4>
                  <p className="text-gray-300">
                    Each song request includes a donation to support the artist. Minimum donation is ${requestPrice}.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Artist Approval</h4>
                  <p className="text-gray-300">
                    The artist will see your request and can choose to play it during their performance.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Support the Artist</h4>
                  <p className="text-gray-300">
                    Consider making a donation to show your appreciation for the artist's music.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}