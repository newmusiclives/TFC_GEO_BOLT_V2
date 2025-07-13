export const dynamic = "force-dynamic";
import { Suspense } from 'react';
import VenueSignUpForm from './venue-signup-form';

export default function VenueSignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800"><div className="text-white text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div><p>Loading venue signup form...</p></div></div>}>
      <VenueSignUpForm />
    </Suspense>
  );
}