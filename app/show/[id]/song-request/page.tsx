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
import { toast } from 'sonner'

export default function ShowSongRequestPage() {
  const params = useParams()
  const router = useRouter()
  const showId = params.id as string
  const supabase = createClient()
  
  const [show, setShow] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    loadShowDetails()
  }, [showId])
  
  const loadShowDetails = async () => {
    setIsLoading(true)
    
    // For demo mode, always create mock show data to ensure it works
    if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
      console.log('Creating mock show data for song request page, ID:', showId)
      const mockShow = {
        id: showId,
        title: 'Acoustic Evening with Luna Rodriguez',
        status: 'upcoming',
        start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        artist: {
          id: '11111111-1111-1111-1111-111111111111',
          name: 'Luna Rodriguez',
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
          title: 'Acoustic Evening 2025'
        }
      }
      
      setShow(mockShow)
      setIsLoading(false)
      return
    }
    
    try {
      // Regular database query for production
      const { data, error } = await supabase
        .from('shows')
        .select(`
          *,
          artist:artists(id, name, slug, avatar_url, is_verified),
          venue:venues(name, city, state),
          setlist:setlists(id, title)
        `)
        .eq('id', showId)
        .single()
      
      if (error) throw error
      
      setShow(data)
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
            <p className="text-gray-300 mb-6">The show you're looking for doesn't exist.</p>
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
  
  // Check if the show has a setlist
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
              <h2 className="text-2xl font-bold text-white mb-4">{show.title}</h2>
              <p className="text-gray-300 mb-6">
                {show.artist.name} hasn't uploaded a setlist for this show yet.
                Song requests are unavailable.
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
        
        {/* Song Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SongRequestForm 
            showId={showId} 
            artistName={show.artist.name}
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
                  <h4 className="font-medium text-white mb-2">How It Works</h4>
                  <p className="text-gray-300">
                    Select a song from the artist's setlist and add an optional dedication or message.
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