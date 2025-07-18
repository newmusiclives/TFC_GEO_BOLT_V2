'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Plus, FileText, Copy, Trash2, Calendar, ArrowRight, Edit } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SetlistManager } from '@/components/setlist/setlist-manager'
import { toast } from 'sonner'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'

export default function ArtistSetlistsPage() {
  const supabase = createClient()
  const [setlists, setSetlists] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [editingSetlistId, setEditingSetlistId] = useState<string | null>(null)
  const [editSetlist, setEditSetlist] = useState<any>(null)
  const [savingSetlist, setSavingSetlist] = useState(false)

  useEffect(() => {
    async function fetchSetlists() {
      setIsLoading(true)
      setError(null)
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) throw new Error('User not found')

        // Fetch setlists for the artist
        const { data: setlistData, error: setlistError } = await supabase
          .from('setlists')
          .select('*')
          .eq('artist_id', user.id)
          .order('created_at', { ascending: false })
        if (setlistError) throw setlistError
        setSetlists(setlistData || [])
      } catch (err: any) {
        setError(err.message || 'Failed to load setlists')
      } finally {
        setIsLoading(false)
      }
    }
    fetchSetlists()
  }, [])

  const handleEditSetlist = (setlist: any) => {
    setEditSetlist(setlist)
    setIsCreating(true)
  }

  const handleSetlistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditSetlist({ ...editSetlist, [e.target.name]: e.target.value })
  }

  const handleSetlistSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingSetlist(true)
    setError(null)
    try {
      const { error: updateError } = await supabase
        .from('setlists')
        .update(editSetlist)
        .eq('id', editSetlist.id)
      if (updateError) throw updateError
      setIsCreating(false)
      setEditSetlist(null)
      // Refresh setlists
      const { data: setlistData } = await supabase
        .from('setlists')
        .select('*')
        .eq('artist_id', editSetlist.artist_id)
        .order('created_at', { ascending: false })
      setSetlists(setlistData || [])
      toast.success('Setlist updated!')
    } catch (err: any) {
      setError(err.message || 'Failed to update setlist')
    } finally {
      setSavingSetlist(false)
    }
  }

  if (isLoading) return <div>Loading setlists...</div>
  if (error) return <div className="text-red-500">{error}</div>

  const handleDeleteSetlist = async (setlistId: string) => {
    setSetlists(setlists.filter(setlist => setlist.id !== setlistId))
    toast.success('Setlist deleted successfully')
  }

  const handleDuplicateSetlist = async (setlistId: string) => {
    const originalSetlist = setlists.find(s => s.id === setlistId)
    if (!originalSetlist) return
    const newSetlist = {
      ...originalSetlist,
      id: Math.random().toString(36).slice(2),
      title: `${originalSetlist.title} (Copy)`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setSetlists([newSetlist, ...setlists])
    toast.success('Setlist duplicated successfully')
  }

  const handleSetlistSaved = () => {
    setIsCreating(false)
    setEditingSetlistId(null)
    // Re-fetch setlists after saving
    async function fetchSetlists() {
      setIsLoading(true)
      setError(null)
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) throw new Error('User not found')

        // Fetch setlists for the artist
        const { data: setlistData, error: setlistError } = await supabase
          .from('setlists')
          .select('*')
          .eq('artist_id', user.id)
          .order('created_at', { ascending: false })
        if (setlistError) throw setlistError
        setSetlists(setlistData || [])
      } catch (err: any) {
        setError(err.message || 'Failed to load setlists')
      } finally {
        setIsLoading(false)
      }
    }
    fetchSetlists()
  }

  if (isCreating || editingSetlistId) {
    return (
      <GradientBg variant="primary">
        <div className="container mx-auto px-4 py-8">
          <SetlistManager
            artistId={''} // This will need to be passed from the parent or fetched
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