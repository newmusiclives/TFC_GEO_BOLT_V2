# TrueFans GeoConnect

> **🎵 Support Artists in Real-Time with Geolocation-Powered Donations**

A cutting-edge Next.js 13 application that uses advanced geolocation to detect live music performances and enables fans to instantly support artists with seamless donations. Built for the modern web with full TrueFans ecosystem integration.

[![CI/CD](https://github.com/truefans/geoconnect/workflows/CI%2FCD/badge.svg)](https://github.com/truefans/geoconnect/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-green)](https://supabase.com/)

## ✨ Features

### 🎯 Core Functionality
- **Smart Geolocation Detection**: Advanced PostGIS-powered venue detection with custom geofencing
- **Real-Time Donations**: Instant payments via Manifest Financial with zero-delay artist payouts
- **Live Show Tracking**: Real-time audience metrics, energy levels, and donation feeds
- **Multi-Platform Integration**: Seamless connection with Spotify, BandsinTown, and TrueFans ecosystem

### 🔥 Advanced Features
- **AI-Powered Recommendations**: Vector similarity for artist discovery and optimal donation amounts
- **Real-Time Analytics**: Live performance metrics with WebSocket updates
- **Progressive Web App**: Offline-capable with push notifications
- **Mobile-First Design**: Responsive UI optimized for mobile concert experiences
- **Advanced Security**: Row-level security policies and comprehensive audit trails

### 🚀 TrueFans Ecosystem Integration
- **TrueFans CONNECT**: Cross-platform artist profile synchronization
- **TrueFans GEO**: Enhanced location services and venue detection
- **Future TrueFans JAM**: Ready for collaboration features

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js 13    │    │   Supabase       │    │  External APIs  │
│   App Router +  │◄──►│   PostgreSQL +   │◄──►│  • Manifest     │
│   React 18      │    │   PostGIS +      │    │  • Spotify      │
│                 │    │   Realtime +     │    │  • BandsinTown  │
│   • Tailwind    │    │   Edge Functions │    │  • TrueFans     │
│   • Framer      │    │                  │    │                 │
│   • TanStack    │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 13 + React 18 | Modern, performant full-stack framework |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first CSS with beautiful components |
| **Database** | Supabase (PostgreSQL + PostGIS) | Real-time database with geospatial support |
| **Payments** | Manifest Financial | Instant artist payouts and fee processing |
| **State** | TanStack Query | Powerful server state management |
| **Maps** | PostGIS + Custom Geolocation | Advanced geospatial queries and detection |
| **Testing** | Vitest + Playwright | Unit and E2E testing |
| **Deployment** | Vercel | Edge deployment with serverless functions |

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** or **Bun 1.1+** (recommended)
- **Supabase account** with PostGIS enabled
- **Manifest Financial account** for payments
- **API keys** for Spotify, BandsinTown, TrueFans CONNECT

### 1. Clone & Install

```bash
git clone https://github.com/truefans/geoconnect.git
cd truefans-geoconnect

# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your API keys
nano .env.local
```

Required environment variables:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Manifest Financial
NEXT_PUBLIC_MANIFEST_PUBLIC_KEY=pk_test_your-public-key
MANIFEST_API_KEY=sk_test_your-secret-key
MANIFEST_WEBHOOK_SECRET=whsec_your-webhook-secret

# External APIs
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
NEXT_PUBLIC_BANDSINTOWN_APP_ID=your-app-name
NEXT_PUBLIC_TRUEFANS_CONNECT_API_URL=https://api.truefans.connect
TRUEFANS_CONNECT_API_KEY=your-api-key
```

### 3. Database Setup

```bash
# Initialize Supabase locally
bunx supabase init
bunx supabase start

# Run migrations
bunx supabase db push

# Generate TypeScript types
bun run supabase:generate-types
```

### 4. Start Development

```bash
# Start the development server
bun run dev

# In another terminal, start Supabase functions
bunx supabase functions serve
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
truefans-geoconnect/
├── app/                    # Next.js 13 App Router
│   ├── (auth)/            # Authentication routes
│   ├── artist/            # Artist profile pages
│   ├── discover/          # Discovery page
│   ├── dashboard/         # User dashboard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── donation/          # Donation-specific components
│   ├── layout/            # Layout components
│   ├── providers/         # Context providers
│   └── geolocation/       # Geolocation components
├── lib/                   # Utility libraries
│   ├── supabase/          # Supabase client and utilities
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   └── constants/         # Application constants
├── supabase/
│   ├── migrations/        # Database migrations
│   ├── functions/         # Edge Functions
│   └── config.toml        # Supabase configuration
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
bun run test

# Run with coverage
bun run test:coverage

# Watch mode
bun run test:watch
```

### E2E Tests
```bash
# Install Playwright browsers
bun run playwright install

# Run E2E tests
bun run test:e2e

# Run E2E tests in UI mode
bun run test:e2e:ui
```

### Testing Strategy

- **Unit Tests**: All utilities, hooks, and service functions
- **Component Tests**: Key UI components with React Testing Library
- **Integration Tests**: API endpoints and database functions
- **E2E Tests**: Critical user flows (detection, donation, authentication)

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Build

```bash
# Build for production
bun run build

# Start production server
bun run start
```

## 🗄️ Database Schema

### Core Tables

- **`user_profiles`**: Extended user profiles with role-based access
- **`artists`**: Artist profiles with payment integration
- **`venues`**: Venue data with PostGIS geolocation
- **`shows`**: Live performance tracking
- **`donations`**: Payment processing and analytics
- **`activity_feed`**: Real-time activity streams

### Key Features

- **PostGIS Integration**: Advanced geospatial queries for venue detection
- **Vector Embeddings**: AI-powered artist similarity matching (future)
- **Row Level Security**: Fine-grained access control
- **Real-time Subscriptions**: WebSocket updates for live data

## 🔧 API Documentation

### Next.js API Routes

#### Geolocation Detection
```typescript
POST /api/geolocation/detect
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "radius": 1000
}
```

#### Payment Processing
```typescript
POST /api/payments/process
{
  "artistId": "uuid",
  "showId": "uuid", 
  "amount": 25.00,
  "paymentMethodId": "pm_xxx",
  "donorInfo": {
    "name": "Fan Name",
    "email": "fan@example.com",
    "message": "Great show!",
    "isAnonymous": false
  }
}
```

### Supabase Edge Functions

#### Real-time Show Updates
```typescript
POST /functions/v1/update-show-stats
{
  "showId": "uuid",
  "donationAmount": 25.00,
  "fanCheckin": true
}
```

### External API Integrations

#### Spotify Web API
- Artist search and verification
- Top tracks and popularity metrics
- Playlist integration for shows

#### BandsinTown Events API
- Venue and event synchronization
- Artist tour date imports
- Audience size estimates

#### TrueFans CONNECT API
- Cross-platform profile sync
- Analytics sharing
- Enhanced fan insights

## 🔐 Security

### Authentication & Authorization
- **Supabase Auth**: Magic links and OAuth providers
- **Row Level Security**: Database-level access control
- **JWT Tokens**: Secure API authentication
- **Rate Limiting**: API endpoint protection

### Data Protection
- **Encryption at Rest**: Supabase managed encryption
- **HTTPS Only**: TLS 1.3 for all communications
- **PCI Compliance**: Manifest Financial payment processing
- **GDPR Ready**: User data deletion and export

### Security Headers
```nginx
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: origin-when-cross-origin
Content-Security-Policy: default-src 'self'; ...
```

## 📊 Analytics & Monitoring

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Real User Monitoring**: Built-in Next.js analytics
- **Error Tracking**: Error boundaries and logging
- **API Monitoring**: Supabase metrics dashboard

### Business Metrics
- **Donation Conversion**: Detection → donation rates
- **Artist Earnings**: Revenue tracking and analytics
- **User Engagement**: Session duration and retention
- **Geographic Insights**: Location-based usage patterns

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# Automated testing and deployment
- Unit & E2E tests on all PRs
- Automatic staging deployments
- Production deployment on main branch
- Supabase function deployments
- Security scanning with CodeQL
```

### Quality Gates
- **TypeScript**: Strict type checking
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Playwright**: Cross-browser E2E testing
- **Lighthouse**: Performance auditing

## 🌍 Internationalization

Ready for global deployment with:
- **Multi-language Support**: i18n infrastructure ready
- **Currency Handling**: Multi-currency donation support
- **Timezone Management**: Show time localization
- **Cultural Adaptation**: Region-specific payment methods

## 🔮 Roadmap

### Short Term (Q1 2025)
- [ ] Enhanced AI recommendations
- [ ] Advanced venue geofencing
- [ ] Social sharing features
- [ ] Artist verification system

### Medium Term (Q2-Q3 2025)
- [ ] TrueFans JAM integration
- [ ] NFT ticketing support
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

### Long Term (Q4 2025+)
- [ ] AR venue experiences
- [ ] Blockchain integration
- [ ] Global artist network
- [ ] Advanced AI features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled
- **Next.js**: App Router patterns
- **Testing**: Unit tests for all features
- **Documentation**: Clear comments and README updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

- **Documentation**: [docs.truefans.ai](https://docs.truefans.ai)
- **Discord**: [TrueFans Community](https://discord.gg/truefans)
- **Email**: support@truefans.ai
- **Issues**: [GitHub Issues](https://github.com/truefans/geoconnect/issues)

## 🙏 Acknowledgments

- **TrueFans Community**: For feedback and support
- **Open Source Contributors**: For the amazing tools and libraries
- **Artists**: For inspiring this platform
- **Next.js Team**: For the incredible framework

---

**Built with ❤️ by the TrueFans team**

*Supporting artists, one beat at a time* 🎵

## API Reference

### Core Functions

#### Geolocation Services

**`useGeolocation()` Hook**
```typescript
const { location, status, error, refetch } = useGeolocation({
  enableHighAccuracy: true,
  timeout: 12000,
  maximumAge: 300000
})
```

**`GeoLocationService.findNearbyShows()`**
```typescript
const shows = await geoLocationService.findNearbyShows(
  40.7128, // latitude
  -74.0060, // longitude
  1000, // radius in meters
  4 // time window in hours
)
```

#### Payment Processing

**`createPaymentIntent()` (Future Implementation)**
```typescript
const paymentIntent = await createPaymentIntent({
  amount: 25.00,
  artistId: 'artist-uuid',
  showId: 'show-uuid',
  metadata: { source: 'geoconnect' }
})
```

#### Real-time Features

**`subscribeToShowUpdates()`**
```typescript
const unsubscribe = geoLocationService.subscribeToShowUpdates(
  'show-uuid',
  (payload) => {
    console.log('Real-time update:', payload)
  }
)
```

### Database Functions

**`find_nearby_shows_advanced(lat, lng, radius, time_window)`**
```sql
SELECT * FROM find_nearby_shows_advanced(40.7128, -74.0060, 1000, 4);
```

**`update_live_show_stats(show_id, donation_amount, fan_checkin)`**
```sql
SELECT update_live_show_stats('show-uuid'::uuid, 25.00, true);
```

**`search_artists(query, limit)`**
```sql
SELECT * FROM search_artists('Luna Rodriguez', 10);
```

## Performance Optimization

### Frontend Optimizations
- **App Router**: Automatic code splitting and optimization
- **Image Optimization**: Next.js Image component with WebP
- **Bundle Analysis**: Built-in bundle analyzer
- **Streaming**: React 18 Suspense and streaming SSR

### Database Optimizations
- **Indexed Queries**: PostGIS spatial indexes for geolocation
- **Connection Pooling**: Supabase managed connections
- **Query Optimization**: Efficient joins and aggregations
- **Real-time Subscriptions**: Optimized WebSocket connections

### CDN & Delivery
- **Edge Deployment**: Vercel Edge Runtime
- **Asset Optimization**: Automatic compression and optimization
- **Geographic Distribution**: Global CDN for low latency
- **Progressive Enhancement**: Works without JavaScript

## Troubleshooting

### Common Issues

**Geolocation not working**
```typescript
// Check browser support
if (!navigator.geolocation) {
  console.error('Geolocation not supported')
}

// Use the useGeolocation hook for better error handling
const { location, status, error } = useGeolocation()
if (status === 'permission-denied') {
  console.error('Geolocation permission denied')
}
```

**Supabase connection issues**
```typescript
// Verify environment variables
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// Check configuration status
import { getConfigStatus } from '@/lib/supabase/config'
console.log('Config status:', getConfigStatus())
```

**Build errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npx tsc --noEmit
```

### Debug Mode

Enable debug logging:
```bash
NEXT_PUBLIC_DEBUG=true npm run dev
```

### Performance Profiling

```typescript
// React DevTools Profiler
import { Profiler } from 'react'

function onRenderCallback(id, phase, actualDuration) {
  console.log('Render:', { id, phase, actualDuration })
}

// Wrap components for profiling
<Profiler id="GeoDetector" onRender={onRenderCallback}>
  <GeoDetector />
</Profiler>
```

### Environment Variables

Create a `.env.local` file with the following structure:

```bash
# Required for basic functionality
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Required for production
NEXT_PUBLIC_APP_URL=https://your-domain.com
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional for enhanced features
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
NEXT_PUBLIC_BANDSINTOWN_APP_ID=your-app-name

# Payment processing (when implemented)
NEXT_PUBLIC_MANIFEST_PUBLIC_KEY=pk_test_your-public-key
MANIFEST_API_KEY=sk_test_your-secret-key
```