'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music, Heart, CheckCircle, X, Clock, User, MessageSquare, RefreshCw } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import type { SongRequest } from '@/lib/types'

interface SongRequestDashboardProps {
  showId: string
  artistId: string
}

export function SongRequestDashboard({
  showId,
  artistId
}: SongRequestDashboardProps) {
  const supabase = createClient()
  const [requests, setRequests] = useState<SongRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'played' | 'all'>('pending')
  
  useEffect(() => {
    loadSongRequests()
    
    // Set up real-time subscription
    const channel = supabase
      .channel(`song-requests-${showId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'song_requests',
        filter: `show_id=eq.${showId}`
      }, (payload: any) => {
        // Refresh the requests when a new one comes in
        loadSongRequests()
        // Show notification
        toast.success('New song request received!')
      })
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [showId])
  
  const loadSongRequests = async () => {
    if (isRefreshing) return
    setIsLoading(true)
    setIsRefreshing(true)
    
    try {
      // For demo mode, create mock song requests
      if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
        // Mock song requests for demo
        const mockRequests: SongRequest[] = [
          {
            id: '1',
            songId: '5',
            fanName: 'Sarah Johnson',
            dedication: 'This song reminds me of our first date. Love you, Mike!',
            isAnonymous: false,
            status: 'pending',
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            songId: '4',
            fanName: 'Music Lover',
            dedication: 'Your version of this song is even better than the original!',
            isAnonymous: true,
            status: 'approved',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            songId: '1',
            fanName: 'Biggest Fan',
            dedication: 'This song changed my life. Thank you for writing it.',
            isAnonymous: false,
            status: 'pending',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
          }
        ];
        
        setRequests(mockRequests);
      } else {
        const { data, error } = await supabase.rpc('get_show_song_requests', {
          p_show_id: showId
        })
        
        if (error) throw error
        
        // Parse the JSON result
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data
        
        // Map to our SongRequest type
        const formattedRequests: SongRequest[] = (parsedData || []).map((item: any) => ({
          id: item.id,
          songId: item.song.id,
          fanName: item.fan_name,
          dedication: item.dedication,
          isAnonymous: item.is_anonymous,
          status: item.status,
          timestamp: item.created_at
        }))
        
        setRequests(formattedRequests)
      }
    } catch (error) {
      console.error('Error loading song requests:', error)
      toast.error('Failed to load song requests')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }
  
  const handleUpdateStatus = async (requestId: string, newStatus: 'approved' | 'played' | 'rejected') => {
    try {
      // For demo mode, just update the local state
      if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
        // Update local state
        setRequests(requests.map(request => 
          request.id === requestId 
            ? { ...request, status: newStatus } 
            : request
        ))
        
        toast.success(`Request ${newStatus} successfully`)
        return
      }
      
      const { data, error } = await supabase.rpc('update_song_request_status', {
        p_request_id: requestId,
        p_status: newStatus
      })
      
      if (error) throw error
      
      // Update local state
      setRequests(requests.map(request => 
        request.id === requestId 
          ? { ...request, status: newStatus } 
          : request
      ))
      
      toast.success(`Request ${newStatus} successfully`)
    } catch (error) {
      console.error(`Error updating request status to ${newStatus}:`, error)
      toast.error('Failed to update request status')
    }
  }
  
  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true
    return request.status === activeTab
  })
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300'
      case 'approved': return 'bg-blue-500/20 text-blue-300'
      case 'played': return 'bg-green-500/20 text-green-300'
      case 'rejected': return 'bg-red-500/20 text-red-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }
  
  return (
    <GlassCard variant="elevated">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-400" />
            Song Requests
          </h3>
          
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={loadSongRequests}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            className={activeTab === 'pending' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
            onClick={() => setActiveTab('pending')}
          >
            <Clock className="w-4 h-4 mr-2" />
            Pending
            <Badge className="ml-2 bg-yellow-500/20 text-yellow-300">
              {requests.filter(r => r.status === 'pending').length}
            </Badge>
          </Button>
          
          <Button
            variant={activeTab === 'approved' ? 'default' : 'outline'}
            className={activeTab === 'approved' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
            onClick={() => setActiveTab('approved')}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approved
            <Badge className="ml-2 bg-blue-500/20 text-blue-300">
              {requests.filter(r => r.status === 'approved').length}
            </Badge>
          </Button>
          
          <Button
            variant={activeTab === 'played' ? 'default' : 'outline'}
            className={activeTab === 'played' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
            onClick={() => setActiveTab('played')}
          >
            <Music className="w-4 h-4 mr-2" />
            Played
            <Badge className="ml-2 bg-green-500/20 text-green-300">
              {requests.filter(r => r.status === 'played').length}
            </Badge>
          </Button>
          
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            className={activeTab === 'all' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
            onClick={() => setActiveTab('all')}
          >
            All Requests
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading song requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-lg">
            <Heart className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-300">No {activeTab !== 'all' ? activeTab : ''} song requests yet</p>
            {activeTab === 'pending' && (
              <p className="text-sm text-gray-400 mt-2">
                Requests will appear here when fans submit them
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-white">Song Request #{request.songId}</h4>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>
                          {request.isAnonymous ? 'Anonymous Fan' : request.fanName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(request.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleUpdateStatus(request.id, 'approved')}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-400/30 text-red-300 hover:bg-red-500/10"
                        onClick={() => handleUpdateStatus(request.id, 'rejected')}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  )}
                  
                  {request.status === 'approved' && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleUpdateStatus(request.id, 'played')}
                    >
                      <Music className="w-4 h-4 mr-1" />
                      Mark as Played
                    </Button>
                  )}
                </div>
                
                {request.dedication && (
                  <div className="mt-2 p-3 bg-white/5 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-300 italic">
                        "{request.dedication}"
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  )
}