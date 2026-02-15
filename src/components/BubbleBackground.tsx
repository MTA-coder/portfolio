import React, { useMemo, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'
import { useTheme } from '@/hooks/useTheme'
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization'

const BubbleBackground = () => {
  const isMobile = useIsMobile()
  const { theme } = useTheme()
  const { performanceFlags } = usePerformanceOptimization()
  const { isPageHidden, isIdle, shouldDowngradeAnimations } =
    performanceFlags || {}
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1920,
  )
  const resizeRaf = useRef<number>()

  // Throttle resize updates to reduce layout thrash
  useEffect(() => {
    const handleResize = () => {
      if (resizeRaf.current) cancelAnimationFrame(resizeRaf.current)
      resizeRaf.current = requestAnimationFrame(() =>
        setViewportWidth(window.innerWidth),
      )
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeRaf.current) cancelAnimationFrame(resizeRaf.current)
    }
  }, [])

  // Base bubble count
  const baseCount = isMobile ? 2 : 4 // original logic kept
  // Adaptive reduction when performance downgrade flagged
  const bubbleCount = shouldDowngradeAnimations
    ? Math.max(1, baseCount - 2)
    : baseCount

  // Pause completely when page hidden (no need to animate offscreen)
  // (Cannot early-return before hooks; we gate rendering below.)
  const pageHidden = isPageHidden

  // Memoize bubble descriptors (stable for lifetime unless count/viewport changes)
  const bubbles = useMemo(() => {
    const maxSize = isMobile ? 90 : 150 // allow a bit of size variance while similar visuals
    return Array.from({ length: bubbleCount }).map((_, index) => {
      const size = Math.random() * (isMobile ? 50 : 110) + 30 // similar distribution
      const yPos = Math.random() * 80 // percentage vertical placement
      const delay = Math.random() * 2
      const baseDuration = Math.random() * 10 + 20 // original 20-30 range
      // Slow down if idle (appear calmer) but maintain motion
      const duration = isIdle ? baseDuration * 1.5 : baseDuration
      // Direction: left -> right across full viewport plus its size
      const travelDistance = viewportWidth + size
      return {
        id: index,
        size,
        yPos,
        delay,
        duration,
        travelDistance,
      }
    })
  }, [bubbleCount, isMobile, isIdle, viewportWidth])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {!pageHidden &&
        bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className={`absolute rounded-full ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-tech-purple/30 to-tech-blue/30'
                : 'bg-gradient-to-br from-tech-blue/40 to-tech-purple/40'
            }`}
            style={{
              width: bubble.size,
              height: bubble.size,
              top: `${bubble.yPos}%`,
              left: -bubble.size,
              willChange: 'transform',
              opacity: 0.08,
              filter: 'blur(0.5px)',
            }}
            animate={{
              // horizontal translation only (cheap on compositor)
              x: bubble.travelDistance,
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: 'linear',
              repeatType: 'loop',
            }}
          />
        ))}
    </div>
  )
}

export default BubbleBackground
