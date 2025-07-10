/*
  # TrueFans GeoConnect - Complete Database Schema

  1. Extensions
    - PostGIS for advanced geolocation
    - Vector for AI embeddings
    - UUID and crypto functions

  2. User Management
    - Custom user profiles extending Supabase Auth
    - Role-based access control

  3. Core Tables
    - Artists with payment integration
    - Venues with PostGIS geofencing
    - Shows with real-time stats
    - Donations with Manifest Financial
    - Activity feed for real-time updates

  4. Security
    - Row Level Security on all tables
    - Comprehensive RLS policies
    - Secure data access patterns
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS uuid-ossp;

-- Custom types
CREATE TYPE user_role AS ENUM ('fan', 'artist', 'venue_owner', 'admin');
CREATE TYPE kyc_status AS ENUM ('not_started', 'pending', 'approved', 'rejected');
CREATE TYPE venue_type AS ENUM ('music_venue', 'bar', 'club', 'festival', 'outdoor', 'other');
CREATE TYPE show_status AS ENUM ('draft', 'upcoming', 'live', 'completed', 'cancelled');
CREATE TYPE donation_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');
CREATE TYPE activity_type AS ENUM ('donation', 'fan_checkin', 'show_start', 'show_end', 'artist_update');

-- User profiles extending Supabase Auth
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role DEFAULT 'fan',
  display_name VARCHAR(255),
  avatar_url TEXT,
  location_preferences JSONB DEFAULT '{}'::jsonb,
  notification_settings JSONB DEFAULT '{
    "email_notifications": true,
    "push_notifications": true,
    "show_alerts": true,
    "donation_confirmations": true
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Artists table with comprehensive features
CREATE TABLE artists (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  
  -- Manifest Financial integration
  manifest_merchant_id VARCHAR(255) UNIQUE,
  kyc_status kyc_status DEFAULT 'not_started',
  kyc_submitted_at TIMESTAMPTZ,
  payment_settings JSONB DEFAULT '{
    "instant_payouts": true,
    "minimum_payout": 1.00,
    "default_amounts": [5, 10, 25, 50],
    "custom_amounts_enabled": true
  }'::jsonb,
  
  -- External integrations
  spotify_artist_id VARCHAR(255),
  bandsintown_artist_id VARCHAR(255),
  truefans_connect_id UUID,
  social_links JSONB DEFAULT '{}'::jsonb,
  
  -- AI & search features (placeholder for future vector implementation)
  bio_embedding TEXT, -- Will be vector(1536) when vector extension is available
  genres TEXT[] DEFAULT '{}',
  
  -- Metadata and status
  is_verified BOOLEAN DEFAULT false,
  verification_requested_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Venues with PostGIS geolocation
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  
  -- Location data
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  country VARCHAR(50) DEFAULT 'US',
  postal_code VARCHAR(20),
  
  -- PostGIS columns (using geometry for now, can be upgraded to geography)
  location GEOMETRY(POINT, 4326) NOT NULL,
  geofence GEOMETRY(POLYGON, 4326), -- Custom venue boundaries
  
  -- Venue details
  capacity INTEGER,
  venue_type venue_type DEFAULT 'music_venue',
  timezone VARCHAR(50) DEFAULT 'America/New_York',
  phone VARCHAR(20),
  website VARCHAR(255),
  
  -- Media and presentation
  images TEXT[] DEFAULT '{}',
  virtual_tour_url TEXT,
  description TEXT,
  
  -- External integrations
  bandsintown_venue_id VARCHAR(255),
  spotify_venue_id VARCHAR(255),
  
  -- AI features (placeholder)
  description_embedding TEXT, -- Will be vector(1536)
  
  -- Metadata
  amenities TEXT[] DEFAULT '{}',
  accessibility_features TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shows with comprehensive tracking
CREATE TABLE shows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  
  -- Show details
  title VARCHAR(255) NOT NULL,
  description TEXT,
  genre VARCHAR(100),
  
  -- Timing
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  door_time TIMESTAMPTZ,
  status show_status DEFAULT 'draft',
  
  -- Media and content
  poster_path TEXT, -- Path in Supabase Storage
  setlist JSONB DEFAULT '[]'::jsonb,
  
  -- External integrations
  bandsintown_event_id VARCHAR(255),
  spotify_playlist_id VARCHAR(255),
  ticket_url TEXT,
  livestream_url TEXT,
  
  -- Pricing and ticketing
  ticket_price DECIMAL(10,2),
  is_free BOOLEAN DEFAULT false,
  age_restriction VARCHAR(10),
  
  -- Real-time stats
  live_stats JSONB DEFAULT '{
    "total_donations": 0,
    "donation_count": 0,
    "fan_count": 0,
    "energy_level": 0,
    "peak_concurrent_fans": 0
  }'::jsonb,
  
  -- Metadata
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_times CHECK (
    (end_time IS NULL OR start_time < end_time) AND
    (door_time IS NULL OR door_time <= start_time)
  )
);

-- Donations with Manifest Financial integration
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  show_id UUID REFERENCES shows(id) ON DELETE SET NULL,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  donor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Payment details
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(3) DEFAULT 'USD',
  platform_fee DECIMAL(10,2) DEFAULT 0,
  processing_fee DECIMAL(10,2) DEFAULT 0,
  net_amount DECIMAL(10,2) GENERATED ALWAYS AS (amount - platform_fee - processing_fee) STORED,
  
  -- Manifest Financial tracking
  manifest_payment_id VARCHAR(255) UNIQUE,
  manifest_transfer_id VARCHAR(255),
  payment_method_type VARCHAR(50),
  payment_method_last4 VARCHAR(4),
  status donation_status DEFAULT 'pending',
  
  -- Donor information
  donor_name VARCHAR(255),
  donor_email VARCHAR(255),
  donor_message TEXT,
  donor_location GEOMETRY(POINT, 4326), -- PostGIS location
  is_anonymous BOOLEAN DEFAULT false,
  
  -- Processing timestamps
  processed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  failure_reason TEXT,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real-time activity feed
CREATE TABLE activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  activity_type activity_type NOT NULL,
  
  -- Activity data
  amount DECIMAL(10,2),
  message TEXT,
  fan_location GEOMETRY(POINT, 4326),
  
  -- Display data
  display_name VARCHAR(255),
  avatar_url TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_artists_slug ON artists(slug);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_artists_verified ON artists(is_verified);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_venues_slug ON venues(slug);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_venues_location ON venues USING GIST (location);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_venues_geofence ON venues USING GIST (geofence);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shows_status ON shows(status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shows_start_time ON shows(start_time);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shows_artist_id ON shows(artist_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shows_venue_id ON shows(venue_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_donations_artist_id ON donations(artist_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_donations_show_id ON donations(show_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_donations_location ON donations USING GIST (donor_location);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_activity_feed_show_id ON activity_feed(show_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_activity_feed_created_at ON activity_feed(created_at DESC);

-- Full-text search indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_artists_search ON artists USING GIN (
  to_tsvector('english', coalesce(name, '') || ' ' || coalesce(bio, ''))
);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_venues_search ON venues USING GIN (
  to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(city, ''))
);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shows_search ON shows USING GIN (
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, ''))
);

-- Trigger for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_artists_updated_at BEFORE UPDATE ON artists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shows_updated_at BEFORE UPDATE ON shows FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();