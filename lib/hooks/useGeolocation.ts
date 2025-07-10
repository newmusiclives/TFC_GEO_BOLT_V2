'use client'

import { useState, useEffect, useCallback } from 'react'
import { GEOLOCATION_CONFIG } from '@/lib/constants'
import type { UserLocation, GeolocationStatus } from '@/lib/types'

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
  watch?: boolean
}

interface UseGeolocationReturn {
  location: UserLocation | null
  status: GeolocationStatus
  error: string | null
  refetch: () => void
  isSupported: boolean
}

export function useGeolocation(options: UseGeolocationOptions = {}): UseGeolocationReturn {
  const [location, setLocation] = useState<UserLocation | null>(null)
  const [status, setStatus] = useState<GeolocationStatus>('detecting')
  const [error, setError] = useState<string | null>(null)

  const isSupported = typeof navigator !== 'undefined' && 'geolocation' in navigator

  const getCurrentPosition = useCallback(async () => {
    if (!isSupported) {
      setStatus('error')
      setError('Geolocation is not supported by this browser')
      return
    }

    setStatus('detecting')
    setError(null)

    const config = {
      enableHighAccuracy: options.enableHighAccuracy ?? GEOLOCATION_CONFIG.highAccuracy,
      timeout: options.timeout ?? GEOLOCATION_CONFIG.timeout,
      maximumAge: options.maximumAge ?? GEOLOCATION_CONFIG.maxAge
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Location request timed out'))
        }, config.timeout)

        navigator.geolocation.getCurrentPosition(
          (position) => {
            clearTimeout(timeoutId)
            resolve(position)
          },
          (error) => {
            clearTimeout(timeoutId)
            reject(error)
          },
          config
        )
      })

      const newLocation: UserLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      }

      setLocation(newLocation)
      setStatus('found')
    } catch (err) {
      const error = err as GeolocationPositionError | Error
      
      if ('code' in error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setStatus('permission-denied')
            setError('Location access denied. Please enable location permissions.')
            break
          case error.POSITION_UNAVAILABLE:
            setStatus('error')
            setError('Location information unavailable.')
            break
          case error.TIMEOUT:
            setStatus('timeout')
            setError('Location request timed out.')
            break
          default:
            setStatus('error')
            setError('An unknown error occurred.')
        }
      } else {
        setStatus('timeout')
        setError(error.message)
      }
    }
  }, [isSupported, options])

  useEffect(() => {
    getCurrentPosition()
  }, [getCurrentPosition])

  return {
    location,
    status,
    error,
    refetch: getCurrentPosition,
    isSupported
  }
}