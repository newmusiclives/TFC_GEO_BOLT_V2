// Demo client that provides mock data when in demo mode
import { createClient as createRealClient } from './client'

export const createClient = () => {
  try {
    const realClient = createRealClient()
  
    // Check if we're in demo mode
    if (typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true') {
      return createDemoClient()
    }
    
    return realClient
  } catch (error) {
    console.warn('Error creating Supabase client, falling back to demo client:', error)
    return createDemoClient()
  }
}

function createDemoClient() {
  const demoUser = typeof window !== 'undefined' ? 
    JSON.parse(localStorage.getItem('demo_user') || 'null') : null
  const demoProfile = typeof window !== 'undefined' ? 
    JSON.parse(localStorage.getItem('demo_profile') || 'null') : null

  if (process.env.NODE_ENV === 'development') {
    console.log('Demo client - user:', demoUser) // Debug log in development only
    console.log('Demo client - profile:', demoProfile) // Debug log in development only
  }

  // Mock artist data based on user role
  const mockArtistData = {
    id: demoUser?.id || 'demo-artist',
    slug: demoProfile?.role === 'admin' ? 'admin-user' : 
          demoProfile?.role === 'artist' ? 'luna-rodriguez' : 
          demoProfile?.role === 'venue_owner' ? 'blue-note-manager' : 'fan-user',
    name: demoProfile?.display_name || 'Demo User',
    bio: demoProfile?.role === 'admin' ? 
      'Platform administrator with full access to all features and analytics.' :
      demoProfile?.role === 'artist' ?
      'Acoustic storyteller with a voice that captivates audiences nationwide.' :
      demoProfile?.role === 'venue_owner' ?
      'Venue owner and manager of multiple music venues in the NYC area.' :
      'Music fan and supporter of local artists.',
    avatar_url: demoProfile?.avatar_url || 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
    banner_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    genres: demoProfile?.role === 'admin' ? ['admin'] : 
            demoProfile?.role === 'artist' ? ['indie', 'folk', 'acoustic'] : 
            demoProfile?.role === 'venue_owner' ? ['venue'] : ['fan'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    setlist: demoProfile?.role === 'artist' ? {
      id: '11111111-aaaa-1111-aaaa-111111111111',
      title: 'Acoustic Evening 2025',
      description: 'My standard acoustic set with a mix of originals and covers',
      setlist_songs: [
        { id: '1', title: 'Midnight Whispers', artist: null, is_cover: false, duration: '4:15', position: 1 },
        { id: '2', title: 'Landslide', artist: 'Fleetwood Mac', is_cover: true, duration: '3:20', position: 2 },
        { id: '3', title: 'Ocean Memories', artist: null, is_cover: false, duration: '3:45', position: 3 },
        { id: '4', title: 'Fast Car', artist: 'Tracy Chapman', is_cover: true, duration: '4:55', position: 4 },
        { id: '5', title: 'Hallelujah', artist: 'Leonard Cohen', is_cover: true, duration: '5:30', position: 5 },
        { id: '6', title: 'City Lights Fading', artist: null, is_cover: false, duration: '5:10', position: 6 },
        { id: '7', title: 'Skinny Love', artist: 'Bon Iver', is_cover: true, duration: '3:55', position: 7 },
        { id: '8', title: 'Both Sides Now', artist: 'Joni Mitchell', is_cover: true, duration: '4:05', position: 8 },
        { id: '9', title: 'Jolene', artist: 'Dolly Parton', is_cover: true, duration: '3:40', position: 9 },
        { id: '10', title: 'Whispers in the Wind', artist: null, is_cover: false, duration: '4:30', position: 10 }
      ]
    } : null,
    shows: demoProfile?.role === 'admin' ? [
      {
        id: 'show-1',
        title: 'Platform Analytics Overview',
        status: 'live',
        start_time: new Date().toISOString(),
        live_stats: { total_donations: 2450, fan_count: 156, energy_level: 92 },
        venue: { name: 'Admin Dashboard', city: 'System', state: 'Global' }
      },
      {
        id: 'show-2',
        title: 'User Management Session',
        status: 'upcoming',
        start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        live_stats: { total_donations: 0, fan_count: 0, energy_level: 0 },
        venue: { name: 'Control Center', city: 'System', state: 'Global' }
      }
    ] : demoProfile?.role === 'artist' ? [
      {
        id: 'show-1',
        title: 'Acoustic Evening with Luna Rodriguez',
        status: 'upcoming',
        setlist_id: '11111111-aaaa-1111-aaaa-111111111111',
        start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        live_stats: { total_donations: 125, fan_count: 15, energy_level: 85 },
        venue: { name: 'The Blue Note', city: 'New York', state: 'NY' }
      },
      {
        id: 'show-2',
        title: 'Summer Sunset Sessions',
        status: 'completed',
        setlist_id: '11111111-aaaa-1111-aaaa-111111111111',
        start_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        live_stats: { total_donations: 450, fan_count: 32, energy_level: 95 },
        venue: { name: 'Central Park Bandshell', city: 'New York', state: 'NY' }
      }
    ] : demoProfile?.role === 'venue_owner' ? [
      {
        id: 'show-1',
        title: 'Jazz Night at The Blue Note',
        status: 'live',
        start_time: new Date().toISOString(),
        live_stats: { total_donations: 890, fan_count: 45, energy_level: 88 },
        venue: { name: 'The Blue Note', city: 'New York', state: 'NY' },
        artist: { name: 'Luna Rodriguez', slug: 'luna-rodriguez' }
      },
      {
        id: 'show-2',
        title: 'Rock Revival Night',
        status: 'upcoming',
        start_time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
        live_stats: { total_donations: 0, fan_count: 0, energy_level: 0 },
        venue: { name: 'Underground Hall', city: 'Brooklyn', state: 'NY' },
        artist: { name: 'The Midnight Echoes', slug: 'midnight-echoes' }
      }
    ] : [], // Fans don't have shows
    donations: demoProfile?.role === 'admin' ? [
      {
        amount: 125,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      },
      {
        amount: 75,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      },
      {
        amount: 200,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      }
    ] : demoProfile?.role === 'artist' ? [
      {
        amount: 25,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      },
      {
        amount: 50,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      },
      {
        amount: 15,
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      }
    ] : demoProfile?.role === 'venue_owner' ? [
      {
        amount: 890,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      },
      {
        amount: 650,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      },
      {
        amount: 1200,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      }
    ] : [] // Fans don't receive donations
  }

  // Mock fan donation data
  const mockFanDonations = [
    {
      amount: 25,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      artist: { id: 'artist-1', name: 'Luna Rodriguez', slug: 'luna-rodriguez', avatar_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200' },
      show: { title: 'Acoustic Evening' }
    },
    {
      amount: 15,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      artist: { id: 'artist-2', name: 'The Midnight Echoes', slug: 'midnight-echoes', avatar_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200' },
      show: { title: 'Rock Revival Night' }
    },
    {
      amount: 50,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      artist: { id: 'artist-3', name: 'DJ Cosmic', slug: 'dj-cosmic', avatar_url: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=200' },
      show: { title: 'Cosmic Frequencies' }
    }
  ]

  // Create a proper query builder that supports method chaining
  function createMockQueryBuilder(table: string, columns?: string) {
    const queryBuilder = {
      eq: (column: string, value: any) => {
        console.log(`Demo query: ${table}.${column} = ${value}`)
        
        return {
          ...queryBuilder,
          single: () => {
            // Return the correct profile based on the user ID
            if (table === 'user_profiles' && column === 'id' && value === demoUser?.id) {
              console.log('Returning demo profile:', demoProfile)
              return Promise.resolve({ data: demoProfile, error: null })
            }
            // Return artist data for artist role
            if (table === 'artists' && column === 'id' && value === demoUser?.id && demoProfile?.role === 'artist') {
              return Promise.resolve({ data: mockArtistData, error: null })
            }
            return Promise.resolve({ data: null, error: null })
          },
          limit: (count: number) => {
            // Return fan donations for fan role
            if (table === 'donations' && column === 'donor_id' && value === demoUser?.id && demoProfile?.role === 'fan') {
              return Promise.resolve({ data: mockFanDonations, error: null })
            }
            // Return artist donations for artist role
            if (table === 'donations' && column === 'artist_id' && value === demoUser?.id && demoProfile?.role === 'artist') {
              return Promise.resolve({ data: mockArtistData.donations, error: null })
            }
            return Promise.resolve({ data: [], error: null })
          },
          order: (orderColumn: string, options?: any) => ({
            ...queryBuilder,
            limit: (count: number) => {
              // Return fan donations for fan role
              if (table === 'donations' && column === 'donor_id' && value === demoUser?.id && demoProfile?.role === 'fan') {
                return Promise.resolve({ data: mockFanDonations, error: null })
              }
              // Return artist donations for artist role
              if (table === 'donations' && column === 'artist_id' && value === demoUser?.id && demoProfile?.role === 'artist') {
                return Promise.resolve({ data: mockArtistData.donations, error: null })
              }
              return Promise.resolve({ data: [], error: null })
            }
          })
        }
      },
      limit: (count: number) => Promise.resolve({ data: [], error: null }),
      order: (column: string, options?: any) => ({
        ...queryBuilder,
        limit: (count: number) => {
          if (table === 'shows' && column === 'start_time') {
            return Promise.resolve({ data: mockArtistData.shows, error: null })
          }
          return Promise.resolve({ data: [], error: null })
        }
      })
    }
    
    return queryBuilder
  }

  return {
    auth: {
      getUser: () => {
        console.log('Demo auth.getUser returning:', demoUser)
        return Promise.resolve({ 
          data: { user: demoUser }, 
          error: null 
        })
      },
      signUp: (credentials: any) => Promise.resolve({ 
        data: { user: demoUser }, 
        error: null 
      }),
      signInWithPassword: (credentials: any) => Promise.resolve({ 
        data: { user: demoUser }, 
        error: null 
      }),
      signOut: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('demo_user')
          localStorage.removeItem('demo_profile')
          localStorage.removeItem('demo_mode')
        }
        return Promise.resolve({ error: null })
      }
    },
    from: (table: string) => ({
      select: (columns?: string) => createMockQueryBuilder(table, columns),
      insert: (values: any) => ({
        select: () => ({
          single: () => Promise.resolve({ data: demoProfile, error: null })
        })
      }),
      update: (values: any) => ({
        eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
      }),
      delete: () => ({
        eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
      })
    }),
    rpc: (functionName: string, params?: any) => {
      console.log(`🎭 Demo RPC call: ${functionName}`, params)
      return Promise.resolve({ data: [], error: null })
    },
    channel: (name: string) => ({
      on: (event: string, callback: Function) => ({
        on: (event: string, callback: Function) => ({
          subscribe: (callback?: Function) => {
            console.log(`🎭 Demo subscription: ${name}`)
            return { unsubscribe: () => {} }
          }
        })
      }),
      send: (event: string, payload: any) => Promise.resolve('ok'),
      subscribe: (callback?: Function) => ({ unsubscribe: () => {} })
    }),
    removeChannel: (channel: any) => Promise.resolve('ok'),
    functions: {
      invoke: (functionName: string, options?: any) => {
        console.log(`🎭 Demo function call: ${functionName}`, options)
        return Promise.resolve({ data: null, error: null })
      }
    }
  } as any
}