/*
  # Seed Data for TrueFans GeoConnect

  This file contains sample data for development and testing:
  - Sample venues with real coordinates
  - Sample artists with different genres
  - Sample shows with various statuses
  - Sample user profiles and donations

  Note: This is for development only. Production will use real data.
*/

-- Insert sample user profiles (these would normally be created via Supabase Auth)
INSERT INTO user_profiles (id, role, display_name, avatar_url) VALUES
  ('11111111-1111-1111-1111-111111111111', 'artist', 'Luna Rodriguez', 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('22222222-2222-2222-2222-222222222222', 'artist', 'The Midnight Echoes', 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('33333333-3333-3333-3333-333333333333', 'artist', 'DJ Cosmic', 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=200'),
  ('44444444-4444-4444-4444-444444444444', 'venue_owner', 'Blue Note Manager', NULL),
  ('55555555-5555-5555-5555-555555555555', 'fan', 'Sarah Johnson', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150');

-- Insert sample artists
INSERT INTO artists (
  id, slug, name, bio, avatar_url, banner_url, genres, is_verified, 
  social_links, payment_settings
) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'luna-rodriguez',
    'Luna Rodriguez',
    'Acoustic storyteller with a voice that captivates audiences nationwide. Luna combines folk traditions with modern indie sensibilities to create deeply personal and universally relatable music.',
    'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    ARRAY['indie', 'folk', 'acoustic'],
    true,
    '{"spotify": "https://open.spotify.com/artist/luna", "instagram": "@lunamusic", "website": "https://lunamusic.com"}',
    '{"instant_payouts": true, "minimum_payout": 5.00, "default_amounts": [5, 10, 25, 50]}'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'midnight-echoes',
    'The Midnight Echoes',
    'Four-piece alternative rock band bringing raw energy and honest lyrics to every stage. Known for their dynamic live performances and connection with their audience.',
    'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    ARRAY['rock', 'alternative', 'indie'],
    false,
    '{"bandcamp": "https://midnightechoes.bandcamp.com", "facebook": "MidnightEchoesBand"}',
    '{"instant_payouts": false, "minimum_payout": 10.00, "default_amounts": [10, 20, 35, 50]}'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'dj-cosmic',
    'DJ Cosmic',
    'Electronic music producer and DJ creating otherworldly soundscapes that transport listeners to new dimensions. Specializes in ambient techno and experimental electronic music.',
    'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
    ARRAY['electronic', 'techno', 'ambient'],
    true,
    '{"soundcloud": "https://soundcloud.com/djcosmic", "mixcloud": "https://mixcloud.com/djcosmic"}',
    '{"instant_payouts": true, "minimum_payout": 1.00, "default_amounts": [5, 15, 30, 75]}'
  );

-- Insert sample venues with real coordinates (NYC area)
INSERT INTO venues (
  name, slug, address, city, state, country, location, capacity, venue_type, 
  description, images, timezone
) VALUES
  (
    'The Blue Note',
    'blue-note-nyc',
    '131 W 3rd St',
    'New York',
    'NY',
    'US',
    ST_SetSRID(ST_Point(-74.0006, 40.7295), 4326),
    200,
    'music_venue',
    'Intimate jazz club in the heart of Greenwich Village, known for showcasing both legendary and emerging artists.',
    ARRAY['https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'],
    'America/New_York'
  ),
  (
    'Underground Hall',
    'underground-hall',
    '456 Brooklyn Ave',
    'Brooklyn',
    'NY', 
    'US',
    ST_SetSRID(ST_Point(-73.9442, 40.6782), 4326),
    350,
    'club',
    'Raw, industrial venue perfect for rock and alternative acts. Known for its incredible sound system and intimate atmosphere.',
    ARRAY['https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400'],
    'America/New_York'
  ),
  (
    'Electric Garden',
    'electric-garden',
    '789 Dance Floor St',
    'Manhattan',
    'NY',
    'US', 
    ST_SetSRID(ST_Point(-73.9857, 40.7589), 4326),
    500,
    'club',
    'Premier electronic music venue with state-of-the-art lighting and sound. Home to the citys best DJ sets and live electronic performances.',
    ARRAY['https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400'],
    'America/New_York'
  ),
  (
    'Central Park Bandshell',
    'central-park-bandshell',
    'Central Park',
    'New York',
    'NY',
    'US',
    ST_SetSRID(ST_Point(-73.9654, 40.7829), 4326),
    1000,
    'outdoor',
    'Iconic outdoor venue in Central Park, perfect for summer concerts and festivals.',
    ARRAY['https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400'],
    'America/New_York'
  );

-- Insert sample shows
INSERT INTO shows (
  artist_id, venue_id, title, description, start_time, end_time, door_time, 
  status, genre, ticket_price, is_free, live_stats
) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    (SELECT id FROM venues WHERE slug = 'blue-note-nyc'),
    'Acoustic Evening with Luna Rodriguez',
    'An intimate evening of storytelling through song. Luna will perform songs from her latest album plus some unreleased acoustic arrangements.',
    NOW() + INTERVAL '2 hours',
    NOW() + INTERVAL '4 hours',
    NOW() + INTERVAL '1 hour',
    'upcoming',
    'acoustic',
    25.00,
    false,
    '{"total_donations": 0, "donation_count": 0, "fan_count": 0, "energy_level": 0}'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    (SELECT id FROM venues WHERE slug = 'underground-hall'),
    'Rock Revival Night',
    'The Midnight Echoes bring their electrifying energy to Underground Hall for a night of pure rock and roll.',
    NOW() + INTERVAL '1 day',
    NOW() + INTERVAL '1 day 3 hours',
    NOW() + INTERVAL '1 day' - INTERVAL '30 minutes',
    'upcoming',
    'rock',
    35.00,
    false,
    '{"total_donations": 0, "donation_count": 0, "fan_count": 0, "energy_level": 0}'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    (SELECT id FROM venues WHERE slug = 'electric-garden'),
    'Cosmic Frequencies',
    'DJ Cosmic takes you on a journey through space and time with his signature ambient techno sets.',
    NOW() + INTERVAL '3 days',
    NOW() + INTERVAL '3 days 4 hours',
    NOW() + INTERVAL '3 days' - INTERVAL '1 hour',
    'upcoming',
    'electronic',
    40.00,
    false,
    '{"total_donations": 0, "donation_count": 0, "fan_count": 0, "energy_level": 0}'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    (SELECT id FROM venues WHERE slug = 'central-park-bandshell'),
    'Summer Sunset Sessions',
    'Free outdoor concert series featuring local and touring artists. Luna opens the summer season.',
    NOW() + INTERVAL '1 week',
    NOW() + INTERVAL '1 week 2 hours',
    NOW() + INTERVAL '1 week' - INTERVAL '30 minutes',
    'upcoming',
    'folk',
    0.00,
    true,
    '{"total_donations": 0, "donation_count": 0, "fan_count": 0, "energy_level": 0}'
  );

-- Insert sample donations
INSERT INTO donations (
  show_id, artist_id, donor_id, amount, currency, platform_fee, processing_fee,
  donor_name, donor_email, donor_message, is_anonymous, status, created_at
) VALUES
  (
    (SELECT id FROM shows WHERE title = 'Acoustic Evening with Luna Rodriguez'),
    '11111111-1111-1111-1111-111111111111',
    '55555555-5555-5555-5555-555555555555',
    25.00,
    'USD',
    1.25,
    0.75,
    'Sarah Johnson',
    'sarah@example.com',
    'Love your music! Keep creating beautiful art.',
    false,
    'completed',
    NOW() - INTERVAL '2 days'
  ),
  (
    (SELECT id FROM shows WHERE title = 'Rock Revival Night'),
    '22222222-2222-2222-2222-222222222222',
    NULL,
    15.00,
    'USD',
    0.75,
    0.45,
    'Anonymous Fan',
    NULL,
    'Amazing energy tonight!',
    true,
    'completed',
    NOW() - INTERVAL '1 day'
  ),
  (
    (SELECT id FROM shows WHERE title = 'Cosmic Frequencies'),
    '33333333-3333-3333-3333-333333333333',
    '55555555-5555-5555-5555-555555555555',
    50.00,
    'USD',
    2.50,
    1.50,
    'Sarah Johnson',
    'sarah@example.com',
    'This set was transcendent! Thank you for the journey.',
    false,
    'completed',
    NOW() - INTERVAL '3 hours'
  );

-- Insert sample activity feed entries
INSERT INTO activity_feed (
  show_id, artist_id, activity_type, amount, message, display_name, is_anonymous
) VALUES
  (
    (SELECT id FROM shows WHERE title = 'Acoustic Evening with Luna Rodriguez'),
    '11111111-1111-1111-1111-111111111111',
    'donation',
    25.00,
    'Love your music! Keep creating beautiful art.',
    'Sarah J.',
    false
  ),
  (
    (SELECT id FROM shows WHERE title = 'Rock Revival Night'),
    '22222222-2222-2222-2222-222222222222',
    'donation',
    15.00,
    'Amazing energy tonight!',
    'Anonymous Fan',
    true
  ),
  (
    (SELECT id FROM shows WHERE title = 'Cosmic Frequencies'),
    '33333333-3333-3333-3333-333333333333',
    'fan_checkin',
    NULL,
    'Just arrived! So excited for this set.',
    'Music Lover',
    false
  ),
  (
    (SELECT id FROM shows WHERE title = 'Cosmic Frequencies'),
    '33333333-3333-3333-3333-333333333333',
    'donation',
    50.00,
    'This set was transcendent! Thank you for the journey.',
    'Sarah J.',
    false
  );