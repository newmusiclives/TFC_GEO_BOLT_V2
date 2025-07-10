'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
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
    console.error('Error caught by ErrorBoundary:', error)
    console.error('Component stack:', errorInfo.componentStack)
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 text-white">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-300 mb-6">
              An error occurred while rendering this page. Please try refreshing or contact support if the problem persists.
                onClick={this.handleReset}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.reload()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Refresh Page
              </Button>
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Go Back
              </Button>
            </div>
          </GlassCard>
        </div>
      )
    }

    return this.props.children
  }
      )
    }
  }
}