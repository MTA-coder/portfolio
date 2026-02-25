import React, { useEffect, useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { useIsMobile } from '@/hooks/use-mobile'

const BubbleCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState<
    Array<{ x: number; y: number; id: number }>
  >([])
  const { theme } = useTheme()
  const isMobile = useIsMobile()
  const rafRef = useRef<number>()
  const lastTrailUpdate = useRef<number>(0)

  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })

    // Throttle trail updates to improve performance
    const now = Date.now()
    if (now - lastTrailUpdate.current > 50) {
      // Update every 50ms instead of every mousemove
      setTrail((prev) => [
        ...prev.slice(-3), // Reduced from 5 to 3
        { x: e.clientX, y: e.clientY, id: now },
      ])
      lastTrailUpdate.current = now
    }
  }, [])

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const isInteractive = target.closest(
      'a, button, [role="button"], input, textarea, select',
    )
    setIsHovering(!!isInteractive)
  }, [])

  const handleMouseOut = useCallback(() => {
    setIsHovering(false)
  }, [])

  useEffect(() => {
    if (isMobile) {
      return
    }

    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('mouseout', handleMouseOut, { passive: true })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isMobile, updateMousePosition, handleMouseOver, handleMouseOut])

  if (isMobile) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] mix-blend-difference">
      {/* Main cursor bubble */}
      <motion.div
        className={`fixed w-6 h-6 rounded-full ${
          theme === 'dark'
            ? isHovering
              ? 'bg-white'
              : 'bg-tech-purple'
            : isHovering
            ? 'bg-indigo-900'
            : 'bg-indigo-600'
        } ${isHovering ? 'mix-blend-difference' : ''}`}
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.6,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Reduced trail bubbles */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className={`fixed w-2 h-2 rounded-full ${
            theme === 'dark' ? 'bg-tech-purple/40' : 'bg-indigo-500/35'
          }`}
          style={{
            left: point.x - 4,
            top: point.y - 4,
          }}
          initial={{
            scale: 1,
            opacity: 0.6,
          }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.4, // Reduced from 0.6
            delay: index * 0.03, // Reduced from 0.05
          }}
        />
      ))}

      {/* Hover ring effect */}
      {isHovering && (
        <motion.div
          className={`fixed w-12 h-12 rounded-full border-2 ${
            theme === 'dark' ? 'border-white/30' : 'border-indigo-700/30'
          }`}
          style={{
            left: mousePosition.x - 24,
            top: mousePosition.y - 24,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        />
      )}
    </div>
  )
}

export default BubbleCursor
