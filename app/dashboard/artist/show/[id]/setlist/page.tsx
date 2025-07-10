'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Music, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/demo-client'
import { GradientBg } from '@/components/ui/gradient-bg'
import { Button } from '@/components/ui/button'
import { SetlistManager } from '@/components/setlist/setlist-manager'
import { toast } from 'sonner'

export default function ShowSetlistPage() {
  const params = useParams()
  const router = useRouter()
  const showId = params.id as string
  const supabase = createClient()
  
  const [show, setShow] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [artistId, setArtistId] = useState<string | null>(null)
  
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setArtistId(user.id)
        loadShowDetails(showId)
      }
    }
    
    getCurrentUser()
  }, [showId])
  
  const loadShowDetails = async (id: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('shows')
        .select(`
          *,
          setlist_id
        `)
        .eq('id', id)
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
  
  const handleSetlistSaved = (setlistId: string) => {
    toast.success('Setlist saved successfully')
    router.push(`/dashboard/artist/show/${showId}`)
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
            <p className="text-gray-300 mb-6">The show you're looking for doesn't exist or you don't have permission to view it.</p>
            <Link href="/dashboard/artist">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
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
            href={`/dashboard/artist/show/${showId}`}
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Show
          </Link>
        </motion.div>
        
        <SetlistManager
          artistId={artistId || ''}
          setlistId={show.setlist_id}
          showId={showId}
          onSave={handleSetlistSaved}
          onCancel={() => router.push(`/dashboard/artist/show/${showId}`)}
        />
      </div>
    </GradientBg>
  )
}