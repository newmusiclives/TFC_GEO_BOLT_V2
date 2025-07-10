import ArtistProfileContent from './artist-profile-content'

export async function generateStaticParams() {
  // Return the possible slug values for static generation
  return [
    { slug: 'luna-rodriguez' },
    { slug: 'midnight-echoes' },
    { slug: 'dj-cosmic' },
    { slug: 'sarahs-acoustic-corner' }
  ]
}

export default function ArtistPage() {
  return <ArtistProfileContent />
}