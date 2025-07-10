/*
  # Setlist and Song Request Feature

  1. New Tables
    - `setlists` - Stores artist setlists for shows
    - `setlist_songs` - Individual songs in a setlist
    - `song_requests` - Fan requests for specific songs with dedications

  2. Security
    - Row Level Security policies for all new tables
    - Artists can manage their setlists
    - Fans can create song requests
    - Artists can view requests for their shows

  3. Changes
    - Add setlist_id to shows table
    - Add functions for managing setlists and requests
*/

-- Create setlists table
CREATE TABLE setlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create setlist_songs table
CREATE TABLE setlist_songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setlist_id UUID REFERENCES setlists(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255),
  is_cover BOOLEAN DEFAULT false,
  duration VARCHAR(10),
  position INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create song_requests table
CREATE TABLE song_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  show_id UUID REFERENCES shows(id) ON DELETE CASCADE NOT NULL,
  song_id UUID REFERENCES setlist_songs(id) ON DELETE CASCADE NOT NULL,
  fan_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  fan_name VARCHAR(255) NOT NULL,
  dedication TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'played', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add setlist_id to shows table
ALTER TABLE shows ADD COLUMN setlist_id UUID REFERENCES setlists(id) ON DELETE SET NULL;

-- Create index for performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_setlists_artist_id ON setlists(artist_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_setlist_songs_setlist_id ON setlist_songs(setlist_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_song_requests_show_id ON song_requests(show_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_song_requests_song_id ON song_requests(song_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_song_requests_status ON song_requests(status);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_shows_setlist_id ON shows(setlist_id);

-- Enable Row Level Security
ALTER TABLE setlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE setlist_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE song_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for setlists
CREATE POLICY "Artists can manage their setlists" ON setlists
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY "Public can view setlists" ON setlists
  FOR SELECT USING (true);

-- RLS Policies for setlist_songs
CREATE POLICY "Artists can manage their setlist songs" ON setlist_songs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM setlists
      WHERE setlists.id = setlist_id
      AND setlists.artist_id = auth.uid()
    )
  );

CREATE POLICY "Public can view setlist songs" ON setlist_songs
  FOR SELECT USING (true);

-- RLS Policies for song_requests
CREATE POLICY "Fans can create song requests" ON song_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Fans can view their own requests" ON song_requests
  FOR SELECT USING (auth.uid() = fan_id);

CREATE POLICY "Artists can view requests for their shows" ON song_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM shows
      WHERE shows.id = show_id
      AND shows.artist_id = auth.uid()
    )
  );

CREATE POLICY "Artists can manage requests for their shows" ON song_requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM shows
      WHERE shows.id = show_id
      AND shows.artist_id = auth.uid()
    )
  );

-- Function to get all song requests for a show with song details
CREATE OR REPLACE FUNCTION get_show_song_requests(
  p_show_id UUID
)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_agg(
    json_build_object(
      'id', sr.id,
      'song', json_build_object(
        'id', ss.id,
        'title', ss.title,
        'artist', ss.artist,
        'is_cover', ss.is_cover,
        'position', ss.position
      ),
      'fan_name', sr.fan_name,
      'dedication', sr.dedication,
      'is_anonymous', sr.is_anonymous,
      'status', sr.status,
      'created_at', sr.created_at
    )
  ) INTO result
  FROM song_requests sr
  JOIN setlist_songs ss ON sr.song_id = ss.id
  WHERE sr.show_id = p_show_id
  ORDER BY sr.created_at DESC;
  
  RETURN COALESCE(result, '[]'::JSON);
END;
$$ LANGUAGE plpgsql;

-- Function to update song request status
CREATE OR REPLACE FUNCTION update_song_request_status(
  p_request_id UUID,
  p_status VARCHAR(20)
)
RETURNS BOOLEAN AS $$
DECLARE
  show_artist_id UUID;
  request_show_id UUID;
BEGIN
  -- Get the show ID for this request
  SELECT show_id INTO request_show_id
  FROM song_requests
  WHERE id = p_request_id;
  
  -- Get the artist ID for this show
  SELECT artist_id INTO show_artist_id
  FROM shows
  WHERE id = request_show_id;
  
  -- Check if the current user is the artist for this show
  IF show_artist_id != auth.uid() THEN
    RETURN false;
  END IF;
  
  -- Update the request status
  UPDATE song_requests
  SET 
    status = p_status,
    updated_at = NOW()
  WHERE id = p_request_id;
  
  -- Create activity feed entry for approved requests
  IF p_status = 'approved' OR p_status = 'played' THEN
    INSERT INTO activity_feed (
      show_id,
      artist_id,
      activity_type,
      message,
      display_name
    )
    SELECT
      sr.show_id,
      show_artist_id,
      'artist_update',
      CASE 
        WHEN p_status = 'approved' THEN 'Song request approved: ' || ss.title
        WHEN p_status = 'played' THEN 'Playing requested song: ' || ss.title
      END,
      'Artist'
    FROM song_requests sr
    JOIN setlist_songs ss ON sr.song_id = ss.id
    WHERE sr.id = p_request_id;
  END IF;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Function to get song request count by song for a show
CREATE OR REPLACE FUNCTION get_song_request_counts(
  p_show_id UUID
)
RETURNS TABLE (
  song_id UUID,
  request_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sr.song_id,
    COUNT(*) as request_count
  FROM song_requests sr
  WHERE sr.show_id = p_show_id
  GROUP BY sr.song_id;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to update updated_at column
CREATE TRIGGER update_setlists_updated_at BEFORE UPDATE ON setlists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_song_requests_updated_at BEFORE UPDATE ON song_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE setlists IS 'Stores artist setlists for shows';
COMMENT ON TABLE setlist_songs IS 'Individual songs in a setlist';
COMMENT ON TABLE song_requests IS 'Fan requests for specific songs with dedications';
COMMENT ON COLUMN shows.setlist_id IS 'Reference to the setlist for this show';
COMMENT ON FUNCTION get_show_song_requests IS 'Returns all song requests for a show with song details';
COMMENT ON FUNCTION update_song_request_status IS 'Updates the status of a song request';
COMMENT ON FUNCTION get_song_request_counts IS 'Returns the count of requests for each song in a show';