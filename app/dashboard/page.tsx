'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/demo-client'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    async function checkUserRole() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          // If no user is found, redirect to login
          router.push('/login')
          return
        }
        
        // Get user profile to determine role
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        
        // Set user role from profile
        if (profile) {
          setUserRole(profile.role)
          
          // Redirect based on role
          switch (profile.role) {
            case 'artist':
              router.push('/dashboard/artist')
              break
            case 'venue_owner':
              router.push('/dashboard/venue')
              break
            case 'admin':
              router.push('/admin/dashboard')
              break
            case 'fan':
              router.push('/dashboard/fan')
              break
            default:
              // Default to fan dashboard if role is unknown
              router.push('/dashboard/fan')
          }
        } else {
          // If no profile is found, redirect to login
          router.push('/login')
        }
      } catch (error) {
        console.error('Error checking user role:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    
    checkUserRole()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500" />
      </div>
    )
  }

  // This should not be visible as we redirect based on role
  return null
}