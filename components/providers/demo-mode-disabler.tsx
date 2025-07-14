'use client';

import { useEffect } from 'react';

export function DemoModeDisabler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('demo_mode');
      sessionStorage.removeItem('demo_mode');
    }
  }, []);
  return <>{children}</>;
} 