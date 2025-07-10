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
  return <DonatePageContent />
}