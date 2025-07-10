/*
  # Update Payment Distribution for Manifest Financial Integration

  1. Update net_amount calculation to include referral fees
    - Current: amount - platform_fee - processing_fee
    - New: amount - platform_fee - processing_fee - referral_fees (5% total)
    - Artist receives: 87.1% of gross donation (amount * 0.871)

  2. Add referral_fees column to track total referral deductions
  3. Update donation constants to reflect new fee structure
*/

-- Add referral_fees column to donations table
ALTER TABLE donations 
ADD COLUMN referral_fees DECIMAL(10,2) DEFAULT 0 CHECK (referral_fees >= 0);

-- Drop the existing generated column
ALTER TABLE donations 
DROP COLUMN net_amount;

-- Re-add net_amount with updated calculation including referral fees
ALTER TABLE donations 
ADD COLUMN net_amount DECIMAL(10,2) GENERATED ALWAYS AS (
  amount - platform_fee - processing_fee - referral_fees
) STORED;

-- Add index for referral_fees queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_donations_referral_fees ON donations(referral_fees);

-- Update donation constants function
CREATE OR REPLACE FUNCTION get_donation_fee_structure()
RETURNS JSON AS $$
BEGIN
  RETURN json_build_object(
    'platform_fee_rate', 0.05,
    'processing_fee_rate', 0.029,
    'referral_fee_rate', 0.05,
    'total_fee_rate', 0.129,
    'artist_payout_rate', 0.871,
    'description', 'Platform: 5%, Processing: 2.9%, Referrals: 5% (2.5% direct + 2.5% tier2), Artist: 87.1%'
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
  referral_fees DECIMAL;
  net_amount DECIMAL;
BEGIN
  platform_fee = p_amount * 0.05;
  processing_fee = p_amount * 0.029;
  referral_fees = p_amount * 0.05; -- 2.5% direct + 2.5% tier2
  net_amount = p_amount - platform_fee - processing_fee - referral_fees;
  
  RETURN json_build_object(
    'gross_amount', p_amount,
    'platform_fee', platform_fee,
    'processing_fee', processing_fee,
    'referral_fees', referral_fees,
    'net_amount', net_amount,
    'artist_payout_percentage', (net_amount / p_amount * 100)
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
  referral_fees DECIMAL;
  referral_result JSON;
BEGIN
  -- Calculate fees
  platform_fee = p_amount * 0.05;
  processing_fee = p_amount * 0.029;
  referral_fees = p_amount * 0.05; -- Will be distributed by process_referral_earnings
  
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
    'net_amount', p_amount - platform_fee - processing_fee - referral_fees,
    'referral_earnings', referral_result,
    'status', 'completed'
  );
END;
$$ LANGUAGE plpgsql;

-- Add comments for documentation
COMMENT ON COLUMN donations.referral_fees IS 'Total referral fees (5% of gross amount, split between direct and tier2 referrers)';
COMMENT ON FUNCTION get_donation_fee_structure IS 'Returns the current fee structure for donations';
COMMENT ON FUNCTION calculate_donation_fees IS 'Calculates all fees for a given donation amount';
COMMENT ON FUNCTION process_complete_donation IS 'Processes a complete donation including all fees and referral earnings';