'use client'

import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Heart, ArrowLeft, Music, MapPin, Calendar, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function DonatePageContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const slug = params.slug as string
  const showId = searchParams.get('show')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock artist data - in production this would come from Supabase
  const getArtistData = (slug: string) => {
    const artists = {
      'luna-rodriguez': {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Luna Rodriguez',
        slug: 'luna-rodriguez',
        bio: 'Acoustic storyteller with a voice that captivates audiences nationwide.',
        avatar_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
        banner_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
        is_verified: true,
        genres: ['indie', 'folk', 'acoustic']
      },
      'midnight-echoes': {
        id: '22222222-2222-2222-2222-222222222222',
        name: 'The Midnight Echoes',
        slug: 'midnight-echoes',
        bio: 'Four-piece alternative rock band bringing raw energy to every stage.',
        avatar_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200',
        banner_url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
        is_verified: false,
        genres: ['rock', 'alternative', 'indie']
      },
      'dj-cosmic': {
        id: '33333333-3333-3333-3333-333333333333',
        name: 'DJ Cosmic',
        slug: 'dj-cosmic',
        bio: 'Electronic music producer creating otherworldly soundscapes.',
        avatar_url: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=200',
        banner_url: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
        is_verified: true,
        genres: ['electronic', 'techno', 'ambient']
      },
      'sarahs-acoustic-corner': {
        id: '44444444-4444-4444-4444-444444444444',
        name: 'Sarah\'s Acoustic Corner',
        slug: 'sarahs-acoustic-corner',
        bio: 'Local acoustic performer with heartfelt original songs.',
        avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        banner_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800',
        is_verified: false,
        genres: ['acoustic', 'folk', 'singer-songwriter']
      }
    };
    
    return artists[slug as keyof typeof artists] || artists['luna-rodriguez'];
  };
  
  const artist = getArtistData(slug);

  // Mock show data if showId is provided
  const show = showId ? {
    id: showId,
    title: 'Acoustic Evening with Luna Rodriguez',
    venue: {
      name: 'The Blue Note',
      city: 'New York',
      state: 'NY'
    },
    start_time: new Date().toISOString(),
    status: 'upcoming'
  } : null

  const donationAmounts = [5, 10, 25, 50, 100]

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
    setSelectedAmount(null)
  }

  const handleSendSupport = () => {
    setIsSubmitting(true)
    
    // Get the final amount (either selected or custom)
    const finalAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : null)
    
    if (!finalAmount) {
      toast.error('Please select or enter a donation amount')
      setIsSubmitting(false)
      return
    }
    
    // Simulate API call with a timeout
    setTimeout(() => {
      console.log('Donation submitted:', {
        artistId: artist.id,
        showId: showId,
        amount: finalAmount,
        message: message,
        isAnonymous: isAnonymous
      })
      
      // Show success message
      toast.success(`Thank you for your $${finalAmount} donation to ${artist.name}!`)
      
      // Reset form
      setSelectedAmount(null)
      setCustomAmount('')
      setMessage('')
      setIsAnonymous(false)
      setIsSubmitting(false)
      
      // Redirect to artist page after successful donation
      setTimeout(() => {
        router.push(`/artist/${slug}`)
      }, 1500)
    }, 1000)
  }

  return (
    <GradientBg variant="primary">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href={`/artist/${slug}`}
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {artist.name}
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Artist Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <GlassCard variant="elevated">
              <div className="flex items-start gap-4 mb-6">
                <Avatar className="w-20 h-20 ring-4 ring-purple-400/30">
                  <AvatarImage src={artist.avatar_url} alt={artist.name} />
                  <AvatarFallback className="text-2xl bg-purple-500 text-white">
                    {artist.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-white">{artist.name}</h1>
                    {artist.is_verified && (
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-purple-200 mb-3">{artist.bio}</p>
                  <div className="flex gap-2">
                    {artist.genres.map((genre) => (
                      <Badge key={genre} variant="secondary" className="bg-purple-500/20 text-purple-300">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {show && (
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    Supporting Show
                  </h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">{show.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{show.venue.name}, {show.venue.city}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(show.start_time).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </GlassCard>

            {/* Impact Message */}
            <GlassCard variant="minimal">
              <div className="text-center">
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Your Support Makes a Difference
                </h3>
                <p className="text-purple-200">
                  Every donation directly supports {artist.name} and helps them continue creating amazing music. 
                  {show ? ' Your contribution will boost the energy of this live performance!' : ' Thank you for supporting independent artists!'}
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard variant="elevated">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Send Support
              </h2>

              <div className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-3">
                    Choose Amount
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {donationAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountSelect(amount)}
                        className={`p-4 rounded-lg border ${
                          selectedAmount === amount 
                            ? 'border-purple-400 bg-purple-500/20 text-white font-medium' 
                            : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-purple-400/50 transition-all text-white font-medium'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                    <div className="p-1 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 hover:border-purple-400/50 transition-all">
                      <input
                        type="number"
                        placeholder="Custom"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full h-full bg-transparent text-white text-center focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    placeholder="Leave a message for the artist..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 resize-none"
                    rows={3}
                  />
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
                  />
                  <label htmlFor="anonymous" className="text-sm text-purple-200">
                    Make this donation anonymous
                  </label>
                </div>

                {/* Payment Button */}
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-6"
                  onClick={handleSendSupport}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-2" />
                      Send Support
                    </>
                  )}
                </Button>

                {/* Security Note */}
                <p className="text-xs text-gray-400 text-center">
                  Secure payment processing. Your information is protected.
                </p>
              </div>
            </GlassCard>

            {/* Recent Supporters */}
            <GlassCard variant="minimal">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Supporters</h3>
              <div className="space-y-3">
                {[
                  { name: 'Sarah J.', amount: 25, message: 'Love your music!', time: '2 minutes ago' },
                  { name: 'Anonymous', amount: 15, message: 'Keep creating!', time: '5 minutes ago' },
                  { name: 'Mike R.', amount: 50, message: 'Amazing performance tonight!', time: '8 minutes ago' }
                ].map((supporter, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {supporter.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">{supporter.name}</span>
                        <span className="text-green-400 font-bold">${supporter.amount}</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-1">"{supporter.message}"</p>
                      <p className="text-xs text-gray-400">{supporter.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </GradientBg>
  )
}