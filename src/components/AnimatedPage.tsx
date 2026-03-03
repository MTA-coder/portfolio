import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

interface AnimatedPageProps {
  children: React.ReactNode
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
  // Add touch event listeners for mobile interaction
  useEffect(() => {
    // Enable passive touch listeners for better performance
    const options = { passive: true }

    // Handle touch start for interactive elements
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      const interactiveElement = target.closest(
        '.hexagon, .framework-bubble, .timeline-item, .mobile-nav-bubble',
      )

      if (interactiveElement) {
        interactiveElement.classList.add('touch-active')
      }
    }

    // Handle touch end to reset state
    const handleTouchEnd = (e: TouchEvent) => {
      const elements = document.querySelectorAll('.touch-active')
      elements.forEach((el) => el.classList.remove('touch-active'))
    }

    // Register touch events
    document.addEventListener('touchstart', handleTouchStart, options)
    document.addEventListener('touchend', handleTouchEnd, options)

    // Cleanup event listeners
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedPage
