import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDown, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'
import TypewriterEffect from './TypewriterEffect'
import OptimizedImage from '@/components/OptimizedImage'

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  // Rotating tech roles for the typewriter effect
  const techRoles = [
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'JavaScript Expert',
    'React Specialist',
    'Digital Storyteller',
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 md:pt-16 overflow-hidden bg-background"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background to-background/90 z-0" />

      {/* Static tech shapes - no animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-tech-purple/5 blur-3xl opacity-20" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-tech-blue/5 blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-20 w-32 h-32 rounded-full bg-tech-orange/5 blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div
          className={`flex flex-col ${
            isMobile ? 'flex-col' : 'md:flex-row'
          } items-center justify-between gap-12`}
        >
          {/* For mobile, show the profile image first */}
          {isMobile && (
            <div ref={heroRef} className="flex-1 order-first">
              <ProfileImageWithEffects />
            </div>
          )}

          {/* Text content without animations */}
          <div ref={heroRef} className="flex-1 text-center md:text-left">
            <div className="text-lg md:text-xl mb-3 robot-typing">
              <TypewriterEffect
                texts={techRoles}
                speed={70}
                delay={2000}
                className="text-tech-purple font-medium"
              />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <div className="block mb-2 glitch-text">Mohammed</div>
              <div className="block gradient-text">Tawfeq Amiri</div>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
              <span className="highlight-char">Crafting</span> exceptional
              digital experiences with{' '}
              <span className="text-tech-purple">cutting-edge</span> web
              technologies and innovative solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-tech-purple hover:bg-tech-purple/90 text-white"
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-tech-purple text-tech-purple hover:bg-tech-purple/10 flex items-center gap-2"
              >
                <Mail size={18} /> Contact Me
              </Button>
            </div>

            <div className="mt-16 hidden md:block">
              <a
                href="#about"
                className="flex items-center gap-2 text-muted-foreground hover:text-tech-purple transition-colors"
              >
                Scroll Down <ArrowDown size={16} className="animate-bounce" />
              </a>
            </div>
          </div>

          {/* For desktop, show the profile image after the text content */}
          {!isMobile && (
            <div ref={heroRef} className="flex-1">
              <ProfileImageWithEffects />
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator for mobile */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-tech-purple transition-colors"
        >
          <span>Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}

// Simple profile image with minimal effects
const ProfileImageWithEffects = () => {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto">
      {/* Profile image with subtle styling */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-tech-blue/30 via-tech-purple/30 to-tech-blue/30 shadow-xl border-2 border-tech-purple/20 flex items-center justify-center overflow-hidden p-1">
        <div className="w-full h-full relative overflow-hidden rounded-full bg-secondary/80 p-1 border border-border">
          <div className="w-full h-full rounded-full overflow-hidden">
            <OptimizedImage
              src="/assets/Mohammed Tawfeq Amiri Picture.png"
              alt="Mohammed Tawfeq Amiri"
              className="w-full h-full object-cover"
              priority
              withSkeleton
              widths={[256, 384, 512, 768]}
            />
          </div>

          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-tech-purple/20 to-tech-blue/10 opacity-50 mix-blend-overlay" />
        </div>
      </div>

      {/* Simple static rings */}
      <div className="absolute inset-0 border-2 border-dashed border-tech-purple/40 rounded-full" />
      <div className="absolute inset-[-10px] border border-tech-blue/30 rounded-full shadow-[0_0_15px_rgba(30,174,219,0.3)]" />
      <div className="absolute inset-[-20px] border border-tech-purple/20 rounded-full" />
    </div>
  )
}

export default HeroSection
