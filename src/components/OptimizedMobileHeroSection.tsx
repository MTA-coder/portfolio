import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDown, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'
import { useOptimizedPerformance } from '@/hooks/useOptimizedPerformance'
import TypewriterEffect from './TypewriterEffect'
import OptimizedImage from '@/components/OptimizedImage'

const OptimizedMobileHeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { getOptimalSettings } = useOptimizedPerformance()
  const settings = getOptimalSettings

  const techRoles = [
    'Full Stack Developer',
    'Angular Frontend',
    'Backend Developer',
    'Data Analyst',
    'Software Enginner',
    'Team Leader',
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 md:pt-16 overflow-hidden bg-tech-dark-purple"
    >
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-br from-tech-dark-purple/90 via-tech-dark-purple to-tech-dark-purple/95 z-0" />

      {/* Conditional background elements - removed mobile glow effects */}
      {!settings.reducedMotion && !isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-tech-purple/5 blur-2xl opacity-20" />
          <div className="absolute bottom-1/4 right-20 w-32 h-32 rounded-full bg-tech-blue/5 blur-2xl opacity-15" />
        </div>
      )}

      <div className="container mx-auto px-4 z-10">
        {/* Mobile Layout: Column with picture first */}
        <div className="flex lg:hidden flex-col items-center justify-center gap-8 text-center">
          {/* Profile picture - first on mobile */}
          <motion.div
            initial={settings.animations ? { opacity: 0, scale: 0.9 } : {}}
            animate={settings.animations ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: settings.animationDuration, delay: 0.1 }}
          >
            <OptimizedProfileImage />
          </motion.div>

          {/* Text content - after picture on mobile */}
          <div className="flex-1 max-w-4xl">
            <div className="text-lg md:text-xl mb-4 robot-typing">
              <TypewriterEffect
                texts={techRoles}
                speed={80}
                delay={1200}
                className="text-tech-purple font-medium"
              />
            </div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial={settings.animations ? { opacity: 0, y: 20 } : {}}
              animate={settings.animations ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: settings.animationDuration }}
            >
              <div className="block mb-2">Mohammed</div>
              <div className="block gradient-text">Tawfeq Amiri</div>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={settings.animations ? { opacity: 0, y: 20 } : {}}
              animate={settings.animations ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: settings.animationDuration, delay: 0.1 }}
            >
              Crafting exceptional digital experiences with{' '}
              <span className="text-tech-purple">cutting-edge</span> web
              technologies.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={settings.animations ? { opacity: 0, y: 20 } : {}}
              animate={settings.animations ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: settings.animationDuration, delay: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-tech-purple hover:bg-tech-purple/90 text-white w-full sm:w-auto min-h-[48px] px-8"
                onClick={() =>
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-tech-purple text-tech-purple hover:bg-tech-purple/10 flex items-center gap-2 w-full sm:w-auto min-h-[48px] px-8"
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <Mail size={18} /> Contact Me
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Desktop Layout: Row with text first, then picture */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-12">
          {/* Text content - left side on desktop */}
          <div className="flex-1 text-left">
            <div className="text-xl mb-4 robot-typing">
              <TypewriterEffect
                texts={techRoles}
                speed={80}
                delay={1200}
                className="text-tech-purple font-medium"
              />
            </div>

            <motion.h1
              className="text-6xl xl:text-7xl font-bold mb-6 leading-tight"
              initial={settings.animations ? { opacity: 0, y: 20 } : {}}
              animate={settings.animations ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: settings.animationDuration }}
            >
              <div className="block mb-2">Mohammed</div>
              <div className="block gradient-text">Tawfeq Amiri</div>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed"
              initial={settings.animations ? { opacity: 0, y: 20 } : {}}
              animate={settings.animations ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: settings.animationDuration, delay: 0.1 }}
            >
              Crafting exceptional digital experiences with{' '}
              <span className="text-tech-purple">cutting-edge</span> web
              technologies.
            </motion.p>

            <motion.div
              className="flex flex-row gap-4 justify-start items-center"
              initial={settings.animations ? { opacity: 0, y: 20 } : {}}
              animate={settings.animations ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: settings.animationDuration, delay: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-tech-purple hover:bg-tech-purple/90 text-white min-h-[48px] px-8"
                onClick={() =>
                  document
                    .getElementById('projects')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-tech-purple text-tech-purple hover:bg-tech-purple/10 flex items-center gap-2 min-h-[48px] px-8"
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <Mail size={18} /> Contact Me
              </Button>
            </motion.div>
          </div>

          {/* Profile picture - right side on desktop */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={settings.animations ? { opacity: 0, scale: 0.9 } : {}}
            animate={settings.animations ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: settings.animationDuration, delay: 0.1 }}
          >
            <OptimizedProfileImage />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-tech-purple transition-colors touch-target"
          initial={settings.animations ? { opacity: 0 } : {}}
          animate={settings.animations ? { opacity: 1 } : {}}
          transition={{ duration: settings.animationDuration, delay: 0.4 }}
        >
          <span className="text-sm">Scroll</span>
          <ArrowDown
            size={20}
            className={settings.animations ? 'animate-bounce' : ''}
          />
        </motion.a>
      </div>
    </section>
  )
}

const OptimizedProfileImage = () => {
  const { getOptimalSettings } = useOptimizedPerformance()
  const settings = getOptimalSettings

  return (
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
      {/* Main profile container - removed glow effects on mobile */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-tech-blue/20 via-tech-purple/20 to-tech-blue/20 shadow-2xl border border-tech-purple/30 flex items-center justify-center overflow-hidden p-1">
        <div className="w-full h-full relative overflow-hidden rounded-full bg-tech-dark-purple/90 p-1 border border-white/10">
          <div className="w-full h-full rounded-full overflow-hidden">
            <OptimizedImage
              src="/assets/Mohammed Tawfeq Amiri Picture.png"
              alt="Mohammed Tawfeq Amiri"
              className="w-full h-full object-cover"
              priority
              withSkeleton
              widths={[256, 384, 512, 640]}
            />
          </div>

          {/* Overlay effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-tech-purple/10 to-tech-blue/5 opacity-70 mix-blend-overlay" />
        </div>
      </div>

      {/* Simplified decorative rings */}
      <div className="absolute inset-0 border border-dashed border-tech-purple/30 rounded-full" />
      <div className="absolute inset-[-8px] border border-tech-blue/20 rounded-full" />

      {/* Conditional glow effect - only on desktop with animations enabled */}
      {settings.enableGlow && settings.animations && (
        <div className="absolute inset-[-12px] border border-tech-purple/10 rounded-full shadow-[0_0_20px_rgba(155,135,245,0.2)]" />
      )}
    </div>
  )
}

export default OptimizedMobileHeroSection
