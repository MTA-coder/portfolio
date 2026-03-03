import React, { useEffect, useState, Suspense, lazy } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from '@/components/Navbar'
import OptimizedMobileHeroSection from '@/components/OptimizedMobileHeroSection'
import AnimatedPage from '@/components/AnimatedPage'
import PerformantBackground from '@/components/PerformantBackground'
import SplashScreen from '@/components/SplashScreen'
import LazyLoadSection from '@/components/LazyLoadSection'
import OptimizedTouchInteractions from '@/components/OptimizedTouchInteractions'
import { ThemeProvider } from '@/hooks/useTheme'
import { useIsMobile } from '@/hooks/use-mobile'
import { useOptimizedPerformance } from '@/hooks/useOptimizedPerformance'
import StatsSection from '@/components/StatsSection'
import Footer from '@/components/Footer'
import { Helmet } from 'react-helmet-async'

// Lazy load components with better error boundaries
const AboutSection = lazy(() => import('@/components/AboutSection'))
const SkillsSection = lazy(() => import('@/components/SkillsSection'))
const ExperienceSection = lazy(() => import('@/components/ExperienceSection'))
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'))
const BlogSection = lazy(() => import('@/components/BlogSection'))
const ContactSection = lazy(() => import('@/components/ContactSection'))
const TestimonialsSection = lazy(() =>
  import('@/components/TestimonialsSection'),
)

const OptimizedSkeleton = () => (
  <div className="py-12 md:py-24 flex items-center justify-center">
    <div className="animate-pulse text-tech-purple text-sm md:text-base">
      Loading...
    </div>
  </div>
)

const Index = () => {
  const isMobile = useIsMobile()
  const { capabilities, getOptimalSettings } = useOptimizedPerformance()
  const settings = getOptimalSettings
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.title = 'Mohammed Tawfeq Amiri | Portfolio'

    // Optimized loading time based on device capabilities
    const loadingTime = capabilities.isLowEnd
      ? 600
      : settings.lowPowerMode
      ? 800
      : 1000
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, loadingTime)

    return () => clearTimeout(timer)
  }, [capabilities.isLowEnd, settings.lowPowerMode])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // Ordered list of lazy-loaded section ids
    const SECTION_ORDER = [
      'about',
      'skills',
      'experience',
      'projects',
      'testimonials',
      'blog',
      'contact',
    ]

    /**
     * Smooth animated scroll that adapts in real-time as lazy sections load and
     * shift the page layout.  Uses requestAnimationFrame with easeInOutCubic for
     * a polished, professional feel, then a settle phase for micro-corrections.
     */
    const ANIM_DURATION = 900 // ms for main scroll animation
    const SETTLE_INTERVAL = 80 // ms between post-animation stability checks
    const SETTLE_REQUIRED = 4 // consecutive stable checks before done

    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const getTargetY = (id: string) => {
      const el = document.getElementById(id)
      if (!el) return window.scrollY
      const header = document.querySelector('header') as HTMLElement | null
      const headerOffset = header ? header.offsetHeight + 8 : 0
      return Math.max(
        el.getBoundingClientRect().top + window.scrollY - headerOffset,
        0,
      )
    }

    const scrollToSection = (targetId: string) => {
      let animStartY = window.scrollY
      let animStartTime = 0
      let currentTargetY = getTargetY(targetId)

      // ── Main animation (rAF, 60 fps, easeInOutCubic) ──
      const animate = (now: number) => {
        if (!animStartTime) animStartTime = now

        // Recalculate target — sections may still be rendering
        const newTargetY = getTargetY(targetId)

        // If the target shifted (layout changed), smoothly remap from
        // the current scroll position so the animation never "jumps"
        if (Math.abs(newTargetY - currentTargetY) > 3) {
          animStartY = window.scrollY
          animStartTime = now
          currentTargetY = newTargetY
        }

        const elapsed = now - animStartTime
        const progress = Math.min(elapsed / ANIM_DURATION, 1)
        const y = animStartY + (currentTargetY - animStartY) * ease(progress)

        window.scrollTo({ top: y, behavior: 'auto' })

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          settlePhase(targetId)
        }
      }

      // ── Settle phase: tiny smooth corrections until position is stable ──
      const settlePhase = (id: string) => {
        let stableCount = 0
        let lastY = getTargetY(id)
        let attempts = 0

        const check = () => {
          attempts++
          const y = getTargetY(id)

          if (Math.abs(y - lastY) < 2) {
            stableCount++
          } else {
            stableCount = 0
            // Smooth micro-correction so user sees gentle adjustment
            window.scrollTo({
              top: y,
              behavior: prefersReducedMotion ? 'auto' : 'smooth',
            })
          }
          lastY = y

          if (stableCount >= SETTLE_REQUIRED || attempts > 30) {
            window.scrollTo({
              top: y,
              behavior: prefersReducedMotion ? 'auto' : 'smooth',
            })
            history.replaceState(null, '', `#${id}`)
          } else {
            setTimeout(check, SETTLE_INTERVAL)
          }
        }

        check()
      }

      // Kick off after React flushes pending renders
      requestAnimationFrame(() => requestAnimationFrame(animate))
    }

    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return

      const targetId = link.getAttribute('href')?.substring(1)
      if (!targetId) return

      e.preventDefault()

      // "home" is never lazy, just scroll to top
      if (targetId === 'home') {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        })
        history.replaceState(null, '', `#home`)
        return
      }

      // Force-load every section from the first up to and including the target
      // so the page height is correct before we scroll.
      const targetIndex = SECTION_ORDER.indexOf(targetId)
      if (targetIndex !== -1) {
        for (let i = 0; i <= targetIndex; i++) {
          window.dispatchEvent(
            new CustomEvent('forceLoadSection', {
              detail: { id: SECTION_ORDER[i] },
            }),
          )
        }
      } else {
        // Unknown / standalone section — just force-load it
        window.dispatchEvent(
          new CustomEvent('forceLoadSection', {
            detail: { id: targetId },
          }),
        )
      }

      scrollToSection(targetId)
    }

    document.addEventListener('click', handleNavClick)
    return () => document.removeEventListener('click', handleNavClick)
  }, [])

  // Enhanced viewport meta tag for better mobile experience
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover',
      )
    }
  }, [])

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion={settings.reducedMotion ? 'always' : 'user'}>
        <OptimizedTouchInteractions>
          <AnimatedPage>
            <div className="flex flex-col min-h-screen relative overflow-hidden">
              <Helmet>
                <title>Mohammed Tawfeq Amiri | Portfolio</title>
                <link
                  rel="canonical"
                  href="https://mta-coder.github.io/portfolio/"
                />
                <meta
                  name="robots"
                  content="index,follow,max-image-preview:large"
                />
                <link
                  rel="preload"
                  as="font"
                  href="/fonts/Inter-Variable.woff2"
                  type="font/woff2"
                  crossOrigin="anonymous"
                />
                <meta
                  name="description"
                  content="Full-stack engineer portfolio: enterprise systems, SaaS platforms, AI integrations, high-performance web apps."
                />
                <meta
                  property="og:title"
                  content="Mohammed Tawfeq Amiri | Portfolio"
                />
                <meta
                  property="og:description"
                  content="Showcasing enterprise software, SaaS, AI integration and high-performance web projects."
                />
                <meta property="og:type" content="website" />
                <meta
                  property="og:url"
                  content={
                    typeof window !== 'undefined' ? window.location.href : ''
                  }
                />
                <meta
                  property="og:image"
                  content="https://mta-coder.github.io/portfolio/og-image.png"
                />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:type" content="image/png" />
                <meta
                  property="og:image:alt"
                  content="Mohammed Tawfeq Amiri — Full Stack Developer"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                  name="twitter:image"
                  content="https://mta-coder.github.io/portfolio/og-image.png"
                />
                <script type="application/ld+json">
                  {JSON.stringify([
                    {
                      '@context': 'https://schema.org',
                      '@type': 'Person',
                      name: 'Mohammed Tawfeq Amiri',
                      jobTitle: 'Full Stack Engineer',
                      image:
                        'https://mta-coder.github.io/portfolio/profile-seo.png',
                      url: 'https://mta-coder.github.io/portfolio/',
                      sameAs: [
                        'https://www.linkedin.com/in/mohammed-tawfeq-amiri',
                        'https://github.com/MTA-coder',
                      ],
                    },
                    {
                      '@context': 'https://schema.org',
                      '@type': 'WebSite',
                      name: 'Mohammed Tawfeq Amiri Portfolio',
                      url: 'https://mta-coder.github.io/portfolio/',
                      potentialAction: {
                        '@type': 'SearchAction',
                        target:
                          'https://mta-coder.github.io/portfolio/?q={search_term_string}',
                        'query-input': 'required name=search_term_string',
                      },
                    },
                    {
                      '@context': 'https://schema.org',
                      '@type': 'ItemList',
                      name: 'Portfolio Projects',
                      itemListElement: [
                        'lamasat-erp',
                        'yesser-recruitment',
                        'smart-race-application',
                        'restuo',
                        'nova-tech',
                        'issan-mosque-dmk',
                        'pro-decor',
                      ].map((id, i) => ({
                        '@type': 'ListItem',
                        position: i + 1,
                        url: `https://mta-coder.github.io/portfolio/projects/${id}`,
                      })),
                    },
                    {
                      '@context': 'https://schema.org',
                      '@type': 'Blog',
                      name: 'Mohammed Tawfeq Amiri — Blog',
                      url: 'https://mta-coder.github.io/portfolio/blog',
                      blogPost: [
                        {
                          '@type': 'BlogPosting',
                          headline:
                            'Zone.js in Angular: Deep Dive into Its Evolution (Angular 16–19)',
                          datePublished: '2025-03-02',
                          url:
                            'https://mta-coder.github.io/portfolio/blog/zone-js-angular-deep-dive',
                          author: {
                            '@type': 'Person',
                            name: 'Mohammed Tawfeq Amiri',
                          },
                        },
                        {
                          '@type': 'BlogPosting',
                          headline:
                            'Revolutionize Your Responsive Web Design Testing with Responsively',
                          datePublished: '2023-09-28',
                          url:
                            'https://mta-coder.github.io/portfolio/blog/responsively-responsive-design-testing',
                          author: {
                            '@type': 'Person',
                            name: 'Mohammed Tawfeq Amiri',
                          },
                        },
                      ],
                    },
                  ])}
                </script>
              </Helmet>
              {/* Conditional effects based on performance settings */}
              <Navbar />
              {settings.animations && <PerformantBackground />}

              <main className="flex-grow relative z-10">
                <OptimizedMobileHeroSection />
                <StatsSection />

                <Suspense fallback={<OptimizedSkeleton />}>
                  <LazyLoadSection id="about">
                    <AboutSection />
                  </LazyLoadSection>
                </Suspense>

                <Suspense fallback={<OptimizedSkeleton />}>
                  <LazyLoadSection id="skills">
                    <SkillsSection />
                  </LazyLoadSection>
                </Suspense>

                <Suspense fallback={<OptimizedSkeleton />}>
                  <LazyLoadSection id="experience">
                    <ExperienceSection />
                  </LazyLoadSection>
                </Suspense>

                <Suspense fallback={<OptimizedSkeleton />}>
                  <LazyLoadSection id="projects">
                    <ProjectsSection />
                  </LazyLoadSection>
                </Suspense>

                <Suspense fallback={<OptimizedSkeleton />}>
                  <LazyLoadSection id="testimonials">
                    <TestimonialsSection />
                  </LazyLoadSection>
                </Suspense>

                <Suspense fallback={<OptimizedSkeleton />}>
                  <LazyLoadSection id="blog">
                    <BlogSection />
                  </LazyLoadSection>
                </Suspense>

                <Suspense fallback={<OptimizedSkeleton />}>
                  <LazyLoadSection id="contact">
                    <ContactSection />
                  </LazyLoadSection>
                </Suspense>
              </main>
              <Footer />
            </div>
          </AnimatedPage>
        </OptimizedTouchInteractions>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default Index
