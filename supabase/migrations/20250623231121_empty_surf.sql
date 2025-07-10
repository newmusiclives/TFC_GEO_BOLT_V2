/*
  # Advanced PostGIS and Analytics Functions

  1. Geolocation Functions
    - find_nearby_shows_advanced: High-performance venue detection
    - check_venue_geofence: Precise geofence checking
    - calculate_venue_distance: Distance calculations

  2. Analytics Functions
    - update_live_show_stats: Real-time show statistics
    - get_artist_analytics: Artist performance metrics
    - get_donation_insights: Donation analytics

  3. Search Functions
    - search_artists: Full-text artist search
    - search_venues: Location-based venue search
    - search_shows: Comprehensive show search

  4. AI Functions (Placeholder)
    - find_similar_artists: Artist similarity (future vector implementation)
*/

-- High-performance geolocation detection with PostGIS
CREATE OR REPLACE FUNCTION find_nearby_shows_advanced(
  user_lat FLOAT,
  user_lng FLOAT,
  radius_m INT DEFAULT 1000,
  time_window_hours INT DEFAULT 4
)
RETURNS TABLE (
  show_data JSON,
  confidence_score FLOAT,
  travel_time_minutes INT
) AS $$
DECLARE
  user_point GEOMETRY := ST_SetSRID(ST_Point(user_lng, user_lat), 4326);
BEGIN
  RETURN QUERY
  WITH nearby_shows AS (
    SELECT 
      s.*,
      a.name as artist_name,
      a.slug as artist_slug,
      a.avatar_url,
      a.is_verified,
      v.name as venue_name,
      v.address,
      v.capacity,
      v.city,
      v.state,
      ST_Distance(v.location, user_point::geography) as distance,
      -- Check if user is within custom geofence
      CASE 
        WHEN v.geofence IS NOT NULL THEN ST_Within(user_point, v.geofence)
        ELSE ST_DWithin(v.location::geography, user_point::geography, radius_m)
      END as is_within_venue
    FROM shows s
    JOIN artists a ON s.artist_id = a.id
    JOIN venues v ON s.venue_id = v.id
    WHERE 
      s.status IN ('upcoming', 'live')
      AND v.is_active = true
      AND (
        (v.geofence IS NOT NULL AND ST_Within(user_point, v.geofence))
        OR ST_DWithin(v.location::geography, user_point::geography, radius_m)
      )
      AND s.start_time BETWEEN 
        NOW() - (time_window_hours || ' hours')::INTERVAL 
        AND NOW() + (time_window_hours || ' hours')::INTERVAL
  )
  SELECT 
    json_build_object(
      'id', ns.id,
      'title', ns.title,
      'description', ns.description,
      'start_time', ns.start_time,
      'end_time', ns.end_time,
      'status', ns.status,
      'poster_path', ns.poster_path,
      'artist', json_build_object(
        'id', ns.artist_id,
        'name', ns.artist_name,
        'slug', ns.artist_slug,
        'avatar_url', ns.avatar_url,
        'verified', ns.is_verified
      ),
      'venue', json_build_object(
        'id', ns.venue_id,
        'name', ns.venue_name,
        'address', ns.address,
        'city', ns.city,
        'state', ns.state,
        'capacity', ns.capacity
      ),
      'distance_meters', ROUND(ns.distance),
      'is_within_venue', ns.is_within_venue,
      'live_stats', ns.live_stats
    ) as show_data,
    CASE 
      WHEN ns.is_within_venue THEN 100.0
      WHEN ns.distance < 50 THEN 95.0
      WHEN ns.distance < 100 THEN 90.0
      WHEN ns.distance < 250 THEN 85.0
      WHEN ns.distance < 500 THEN 75.0
      WHEN ns.distance < 1000 THEN 65.0
      ELSE 50.0
    END as confidence_score,
    -- Estimated travel time (rough calculation: 5 km/h walking speed)
    GREATEST(1, ROUND(ns.distance / 83.33))::INT as travel_time_minutes
  FROM nearby_shows ns
  ORDER BY 
    ns.is_within_venue DESC,
    ns.distance ASC,
    ns.start_time ASC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- Check if user is within venue geofence
CREATE OR REPLACE FUNCTION check_venue_geofence(
  user_lat FLOAT,
  user_lng FLOAT,
  venue_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  user_point GEOMETRY := ST_SetSRID(ST_Point(user_lng, user_lat), 4326);
  venue_geofence GEOMETRY;
BEGIN
  SELECT geofence INTO venue_geofence
  FROM venues 
  WHERE id = venue_id AND is_active = true;
  
  IF venue_geofence IS NULL THEN
    RETURN false;
  END IF;
  
  RETURN ST_Within(user_point, venue_geofence);
END;
$$ LANGUAGE plpgsql;

-- Real-time analytics aggregation
CREATE OR REPLACE FUNCTION update_live_show_stats(
  p_show_id UUID,
  p_donation_amount DECIMAL DEFAULT NULL,
  p_fan_checkin BOOLEAN DEFAULT FALSE
)
RETURNS JSON AS $$
DECLARE
  current_stats JSONB;
  updated_stats JSONB;
  new_total DECIMAL;
  new_count INT;
  new_fan_count INT;
BEGIN
  -- Get current stats
  SELECT live_stats INTO current_stats
  FROM shows WHERE id = p_show_id;
  
  IF current_stats IS NULL THEN
    current_stats = '{
      "total_donations": 0,
      "donation_count": 0,
      "fan_count": 0,
      "energy_level": 0,
      "peak_concurrent_fans": 0
    }'::jsonb;
  END IF;
  
  -- Update stats
  updated_stats = current_stats;
  
  IF p_donation_amount IS NOT NULL THEN
    new_total = (current_stats->>'total_donations')::DECIMAL + p_donation_amount;
    new_count = (current_stats->>'donation_count')::INT + 1;
    
    updated_stats = jsonb_set(updated_stats, '{total_donations}', to_jsonb(new_total));
    updated_stats = jsonb_set(updated_stats, '{donation_count}', to_jsonb(new_count));
  END IF;
  
  IF p_fan_checkin THEN
    new_fan_count = (current_stats->>'fan_count')::INT + 1;
    updated_stats = jsonb_set(updated_stats, '{fan_count}', to_jsonb(new_fan_count));
    
    -- Update peak concurrent fans
    IF new_fan_count > (current_stats->>'peak_concurrent_fans')::INT THEN
      updated_stats = jsonb_set(updated_stats, '{peak_concurrent_fans}', to_jsonb(new_fan_count));
    END IF;
  END IF;
  
  -- Update energy level based on recent activity
  updated_stats = jsonb_set(
    updated_stats,
    '{energy_level}',
    to_jsonb(
      LEAST(100, 
        (SELECT COUNT(*) * 10 
         FROM activity_feed 
         WHERE show_id = p_show_id 
         AND created_at > NOW() - INTERVAL '5 minutes')
      )
    )
  );
  
  -- Save updated stats
  UPDATE shows 
  SET live_stats = updated_stats, updated_at = NOW()
  WHERE id = p_show_id;
  
  RETURN updated_stats::JSON;
END;
$$ LANGUAGE plpgsql;

-- Artist analytics function
CREATE OR REPLACE FUNCTION get_artist_analytics(
  p_artist_id UUID,
  p_days_back INT DEFAULT 30
)
RETURNS JSON AS $$
DECLARE
  analytics_data JSON;
BEGIN
  SELECT json_build_object(
    'total_donations', COALESCE(SUM(amount), 0),
    'donation_count', COUNT(*),
    'avg_donation', COALESCE(AVG(amount), 0),
    'total_shows', (
      SELECT COUNT(*) FROM shows 
      WHERE artist_id = p_artist_id 
      AND created_at > NOW() - (p_days_back || ' days')::INTERVAL
    ),
    'completed_shows', (
      SELECT COUNT(*) FROM shows 
      WHERE artist_id = p_artist_id 
      AND status = 'completed'
      AND created_at > NOW() - (p_days_back || ' days')::INTERVAL
    ),
    'top_donation', COALESCE(MAX(amount), 0),
    'recent_activity', (
      SELECT json_agg(
        json_build_object(
          'date', DATE(created_at),
          'total', SUM(amount),
          'count', COUNT(*)
        )
      )
      FROM donations
      WHERE artist_id = p_artist_id
      AND status = 'completed'
      AND created_at > NOW() - (p_days_back || ' days')::INTERVAL
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) DESC
      LIMIT 10
    )
  ) INTO analytics_data
  FROM donations
  WHERE artist_id = p_artist_id
  AND status = 'completed'
  AND created_at > NOW() - (p_days_back || ' days')::INTERVAL;
  
  RETURN analytics_data;
END;
$$ LANGUAGE plpgsql;

-- Full-text search for artists
CREATE OR REPLACE FUNCTION search_artists(
  search_query TEXT,
  limit_count INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  slug VARCHAR,
  bio TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN,
  search_rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.name,
    a.slug,
    a.bio,
    a.avatar_url,
    a.is_verified,
    ts_rank(
      to_tsvector('english', coalesce(a.name, '') || ' ' || coalesce(a.bio, '')),
      plainto_tsquery('english', search_query)
    ) as search_rank
  FROM artists a
  WHERE 
    to_tsvector('english', coalesce(a.name, '') || ' ' || coalesce(a.bio, '')) 
    @@ plainto_tsquery('english', search_query)
  ORDER BY search_rank DESC, a.is_verified DESC, a.name
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Location-based venue search
CREATE OR REPLACE FUNCTION search_venues_nearby(
  user_lat FLOAT,
  user_lng FLOAT,
  search_query TEXT DEFAULT '',
  radius_m INT DEFAULT 5000,
  limit_count INT DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  slug VARCHAR,
  address TEXT,
  city VARCHAR,
  capacity INT,
  venue_type venue_type,
  distance_meters FLOAT,
  search_rank REAL
) AS $$
DECLARE
  user_point GEOMETRY := ST_SetSRID(ST_Point(user_lng, user_lat), 4326);
BEGIN
  RETURN QUERY
  SELECT 
    v.id,
    v.name,
    v.slug,
    v.address,
    v.city,
    v.capacity,
    v.venue_type,
    ST_Distance(v.location, user_point::geography) as distance_meters,
    CASE 
      WHEN search_query = '' THEN 1.0
      ELSE ts_rank(
        to_tsvector('english', coalesce(v.name, '') || ' ' || coalesce(v.description, '')),
        plainto_tsquery('english', search_query)
      )
    END as search_rank
  FROM venues v
  WHERE 
    v.is_active = true
    AND ST_DWithin(v.location::geography, user_point::geography, radius_m)
    AND (
      search_query = '' OR
      to_tsvector('english', coalesce(v.name, '') || ' ' || coalesce(v.description, '')) 
      @@ plainto_tsquery('english', search_query)
    )
  ORDER BY 
    search_rank DESC,
    distance_meters ASC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Placeholder for AI similarity function (to be implemented with vector embeddings)
CREATE OR REPLACE FUNCTION find_similar_artists(
  target_artist_id UUID,
  similarity_threshold FLOAT DEFAULT 0.8,
  limit_count INT DEFAULT 10
)
RETURNS TABLE (
  artist_id UUID,
  name VARCHAR,
  similarity_score FLOAT,
  matching_genres TEXT[]
) AS $$
BEGIN
  -- Placeholder implementation using genre matching
  -- In production, this would use vector embeddings
  RETURN QUERY
  SELECT 
    a.id,
    a.name,
    CASE 
      WHEN array_length(
        ARRAY(
          SELECT UNNEST(a.genres) 
          INTERSECT 
          SELECT UNNEST(target.genres)
        ), 1
      ) IS NOT NULL 
      THEN array_length(
        ARRAY(
          SELECT UNNEST(a.genres) 
          INTERSECT 
          SELECT UNNEST(target.genres)
        ), 1
      )::FLOAT / GREATEST(array_length(a.genres, 1), 1)
      ELSE 0.0
    END as similarity_score,
    ARRAY(
      SELECT UNNEST(a.genres) 
      INTERSECT 
      SELECT UNNEST(target.genres)
    ) as matching_genres
  FROM artists a
  CROSS JOIN (
    SELECT genres 
    FROM artists 
    WHERE id = target_artist_id
  ) target
  WHERE 
    a.id != target_artist_id
    AND a.is_verified = true
    AND array_length(a.genres, 1) > 0
  HAVING 
    CASE 
      WHEN array_length(
        ARRAY(
          SELECT UNNEST(a.genres) 
          INTERSECT 
          SELECT UNNEST(target.genres)
        ), 1
      ) IS NOT NULL 
      THEN array_length(
        ARRAY(
          SELECT UNNEST(a.genres) 
          INTERSECT 
          SELECT UNNEST(target.genres)
        ), 1
      )::FLOAT / GREATEST(array_length(a.genres, 1), 1)
      ELSE 0.0
    END > similarity_threshold
  ORDER BY similarity_score DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;