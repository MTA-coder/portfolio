import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Logo */}
            <motion.div
              className="relative z-20 w-24 h-24 rounded-lg flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <img
                src="/android-chrome-512x512.png"
                alt="MTA Logo"
                className="w-24 h-24 rounded-lg"
              />
            </motion.div>

            {/* Simple bubble animations */}
            <div className="absolute inset-0 z-10">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-tech-purple/30"
                  style={{
                    width: 10 + Math.random() * 20,
                    height: 10 + Math.random() * 20,
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    opacity: [0, 0.7, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    repeatType: 'loop',
                  }}
                />
              ))}
            </div>

            {/* Loading text */}
            <motion.p
              className="text-foreground mt-6 text-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SplashScreen
