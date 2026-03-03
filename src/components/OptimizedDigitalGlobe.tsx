import React, { lazy, Suspense, useState, useEffect, useRef } from 'react'

const DigitalGlobe = lazy(() => import('./DigitalGlobe'))

const OptimizedDigitalGlobe = () => {
  const [inView, setInView] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sentinelRef}>
      {inView ? (
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
      ) : (
        <div className="w-full aspect-square bg-transparent rounded-lg" />
      )}
    </div>
  )
}

export default OptimizedDigitalGlobe
