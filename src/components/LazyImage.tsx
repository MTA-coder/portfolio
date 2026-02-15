import React, { useState, useRef, memo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useSharedIntersectionObserver } from '@/hooks/useSharedIntersectionObserver'

// NOTE: Deprecated in favor of OptimizedImage which provides responsive sources, AVIF/WebP, skeleton, fetchPriority.
// Retained temporarily for backward compatibility. Prefer importing OptimizedImage directly.

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  blurDataURL?: string
  priority?: boolean
  quality?: number
}

const LazyImage = memo(
  ({
    src,
    alt,
    className = '',
    placeholder,
    blurDataURL,
    priority = false,
    quality = 75,
  }: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInView, setIsInView] = useState(priority)
    const [error, setError] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)

    useSharedIntersectionObserver(
      imgRef,
      (entry) => {
        if (priority) return
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { rootMargin: '50px', threshold: 0 },
    )

    const handleLoad = () => {
      setIsLoaded(true)
    }

    const handleError = () => {
      setError(true)
      setIsLoaded(true)
    }

    return (
      <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
        {!isLoaded && !error && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}

        {blurDataURL && !isLoaded && (
          <img
            src={blurDataURL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          />
        )}

        {isInView && (
          <img
            src={error ? placeholder || '/placeholder.svg' : src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
          />
        )}
      </div>
    )
  },
)

LazyImage.displayName = 'LazyImage'

export default LazyImage
