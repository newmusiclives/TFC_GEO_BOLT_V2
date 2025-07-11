/**
 * Security utilities for input sanitization and validation
 */

// HTML entity encoding map
const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input.replace(/[&<>"'`=\/]/g, (char) => htmlEntities[char] || char)
}

/**
 * Sanitize user input for safe display
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return ''
  
  // Remove null bytes and control characters
  let sanitized = input.replace(/[\x00-\x1F\x7F]/g, '')
  
  // Trim whitespace
  sanitized = sanitized.trim()
  
  // Limit length to prevent DoS
  if (sanitized.length > 10000) {
    sanitized = sanitized.substring(0, 10000)
  }
  
  return sanitized
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  if (typeof email !== 'string') return false
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (typeof password !== 'string') {
    errors.push('Password must be a string')
    return { isValid: false, errors }
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate username format
 */
export function validateUsername(username: string): boolean {
  if (typeof username !== 'string') return false
  
  // Username must be 3-20 characters, alphanumeric only
  const usernameRegex = /^[a-z0-9]{3,20}$/
  return usernameRegex.test(username.toLowerCase())
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): boolean {
  if (typeof url !== 'string') return false
  
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Sanitize and validate form data
 */
export function sanitizeFormData<T extends Record<string, any>>(data: T): T {
  const sanitized: any = {}
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value)
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeFormData(value)
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized as T
}

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (typeof token !== 'string' || typeof storedToken !== 'string') {
    return false
  }
  
  // Use timing-safe comparison
  if (token.length !== storedToken.length) {
    return false
  }
  
  let result = 0
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i)
  }
  
  return result === 0
}

/**
 * Rate limiting helper
 */
export class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map()
  private windowMs: number
  private maxRequests: number
  
  constructor(windowMs: number = 60000, maxRequests: number = 100) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }
  
  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const record = this.requests.get(identifier)
    
    if (!record || now > record.resetTime) {
      this.requests.set(identifier, { count: 1, resetTime: now + this.windowMs })
      return true
    }
    
    if (record.count >= this.maxRequests) {
      return false
    }
    
    record.count++
    return true
  }
  
  cleanup(): void {
    const now = Date.now()
    const entries = Array.from(this.requests.entries())
    for (const [identifier, record] of entries) {
      if (now > record.resetTime) {
        this.requests.delete(identifier)
      }
    }
  }
}

/**
 * Content Security Policy builder
 */
export function buildCSP(options: {
  allowInline?: boolean
  allowEval?: boolean
  allowExternalScripts?: string[]
  allowExternalStyles?: string[]
  allowFrames?: string[]
} = {}): string {
  const {
    allowInline = false,
    allowEval = false,
    allowExternalScripts = [],
    allowExternalStyles = [],
    allowFrames = []
  } = options
  
  const directives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", ...(allowInline ? ["'unsafe-inline'"] : []), ...(allowEval ? ["'unsafe-eval'"] : []), ...allowExternalScripts],
    'style-src': ["'self'", ...(allowInline ? ["'unsafe-inline'"] : []), ...allowExternalStyles],
    'img-src': ["'self'", 'data:', 'https:'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'connect-src': ["'self'", 'https://*.supabase.co', 'https://api.manifest.financial'],
    'frame-src': allowFrames.length > 0 ? allowFrames : ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'upgrade-insecure-requests': []
  }
  
  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ')
} 