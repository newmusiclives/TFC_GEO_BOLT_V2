import dynamic from 'next/dynamic';

const ComingSoonPage = dynamic(() => import('@/components/coming-soon'), { ssr: false });

export default function ComingSoonRoute() {
  return <ComingSoonPage />;
} 