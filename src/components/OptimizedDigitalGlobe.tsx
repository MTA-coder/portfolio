
import React, { lazy, Suspense } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileDigitalGlobe from './MobileDigitalGlobe';

const DigitalGlobe = lazy(() => import('./DigitalGlobe'));

const OptimizedDigitalGlobe = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileDigitalGlobe />;
  }

  return (
    <Suspense fallback={
      <div className="w-full aspect-square bg-transparent rounded-lg flex items-center justify-center">
        <div className="text-tech-purple animate-pulse text-lg">Loading Globe...</div>
      </div>
    }>
      <DigitalGlobe />
    </Suspense>
  );
};

export default OptimizedDigitalGlobe;
