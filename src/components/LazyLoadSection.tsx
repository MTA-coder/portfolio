import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSharedIntersectionObserver } from '@/hooks/useSharedIntersectionObserver'

interface LazyLoadSectionProps {
  children: React.ReactNode
  offset?: number // pixels before element comes into view to trigger load
  className?: string
  id?: string // anchor id for navigation
  placeholderMinHeight?: number // ensure enough space for scroll positioning
}

const LazyLoadSection: React.FC<LazyLoadSectionProps> = ({
  children,
  offset = 200,
  className = '',
  id,
  placeholderMinHeight = 120,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Intersection observer for natural in-view loading
  useSharedIntersectionObserver(
    sectionRef,
    (entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        setHasLoaded(true)
        if (id) {
          window.dispatchEvent(
            new CustomEvent('lazySectionLoaded', { detail: { id } }),
          )
        }
      }
    },
    { rootMargin: `0px 0px ${offset}px 0px`, threshold: 0 },
  )

  // Listen for forced load (e.g., user clicked nav anchor before it entered viewport)
  useEffect(() => {
    if (!id) return
    const forceHandler = (e: Event) => {
      const detailId = (e as CustomEvent<{ id: string }>).detail?.id
      if (detailId === id && !hasLoaded) {
        setIsVisible(true)
        setHasLoaded(true)
        // Notify caller that this section has loaded; caller owns scrolling.
        window.dispatchEvent(
          new CustomEvent('lazySectionLoaded', { detail: { id } }),
        )
      }
    }
    window.addEventListener('forceLoadSection', forceHandler as EventListener)
    return () =>
      window.removeEventListener(
        'forceLoadSection',
        forceHandler as EventListener,
      )
  }, [id, hasLoaded])

  return (
    <motion.div
      ref={sectionRef}
      // Do NOT assign id here to avoid duplicate when child owns it; use placeholder anchor below when needed
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      data-lazy-loaded={hasLoaded}
      data-lazy-id={id}
    >
      {/* Placeholder anchor (only before load) so hash links can find a scroll target */}
      {!hasLoaded && id && (
        <div
          id={id}
          className="w-full"
          style={{ minHeight: placeholderMinHeight }}
          aria-hidden="true"
        />
      )}
      {hasLoaded ? (
        children
      ) : !id ? (
        <div style={{ minHeight: placeholderMinHeight }} />
      ) : null}
    </motion.div>
  )
}

export default LazyLoadSection
