// Supabase configuration with proper environment variable handling
export const supabaseConfig = {
  url: typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_SUPABASE_URL || '') : '',
  anonKey: typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '') : '',
  serviceRoleKey: typeof process !== 'undefined' ? (process.env.SUPABASE_SERVICE_ROLE_KEY || '') : ''
}

// Validate configuration with proper URL validation
export const isSupabaseConfigured = () => {
  const { url, anonKey } = supabaseConfig
  
  // Check if values exist and are not placeholder values
  if (!url || !anonKey || url === '' || anonKey === '') return false
  
  // Check for common placeholder patterns
  const placeholderPatterns = [
    'your-project.supabase.co',
    'your-supabase-project-url',
    'your-project-url',
    'your-project-ref.supabase.co',
    'your-anon-key',
    'your-service-role-key',
    'placeholder',
    'example.com'
  ]
  
  // Check both URL and anonKey for placeholder patterns
  const isUrlPlaceholder = placeholderPatterns.some(pattern => 
    url.toLowerCase().includes(pattern.toLowerCase())
  )
  
  const isKeyPlaceholder = placeholderPatterns.some(pattern => 
    anonKey.toLowerCase().includes(pattern.toLowerCase())
  )
  
  if (isUrlPlaceholder || isKeyPlaceholder) return false
  
  // Validate URL format
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Development mode check
const isDevelopment = () => {
  return process.env.NODE_ENV === 'development'
}

// Mock configuration for development
export const mockConfig = {
  enableMockData: !isSupabaseConfigured() && isDevelopment(),
  mockDelay: 1500 // Simulate network delay in development
}

// Get configuration status for debugging
export const getConfigStatus = () => {
  const { url, anonKey } = supabaseConfig
  return {
    hasUrl: !!url,
    hasAnonKey: !!anonKey,
    urlValue: url ? url.substring(0, 20) + '...' : 'Not set',
    isConfigured: isSupabaseConfigured(),
    isDevelopment: isDevelopment(),
    mockEnabled: mockConfig.enableMockData
  }
}

// Helper function to prevent API calls with invalid configuration
const shouldMakeApiCall = () => {
  return isSupabaseConfigured()
}