/*
  # Add Referral System to TrueFans GeoConnect

  1. Referral Tracking Columns
    - Add referred_by_user_id to user_profiles table
    - Add referred_by_user_id to artists table  
    - Add referred_by_user_id to venues table

  2. Referral Earnings Table
    - Create referral_earnings table to track all referral commissions
    - Support for multi-tier referral system (direct + tier 2)
    - Link earnings to specific donations for transparency

  3. Indexes and Constraints
    - Performance indexes for referral queries
    - Foreign key constraints for data integrity

  4. Security
    - Row Level Security policies for referral data
    - Proper access controls for earnings visibility
*/

-- Add referral tracking to user_profiles
ALTER TABLE user_profiles 
ADD COLUMN referred_by_user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL;

-- Add referral tracking to artists
ALTER TABLE artists 
ADD COLUMN referred_by_user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL;

-- Add referral tracking to venues
ALTER TABLE venues 
ADD COLUMN referred_by_user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL;

-- Create referral earnings table
CREATE TABLE referral_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID REFERENCES donations(id) ON DELETE CASCADE,
  referrer_user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  -- Track what entity was referred (artist, venue, or fan)
  referred_entity_id UUID,
  referred_entity_type TEXT NOT NULL CHECK (referred_entity_type IN ('artist', 'venue', 'fan')),
  
  -- Earning details
  earning_amount DECIMAL(10,2) NOT NULL CHECK (earning_amount > 0),
  earning_type TEXT NOT NULL CHECK (earning_type IN ('direct_referral', 'tier2_referral')),
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_referred_entity CHECK (
    (referred_entity_type = 'artist' AND referred_entity_id IS NOT NULL) OR
    (referred_entity_type = 'venue' AND referred_entity_id IS NOT NULL) OR
    (referred_entity_type = 'fan' AND referred_entity_id IS NOT NULL)
  )
);

-- Performance indexes for referral queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_profiles_referred_by ON user_profiles(referred_by_user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_artists_referred_by ON artists(referred_by_user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_venues_referred_by ON venues(referred_by_user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_referral_earnings_referrer ON referral_earnings(referrer_user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_referral_earnings_donation ON referral_earnings(donation_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_referral_earnings_entity ON referral_earnings(referred_entity_id, referred_entity_type);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_referral_earnings_created_at ON referral_earnings(created_at DESC);

-- Enable RLS on referral_earnings table
ALTER TABLE referral_earnings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for referral_earnings
CREATE POLICY "Users can view their own referral earnings" ON referral_earnings
  FOR SELECT USING (auth.uid() = referrer_user_id);

CREATE POLICY "System can insert referral earnings" ON referral_earnings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all referral earnings" ON referral_earnings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role = 'admin'
    )
  );

-- Function to calculate and create referral earnings for a donation
CREATE OR REPLACE FUNCTION process_referral_earnings(
  p_donation_id UUID,
  p_artist_id UUID,
  p_donation_amount DECIMAL
)
RETURNS JSON AS $$
DECLARE
  artist_referrer_id UUID;
  tier2_referrer_id UUID;
  direct_earning DECIMAL;
  tier2_earning DECIMAL;
  earnings_created JSON;
BEGIN
  -- Get the artist's referrer
  SELECT referred_by_user_id INTO artist_referrer_id
  FROM artists 
  WHERE id = p_artist_id;
  
  -- Calculate earnings (2.5% each for direct and tier 2)
  direct_earning = p_donation_amount * 0.025;
  tier2_earning = p_donation_amount * 0.025;
  
  earnings_created = '[]'::JSON;
  
  -- Process direct referral earning
  IF artist_referrer_id IS NOT NULL THEN
    INSERT INTO referral_earnings (
      donation_id,
      referrer_user_id,
      referred_entity_id,
      referred_entity_type,
      earning_amount,
      earning_type
    ) VALUES (
      p_donation_id,
      artist_referrer_id,
      p_artist_id,
      'artist',
      direct_earning,
      'direct_referral'
    );
    
    -- Get the tier 2 referrer (referrer's referrer)
    SELECT referred_by_user_id INTO tier2_referrer_id
    FROM user_profiles 
    WHERE id = artist_referrer_id;
    
    -- Process tier 2 referral earning
    IF tier2_referrer_id IS NOT NULL THEN
      INSERT INTO referral_earnings (
        donation_id,
        referrer_user_id,
        referred_entity_id,
        referred_entity_type,
        earning_amount,
        earning_type
      ) VALUES (
        p_donation_id,
        tier2_referrer_id,
        p_artist_id,
        'artist',
        tier2_earning,
        'tier2_referral'
      );
    END IF;
    
    -- Build response
    earnings_created = json_build_object(
      'direct_referral', json_build_object(
        'referrer_id', artist_referrer_id,
        'amount', direct_earning
      ),
      'tier2_referral', CASE 
        WHEN tier2_referrer_id IS NOT NULL THEN json_build_object(
          'referrer_id', tier2_referrer_id,
          'amount', tier2_earning
        )
        ELSE NULL
      END,
      'total_referral_amount', CASE 
        WHEN tier2_referrer_id IS NOT NULL THEN direct_earning + tier2_earning
        ELSE direct_earning
      END
    );
  END IF;
  
  RETURN earnings_created;
END;
$$ LANGUAGE plpgsql;

-- Function to get referral analytics for a user
CREATE OR REPLACE FUNCTION get_referral_analytics(
  p_user_id UUID,
  p_days_back INT DEFAULT 30
)
RETURNS JSON AS $$
DECLARE
  analytics_data JSON;
BEGIN
  SELECT json_build_object(
    'total_earnings', COALESCE(SUM(earning_amount), 0),
    'direct_referral_earnings', COALESCE(SUM(CASE WHEN earning_type = 'direct_referral' THEN earning_amount ELSE 0 END), 0),
    'tier2_referral_earnings', COALESCE(SUM(CASE WHEN earning_type = 'tier2_referral' THEN earning_amount ELSE 0 END), 0),
    'total_referrals', COUNT(DISTINCT referred_entity_id),
    'direct_referrals', COUNT(DISTINCT CASE WHEN earning_type = 'direct_referral' THEN referred_entity_id END),
    'earnings_count', COUNT(*),
    'recent_earnings', (
      SELECT json_agg(
        json_build_object(
          'date', DATE(created_at),
          'amount', earning_amount,
          'type', earning_type,
          'entity_type', referred_entity_type
        )
      )
      FROM referral_earnings
      WHERE referrer_user_id = p_user_id
      AND created_at > NOW() - (p_days_back || ' days')::INTERVAL
      ORDER BY created_at DESC
      LIMIT 10
    )
  ) INTO analytics_data
  FROM referral_earnings
  WHERE referrer_user_id = p_user_id
  AND created_at > NOW() - (p_days_back || ' days')::INTERVAL;
  
  RETURN analytics_data;
END;
$$ LANGUAGE plpgsql;

-- Function to get referral tree for a user (who they referred)
CREATE OR REPLACE FUNCTION get_referral_tree(
  p_user_id UUID
)
RETURNS JSON AS $$
DECLARE
  referral_tree JSON;
BEGIN
  SELECT json_build_object(
    'direct_referrals', (
      SELECT json_agg(
        json_build_object(
          'id', up.id,
          'display_name', up.display_name,
          'role', up.role,
          'created_at', up.created_at,
          'total_earnings_generated', COALESCE(re.total_earnings, 0)
        )
      )
      FROM user_profiles up
      LEFT JOIN (
        SELECT 
          referred_entity_id,
          SUM(earning_amount) as total_earnings
        FROM referral_earnings 
        WHERE referrer_user_id = p_user_id 
        AND earning_type = 'direct_referral'
        GROUP BY referred_entity_id
      ) re ON up.id = re.referred_entity_id
      WHERE up.referred_by_user_id = p_user_id
    ),
    'artists_referred', (
      SELECT json_agg(
        json_build_object(
          'id', a.id,
          'name', a.name,
          'slug', a.slug,
          'is_verified', a.is_verified,
          'total_earnings_generated', COALESCE(re.total_earnings, 0)
        )
      )
      FROM artists a
      LEFT JOIN (
        SELECT 
          referred_entity_id,
          SUM(earning_amount) as total_earnings
        FROM referral_earnings 
        WHERE referrer_user_id = p_user_id 
        AND referred_entity_type = 'artist'
        GROUP BY referred_entity_id
      ) re ON a.id = re.referred_entity_id
      WHERE a.referred_by_user_id = p_user_id
    ),
    'venues_referred', (
      SELECT json_agg(
        json_build_object(
          'id', v.id,
          'name', v.name,
          'slug', v.slug,
          'city', v.city,
          'total_earnings_generated', COALESCE(re.total_earnings, 0)
        )
      )
      FROM venues v
      LEFT JOIN (
        SELECT 
          referred_entity_id,
          SUM(earning_amount) as total_earnings
        FROM referral_earnings 
        WHERE referrer_user_id = p_user_id 
        AND referred_entity_type = 'venue'
        GROUP BY referred_entity_id
      ) re ON v.id = re.referred_entity_id
      WHERE v.referred_by_user_id = p_user_id
    )
  ) INTO referral_tree;
  
  RETURN referral_tree;
END;
$$ LANGUAGE plpgsql;

-- Add comments for documentation
COMMENT ON TABLE referral_earnings IS 'Tracks all referral commission earnings from donations';
COMMENT ON COLUMN user_profiles.referred_by_user_id IS 'ID of the user who referred this user';
COMMENT ON COLUMN artists.referred_by_user_id IS 'ID of the user who referred this artist';
COMMENT ON COLUMN venues.referred_by_user_id IS 'ID of the user who referred this venue';
COMMENT ON FUNCTION process_referral_earnings IS 'Calculates and creates referral earnings for a donation (2.5% direct + 2.5% tier 2)';
COMMENT ON FUNCTION get_referral_analytics IS 'Returns comprehensive referral analytics for a user';
COMMENT ON FUNCTION get_referral_tree IS 'Returns the referral tree showing who a user has referred';