import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/database.types'
import { isSupabaseConfigured, supabaseConfig } from './config'

// Dynamic import wrapper to prevent critical dependency warnings
const createSupabaseClient = async () => {
  if (typeof window === 'undefined') {
    // Server-side: return null or basic client
    return null
  }

  try {
    return createBrowserClient<Database>(supabaseConfig.url, supabaseConfig.anonKey)
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    return null
  }
}

export const createClient = () => {
  const { url, anonKey } = supabaseConfig

  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV === 'development') {
      const { getConfigStatus } = require('./config')
      const status = getConfigStatus()
      console.warn('🔧 Supabase Configuration Status:', status)
      console.warn('💡 To enable real data, configure your Supabase environment variables in .env.local')
    }
    
    // Return a comprehensive mock client for development
    return {
      from: (table: string) => ({
        select: (columns?: string) => ({
          eq: (column: string, value: any) => ({
            single: () => Promise.resolve({ data: null, error: null }),
            limit: (count: number) => ({
              order: (column: string, options?: any) => Promise.resolve({ data: [], error: null })
            }),
            order: (column: string, options?: any) => ({
              limit: (count: number) => Promise.resolve({ data: [], error: null })
            })
          }),
          limit: (count: number) => ({
            order: (column: string, options?: any) => Promise.resolve({ data: [], error: null })
          }),
          order: (column: string, options?: any) => ({
            limit: (count: number) => Promise.resolve({ data: [], error: null }),
            eq: (column: string, value: any) => ({
              limit: (count: number) => Promise.resolve({ data: [], error: null })
            })
          })
        }),
        insert: (values: any) => Promise.resolve({ data: null, error: null }),
        update: (values: any) => ({
          eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
        }),
        delete: () => ({
          eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
        })
      }),
      rpc: (functionName: string, params?: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`🎭 Mock RPC call: ${functionName}`, params)
        }
        return Promise.resolve({ data: [], error: null })
      },
      channel: (name: string) => ({
        on: (event: string, callback: Function) => ({
          on: (event: string, callback: Function) => ({
                    subscribe: (callback?: Function) => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`🎭 Mock subscription: ${name}`)
          }
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
          if (process.env.NODE_ENV === 'development') {
            console.log(`🎭 Mock function call: ${functionName}`, options)
          }
          return Promise.resolve({ data: null, error: null })
        }
      },
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signUp: (credentials: any) => Promise.resolve({ data: { user: null }, error: null }),
        signIn: (credentials: any) => Promise.resolve({ data: { user: null }, error: null }),
        signOut: () => Promise.resolve({ error: null })
      }
    } as any
  }

  try {
    return createBrowserClient<Database>(url, anonKey)
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    throw new Error(`Invalid Supabase configuration: ${error}`)
  }
}

// Export the dynamic client creator for realtime functionality
export { createSupabaseClient }