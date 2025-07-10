type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          role: 'fan' | 'artist' | 'venue_owner' | 'admin'
          display_name: string | null
          avatar_url: string | null
          location_preferences: Json
          notification_settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'fan' | 'artist' | 'venue_owner' | 'admin'
          display_name?: string | null
          avatar_url?: string | null
          location_preferences?: Json
          notification_settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'fan' | 'artist' | 'venue_owner' | 'admin'
          display_name?: string | null
          avatar_url?: string | null
          location_preferences?: Json
          notification_settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
      artists: {
        Row: {
          id: string
          slug: string
          name: string
          bio: string | null
          avatar_url: string | null
          banner_url: string | null
          manifest_merchant_id: string | null
          kyc_status: 'not_started' | 'pending' | 'approved' | 'rejected'
          payment_settings: Json
          spotify_artist_id: string | null
          bandsintown_artist_id: string | null
          truefans_connect_id: string | null
          social_links: Json
          bio_embedding: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          slug: string
          name: string
          bio?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          manifest_merchant_id?: string | null
          kyc_status?: 'not_started' | 'pending' | 'approved' | 'rejected'
          payment_settings?: Json
          spotify_artist_id?: string | null
          bandsintown_artist_id?: string | null
          truefans_connect_id?: string | null
          social_links?: Json
          bio_embedding?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          bio?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          manifest_merchant_id?: string | null
          kyc_status?: 'not_started' | 'pending' | 'approved' | 'rejected'
          payment_settings?: Json
          spotify_artist_id?: string | null
          bandsintown_artist_id?: string | null
          truefans_connect_id?: string | null
          social_links?: Json
          bio_embedding?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      venues: {
        Row: {
          id: string
          name: string
          slug: string
          address: string | null
          city: string | null
          state: string | null
          country: string
          location: unknown
          geofence: unknown | null
          capacity: number | null
          venue_type: 'music_venue' | 'bar' | 'club' | 'festival' | 'outdoor' | 'other'
          timezone: string
          images: string[]
          virtual_tour_url: string | null
          bandsintown_venue_id: string | null
          spotify_venue_id: string | null
          description_embedding: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string
          location: unknown
          geofence?: unknown | null
          capacity?: number | null
          venue_type?: 'music_venue' | 'bar' | 'club' | 'festival' | 'outdoor' | 'other'
          timezone?: string
          images?: string[]
          virtual_tour_url?: string | null
          bandsintown_venue_id?: string | null
          spotify_venue_id?: string | null
          description_embedding?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string
          location?: unknown
          geofence?: unknown | null
          capacity?: number | null
          venue_type?: 'music_venue' | 'bar' | 'club' | 'festival' | 'outdoor' | 'other'
          timezone?: string
          images?: string[]
          virtual_tour_url?: string | null
          bandsintown_venue_id?: string | null
          spotify_venue_id?: string | null
          description_embedding?: string | null
          metadata?: Json
          created_at?: string
        }
      }
      shows: {
        Row: {
          id: string
          artist_id: string
          venue_id: string
          title: string
          description: string | null
          start_time: string
          end_time: string | null
          door_time: string | null
          status: 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled'
          poster_path: string | null
          setlist: Json
          bandsintown_event_id: string | null
          spotify_playlist_id: string | null
          ticket_url: string | null
          livestream_url: string | null
          live_stats: Json
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          artist_id: string
          venue_id: string
          title: string
          description?: string | null
          start_time: string
          end_time?: string | null
          door_time?: string | null
          status?: 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled'
          poster_path?: string | null
          setlist?: Json
          bandsintown_event_id?: string | null
          spotify_playlist_id?: string | null
          ticket_url?: string | null
          livestream_url?: string | null
          live_stats?: Json
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          artist_id?: string
          venue_id?: string
          title?: string
          description?: string | null
          start_time?: string
          end_time?: string | null
          door_time?: string | null
          status?: 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled'
          poster_path?: string | null
          setlist?: Json
          bandsintown_event_id?: string | null
          spotify_playlist_id?: string | null
          ticket_url?: string | null
          livestream_url?: string | null
          live_stats?: Json
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      donations: {
        Row: {
          id: string
          show_id: string | null
          artist_id: string
          donor_id: string | null
          amount: number
          currency: string
          platform_fee: number
          processing_fee: number
          net_amount: number
          manifest_payment_id: string | null
          manifest_transfer_id: string | null
          payment_method_type: string | null
          status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
          donor_name: string | null
          donor_email: string | null
          donor_message: string | null
          donor_location: unknown | null
          is_anonymous: boolean
          processed_at: string | null
          completed_at: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          show_id?: string | null
          artist_id: string
          donor_id?: string | null
          amount: number
          currency?: string
          platform_fee?: number
          processing_fee?: number
          net_amount?: number
          manifest_payment_id?: string | null
          manifest_transfer_id?: string | null
          payment_method_type?: string | null
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
          donor_name?: string | null
          donor_email?: string | null
          donor_message?: string | null
          donor_location?: unknown | null
          is_anonymous?: boolean
          processed_at?: string | null
          completed_at?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          show_id?: string | null
          artist_id?: string
          donor_id?: string | null
          amount?: number
          currency?: string
          platform_fee?: number
          processing_fee?: number
          net_amount?: number
          manifest_payment_id?: string | null
          manifest_transfer_id?: string | null
          payment_method_type?: string | null
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
          donor_name?: string | null
          donor_email?: string | null
          donor_message?: string | null
          donor_location?: unknown | null
          is_anonymous?: boolean
          processed_at?: string | null
          completed_at?: string | null
          metadata?: Json
          created_at?: string
        }
      }
      activity_feed: {
        Row: {
          id: string
          show_id: string | null
          artist_id: string
          activity_type: 'donation' | 'fan_checkin' | 'show_start' | 'show_end' | 'artist_update'
          amount: number | null
          message: string | null
          fan_location: unknown | null
          display_name: string | null
          avatar_url: string | null
          is_anonymous: boolean
          created_at: string
        }
        Insert: {
          id?: string
          show_id?: string | null
          artist_id: string
          activity_type: 'donation' | 'fan_checkin' | 'show_start' | 'show_end' | 'artist_update'
          amount?: number | null
          message?: string | null
          fan_location?: unknown | null
          display_name?: string | null
          avatar_url?: string | null
          is_anonymous?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          show_id?: string | null
          artist_id?: string
          activity_type?: 'donation' | 'fan_checkin' | 'show_start' | 'show_end' | 'artist_update'
          amount?: number | null
          message?: string | null
          fan_location?: unknown | null
          display_name?: string | null
          avatar_url?: string | null
          is_anonymous?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      find_nearby_shows_advanced: {
        Args: {
          user_lat: number
          user_lng: number
          radius_m?: number
          time_window_hours?: number
        }
        Returns: {
          show_data: Json
          confidence_score: number
          travel_time_minutes: number
        }[]
      }
      find_similar_artists: {
        Args: {
          target_artist_id: string
          similarity_threshold?: number
          limit_count?: number
        }
        Returns: {
          artist_id: string
          name: string
          similarity_score: number
          matching_genres: string[]
        }[]
      }
      update_live_show_stats: {
        Args: {
          p_show_id: string
          p_donation_amount?: number
          p_fan_checkin?: boolean
        }
        Returns: Json
      }
    }
    Enums: {
      user_role: 'fan' | 'artist' | 'venue_owner' | 'admin'
      kyc_status: 'not_started' | 'pending' | 'approved' | 'rejected'
      venue_type: 'music_venue' | 'bar' | 'club' | 'festival' | 'outdoor' | 'other'
      show_status: 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled'
      donation_status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
      activity_type: 'donation' | 'fan_checkin' | 'show_start' | 'show_end' | 'artist_update'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never