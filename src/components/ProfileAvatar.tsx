import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { useIsMobile } from '@/hooks/use-mobile'
import OptimizedImage from '@/components/OptimizedImage'

/**
 * ProfileAvatar – Floating, theme-adaptive profile picture with orbiting
 * bubbles, breathing gradient ring, and optional mouse-parallax tilt.
 *
 * Usage:
 *   <ProfileAvatar size="lg" />          // desktop hero
 *   <ProfileAvatar size="sm" />          // mobile hero
 *
 * *** IMPORTANT ***
 * For best results, replace the profile image with a transparent-background
 * PNG.  You can use https://remove.bg or Photoshop to remove the background.
 * Save it to:  public/assets/Mohammed Tawfeq Amiri Picture.png
 */

type AvatarSize = 'sm' | 'md' | 'lg'

interface ProfileAvatarProps {
  size?: AvatarSize
}

/* ---------- size tokens ------------------------------------------------- */
const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-48 h-48 sm:w-64 sm:h-64',
  md: 'w-64 h-64 md:w-80 md:h-80',
  lg: 'w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96',
}

/* ---------- orbiting bubble descriptors --------------------------------- */
const ORBIT_BUBBLES = [
  { size: 10, radius: '54%', duration: 8, delay: 0 },
  { size: 7, radius: '58%', duration: 11, delay: 2 },
  { size: 12, radius: '52%', duration: 14, delay: 5 },
  { size: 6, radius: '60%', duration: 9, delay: 7 },
  { size: 9, radius: '56%', duration: 12, delay: 3.5 },
]

/* ======================================================================== */

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ size = 'lg' }) => {
  const { theme } = useTheme()
  const isMobile = useIsMobile()
  const isDark = theme === 'dark'

  /* ---- parallax tilt state (desktop only) ---- */
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    // normalise to -1 … 1
    const nx = (e.clientX - cx) / (rect.width / 2)
    const ny = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: ny * -6, y: nx * 6 }) // max ±6°
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto ${sizeClasses[size]}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 600 }}
    >
      {/* ---- parallax wrapper ---- */}
      <motion.div
        className="w-full h-full"
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ---- orbiting micro-bubbles ---- */}
        {!isMobile &&
          ORBIT_BUBBLES.map((b, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: b.size,
                height: b.size,
                top: '50%',
                left: '50%',
                marginTop: -b.size / 2,
                marginLeft: -b.size / 2,
                background: isDark
                  ? 'linear-gradient(135deg, rgba(155,135,245,.40), rgba(30,174,219,.30))'
                  : 'linear-gradient(135deg, rgba(99,102,241,.40), rgba(96,165,250,.30))',
                filter: isDark ? 'blur(0.5px)' : 'blur(1px)',
                boxShadow: isDark
                  ? '0 0 6px rgba(155,135,245,.3)'
                  : '0 0 4px rgba(99,102,241,.2)',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: b.duration,
                delay: b.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
              // orbit offset via translate
              // each bubble sits at a different radius from centre
              // the rotate animation spins the whole transform chain
            >
              <span
                className="block rounded-full"
                style={{
                  width: b.size,
                  height: b.size,
                  transform: `translateX(${b.radius})`,
                }}
              />
            </motion.span>
          ))}

        {/* ---- breathing gradient ring ---- */}
        <motion.div
          className="absolute inset-[-4px] rounded-full"
          style={{
            background: isDark
              ? 'conic-gradient(from 0deg, #9b87f5, #1EAEDB, #9b87f5)'
              : 'conic-gradient(from 0deg, #6366f1, #60a5fa, #6366f1)',
            padding: 3,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full rounded-full bg-background" />
        </motion.div>

        {/* ---- outer glow (theme-adaptive) ---- */}
        <motion.div
          className="absolute inset-[-8px] rounded-full pointer-events-none"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            boxShadow: isDark
              ? '0 0 30px rgba(155,135,245,.25), 0 0 60px rgba(30,174,219,.12)'
              : '0 0 24px rgba(99,102,241,.15), 0 0 48px rgba(96,165,250,.08)',
          }}
        />

        {/* ---- image container ---- */}
        <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-tech-purple/20">
          {/* theme-adaptive background behind transparent image */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? 'radial-gradient(circle at 50% 40%, rgba(155,135,245,.12) 0%, rgba(26,31,44,.9) 70%)'
                : 'radial-gradient(circle at 50% 40%, rgba(99,102,241,.08) 0%, rgba(255,255,255,.95) 70%)',
            }}
          />

          <OptimizedImage
            src="/assets/Mohammed_Tawfeq_Amiri_Picture Preview.png"
            alt="Mohammed Tawfeq Amiri"
            className="relative z-10 w-full h-full object-cover"
            priority
            withSkeleton
            widths={[256, 384, 512, 640]}
          />

          {/* subtle inner glow overlay */}
          <div
            className="absolute inset-0 z-20 pointer-events-none rounded-full"
            style={{
              background: isDark
                ? 'radial-gradient(circle at 50% 0%, rgba(155,135,245,.10) 0%, transparent 60%)'
                : 'radial-gradient(circle at 50% 0%, rgba(99,102,241,.06) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* ---- decorative dashed ring ---- */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: `1px dashed ${
              isDark ? 'rgba(155,135,245,.25)' : 'rgba(99,102,241,.20)'
            }`,
          }}
        />
      </motion.div>
    </div>
  )
}

export default ProfileAvatar
