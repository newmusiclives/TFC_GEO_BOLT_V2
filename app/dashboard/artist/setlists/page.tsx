'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Music, Plus, FileText, Copy, Trash2, Calendar, ArrowRight, Edit } from 'lucide-react'
import { createClient } from '@/lib/supabase/demo-client'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SetlistManager } from '@/components/setlist/setlist-manager'
import { toast } from 'sonner'
import Link from 'next/link'

export default function ArtistSetlistsPage() {
  const supabase = createClient()
  const [setlists, setSetlists] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isCreating, setIsCreating] = React.useState(false)
  const [editingSetlistId, setEditingSetlistId] = React.useState<string | null>(null)
  const [artistId, setArtistId] = React.useState<string | null>(null)
  
  React.useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setArtistId(user.id)
          loadSetlists(user.id)
        }
      } catch (error) {
        console.error('Error getting user:', error)
        // For demo mode, create mock setlists
        if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
          createMockSetlists()
        }
      }
    }
    
    getCurrentUser()
  }, [])
  
  const loadSetlists = async (userId: string) => {
    setIsLoading(true)
    
    try {
      // For demo mode, create mock setlists
      if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
        createMockSetlists()
      } else {
        const { data, error } = await supabase
          .from('setlists')
          .select(`
            *,
            setlist_songs:setlist_songs(count)
          `)
          .eq('artist_id', userId)
          .order('updated_at', { ascending: false })
        
        if (error) throw error
        
        setSetlists(data || [])
      }
    } catch (error) {
      console.error('Error loading setlists:', error)
      toast.error('Failed to load setlists')
    } finally {
      setIsLoading(false)
    }
  }
  
  // Create mock setlists for demo mode
  const createMockSetlists = () => {
    const mockSetlists = [
      {
        id: '11111111-aaaa-1111-aaaa-111111111111',
        artist_id: '11111111-1111-1111-1111-111111111111',
        title: 'Acoustic Evening 2025',
        description: 'My standard acoustic set with a mix of originals and covers',
        is_template: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        setlist_songs: { count: 10 }
      },
      {
        id: '22222222-bbbb-2222-bbbb-222222222222',
        artist_id: '11111111-1111-1111-1111-111111111111',
        title: 'Summer Tour 2025',
        description: 'Upbeat set for outdoor venues and festivals',
        is_template: false,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        setlist_songs: { count: 12 }
      }
    ]
    
    setSetlists(mockSetlists)
    setIsLoading(false)
  }
  
  const handleDeleteSetlist = async (setlistId: string) => {
    if (!confirm('Are you sure you want to delete this setlist?')) {
      return
    }
    
    try {
      const { error } = await supabase
        .from('setlists')
        .delete()
        .eq('id', setlistId)
      
      if (error) throw error
      
      // Update local state
      setSetlists(setlists.filter(setlist => setlist.id !== setlistId))
      toast.success('Setlist deleted successfully')
    } catch (error) {
      console.error('Error deleting setlist:', error)
      toast.error('Failed to delete setlist')
    }
  }
  
  const handleDuplicateSetlist = async (setlistId: string) => {
    try {
      // Get the original setlist
      const { data: originalSetlist, error: setlistError } = await supabase
        .from('setlists')
        .select('*')
        .eq('id', setlistId)
        .single()
      
      if (setlistError) throw setlistError
      
      // Create a new setlist
      const { data: newSetlist, error: createError } = await supabase
        .from('setlists')
        .insert({
          artist_id: originalSetlist.artist_id,
          title: `${originalSetlist.title} (Copy)`,
          description: originalSetlist.description,
          is_template: originalSetlist.is_template
        })
        .select()
        .single()
      
      if (createError) throw createError
      
      // Get the original songs
      const { data: originalSongs, error: songsError } = await supabase
        .from('setlist_songs')
        .select('*')
        .eq('setlist_id', setlistId)
        .order('position', { ascending: true })
      
      if (songsError) throw songsError
      
      // Create new songs with the new setlist ID
      if (originalSongs.length > 0) {
        const newSongs = originalSongs.map((song: any) => ({
          setlist_id: newSetlist.id,
          title: song.title,
          artist: song.artist,
          is_cover: song.is_cover,
          duration: song.duration,
          position: song.position,
          notes: song.notes
        }))
        
        const { error: insertError } = await supabase
          .from('setlist_songs')
          .insert(newSongs)
        
        if (insertError) throw insertError
      }
      
      // Reload setlists
      if (artistId) {
        loadSetlists(artistId)
      }
      
      toast.success('Setlist duplicated successfully')
    } catch (error) {
      console.error('Error duplicating setlist:', error)
      toast.error('Failed to duplicate setlist')
    }
  }
  
  const handleSetlistSaved = () => {
    setIsCreating(false)
    setEditingSetlistId(null)
    if (artistId) {
      loadSetlists(artistId)
    }
  }
  
  if (isCreating || editingSetlistId) {
    return (
      <GradientBg variant="primary">
        <div className="container mx-auto px-4 py-8">
          <SetlistManager
            artistId={artistId || ''}
            setlistId={editingSetlistId || undefined}
            onSave={handleSetlistSaved}
            onCancel={() => {
              setIsCreating(false)
              setEditingSetlistId(null)
            }}
          />
        </div>
      </GradientBg>
    )
  }
  
  return (
    <GradientBg variant="primary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Setlists</h1>
              <p className="text-gray-300">Manage your show setlists and enable fan song requests</p>
            </div>
            <div className="flex gap-3">
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setIsCreating(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Setlist
              </Button>
              <Link href="/dashboard/artist">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Setlists Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading your setlists...</p>
          </div>
        ) : setlists.length === 0 ? (
          <GlassCard variant="elevated">
            <div className="p-12 text-center">
              <Music className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">No Setlists Yet</h2>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Create your first setlist to enable fan song requests during your shows.
              </p>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setIsCreating(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Setlist
              </Button>
            </div>
          </GlassCard>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {setlists.map((setlist) => (
              <motion.div
                key={setlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <GlassCard variant="elevated" className="h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-white">{setlist.title}</h3>
                          {setlist.is_template && (
                            <Badge className="bg-blue-500/20 text-blue-300">
                              Template
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{setlist.setlist_songs.count} songs</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(setlist.updated_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {setlist.description && (
                      <p className="text-gray-300 text-sm mb-4">{setlist.description}</p>
                    )}
                    
                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => setEditingSetlistId(setlist.id)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => handleDuplicateSetlist(setlist.id)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="border-red-400/30 text-red-300 hover:bg-red-500/10"
                        onClick={() => handleDeleteSetlist(setlist.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <GlassCard variant="minimal">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Setlist Tips</h3>
              
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-medium text-white mb-2">Create Templates</h4>
                  <p className="text-gray-300">
                    Save time by creating template setlists that you can reuse for multiple shows.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Enable Fan Requests</h4>
                  <p className="text-gray-300">
                    Assign a setlist to your show to allow fans to request songs and add dedications.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-2">Real-Time Updates</h4>
                  <p className="text-gray-300">
                    During your show, you'll see song requests in real-time on your dashboard.
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