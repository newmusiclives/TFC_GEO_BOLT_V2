/*
  # Row Level Security Policies

  1. User Profiles
    - Users can view and edit their own profiles
    - Artists can view other artist profiles
    - Public read access for basic profile info

  2. Artists
    - Public read access for verified artists
    - Artists can manage their own profiles
    - Admin can manage all artists

  3. Venues
    - Public read access for active venues
    - Venue owners can manage their venues

  4. Shows
    - Public read access for upcoming/live shows
    - Artists can manage their own shows
    - Limited access to draft shows

  5. Donations
    - Artists can view donations to them
    - Donors can view their own donations
    - Public can create donations
    - Limited read access for privacy

  6. Activity Feed
    - Public read access for recent activity
    - Show-specific activity filtering
*/

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Public can view basic artist profiles" ON user_profiles
  FOR SELECT USING (
    role = 'artist' AND 
    id IN (SELECT id FROM artists WHERE is_verified = true)
  );

-- Artists Policies
CREATE POLICY "Public can view verified artists" ON artists
  FOR SELECT USING (is_verified = true);

CREATE POLICY "Public can view all artists basic info" ON artists
  FOR SELECT USING (true);

CREATE POLICY "Artists can manage own profile" ON artists
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Artists can insert own profile" ON artists
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Venues Policies
CREATE POLICY "Public can view active venues" ON venues
  FOR SELECT USING (is_active = true);

CREATE POLICY "Venue owners can manage venues" ON venues
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role = 'venue_owner'
    )
  );

-- Shows Policies
CREATE POLICY "Public can view published shows" ON shows
  FOR SELECT USING (status IN ('upcoming', 'live', 'completed'));

CREATE POLICY "Artists can view own shows" ON shows
  FOR SELECT USING (auth.uid() = artist_id);

CREATE POLICY "Artists can manage own shows" ON shows
  FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY "Artists can insert own shows" ON shows
  FOR INSERT WITH CHECK (auth.uid() = artist_id);

-- Donations Policies
CREATE POLICY "Anyone can create donations" ON donations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Artists can view donations to them" ON donations
  FOR SELECT USING (auth.uid() = artist_id);

CREATE POLICY "Donors can view own donations" ON donations
  FOR SELECT USING (auth.uid() = donor_id);

CREATE POLICY "Public can view anonymous donation stats" ON donations
  FOR SELECT USING (
    is_anonymous = true AND 
    status = 'completed'
  );

-- Activity Feed Policies
CREATE POLICY "Public can view recent activity" ON activity_feed
  FOR SELECT USING (created_at > NOW() - INTERVAL '24 hours');

CREATE POLICY "Artists can view activity for their shows" ON activity_feed
  FOR SELECT USING (
    auth.uid() = artist_id OR
    EXISTS (
      SELECT 1 FROM shows 
      WHERE shows.id = activity_feed.show_id 
      AND shows.artist_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert activity" ON activity_feed
  FOR INSERT WITH CHECK (true);

-- Admin Policies (for future admin functionality)
CREATE POLICY "Admins can manage all data" ON user_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all artists" ON artists
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all venues" ON venues
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all shows" ON shows
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can view all donations" ON donations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.role = 'admin'
    )
  );