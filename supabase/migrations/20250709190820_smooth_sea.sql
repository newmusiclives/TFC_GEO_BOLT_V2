/*
  # Sample Setlist for Luna Rodriguez

  1. New Data
    - Creates a sample setlist for Luna Rodriguez with 10 songs
    - Includes 4 original songs and 6 cover songs
    - Adds the setlist to her upcoming show

  2. Content
    - Setlist titled "Acoustic Evening 2025"
    - Mix of folk, indie, and acoustic covers
    - Properly formatted with durations
*/

-- Create a setlist for Luna Rodriguez
INSERT INTO setlists (id, artist_id, title, description, is_template, created_at, updated_at)
VALUES (
  '11111111-aaaa-1111-aaaa-111111111111',
  '11111111-1111-1111-1111-111111111111',
  'Acoustic Evening 2025',
  'My standard acoustic set with a mix of originals and covers',
  true,
  NOW(),
  NOW()
);

-- Add songs to the setlist
INSERT INTO setlist_songs (setlist_id, title, artist, is_cover, duration, position, notes)
VALUES
  -- Original songs
  (
    '11111111-aaaa-1111-aaaa-111111111111',
    'Midnight Whispers',
    NULL,
    false,
    '4:15',
    1,
    'Opening song, start with soft guitar'
  ),
  (
    '11111111-aaaa-1111-aaaa-111111111111',
    'Ocean Memories',
    NULL,
    false,
    '3:45',
    3,
    'Key of G, use capo on 3rd fret'
  ),
  (
    '11111111-aaaa-1111-aaaa-111111111111',
    'City Lights Fading',
    NULL,
    false,
    '5:10',
    6,
    'Mid-tempo, audience participation on chorus'
  ),
  (
    '11111111-aaaa-1111-aaaa-111111111111',
    'Whispers in the Wind',
    NULL,
    false,
    '4:30',
    10,
    'Closing song, full dynamics'
  ),
  
  -- Cover songs
  (
    '11111111-aaaa-1111-aaaa-111111111111',
    'Landslide',
    'Fleetwood Mac',
    true,
    '3:20',
    2,
    'Stripped down arrangement'
  ),
  (
    '11111111-aaaa-1111-aaaa-111111111111',
    'Fast Car',
    'Tracy Chapman',
    true,
    '4:55',
    4,
    'Standard tuning, capo on 2nd fret'
  ),
  (
    '11111111-aaaa-1111-aaaa-111111111111',
    'Hallelujah',
    'Leonard Cohen',
    true,
    '5:30',
    5,
    'Use Jeff Buckley arrangement'
  ),
  (
    '11111111-aaaa-1111-aaaa-111111111111',
    'Skinny Love',
    'Bon Iver',
    true,
    '3:55',
    7,
    'Alternate tuning'
  ),
  (
    '11111111-aaaa-1111-aaaa-111111111111',
    'Both Sides Now',
    'Joni Mitchell',
    true,
    '4:05',
    8,
    'Key of D'
  ),
  (
    '11111111-aaaa-1111-aaaa-111111111111',
    'Jolene',
    'Dolly Parton',
    true,
    '3:40',
    9,
    'Slightly faster tempo than original'
  );

-- Assign the setlist to Luna's upcoming show
UPDATE shows
SET setlist_id = '11111111-aaaa-1111-aaaa-111111111111'
WHERE id = (
  SELECT id FROM shows 
  WHERE artist_id = '11111111-1111-1111-1111-111111111111' 
  AND status = 'upcoming'
  LIMIT 1
);

-- Add a few sample song requests
INSERT INTO song_requests (show_id, song_id, fan_id, fan_name, dedication, is_anonymous, status, created_at)
VALUES
  (
    (SELECT id FROM shows WHERE artist_id = '11111111-1111-1111-1111-111111111111' AND status = 'upcoming' LIMIT 1),
    (SELECT id FROM setlist_songs WHERE title = 'Hallelujah' AND setlist_id = '11111111-aaaa-1111-aaaa-111111111111'),
    '55555555-5555-5555-5555-555555555555',
    'Sarah Johnson',
    'This song reminds me of our first date. Love you, Mike!',
    false,
    'pending',
    NOW() - INTERVAL '30 minutes'
  ),
  (
    (SELECT id FROM shows WHERE artist_id = '11111111-1111-1111-1111-111111111111' AND status = 'upcoming' LIMIT 1),
    (SELECT id FROM setlist_songs WHERE title = 'Fast Car' AND setlist_id = '11111111-aaaa-1111-aaaa-111111111111'),
    NULL,
    'Music Lover',
    'Your version of this song is even better than the original!',
    true,
    'pending',
    NOW() - INTERVAL '15 minutes'
  ),
  (
    (SELECT id FROM shows WHERE artist_id = '11111111-1111-1111-1111-111111111111' AND status = 'upcoming' LIMIT 1),
    (SELECT id FROM setlist_songs WHERE title = 'Midnight Whispers' AND setlist_id = '11111111-aaaa-1111-aaaa-111111111111'),
    NULL,
    'Biggest Fan',
    'This song changed my life. Thank you for writing it.',
    false,
    'pending',
    NOW() - INTERVAL '5 minutes'
  );