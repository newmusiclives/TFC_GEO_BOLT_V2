// Application constants for better maintainability
const APP_CONFIG = {
  name: 'TrueFans CONNECT™',
  description: 'Live Music Discovery & Artist Support',
  version: '1.0.0',
  author: 'TrueFans',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
} as const

export const GEOLOCATION_CONFIG = {
  defaultRadius: 274, // meters (300 yards)
  maxRadius: 8047, // meters (5 miles)
  timeWindow: 4, // hours
  highAccuracy: true,
  timeout: 12000, // milliseconds
  maxAge: 300000, // 5 minutes
  confidenceThresholds: {
    high: 90,
    medium: 70,
    low: 50
  },
  // Distance options for user selection
  radiusOptions: [
    { value: 274, label: '300 yds', description: 'Very close' },
    { value: 1609, label: '1 mile', description: 'Walking distance' },
    { value: 4828, label: '3 miles', description: 'Short drive' },
    { value: 8047, label: '5 miles', description: 'Nearby area' }
  ]
} as const

const DONATION_CONFIG = {
  defaultAmounts: [5, 10, 25, 50, 100],
  minAmount: 1,
  maxAmount: 1000,
  currency: 'USD',
  platformFeeRate: 0.15, // 15% platform fee (includes referral fees)
  processingFeeRate: 0.029, // 2.9% payment processing fee
  processingFeeCents: 30, // $0.30 fixed fee
  referralFeeRate: 0.05, // 5% total referral fees (2.5% direct + 2.5% tier2)
  directReferralRate: 0.025, // 2.5% to direct referrer
  tier2ReferralRate: 0.025, // 2.5% to tier2 referrer
  artistPayoutRate: 0.80 // 80% to artist (platform keeps 20% including referrals)
} as const

const UI_CONFIG = {
  animations: {
    duration: {
      fast: 0.2,
      normal: 0.3,
      slow: 0.5
    },
    easing: 'ease-out'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
} as const

const API_ENDPOINTS = {
  artists: '/api/artists',
  venues: '/api/venues',
  shows: '/api/shows',
  donations: '/api/donations',
  geolocation: '/api/geolocation'
} as const

const STORAGE_KEYS = {
  userLocation: 'truefans_user_location',
  preferences: 'truefans_preferences',
  recentSearches: 'truefans_recent_searches',
  geoSettings: 'truefans_geo_settings'
} as const