import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'

interface ThemeToggleProps {
  size?: number
  className?: string
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 20,
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-full transition-colors duration-300 overflow-hidden group ${
        isDark
          ? 'bg-secondary/60 hover:bg-secondary/80'
          : 'bg-amber-100/80 hover:bg-amber-200/80'
      } ${className}`}
      whileTap={{ scale: 0.85 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Heartbeat ripple on toggle */}
      <motion.span
        key={theme}
        className={`absolute inset-0 rounded-full ${
          isDark ? 'bg-tech-purple/20' : 'bg-amber-300/30'
        }`}
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Second ripple pulse (heartbeat double-beat) */}
      <motion.span
        key={`${theme}-2`}
        className={`absolute inset-0 rounded-full ${
          isDark ? 'bg-tech-purple/15' : 'bg-amber-300/25'
        }`}
        initial={{ scale: 0, opacity: 0.6 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      />

      {/* Icon container with heartbeat pop animation */}
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            className="relative z-10 text-amber-400"
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{
              scale: [0, 1.3, 0.95, 1.15, 1],
              rotate: [-90, 0],
              opacity: 1,
            }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{
              scale: {
                duration: 0.6,
                times: [0, 0.3, 0.45, 0.65, 1],
                ease: 'easeOut',
              },
              rotate: { duration: 0.4, ease: 'easeOut' },
              opacity: { duration: 0.2 },
            }}
          >
            {/* Sun icon */}
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <motion.g
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </motion.g>
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            className="relative z-10 text-indigo-600"
            initial={{ scale: 0, rotate: 90, opacity: 0 }}
            animate={{
              scale: [0, 1.3, 0.95, 1.15, 1],
              rotate: [90, 0],
              opacity: 1,
            }}
            exit={{ scale: 0, rotate: -90, opacity: 0 }}
            transition={{
              scale: {
                duration: 0.6,
                times: [0, 0.3, 0.45, 0.65, 1],
                ease: 'easeOut',
              },
              rotate: { duration: 0.4, ease: 'easeOut' },
              opacity: { duration: 0.2 },
            }}
          >
            {/* Moon icon */}
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>

            {/* Tiny stars around moon */}
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-indigo-400"
                style={{
                  top: `${[15, 65, 30][i]}%`,
                  left: `${[75, 20, 10][i]}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default ThemeToggle
