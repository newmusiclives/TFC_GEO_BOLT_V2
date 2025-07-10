'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Music, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={cn('animate-spin rounded-full border-2 border-purple-500 border-t-transparent', sizeClasses[size], className)} />
  )
}

interface GeolocationLoaderProps {
  className?: string
}

export function GeolocationLoader({ className }: GeolocationLoaderProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <MapPin className="absolute inset-0 m-auto w-6 h-6 text-purple-400" />
      </motion.div>
    </div>
  )
}

interface PulsingDotsProps {
  className?: string
}

function PulsingDots({ className }: PulsingDotsProps) {
  return (
    <div className={cn('flex space-x-2', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2
          }}
          className="w-3 h-3 bg-purple-400 rounded-full"
        />
      ))}
    </div>
  )
}

interface MusicWaveLoaderProps {
  className?: string
}

function MusicWaveLoader({ className }: MusicWaveLoaderProps) {
  return (
    <div className={cn('flex items-end space-x-1', className)}>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          animate={{
            height: ['20px', '40px', '20px']
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1
          }}
          className="w-2 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
        />
      ))}
    </div>
  )
}

interface LoadingCardProps {
  title?: string
  description?: string
  className?: string
}

function LoadingCard({ title = 'Loading...', description, className }: LoadingCardProps) {
  return (
    <div className={cn('bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6', className)}>
      <div className="flex items-center gap-4 mb-4">
        <LoadingSpinner size="lg" />
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {description && (
            <p className="text-gray-300 text-sm">{description}</p>
          )}
        </div>
      </div>
      
      {/* Skeleton content */}
      <div className="space-y-3">
        <div className="h-4 bg-white/10 rounded animate-pulse" />
        <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-white/10 rounded animate-pulse w-1/2" />
      </div>
    </div>
  )
}

interface SkeletonProps {
  className?: string
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-md bg-white/10', className)} />
  )
}

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
  className?: string
}

function LoadingOverlay({ isVisible, message = 'Loading...', className }: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50',
        className
      )}
    >
      <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-8 text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-white font-medium">{message}</p>
      </div>
    </motion.div>
  )
}