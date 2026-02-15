import { useState, useEffect, useCallback, useMemo } from 'react'

export interface DeviceCapabilities {
  isLowEnd: boolean
  isMobile: boolean
  isTablet: boolean
  supportsWebGL: boolean
  connectionSpeed: 'slow' | 'medium' | 'fast'
  memoryLimit: number
  screenSize: 'small' | 'medium' | 'large'
}

export const useOptimizedPerformance = () => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isLowEnd: false,
    isMobile: false,
    isTablet: false,
    supportsWebGL: false,
    connectionSpeed: 'medium',
    memoryLimit: 4,
    screenSize: 'medium',
  })

  const [metrics, setMetrics] = useState({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
  })

  const detectCapabilities = useCallback(() => {
    const hardwareConcurrency = navigator.hardwareConcurrency || 2

    interface NavigatorWithMemory extends Navigator {
      deviceMemory?: number
      connection?: { effectiveType?: string }
    }
    const nav = navigator as NavigatorWithMemory
    const deviceMemory = nav.deviceMemory ?? 4
    const connection = nav.connection

    // Enhanced device detection
    const userAgent = navigator.userAgent
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    )
    const isTablet =
      /iPad|Android(?=.*Mobile)/i.test(userAgent) && window.innerWidth >= 768

    // Screen size detection
    const screenWidth = window.innerWidth
    let screenSize: 'small' | 'medium' | 'large' = 'medium'
    if (screenWidth < 640) screenSize = 'small'
    else if (screenWidth > 1024) screenSize = 'large'

    // WebGL support
    const canvas = document.createElement('canvas')
    const supportsWebGL = !!(
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    )

    // Connection speed
    let connectionSpeed: 'slow' | 'medium' | 'fast' = 'medium'
    if (connection) {
      if (
        connection.effectiveType === 'slow-2g' ||
        connection.effectiveType === '2g'
      ) {
        connectionSpeed = 'slow'
      } else if (connection.effectiveType === '4g') {
        connectionSpeed = 'fast'
      }
    }

    // Enhanced low-end detection
    const isLowEnd =
      hardwareConcurrency <= 2 ||
      deviceMemory <= 2 ||
      connectionSpeed === 'slow' ||
      (isMobile && screenWidth < 375)

    setCapabilities({
      isLowEnd,
      isMobile,
      isTablet,
      supportsWebGL,
      connectionSpeed,
      memoryLimit: deviceMemory,
      screenSize,
    })
  }, [])

  const measurePerformance = useCallback(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        setMetrics((prev) => ({ ...prev, fps }))
        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(measureFPS)
    }

    requestAnimationFrame(measureFPS)
  }, [])

  useEffect(() => {
    detectCapabilities()
    measurePerformance()

    // Handle resize events
    const handleResize = () => {
      detectCapabilities()
    }

    window.addEventListener('resize', handleResize)

    const memoryInterval = setInterval(() => {
      if ('memory' in performance) {
        interface PerformanceWithMemory extends Performance {
          memory?: { usedJSHeapSize: number }
        }
        const perf = performance as PerformanceWithMemory
        if (perf.memory) {
          setMetrics((prev) => ({
            ...prev,
            memoryUsage: Math.round(perf.memory.usedJSHeapSize / 1048576),
          }))
        }
      }
    }, 5000)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(memoryInterval)
    }
  }, [detectCapabilities, measurePerformance])

  // Quality factor calculation for adaptive media/effects (0.4 - 1.0)
  const qualityFactor = useMemo(() => {
    let q = 1.0
    if (capabilities.isLowEnd) q -= 0.4
    if (capabilities.connectionSpeed === 'slow') q -= 0.2
    if (capabilities.memoryLimit <= 2) q -= 0.2
    if (metrics.fps < 45) q -= 0.1
    if (metrics.fps < 30) q -= 0.15
    return Math.max(0.4, Math.min(1, parseFloat(q.toFixed(2))))
  }, [capabilities, metrics.fps])

  const getOptimalSettings = useMemo(
    () => ({
      // Animations - disabled on low-end devices and when user prefers reduced motion
      animations:
        !capabilities.isLowEnd &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches,

      // Particle effects - heavily reduced for mobile and low-end devices
      particleCount: capabilities.isLowEnd ? 0 : capabilities.isMobile ? 1 : 2,

      // Interactive effects
      enableTrail: !capabilities.isLowEnd && !capabilities.isMobile,
      enableHover: !capabilities.isMobile,
      enableGlow: !capabilities.isMobile && !capabilities.isLowEnd,

      // Performance modes
      reducedMotion:
        capabilities.isLowEnd ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      lowPowerMode: capabilities.isLowEnd,

      // WebGL and 3D effects
      enableWebGL: capabilities.supportsWebGL && !capabilities.isLowEnd,
      enable3D:
        capabilities.supportsWebGL &&
        !capabilities.isLowEnd &&
        capabilities.screenSize !== 'small',

      // Layout optimizations
      useVirtualization: capabilities.isLowEnd || capabilities.isMobile,
      lazyLoadImages: true,

      // Animation timing adjustments
      animationDuration: capabilities.isLowEnd ? 0.2 : 0.4,
      staggerDelay: capabilities.isLowEnd ? 0.02 : 0.05,

      // Quality related settings
      qualityFactor,
      effectQuality:
        qualityFactor >= 0.9 ? 'high' : qualityFactor >= 0.7 ? 'medium' : 'low',
    }),
    [capabilities, qualityFactor],
  )

  return {
    capabilities,
    metrics,
    qualityFactor,
    getOptimalSettings,
  }
}
