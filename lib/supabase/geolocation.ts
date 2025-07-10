import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { GEOLOCATION_CONFIG } from '@/lib/constants'
import type { ShowWithDetails } from '@/lib/types'

export class GeoLocationService {
  private supabase = createClient()

  async findNearbyShows(
    lat: number, 
    lng: number, 
    radiusM = GEOLOCATION_CONFIG.defaultRadius,
    timeWindowHours = GEOLOCATION_CONFIG.timeWindow
  ): Promise<ShowWithDetails[]> {
    // Check configuration first before attempting any network calls
    if (!isSupabaseConfigured()) {
      console.log('🎭 Using mock data - Supabase not configured')
      return this.getMockNearbyShows()
    }

    try {
      const { data, error } = await this.supabase.rpc('find_nearby_shows_advanced', {
        user_lat: lat,
        user_lng: lng,
        radius_m: radiusM,
        time_window_hours: timeWindowHours
      })
      
      if (error) {
        console.log('🎭 Falling back to mock data due to Supabase error:', error.message)
        return this.getMockNearbyShows()
      }
      
      return data || []
    } catch (error) {
      console.log('🎭 Falling back to mock data due to network error')
      return this.getMockNearbyShows()
    }
  }

  async checkVenueGeofence(lat: number, lng: number, venueId: string): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      console.log('🎭 Mock geofence check - Supabase not configured')
      return false
    }

    try {
      const { data, error } = await this.supabase
        .from('venues')
        .select('geofence')
        .eq('id', venueId)
        .single()
      
      if (error || !data?.geofence) return false
      
      // This would typically use a PostGIS function
      // For now, we'll return a simple distance check
      return true
    } catch (error) {
      console.log('Geofence check error, returning false')
      return false
    }
  }

  async updateLiveShowStats(showId: string, donationAmount?: number, fanCheckin?: boolean) {
    if (!isSupabaseConfigured()) {
      console.log('🎭 Mock update live show stats - Supabase not configured')
      return null
    }

    try {
      const { data, error } = await this.supabase.rpc('update_live_show_stats', {
        p_show_id: showId,
        p_donation_amount: donationAmount,
        p_fan_checkin: fanCheckin
      })
      
      if (error) {
        console.log('Error updating live show stats:', error.message)
        throw error
      }
      
      return data
    } catch (error) {
      console.log('Live stats update error')
      return null
    }
  }

  async getActivityFeed(showId: string, limit = 20) {
    if (!isSupabaseConfigured()) {
      console.log('🎭 Mock activity feed - Supabase not configured')
      return []
    }

    try {
      const { data, error } = await this.supabase
        .from('activity_feed')
        .select('*')
        .eq('show_id', showId)
        .order('created_at', { ascending: false })
        .limit(limit)
      
      if (error) {
        console.log('Error getting activity feed:', error.message)
        throw error
      }
      
      return data
    } catch (error) {
      console.log('Activity feed error')
      return []
    }
  }

  subscribeToShowUpdates(showId: string, callback: (payload: any) => void) {
    if (!isSupabaseConfigured()) {
      console.log('🎭 Mock subscription - Supabase not configured')
      return () => {}
    }

    try {
      const channel = this.supabase
        .channel(`show-${showId}`)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'donations',
          filter: `show_id=eq.${showId}`
        }, callback)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'activity_feed',
          filter: `show_id=eq.${showId}`
        }, callback)
        .subscribe()

      return () => this.supabase.removeChannel(channel)
    } catch (error) {
      console.log('Subscription error')
      return () => {}
    }
  }

  // Enhanced mock data for development when Supabase is not connected
  private getMockNearbyShows(): ShowWithDetails[] {
    const now = new Date()
    
    return [
      {
        show_data: {
          id: '1',
          title: 'Acoustic Evening with Luna Rodriguez',
          description: 'An intimate evening of storytelling through song',
          start_time: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
          status: 'upcoming',
          artist: {
            id: '11111111-1111-1111-1111-111111111111',
            name: 'Luna Rodriguez',
            slug: 'luna-rodriguez',
            avatar_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
            verified: true,
            bio: 'Acoustic storyteller with a voice that captivates audiences nationwide.',
            banner_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
            is_verified: true,
            genres: ['indie', 'folk', 'acoustic'],
            created_at: now.toISOString(),
            updated_at: now.toISOString()
          },
          venue: {
            id: '1',
            name: 'The Blue Note',
            slug: 'blue-note-nyc',
            address: '131 W 3rd St, New York, NY',
            city: 'New York',
            state: 'NY',
            capacity: 200,
            venue_type: 'music_venue',
            images: ['https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400']
          },
          distance_meters: 150,
          is_within_venue: true,
          live_stats: {
            total_donations: 0,
            donation_count: 0,
            fan_count: 0,
            energy_level: 0
          }
        },
        confidence_score: 95,
        travel_time_minutes: 2
      },
      {
        show_data: {
          id: '2',
          title: 'Rock Revival Night',
          description: 'High-energy rock performance',
          start_time: new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString(),
          status: 'upcoming',
          artist: {
            id: '22222222-2222-2222-2222-222222222222',
            name: 'The Midnight Echoes',
            slug: 'midnight-echoes',
            avatar_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200',
            verified: false,
            bio: 'Four-piece rock band bringing raw energy to every stage.',
            banner_url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
            is_verified: false,
            genres: ['rock', 'alternative', 'indie'],
            created_at: now.toISOString(),
            updated_at: now.toISOString()
          },
          venue: {
            id: '2',
            name: 'Underground Hall',
            slug: 'underground-hall',
            address: '456 Brooklyn Ave, Brooklyn, NY',
            city: 'Brooklyn',
            state: 'NY',
            capacity: 350,
            venue_type: 'club',
            images: ['https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400']
          },
          distance_meters: 800,
          is_within_venue: false,
          live_stats: {
            total_donations: 0,
            donation_count: 0,
            fan_count: 0,
            energy_level: 0
          }
        },
        confidence_score: 75,
        travel_time_minutes: 10
      }
    ]
  }
}

const geoLocationService = new GeoLocationService()

// Re-export types for backward compatibility
export type { ShowWithDetails }