import React, { useMemo, useState, useCallback } from 'react'
import { useOptimizedPerformance } from '@/hooks/useOptimizedPerformance'

interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  aspectRatio?: number // width / height
  widths?: number[] // custom responsive widths
  priority?: boolean // high priority image (no lazy)
  placeholderColor?: string
  withSkeleton?: boolean
  disableFormats?: boolean // allow opting out of picture
}

// Utility to append/merge Unsplash params without duplicating query keys
const buildUnsplashUrl = (
  base: string,
  params: Record<string, string | number | undefined>,
) => {
  if (!base.includes('images.unsplash.com')) return base
  const url = new URL(base)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, String(v))
  })
  return url.toString()
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio,
  widths,
  priority,
  placeholderColor = 'rgba(120,65,255,0.05)',
  withSkeleton = false,
  disableFormats = false,
  ...rest
}) => {
  const { qualityFactor } = useOptimizedPerformance()
  const quality = Math.round(qualityFactor * 100) // 40 - 100
  const widthsMemo = useMemo(() => widths || [400, 640, 768, 1024, 1280], [
    widths,
  ])

  const [loaded, setLoaded] = useState(false)
  const onLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true)
      rest.onLoad?.(e)
    },
    [rest],
  )

  const ratioClass = aspectRatio ? `aspect-[${aspectRatio}]` : ''

  const sources = useMemo(() => {
    // Unsplash dynamic sources
    if (!disableFormats && src.includes('images.unsplash.com')) {
      const avif = widthsMemo
        .map(
          (w) =>
            `${buildUnsplashUrl(src, {
              w,
              q: quality,
              auto: 'format',
              fit: 'crop',
              fm: 'avif',
            })} ${w}w`,
        )
        .join(', ')
      const webp = widthsMemo
        .map(
          (w) =>
            `${buildUnsplashUrl(src, {
              w,
              q: quality,
              auto: 'format',
              fit: 'crop',
              fm: 'webp',
            })} ${w}w`,
        )
        .join(', ')
      const fallback = buildUnsplashUrl(src, {
        w: widthsMemo[widthsMemo.length - 1],
        q: quality,
        auto: 'format',
        fit: 'crop',
      })
      return { avif, webp, fallback }
    }

    // Local static file processed by imagetools if query pattern used (e.g., /assets/img.png?src)
    if (
      !disableFormats &&
      /\.(png|jpe?g|webp)$/i.test(src) &&
      src.includes('?')
    ) {
      // Expect user passed something like /assets/profile.png?src
      const baseNoQuery = src.split('?')[0]
      const ext = baseNoQuery.split('.').pop() || 'png'
      const set = widthsMemo
        .map((w) => {
          return `${baseNoQuery}?w=${w}&format=avif ${w}w`
        })
        .join(', ')
      const setWebp = widthsMemo
        .map((w) => `${baseNoQuery}?w=${w}&format=webp ${w}w`)
        .join(', ')
      const fallback = `${baseNoQuery}?w=${
        widthsMemo[widthsMemo.length - 1]
      }&format=${ext}`
      return { avif: set, webp: setWebp, fallback }
    }

    return null
  }, [src, widthsMemo, quality, disableFormats])

  const baseImg = (
    <img
      src={sources ? sources.fallback : src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // @ts-ignore – valid HTML attribute, React warns on camelCase
      fetchpriority={priority ? 'high' : undefined}
      className={`${className} ${
        withSkeleton ? 'transition-opacity duration-300' : ''
      } ${
        !loaded && withSkeleton ? 'opacity-0' : 'opacity-100'
      } bg-[rgba(120,65,255,0.05)]`}
      onLoad={onLoad}
      {...rest}
    />
  )

  const picture = sources ? (
    <picture className={`${ratioClass} block`.trim()}>
      <source
        type="image/avif"
        srcSet={sources.avif}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <source
        type="image/webp"
        srcSet={sources.webp}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {baseImg}
    </picture>
  ) : (
    baseImg
  )

  if (!withSkeleton) return picture

  return (
    <div className={`relative ${ratioClass}`.trim()}>
      {!loaded && (
        <div
          className={`absolute inset-0 animate-pulse ${
            placeholderColor.startsWith('bg-') ? placeholderColor : ''
          }`}
          aria-hidden="true"
          data-placeholder-color={placeholderColor}
        />
      )}
      {picture}
    </div>
  )
}

export default OptimizedImage
