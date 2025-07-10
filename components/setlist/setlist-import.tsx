'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Check, AlertCircle, X, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import type { SetlistSong } from '@/lib/types'

interface SetlistImportProps {
  onImport: (songs: SetlistSong[]) => void
  onCancel: () => void
}

export function SetlistImport({ onImport, onCancel }: SetlistImportProps) {
  const [importText, setImportText] = useState('')
  const [parsedSongs, setParsedSongs] = useState<SetlistSong[]>([])
  const [importError, setImportError] = useState<string | null>(null)
  const [importFormat, setImportFormat] = useState<'csv' | 'json' | 'text'>('text')
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImportText(e.target.value)
    setImportError(null)
    setParsedSongs([])
  }
  
  const parseImport = () => {
    if (!importText.trim()) {
      setImportError('Please enter some text to import')
      return
    }
    
    try {
      let songs: SetlistSong[] = []
      
      if (importFormat === 'json') {
        // Parse JSON format
        try {
          const parsed = JSON.parse(importText)
          if (Array.isArray(parsed)) {
            songs = parsed.map((song, index) => ({
              id: `import-${Date.now()}-${index}`,
              title: song.title || song.name || 'Unknown Song',
              artist: song.artist || song.originalArtist || undefined,
              isCover: song.isCover || song.is_cover || !!song.artist || !!song.originalArtist || false,
              duration: song.duration || song.length || undefined
            }))
          } else {
            throw new Error('JSON must be an array of songs')
          }
        } catch (e) {
          setImportError('Invalid JSON format. Please check your input.')
          return
        }
      } else if (importFormat === 'csv') {
        // Parse CSV format
        const lines = importText.split('\n').filter(line => line.trim())
        
        // Check if first line might be headers
        const firstLine = lines[0].split(',')
        const hasHeaders = firstLine.some(header => 
          ['title', 'name', 'song', 'artist', 'duration', 'cover'].includes(header.trim().toLowerCase())
        )
        
        const startIndex = hasHeaders ? 1 : 0
        
        songs = lines.slice(startIndex).map((line, index) => {
          const parts = line.split(',').map(part => part.trim())
          if (parts.length < 1) return null
          
          return {
            id: `import-${Date.now()}-${index}`,
            title: parts[0] || 'Unknown Song',
            artist: parts.length > 1 ? parts[1] || undefined : undefined,
            isCover: parts.length > 2 ? parts[2].toLowerCase() === 'true' || parts[2].toLowerCase() === 'yes' : !!parts[1],
            duration: parts.length > 3 ? parts[3] || undefined : undefined
          }
        }).filter(Boolean) as SetlistSong[]
      } else {
        // Parse plain text format (one song per line)
        const lines = importText.split('\n').filter(line => line.trim())
        
        songs = lines.map((line, index) => {
          // Try to detect if there's an artist in the format "Title - Artist"
          const titleArtistMatch = line.match(/^(.+?)\s*[-–—]\s*(.+)$/)
          
          if (titleArtistMatch) {
            return {
              id: `import-${Date.now()}-${index}`,
              title: titleArtistMatch[1].trim(),
              artist: titleArtistMatch[2].trim(),
              isCover: true,
              duration: undefined
            }
          }
          
          // Otherwise just use the whole line as the title
          return {
            id: `import-${Date.now()}-${index}`,
            title: line.trim(),
            artist: undefined,
            isCover: false,
            duration: undefined
          }
        })
      }
      
      if (songs.length === 0) {
        setImportError('No valid songs found in the import')
        return
      }
      
      setParsedSongs(songs)
    } catch (error) {
      console.error('Import parsing error:', error)
      setImportError('Failed to parse the import. Please check the format.')
    }
  }
  
  const handleImport = () => {
    if (parsedSongs.length === 0) {
      parseImport()
      return
    }
    
    onImport(parsedSongs)
    toast.success(`Imported ${parsedSongs.length} songs`)
  }
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Determine format from file extension
    if (file.name.endsWith('.json')) {
      setImportFormat('json')
    } else if (file.name.endsWith('.csv')) {
      setImportFormat('csv')
    } else {
      setImportFormat('text')
    }
    
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        setImportText(event.target.result as string)
      }
    }
    reader.readAsText(file)
  }
  
  return (
    <GlassCard variant="elevated">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            Import Setlist
          </h3>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={onCancel}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Import Format
            </label>
            <div className="flex gap-2">
              <Button
                variant={importFormat === 'text' ? 'default' : 'outline'}
                className={importFormat === 'text' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
                onClick={() => setImportFormat('text')}
              >
                Plain Text
              </Button>
              <Button
                variant={importFormat === 'csv' ? 'default' : 'outline'}
                className={importFormat === 'csv' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
                onClick={() => setImportFormat('csv')}
              >
                CSV
              </Button>
              <Button
                variant={importFormat === 'json' ? 'default' : 'outline'}
                className={importFormat === 'json' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
                onClick={() => setImportFormat('json')}
              >
                JSON
              </Button>
            </div>
          </div>
          
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Upload File (Optional)
            </label>
            <div 
              className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-400/50 transition-colors cursor-pointer"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".txt,.csv,.json"
                onChange={handleFileUpload}
              />
              <p className="text-gray-300 mb-1">
                Drop a file or click to upload
              </p>
              <p className="text-xs text-gray-400">
                Supported formats: .txt, .csv, .json
              </p>
            </div>
          </div>
          
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Or Paste Setlist Text
            </label>
            <textarea
              value={importText}
              onChange={handleTextChange}
              rows={10}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
              placeholder={
                importFormat === 'text' ? 
                  "Enter one song per line\nExample:\nMidnight Whispers\nLandslide - Fleetwood Mac" :
                importFormat === 'csv' ? 
                  "title,artist,isCover,duration\nMidnight Whispers,,false,4:15\nLandslide,Fleetwood Mac,true,3:20" :
                  '[\n  {"title": "Midnight Whispers", "isCover": false, "duration": "4:15"},\n  {"title": "Landslide", "artist": "Fleetwood Mac", "isCover": true, "duration": "3:20"}\n]'
              }
            />
          </div>
          
          {/* Format Help */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-white mb-2">Format Guidelines</h4>
                {importFormat === 'text' && (
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>• Enter one song per line</p>
                    <p>• For covers, use format: "Song Title - Original Artist"</p>
                    <p>• Example: "Landslide - Fleetwood Mac"</p>
                  </div>
                )}
                {importFormat === 'csv' && (
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>• Format: title,artist,isCover,duration</p>
                    <p>• First row can optionally be headers</p>
                    <p>• Example: "Landslide,Fleetwood Mac,true,3:20"</p>
                  </div>
                )}
                {importFormat === 'json' && (
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>• Must be an array of song objects</p>
                    <p>• Each object should have: title, artist (optional), isCover (optional), duration (optional)</p>
                    <p>• Example: {"[{\"title\": \"Landslide\", \"artist\": \"Fleetwood Mac\", \"isCover\": true}]"}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Error Message */}
          {importError && (
            <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4 text-red-300">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{importError}</span>
              </div>
            </div>
          )}
          
          {/* Preview */}
          {parsedSongs.length > 0 && (
            <div>
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Preview ({parsedSongs.length} songs)
              </h4>
              
              <div className="max-h-60 overflow-y-auto bg-white/5 rounded-lg border border-white/10 p-2">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="text-left p-2">#</th>
                      <th className="text-left p-2">Title</th>
                      <th className="text-left p-2">Artist</th>
                      <th className="text-left p-2">Cover</th>
                      <th className="text-left p-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedSongs.map((song, index) => (
                      <tr key={song.id} className="border-b border-white/5">
                        <td className="p-2 text-gray-400">{index + 1}</td>
                        <td className="p-2 text-white">{song.title}</td>
                        <td className="p-2 text-gray-300">{song.artist || '-'}</td>
                        <td className="p-2">
                          {song.isCover ? (
                            <Badge className="bg-purple-500/20 text-purple-300">Yes</Badge>
                          ) : (
                            <span className="text-gray-400">No</span>
                          )}
                        </td>
                        <td className="p-2 text-gray-300">{song.duration || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              className="bg-purple-600 hover:bg-purple-700 flex-1"
              onClick={handleImport}
            >
              {parsedSongs.length > 0 ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Import {parsedSongs.length} Songs
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Parse Setlist
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}