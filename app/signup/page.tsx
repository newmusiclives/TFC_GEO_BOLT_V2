import { Suspense } from 'react'
import SignUpForm from './signup-form'

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
        <p>Loading signup form...</p>
      </div>
    </div>}>
      <SignUpForm />
    </Suspense>
  )
}