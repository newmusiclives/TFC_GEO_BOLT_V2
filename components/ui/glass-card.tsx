'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const glassCardVariants = cva(
  "backdrop-blur-md border border-white/10 rounded-xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white/5 hover:bg-white/10",
        elevated: "bg-white/10 shadow-xl hover:bg-white/15",
        minimal: "bg-white/5 border-white/5 hover:bg-white/10"
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        none: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

export function GlassCard({
  className,
  variant,
  size,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(glassCardVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </div>
  )
}