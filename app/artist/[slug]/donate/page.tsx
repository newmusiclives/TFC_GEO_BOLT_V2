import { Suspense } from 'react'
import DonatePageContent from './donate-page-content'

export async function generateStaticParams() {
  // Return the possible slug values for static generation (including all demo artists)
  return [
    { slug: 'luna-rodriguez' },
    { slug: 'midnight-echoes' },
    { slug: 'dj-cosmic' },
    { slug: 'sarahs-acoustic-corner' }
  ]
}

export default function ArtistDonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
        <p>Loading donation page...</p>
      </div>
    </div>}>
      <DonatePageContent />
    </Suspense>
  )
}