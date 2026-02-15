import { useState, useEffect, useCallback, useMemo } from 'react'

export interface PerformanceMetrics {
  renderTime: number
  componentCount: number
  memoryUsage: number
  fps: number
}

export interface ExtendedPerformanceState {
  isPageHidden: boolean
  isIdle: boolean
  prefersReducedMotion: boolean
  shouldDowngradeAnimations: boolean // derived flag
}

interface NavigatorConnectionLike {
  effectiveType?: string
}
interface PerformanceMemoryLike {
  usedJSHeapSize: number
}

export const usePerformanceOptimization = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    componentCount: 0,
    memoryUsage: 0,
    fps: 0,
  })
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false)

  // New extended state
  const [extended, setExtended] = useState<ExtendedPerformanceState>({
    isPageHidden: false,
    isIdle: false,
    prefersReducedMotion: false,
    shouldDowngradeAnimations: false,
  })

  // Detect device performance capabilities
  const detectPerformanceCapabilities = useCallback(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number
      connection?: NavigatorConnectionLike
    }
    const hardwareConcurrency = navigator.hardwareConcurrency || 2
    const deviceMemory = nav.deviceMemory ?? 4
    const connection = nav.connection
    const effectiveType = connection?.effectiveType

    const isLowEnd =
      hardwareConcurrency <= 2 ||
      deviceMemory <= 2 ||
      (effectiveType && ['slow-2g', '2g'].includes(effectiveType))

    setIsLowPerformanceMode(isLowEnd)
    return isLowEnd
  }, [])

  // Performance monitoring (FPS)
  const startPerformanceMonitoring = useCallback(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let rafId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        setMetrics((prev) => ({ ...prev, fps }))
        frameCount = 0
        lastTime = currentTime
      }
      rafId = requestAnimationFrame(measureFPS)
    }

    rafId = requestAnimationFrame(measureFPS)
    return () => cancelAnimationFrame(rafId)
  }, [])

  // Memory usage monitoring
  const measureMemoryUsage = useCallback(() => {
    const perfAny = performance as Performance & {
      memory?: PerformanceMemoryLike
    }
    if ('memory' in perfAny && perfAny.memory) {
      const memory = perfAny.memory
      setMetrics((prev) => ({
        ...prev,
        memoryUsage: Math.round(memory.usedJSHeapSize / 1048576),
      }))
    }
  }, [])

  useEffect(() => {
    detectPerformanceCapabilities()
    const stopFPS = startPerformanceMonitoring()

    const interval = setInterval(measureMemoryUsage, 5000)

    // Page visibility & idle tracking
    let idleTimer: number | null = null
    const idleThreshold = 8000 // ms

    const prefersReduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false

    const setIdleFalse = () => {
      if (idleTimer) window.clearTimeout(idleTimer)
      setExtended((prev) => ({ ...prev, isIdle: false }))
      idleTimer = window.setTimeout(() => {
        setExtended((prev) => ({ ...prev, isIdle: true }))
      }, idleThreshold)
    }

    const handleVisibility = () => {
      const hidden = document.hidden
      setExtended((prev) => ({ ...prev, isPageHidden: hidden }))
    }

    ;['mousemove', 'keydown', 'scroll', 'touchstart', 'click', 'focus'].forEach(
      (evt) => {
        window.addEventListener(evt, setIdleFalse, { passive: true })
      },
    )
    document.addEventListener('visibilitychange', handleVisibility)

    // Initialize states
    setIdleFalse()
    handleVisibility()
    setExtended((prev) => ({ ...prev, prefersReducedMotion: prefersReduced }))

    return () => {
      clearInterval(interval)
      if (idleTimer) window.clearTimeout(idleTimer)
      document.removeEventListener('visibilitychange', handleVisibility)
      ;[
        'mousemove',
        'keydown',
        'scroll',
        'touchstart',
        'click',
        'focus',
      ].forEach((evt) => {
        window.removeEventListener(evt, setIdleFalse)
      })
      stopFPS()
    }
  }, [
    detectPerformanceCapabilities,
    startPerformanceMonitoring,
    measureMemoryUsage,
  ])

  // Derived downgrade decision
  useEffect(() => {
    setExtended((prev) => ({
      ...prev,
      shouldDowngradeAnimations:
        prev.prefersReducedMotion ||
        prev.isPageHidden ||
        prev.isIdle ||
        isLowPerformanceMode ||
        metrics.fps < 40,
    }))
  }, [metrics.fps, isLowPerformanceMode])

  const performanceFlags = useMemo(
    () => ({
      isLowPerformanceMode,
      ...extended,
      metrics,
    }),
    [isLowPerformanceMode, extended, metrics],
  )

  return {
    metrics,
    isLowPerformanceMode,
    detectPerformanceCapabilities,
    measureMemoryUsage,
    performanceFlags,
  }
}
