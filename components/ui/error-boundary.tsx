'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo
    })
    
    // Log error to console or error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <GlassCard variant="elevated" className="max-w-lg w-full">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              
              <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
              
              <div className="text-left bg-black/30 p-4 rounded-lg mb-4 overflow-auto max-h-40">
                <p className="text-red-300 text-sm font-mono">
                  {this.state.error?.toString() || 'Unknown error'}
                </p>
              </div>
              
              <Button 
                onClick={this.handleReset}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </GlassCard>
        </div>
      )
    }

    return this.props.children
  }
}