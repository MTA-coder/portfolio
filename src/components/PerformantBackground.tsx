import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'
import { useOptimizedPerformance } from '@/hooks/useOptimizedPerformance'
import { useTheme } from '@/hooks/useTheme'

const PerformantBackground = () => {
  const isMobile = useIsMobile()
  const { capabilities, getOptimalSettings } = useOptimizedPerformance()
  const { theme } = useTheme()
  const settings = getOptimalSettings

  // Significantly reduced bubble count based on device capabilities
  const bubbleCount = useMemo(() => {
    if (capabilities.isLowEnd) return 1
    return isMobile ? 1 : 2
  }, [capabilities.isLowEnd, isMobile])

  const bubbles = useMemo(() => {
    if (!settings.animations) return []

    return Array.from({ length: bubbleCount }).map((_, index) => {
      const size = Math.random() * (isMobile ? 40 : 80) + 20
      const yPos = Math.random() * 80 + 10
      const delay = Math.random() * 3
      const duration = Math.random() * 8 + 15
      const initialX = -size

      return {
        id: index,
        size,
        yPos,
        delay,
        duration,
        initialX,
      }
    })
  }, [bubbleCount, isMobile, settings.animations])

  if (!settings.animations || capabilities.isLowEnd) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${
        theme === 'dark' ? 'opacity-30' : 'opacity-40'
      }`}
    >
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute rounded-full bg-gradient-to-br ${
            theme === 'dark'
              ? 'from-tech-purple/20 to-tech-blue/20'
              : 'from-indigo-400/30 to-blue-400/25'
          }`}
          style={{
            width: bubble.size,
            height: bubble.size,
            top: `${bubble.yPos}%`,
            left: bubble.initialX,
            willChange: 'transform',
            filter: theme === 'dark' ? 'none' : 'blur(0.5px)',
          }}
          animate={{
            x: window.innerWidth + bubble.size,
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export default PerformantBackground
