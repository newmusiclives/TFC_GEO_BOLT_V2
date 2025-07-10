/*
  # Add Song Request Donations Feature

  1. Changes
    - Add donation_amount column to song_requests table
    - Add request_price column to artists table
    - Create function to process song request donations

  2. Purpose
    - Enable fans to donate when making song requests
    - Allow artists to set minimum donation amount for requests
    - Process donations through existing payment system
*/

-- Add donation_amount column to song_requests table
ALTER TABLE song_requests 
ADD COLUMN donation_amount DECIMAL(10,2) DEFAULT 0;

-- Add request_price column to artists table
ALTER TABLE artists
ADD COLUMN request_price DECIMAL(10,2) DEFAULT 5.00;

-- Create function to process song request donations
CREATE OR REPLACE FUNCTION process_song_request_donation(
  p_show_id UUID,
  p_artist_id UUID,
  p_donor_id UUID,
  p_amount DECIMAL,
  p_donor_name VARCHAR(255) DEFAULT NULL,
  p_donor_message TEXT DEFAULT NULL,
  p_is_anonymous BOOLEAN DEFAULT false
)
RETURNS JSON AS $$
DECLARE
  artist_id_to_use UUID;
  donation_result JSON;
BEGIN
  -- If artist_id is not provided, get it from the show
  IF p_artist_id IS NULL THEN
    SELECT artist_id INTO artist_id_to_use
    FROM shows
    WHERE id = p_show_id;
  ELSE
    artist_id_to_use := p_artist_id;
  END IF;
  
  -- Process the donation using the existing function
  SELECT process_complete_donation(
    p_show_id,
    artist_id_to_use,
    p_donor_id,
    p_amount,
    'USD',
    'song_request_' || gen_random_uuid(),
    p_donor_name,
    NULL, -- No email needed
    p_donor_message,
    p_is_anonymous
  ) INTO donation_result;
  
  RETURN donation_result;
END;
$$ LANGUAGE plpgsql;

-- Add index for performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_song_requests_donation_amount ON song_requests(donation_amount);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_artists_request_price ON artists(request_price);

-- Update existing artists with default request prices
UPDATE artists SET request_price = 5.00 WHERE request_price IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN song_requests.donation_amount IS 'Amount donated with this song request';
COMMENT ON COLUMN artists.request_price IS 'Minimum donation amount required for song requests';
COMMENT ON FUNCTION process_song_request_donation IS 'Processes a donation associated with a song request';