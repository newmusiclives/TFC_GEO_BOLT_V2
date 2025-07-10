// Centralized type definitions for better type safety and reusability
export interface UserLocation {
  lat: number
  lng: number
  accuracy: number
  timestamp?: number
}

interface Artist {
  id: string
  slug: string
  name: string
  bio?: string
  avatar_url?: string
  banner_url?: string
  is_verified: boolean
  genres: string[]
  social_links?: Record<string, string>
  created_at: string
  updated_at: string
}

interface Venue {
  id: string
  name: string
  slug: string
  address?: string
  city?: string
  state?: string
  capacity?: number
  venue_type: string
  images: string[]
}

interface Show {
  id: string
  title: string
  description?: string
  start_time: string
  end_time?: string
  status: 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled'
  artist: Artist
  venue: Venue
  live_stats?: {
    total_donations: number
    donation_count: number
    fan_count: number
    energy_level: number
  }
}

export interface ShowWithDetails {
  show_data: Show & {
    distance_meters: number
    is_within_venue: boolean
  }
  confidence_score: number
  travel_time_minutes: number
}

interface Donation {
  id: string
  amount: number
  currency: string
  donor_name?: string
  donor_message?: string
  is_anonymous: boolean
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  created_at: string
}

export type GeolocationStatus = 
  | 'detecting' 
  | 'found' 
  | 'multiple' 
  | 'none' 
  | 'error' 
  | 'permission-denied' 
  | 'timeout'

export interface SetlistSong {
  id: string
  title: string
  artist?: string
  isCover: boolean
  duration?: string
  requestCount?: number
}

export interface SongRequest {
  id: string
  songId: string
  fanName: string
  dedication?: string
  timestamp: string
  isAnonymous?: boolean
  status: 'pending' | 'approved' | 'played' | 'rejected'
}

interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}