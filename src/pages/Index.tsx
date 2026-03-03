import React, { useEffect, useState, Suspense, lazy } from 'react'
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
    const smoothScrollTo = (id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      const header = document.querySelector('header') as HTMLElement | null
      const headerOffset = header ? header.offsetHeight + 8 : 0
      const rectTop = el.getBoundingClientRect().top + window.pageYOffset
      const target = Math.max(rectTop - headerOffset, 0)
      window.scrollTo({
        top: target,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
      // Update hash without jumping
      history.replaceState(null, '', `#${id}`)
    }

    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null

      if (link) {
        const targetId = link.getAttribute('href')?.substring(1)
        if (!targetId) return
        const loadedEl = document.querySelector(
          `[data-lazy-loaded='true'][data-lazy-id='${targetId}']`,
        ) as HTMLElement | null
        const anchorEl = document.getElementById(targetId)
        // If section already loaded, smooth scroll with offset
        if (loadedEl || (anchorEl && !anchorEl?.dataset.lazyId)) {
          e.preventDefault()
          smoothScrollTo(targetId)
          return
        }
        // Not loaded yet: force load then scroll when ready
        if (!loadedEl) {
          e.preventDefault()
          const once = (evt: Event) => {
            const id = (evt as CustomEvent<{ id: string }>).detail?.id
            if (id === targetId) {
              window.removeEventListener(
                'lazySectionLoaded',
                once as EventListener,
              )
              // Defer to next frame for layout after mount
              requestAnimationFrame(() => smoothScrollTo(targetId))
            }
          }
          window.addEventListener('lazySectionLoaded', once as EventListener)
          window.dispatchEvent(
            new CustomEvent('forceLoadSection', {
              detail: { id: targetId, scroll: true },
            }),
          )
        }
      }
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
    </ThemeProvider>
  )
}

export default Index
