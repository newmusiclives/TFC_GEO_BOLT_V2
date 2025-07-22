'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const gradientBgVariants = cva(
  "min-h-screen relative overflow-hidden",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-br from-[#162961] via-[#48517F] to-[#162961]",
        secondary: "bg-gradient-to-br from-[#48517F] via-[#162961] to-[#F98017]",
        tertiary: "bg-gradient-to-br from-[#48517F] via-[#F98017] to-[#162961]",
        dark: "bg-gradient-to-br from-[#162961] via-[#48517F] to-black"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
)

interface GradientBgProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gradientBgVariants> {}

export function GradientBg({
  className,
  variant,
  children,
  ...props
}: GradientBgProps) {
  return (
    <div
      className={cn(gradientBgVariants({ variant, className }))}
      {...props}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F98017]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#48517F]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-[#162961]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}