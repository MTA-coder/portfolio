import React, { lazy, Suspense } from 'react'

const DigitalGlobe = lazy(() => import('./DigitalGlobe'))

const OptimizedDigitalGlobe = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full aspect-square bg-transparent rounded-lg flex items-center justify-center">
          <div className="text-tech-purple animate-pulse text-lg">
            Loading Globe...
          </div>
        </div>
      }
    >
      <DigitalGlobe />
    </Suspense>
  )
}

export default OptimizedDigitalGlobe
