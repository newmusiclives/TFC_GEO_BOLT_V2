'use client'

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music, Plus, Trash2, Save, Copy, Edit, X, GripVertical, Clock, User, FileMusic, Upload, Download } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { SetlistImport } from '@/components/setlist/setlist-import'
import { toast } from 'sonner'
import type { SetlistSong } from '@/lib/types'

interface SetlistManagerProps {
  artistId: string
  setlistId?: string
  showId?: string
  isTemplate?: boolean
  onSave?: (setlistId: string) => void
  onCancel?: () => void
}

export function SetlistManager({
  artistId,
  setlistId,
  showId,
  isTemplate = false,
  onSave,
  onCancel
}: SetlistManagerProps) {
  const supabase = createClient()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [songs, setSongs] = useState<SetlistSong[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [showImport, setShowImport] = useState(false)
  
  // Form state for adding/editing songs
  const [songTitle, setSongTitle] = useState('')
  const [songArtist, setSongArtist] = useState('')
  const [songDuration, setSongDuration] = useState('')
  const [isCover, setIsCover] = useState(false)
  
  // Load existing setlist if setlistId is provided
  useEffect(() => {
    if (setlistId) {
      loadSetlist(setlistId)
    }
  }, [setlistId])
  
  const loadSetlist = async (id: string) => {
    setIsLoading(true)
    
    try {
      // For demo mode, create mock setlist
      if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
        if (id === '11111111-aaaa-1111-aaaa-111111111111') {
          setTitle('Acoustic Evening 2025')
          setDescription('My standard acoustic set with a mix of originals and covers')
          
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
        } else if (id === '22222222-bbbb-2222-bbbb-222222222222') {
          setTitle('Summer Tour 2025')
          setDescription('Upbeat set for outdoor venues and festivals')
          
          const mockSongs: SetlistSong[] = [
            { id: '11', title: 'Summer Breeze', artist: undefined, isCover: false, duration: '3:45' },
            { id: '12', title: 'California Dreamin\'', artist: 'The Mamas & the Papas', isCover: true, duration: '2:40' },
            { id: '13', title: 'Sunshine Day', artist: undefined, isCover: false, duration: '4:10' },
            { id: '14', title: 'Walking on Sunshine', artist: 'Katrina & The Waves', isCover: true, duration: '3:55' }
          ]
          
          setSongs(mockSongs)
        } else {
          // New setlist
          setTitle('')
          setDescription('')
          setSongs([])
        }
      } else {
        // Fetch setlist details
        const { data: setlist, error: setlistError } = await supabase
          .from('setlists')
          .select('*')
          .eq('id', id)
          .single()
        
        if (setlistError) throw setlistError
        
        setTitle(setlist.title)
        setDescription(setlist.description || '')
        
        // Fetch setlist songs
        const { data: songsData, error: songsError } = await supabase
          .from('setlist_songs')
          .select('*')
          .eq('setlist_id', id)
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
      console.error('Error loading setlist:', error)
      toast.error('Failed to load setlist')
    } finally {
      setIsLoading(false)
    }
  }
  
  const resetSongForm = () => {
    setSongTitle('')
    setSongArtist('')
    setSongDuration('')
    setIsCover(false)
    setEditingIndex(null)
  }
  
  const handleAddSong = () => {
    if (!songTitle.trim()) {
      toast.error('Song title is required')
      return
    }
    
    const newSong: SetlistSong = {
      id: `temp-${Date.now()}`,
      title: songTitle.trim(),
      artist: songArtist.trim() || undefined,
      isCover: isCover,
      duration: songDuration.trim() || undefined
    }
    
    if (editingIndex !== null) {
      // Update existing song
      const updatedSongs = [...songs]
      updatedSongs[editingIndex] = newSong
      setSongs(updatedSongs)
    } else {
      // Add new song
      setSongs([...songs, newSong])
    }
    
    resetSongForm()
  }
  
  const handleEditSong = (index: number) => {
    const song = songs[index]
    setSongTitle(song.title)
    setSongArtist(song.artist || '')
    setSongDuration(song.duration || '')
    setIsCover(song.isCover)
    setEditingIndex(index)
  }
  
  const handleRemoveSong = (index: number) => {
    const updatedSongs = [...songs]
    updatedSongs.splice(index, 1)
    setSongs(updatedSongs)
  }
  
  const handleMoveSong = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= songs.length) return
    
    const updatedSongs = [...songs]
    const [movedSong] = updatedSongs.splice(fromIndex, 1)
    updatedSongs.splice(toIndex, 0, movedSong)
    setSongs(updatedSongs)
  }
  
  const handleImportSongs = (importedSongs: SetlistSong[]) => {
    // Add imported songs to the current setlist
    setSongs([...songs, ...importedSongs])
    setShowImport(false)
    toast.success(`Added ${importedSongs.length} songs to setlist`)
  }
  
  const exportSetlist = () => {
    try {
      // Create a JSON representation of the setlist
      const setlistData = {
        title,
        description,
        songs: songs.map(song => ({
          title: song.title,
          artist: song.artist,
          isCover: song.isCover,
          duration: song.duration
        }))
      }
      
      // Convert to JSON string
      const jsonString = JSON.stringify(setlistData, null, 2)
      
      // Create a blob and download link
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      // Create a temporary link and trigger download
      const a = document.createElement('a')
      a.href = url
      a.download = `${title || 'setlist'}.json`.replace(/\s+/g, '-').toLowerCase()
      document.body.appendChild(a)
      a.click()
      
      // Clean up
      URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success('Setlist exported successfully')
    } catch (error) {
      console.error('Error exporting setlist:', error)
      toast.error('Failed to export setlist')
    }
  }
  
  const handleSaveSetlist = async () => {
    if (!title.trim()) {
      toast.error('Setlist title is required')
      return
    }
    
    if (songs.length === 0) {
      toast.error('Add at least one song to the setlist')
      return
    }
    
    setIsSaving(true)
    
    try {
      // For demo mode, just simulate saving
      if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Use a mock ID if we don't have one
        const mockSetlistId = setlistId || '11111111-aaaa-1111-aaaa-111111111111'
        
        toast.success('Setlist saved successfully')
        
        if (onSave) {
          onSave(mockSetlistId)
        }
      } else {
        let savedSetlistId = setlistId
        
        // Create or update setlist
        if (!savedSetlistId) {
          // Create new setlist
          const { data: newSetlist, error: setlistError } = await supabase
            .from('setlists')
            .insert({
              artist_id: artistId,
              title: title.trim(),
              description: description.trim() || null,
              is_template: isTemplate
            })
            .select()
            .single()
          
          if (setlistError) throw setlistError
          savedSetlistId = newSetlist.id
        } else {
          // Update existing setlist
          const { error: setlistError } = await supabase
            .from('setlists')
            .update({
              title: title.trim(),
              description: description.trim() || null,
              is_template: isTemplate,
              updated_at: new Date().toISOString()
            })
            .eq('id', savedSetlistId)
          
          if (setlistError) throw setlistError
        }
        
        // Delete existing songs if updating
        if (savedSetlistId) {
          const { error: deleteError } = await supabase
            .from('setlist_songs')
            .delete()
            .eq('setlist_id', savedSetlistId)
          
          if (deleteError) throw deleteError
        }
        
        // Insert songs
        const songsToInsert = songs.map((song, index) => ({
          setlist_id: savedSetlistId,
          title: song.title,
          artist: song.artist || null,
          is_cover: song.isCover,
          duration: song.duration || null,
          position: index + 1
        }))
        
        const { error: songsError } = await supabase
          .from('setlist_songs')
          .insert(songsToInsert)
        
        if (songsError) throw songsError
        
        // If this is for a show, update the show's setlist_id
        if (showId) {
          const { error: showError } = await supabase
            .from('shows')
            .update({ setlist_id: savedSetlistId })
            .eq('id', showId)
          
          if (showError) throw showError
        }
        
        toast.success('Setlist saved successfully')
        
        if (onSave) {
          onSave(savedSetlistId)
        }
      }
    } catch (error) {
      console.error('Error saving setlist:', error)
      toast.error('Failed to save setlist')
    } finally {
      setIsSaving(false)
    }
  }
  
  // If showing import UI, render the import component
  if (showImport) {
    return (
      <SetlistImport 
        onImport={handleImportSongs}
        onCancel={() => setShowImport(false)}
      />
    )
  }
  
  return (
    <div className="space-y-6">
      <GlassCard variant="elevated">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-400" />
              {setlistId ? 'Edit Setlist' : 'Create New Setlist'}
            </h3>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => setShowImport(true)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              
              {songs.length > 0 && (
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={exportSetlist}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
              
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={onCancel}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={handleSaveSetlist}
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Setlist'}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Setlist Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Summer Tour 2025"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description (Optional)
              </label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Standard setlist for acoustic shows"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is-template"
                checked={isTemplate}
                onChange={(e) => isTemplate = e.target.checked}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="is-template" className="text-sm text-gray-300">
                Save as template (can be reused for multiple shows)
              </label>
            </div>
          </div>
        </div>
      </GlassCard>
      
      <GlassCard variant="elevated">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileMusic className="w-5 h-5 text-purple-400" />
            Songs
          </h3>
          
          <div className="space-y-6">
            {/* Add/Edit Song Form */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="text-md font-medium text-white mb-3">
                {editingIndex !== null ? 'Edit Song' : 'Add Song'}
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Song Title *
                  </label>
                  <Input
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    placeholder="Enter song title"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Artist (for covers)
                  </label>
                  <Input
                    value={songArtist}
                    onChange={(e) => setSongArtist(e.target.value)}
                    placeholder="Original artist for covers"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration (Optional)
                  </label>
                  <Input
                    value={songDuration}
                    onChange={(e) => setSongDuration(e.target.value)}
                    placeholder="e.g., 3:45"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center h-full pt-8 gap-2">
                    <input
                      type="checkbox"
                      id="is-cover"
                      checked={isCover}
                      onChange={(e) => setIsCover(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
                    />
                    <label htmlFor="is-cover" className="text-sm text-gray-300">
                      This is a cover song
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleAddSong}
                >
                  {editingIndex !== null ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Song
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Song
                    </>
                  )}
                </Button>
                
                {editingIndex !== null && (
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={resetSongForm}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
            
            {/* Song List */}
            <div>
              <h4 className="text-md font-medium text-white mb-3">
                Setlist ({songs.length} songs)
              </h4>
              
              {songs.length === 0 ? (
                <div className="text-center py-8 bg-white/5 rounded-lg border border-white/10">
                  <Music className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">No songs added yet</p>
                  <p className="text-sm text-gray-500">Add songs to your setlist above</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {songs.map((song, index) => (
                    <motion.div
                      key={song.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-gray-400">
                        <GripVertical className="w-4 h-4 cursor-move" />
                        <span className="text-sm">{index + 1}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-white">{song.title}</h5>
                          {song.isCover && (
                            <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                              Cover
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          {song.artist && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{song.artist}</span>
                            </div>
                          )}
                          {song.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{song.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                          onClick={() => handleEditSong(index)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
                          onClick={() => handleRemoveSong(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}