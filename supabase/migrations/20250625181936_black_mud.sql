/*
  # Update Payment Distribution for 80% Artist Payout

  1. Changes
    - Update fee structure to ensure artists receive exactly 80% of gross donation
    - Adjust platform fee to accommodate the 2-tier referral system (2.5% + 2.5%)
    - Processing fee (2.9% + $0.30) is added on top when fan makes donation

  2. Security
    - Added RLS policies for admin access to referral data
    - Updated functions to reflect new fee structure

  3. Admin Features
    - Added functions to support admin dashboard for affiliate analytics
*/

-- Update donation constants function to reflect 80% artist payout
CREATE OR REPLACE FUNCTION get_donation_fee_structure()
RETURNS JSON AS $$
BEGIN
  RETURN json_build_object(
    'platform_fee_rate', 0.15, -- 15% platform fee (includes referral fees)
    'processing_fee_rate', 0.029, -- 2.9% processing fee
    'processing_fee_fixed', 0.30, -- $0.30 fixed fee
    'referral_fee_rate', 0.05, -- 5% total referral fees (2.5% direct + 2.5% tier2)
    'direct_referral_rate', 0.025, -- 2.5% to direct referrer
    'tier2_referral_rate', 0.025, -- 2.5% to tier2 referrer
    'artist_payout_rate', 0.80, -- 80% to artist
    'description', 'Platform: 15% (includes 5% referrals), Processing: 2.9% + $0.30 (added on top), Artist: 80%'
  );
END;
$$ LANGUAGE plpgsql;

-- Function to calculate all fees for a donation amount
CREATE OR REPLACE FUNCTION calculate_donation_fees(
  p_amount DECIMAL
)
RETURNS JSON AS $$
DECLARE
  platform_fee DECIMAL;
  processing_fee DECIMAL;
  processing_fee_fixed DECIMAL := 0.30;
  referral_fees DECIMAL;
  net_amount DECIMAL;
  gross_with_processing DECIMAL;
BEGIN
  -- Calculate fees based on the donation amount
  platform_fee = p_amount * 0.15; -- 15% platform fee
  referral_fees = p_amount * 0.05; -- 5% referral fees (included in platform fee)
  net_amount = p_amount * 0.80; -- 80% to artist
  
  -- Processing fee is 2.9% + $0.30, added on top for the fan
  processing_fee = (p_amount * 0.029) + processing_fee_fixed;
  gross_with_processing = p_amount + processing_fee;
  
  RETURN json_build_object(
    'gross_amount', p_amount,
    'gross_with_processing', gross_with_processing,
    'platform_fee', platform_fee,
    'processing_fee', processing_fee,
    'referral_fees', referral_fees,
    'net_amount', net_amount,
    'artist_payout_percentage', 80.0
  );
END;
$$ LANGUAGE plpgsql;

-- Function to process a complete donation with all fees and referrals
CREATE OR REPLACE FUNCTION process_complete_donation(
  p_show_id UUID,
  p_artist_id UUID,
  p_donor_id UUID,
  p_amount DECIMAL,
  p_currency VARCHAR(3) DEFAULT 'USD',
  p_manifest_payment_id VARCHAR(255),
  p_donor_name VARCHAR(255) DEFAULT NULL,
  p_donor_email VARCHAR(255) DEFAULT NULL,
  p_donor_message TEXT DEFAULT NULL,
  p_is_anonymous BOOLEAN DEFAULT false
)
RETURNS JSON AS $$
DECLARE
  donation_id UUID;
  platform_fee DECIMAL;
  processing_fee DECIMAL;
  processing_fee_fixed DECIMAL := 0.30;
  referral_fees DECIMAL;
  net_amount DECIMAL;
  referral_result JSON;
BEGIN
  -- Calculate fees based on the donation amount
  platform_fee = p_amount * 0.15; -- 15% platform fee
  referral_fees = p_amount * 0.05; -- 5% referral fees (included in platform fee)
  net_amount = p_amount * 0.80; -- 80% to artist
  
  -- Processing fee is 2.9% + $0.30, but this is added on top for the fan
  -- We still track it in the donation record
  processing_fee = (p_amount * 0.029) + processing_fee_fixed;
  
  -- Insert donation record
  INSERT INTO donations (
    show_id,
    artist_id,
    donor_id,
    amount,
    currency,
    platform_fee,
    processing_fee,
    referral_fees,
    manifest_payment_id,
    status,
    donor_name,
    donor_email,
    donor_message,
    is_anonymous,
    processed_at,
    completed_at
  ) VALUES (
    p_show_id,
    p_artist_id,
    p_donor_id,
    p_amount,
    p_currency,
    platform_fee,
    processing_fee,
    referral_fees,
    p_manifest_payment_id,
    'completed',
    p_donor_name,
    p_donor_email,
    p_donor_message,
    p_is_anonymous,
    NOW(),
    NOW()
  ) RETURNING id INTO donation_id;
  
  -- Process referral earnings
  SELECT process_referral_earnings(donation_id, p_artist_id, p_amount) INTO referral_result;
  
  -- Update show stats if applicable
  IF p_show_id IS NOT NULL THEN
    PERFORM update_live_show_stats(p_show_id, p_amount, false);
  END IF;
  
  -- Create activity feed entry
  INSERT INTO activity_feed (
    show_id,
    artist_id,
    activity_type,
    amount,
    message,
    display_name,
    is_anonymous
  ) VALUES (
    p_show_id,
    p_artist_id,
    'donation',
    p_amount,
    p_donor_message,
    CASE WHEN p_is_anonymous THEN 'Anonymous Fan' ELSE p_donor_name END,
    p_is_anonymous
  );
  
  -- Return complete donation info
  RETURN json_build_object(
    'donation_id', donation_id,
    'gross_amount', p_amount,
    'platform_fee', platform_fee,
    'processing_fee', processing_fee,
    'referral_fees', referral_fees,
    'net_amount', net_amount,
    'referral_earnings', referral_result,
    'status', 'completed'
  );
END;
$$ LANGUAGE plpgsql;

-- Function to calculate the amount a fan will pay including processing fees
CREATE OR REPLACE FUNCTION calculate_fan_payment_amount(
  p_donation_amount DECIMAL
)
RETURNS DECIMAL AS $$
DECLARE
  processing_fee_rate DECIMAL := 0.029;
  processing_fee_fixed DECIMAL := 0.30;
  total_amount DECIMAL;
BEGIN
  -- Calculate the total amount including processing fees
  total_amount = p_donation_amount + (p_donation_amount * processing_fee_rate) + processing_fee_fixed;
  
  -- Round to 2 decimal places
  RETURN ROUND(total_amount, 2);
END;
$$ LANGUAGE plpgsql;

-- Admin functions for affiliate dashboard

-- Function to get top referrers for admin dashboard
CREATE OR REPLACE FUNCTION admin_get_top_referrers(
  p_limit INT DEFAULT 10,
  p_days_back INT DEFAULT 30
)
RETURNS TABLE (
  user_id UUID,
  display_name TEXT,
  role user_role,
  total_earnings DECIMAL,
  direct_referrals INT,
  tier2_referrals INT,
  total_referred_artists INT,
  total_referred_venues INT
) AS $$
BEGIN
  RETURN QUERY
  WITH referrer_earnings AS (
    SELECT 
      re.referrer_user_id,
      SUM(re.earning_amount) as total_earnings,
      COUNT(DISTINCT CASE WHEN re.earning_type = 'direct_referral' THEN re.referred_entity_id END) as direct_referrals,
      COUNT(DISTINCT CASE WHEN re.earning_type = 'tier2_referral' THEN re.referred_entity_id END) as tier2_referrals
    FROM referral_earnings re
    WHERE re.created_at > NOW() - (p_days_back || ' days')::INTERVAL
    GROUP BY re.referrer_user_id
  ),
  artist_referrals AS (
    SELECT 
      referred_by_user_id,
      COUNT(*) as artist_count
    FROM artists
    WHERE referred_by_user_id IS NOT NULL
    GROUP BY referred_by_user_id
  ),
  venue_referrals AS (
    SELECT 
      referred_by_user_id,
      COUNT(*) as venue_count
    FROM venues
    WHERE referred_by_user_id IS NOT NULL
    GROUP BY referred_by_user_id
  )
  SELECT 
    up.id as user_id,
    up.display_name,
    up.role,
    COALESCE(re.total_earnings, 0) as total_earnings,
    COALESCE(re.direct_referrals, 0) as direct_referrals,
    COALESCE(re.tier2_referrals, 0) as tier2_referrals,
    COALESCE(ar.artist_count, 0) as total_referred_artists,
    COALESCE(vr.venue_count, 0) as total_referred_venues
  FROM user_profiles up
  LEFT JOIN referrer_earnings re ON up.id = re.referrer_user_id
  LEFT JOIN artist_referrals ar ON up.id = ar.referred_by_user_id
  LEFT JOIN venue_referrals vr ON up.id = vr.referred_by_user_id
  WHERE 
    COALESCE(re.total_earnings, 0) > 0 OR
    COALESCE(ar.artist_count, 0) > 0 OR
    COALESCE(vr.venue_count, 0) > 0
  ORDER BY COALESCE(re.total_earnings, 0) DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to get affiliate program summary for admin dashboard
CREATE OR REPLACE FUNCTION admin_get_affiliate_summary(
  p_days_back INT DEFAULT 30
)
RETURNS JSON AS $$
DECLARE
  summary JSON;
BEGIN
  SELECT json_build_object(
    'total_referral_earnings', COALESCE(SUM(earning_amount), 0),
    'direct_referral_earnings', COALESCE(SUM(CASE WHEN earning_type = 'direct_referral' THEN earning_amount ELSE 0 END), 0),
    'tier2_referral_earnings', COALESCE(SUM(CASE WHEN earning_type = 'tier2_referral' THEN earning_amount ELSE 0 END), 0),
    'total_referrers', COUNT(DISTINCT referrer_user_id),
    'total_referred_artists', (SELECT COUNT(*) FROM artists WHERE referred_by_user_id IS NOT NULL),
    'total_referred_venues', (SELECT COUNT(*) FROM venues WHERE referred_by_user_id IS NOT NULL),
    'total_referred_fans', (SELECT COUNT(*) FROM user_profiles WHERE referred_by_user_id IS NOT NULL AND role = 'fan'),
    'daily_earnings', (
      SELECT json_agg(
        json_build_object(
          'date', date,
          'amount', total_amount
        )
      )
      FROM (
        SELECT 
          DATE(created_at) as date,
          SUM(earning_amount) as total_amount
        FROM referral_earnings
        WHERE created_at > NOW() - (p_days_back || ' days')::INTERVAL
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at) DESC
      ) daily
    )
  ) INTO summary
  FROM referral_earnings
  WHERE created_at > NOW() - (p_days_back || ' days')::INTERVAL;
  
  RETURN summary;
END;
$$ LANGUAGE plpgsql;

-- Function to get referral conversion metrics
CREATE OR REPLACE FUNCTION admin_get_referral_conversion_metrics()
RETURNS JSON AS $$
DECLARE
  metrics JSON;
BEGIN
  SELECT json_build_object(
    'artist_conversion_rate', (
      SELECT 
        CASE 
          WHEN COUNT(*) = 0 THEN 0
          ELSE ROUND((COUNT(CASE WHEN referred_by_user_id IS NOT NULL THEN 1 END)::NUMERIC / COUNT(*)) * 100, 2)
        END
      FROM artists
    ),
    'venue_conversion_rate', (
      SELECT 
        CASE 
          WHEN COUNT(*) = 0 THEN 0
          ELSE ROUND((COUNT(CASE WHEN referred_by_user_id IS NOT NULL THEN 1 END)::NUMERIC / COUNT(*)) * 100, 2)
        END
      FROM venues
    ),
    'fan_conversion_rate', (
      SELECT 
        CASE 
          WHEN COUNT(*) = 0 THEN 0
          ELSE ROUND((COUNT(CASE WHEN referred_by_user_id IS NOT NULL THEN 1 END)::NUMERIC / COUNT(*)) * 100, 2)
        END
      FROM user_profiles
      WHERE role = 'fan'
    ),
    'avg_earnings_per_referral', (
      SELECT 
        CASE 
          WHEN COUNT(DISTINCT referred_entity_id) = 0 THEN 0
          ELSE ROUND(SUM(earning_amount) / COUNT(DISTINCT referred_entity_id), 2)
        END
      FROM referral_earnings
    ),
    'top_earning_referral_type', (
      SELECT 
        CASE
          WHEN SUM(CASE WHEN referred_entity_type = 'artist' THEN earning_amount ELSE 0 END) > 
               SUM(CASE WHEN referred_entity_type = 'venue' THEN earning_amount ELSE 0 END) AND
               SUM(CASE WHEN referred_entity_type = 'artist' THEN earning_amount ELSE 0 END) > 
               SUM(CASE WHEN referred_entity_type = 'fan' THEN earning_amount ELSE 0 END)
          THEN 'artist'
          WHEN SUM(CASE WHEN referred_entity_type = 'venue' THEN earning_amount ELSE 0 END) > 
               SUM(CASE WHEN referred_entity_type = 'fan' THEN earning_amount ELSE 0 END)
          THEN 'venue'
          ELSE 'fan'
        END
      FROM referral_earnings
    )
  ) INTO metrics;
  
  RETURN metrics;
END;
$$ LANGUAGE plpgsql;

-- Add RLS policies for admin access to referral data
CREATE POLICY "Admins can view all referral earnings" ON referral_earnings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role = 'admin'
    )
  );

-- Add comments for documentation
COMMENT ON FUNCTION get_donation_fee_structure IS 'Returns the current fee structure with 80% artist payout';
COMMENT ON FUNCTION calculate_donation_fees IS 'Calculates all fees for a donation with 80% artist payout';
COMMENT ON FUNCTION process_complete_donation IS 'Processes a donation with 80% artist payout and referral earnings';
COMMENT ON FUNCTION calculate_fan_payment_amount IS 'Calculates the total amount a fan pays including processing fees';
COMMENT ON FUNCTION admin_get_top_referrers IS 'Returns top referrers for admin dashboard';
COMMENT ON FUNCTION admin_get_affiliate_summary IS 'Returns affiliate program summary for admin dashboard';
COMMENT ON FUNCTION admin_get_referral_conversion_metrics IS 'Returns referral conversion metrics for admin dashboard';