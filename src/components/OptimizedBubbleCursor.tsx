import React, { useEffect, useRef } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useIsMobile } from '@/hooks/use-mobile'
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization'

type CursorType = 'default' | 'link' | 'button' | 'project' | 'text' | 'focus'

const OptimizedBubbleCursor: React.FC = React.memo(() => {
  const { theme } = useTheme()
  const isMobile = useIsMobile()
  const { isLowPerformanceMode } = usePerformanceOptimization()
  const previousBodyCursor = useRef<string | null>(null)

  // Respect user preference for reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // DO NOT early-return here — keep hooks order stable; compute disabled flag
  const disabled = isMobile || isLowPerformanceMode || prefersReducedMotion

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (disabled) {
      document.body.classList.remove('custom-cursor-active')
      if (previousBodyCursor.current !== null) {
        document.body.style.cursor = previousBodyCursor.current
        previousBodyCursor.current = null
      } else {
        document.body.style.cursor = ''
      }
      return
    }

    if (previousBodyCursor.current === null) {
      previousBodyCursor.current = document.body.style.cursor
    }
    document.body.style.cursor = 'none'
    document.body.classList.add('custom-cursor-active')

    return () => {
      document.body.classList.remove('custom-cursor-active')
      if (previousBodyCursor.current !== null) {
        document.body.style.cursor = previousBodyCursor.current
        previousBodyCursor.current = null
      } else {
        document.body.style.cursor = ''
      }
    }
  }, [disabled])

  const containerRef = useRef<HTMLDivElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const trailRefs = useRef<HTMLDivElement[]>([])
  const rippleRefs = useRef<HTMLDivElement[]>([])

  // Positions used by RAF (avoid React state updates)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const isActive = useRef(false)
  const cursorType = useRef<CursorType>('default')

  // Config
  const TRAIL_COUNT = 3
  const RIPPLE_POOL = 2
  const baseSize = 22
  const smoothing = 0.18

  useEffect(() => {
    if (disabled) return

    // Build DOM nodes once
    const container = document.createElement('div')
    container.setAttribute('aria-hidden', 'true')
    container.style.position = 'fixed'
    container.style.inset = '0'
    container.style.pointerEvents = 'none'
    container.style.zIndex = '100'
    containerRef.current = container

    const cursor = document.createElement('div')
    cursor.style.position = 'fixed'
    cursor.style.willChange = 'transform'
    cursor.style.width = `${baseSize}px`
    cursor.style.height = `${baseSize}px`
    cursor.style.borderRadius = '999px'
    cursor.style.transform = `translate3d(-9999px, -9999px, 0)`
    cursor.style.transition =
      'background 160ms ease, border-radius 160ms ease, width 160ms ease, height 160ms ease, transform 120ms linear'
    cursor.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)'
    cursor.style.pointerEvents = 'none'
    cursorRef.current = cursor
    container.appendChild(cursor)

    const ring = document.createElement('div')
    ring.style.position = 'fixed'
    ring.style.pointerEvents = 'none'
    ring.style.borderRadius = '50%'
    ring.style.width = `${baseSize * 2}px`
    ring.style.height = `${baseSize * 2}px`
    ring.style.opacity = '0.08'
    ring.style.transform = `translate3d(-9999px, -9999px, 0)`
    ring.style.transition = 'opacity 220ms ease, transform 120ms linear'
    ringRef.current = ring
    container.appendChild(ring)

    // Preallocate trail nodes
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const t = document.createElement('div')
      t.style.position = 'fixed'
      t.style.width = '12px'
      t.style.height = '12px'
      t.style.borderRadius = '50%'
      t.style.pointerEvents = 'none'
      t.style.opacity = `${0.45 - i * 0.12}`
      t.style.transform = `translate3d(-9999px, -9999px, 0)`
      t.style.transition = 'opacity 420ms ease-out'
      trailRefs.current.push(t)
      container.appendChild(t)
    }

    // Preallocate ripple pool
    for (let i = 0; i < RIPPLE_POOL; i++) {
      const r = document.createElement('div')
      r.style.position = 'fixed'
      r.style.width = '48px'
      r.style.height = '48px'
      r.style.borderRadius = '50%'
      r.style.pointerEvents = 'none'
      r.style.transform = `translate3d(-9999px, -9999px, 0) scale(0)`
      r.style.opacity = '0'
      r.style.transition =
        'transform 600ms cubic-bezier(.22,.9,.32,1), opacity 600ms ease-out'
      rippleRefs.current.push(r)
      container.appendChild(r)
    }

    document.body.appendChild(container)

    // Clean up on unmount
    return () => {
      try {
        container.remove()
      } catch (e) {
        // ignore
      }
    }
  }, [disabled])

  useEffect(() => {
    if (disabled) return
    // Update colors based on theme (no re-renders)
    if (!cursorRef.current || !ringRef.current) return
    const c = cursorRef.current
    const ring = ringRef.current

    const applyTheme = () => {
      if (theme === 'dark') {
        c.style.background = 'rgba(200,180,255,0.95)'
        ring.style.background =
          'radial-gradient(circle, rgba(180,150,255,0.08), transparent)'
        trailRefs.current.forEach(
          (t) => (t.style.background = 'rgba(170,140,255,0.18)'),
        )
        rippleRefs.current.forEach(
          (r) => (r.style.background = 'rgba(150,120,255,0.12)'),
        )
      } else {
        c.style.background = 'rgba(30,120,255,0.95)'
        ring.style.background =
          'radial-gradient(circle, rgba(60,140,255,0.06), transparent)'
        trailRefs.current.forEach(
          (t) => (t.style.background = 'rgba(80,160,255,0.14)'),
        )
        rippleRefs.current.forEach(
          (r) => (r.style.background = 'rgba(60,140,255,0.10)'),
        )
      }
    }

    applyTheme()
  }, [theme, disabled])

  useEffect(() => {
    if (disabled) return
    let raf = 0

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

    // Each trail position keeps its own internal pos to create stagger
    const trailPos = new Array(TRAIL_COUNT)
      .fill(null)
      .map(() => ({ x: -100, y: -100 }))

    const loop = () => {
      // Smoothly move pos toward target
      pos.current.x = lerp(pos.current.x, target.current.x, smoothing)
      pos.current.y = lerp(pos.current.y, target.current.y, smoothing)

      // Update main cursor
      if (cursorRef.current) {
        const scale = isActive.current ? 0.85 : 1
        const size = baseSize
        cursorRef.current.style.transform = `translate3d(${
          pos.current.x - size / 2
        }px, ${pos.current.y - size / 2}px, 0) scale(${scale})`
      }

      // Update ring
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${
          pos.current.x - baseSize
        }px, ${pos.current.y - baseSize}px, 0)`
      }

      // Update trail nodes, each lerps toward previous position
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const prev = i === 0 ? pos.current : trailPos[i - 1]
        trailPos[i].x = lerp(trailPos[i].x, prev.x, 0.22 + i * 0.02)
        trailPos[i].y = lerp(trailPos[i].y, prev.y, 0.22 + i * 0.02)
        const node = trailRefs.current[i]
        if (node) {
          node.style.transform = `translate3d(${trailPos[i].x - 6}px, ${
            trailPos[i].y - 6
          }px, 0) scale(${1 - i * 0.12})`
        }
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [disabled])

  useEffect(() => {
    if (disabled) return
    // Event handlers update target positions or classes but avoid React state updates
    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const detectContext = (targetEl: EventTarget | null) => {
      if (!(targetEl instanceof HTMLElement)) return 'default'
      const el = targetEl as HTMLElement
      if (el.closest('[data-cursor="project"], .project-card')) return 'project'
      if (el.closest('a, [role="link"]')) return 'link'
      if (el.closest('button, [role="button"], input, textarea, select'))
        return 'button'
      if (el.closest('input[type="text"], textarea')) return 'text'
      return 'default'
    }

    const applyCursorType = (type: CursorType) => {
      cursorType.current = type
      const c = cursorRef.current
      const ring = ringRef.current
      if (!c || !ring) return

      // Reset to base
      c.style.borderRadius = '999px'
      c.style.width = `${baseSize}px`
      c.style.height = `${baseSize}px`
      c.style.transition =
        'background 160ms ease, border-radius 160ms ease, width 160ms ease, height 160ms ease'
      ring.style.opacity = '0.08'

      switch (type) {
        case 'link':
          c.style.width = `${baseSize * 1.2}px`
          c.style.height = `${baseSize * 1.2}px`
          c.style.borderRadius = '50%'
          ring.style.opacity = '0.15'
          break
        case 'button':
          c.style.width = `${baseSize * 1.4}px`
          c.style.height = `${baseSize * 1.4}px`
          c.style.borderRadius = '8px'
          ring.style.opacity = '0.12'
          break
        case 'project':
          c.style.width = `${baseSize * 1.8}px`
          c.style.height = `${baseSize * 1.8}px`
          c.style.borderRadius = '40%'
          ring.style.opacity = '0.16'
          break
        case 'text':
          c.style.width = `${baseSize * 0.7}px`
          c.style.height = `${baseSize * 0.7}px`
          c.style.borderRadius = '999px'
          ring.style.opacity = '0.04'
          break
        case 'focus':
          c.style.width = `${baseSize * 1.1}px`
          c.style.height = `${baseSize * 1.1}px`
          c.style.borderRadius = '12px'
          ring.style.opacity = '0.12'
          break
        default:
          break
      }
    }

    const handleOver = (e: MouseEvent) =>
      applyCursorType(detectContext(e.target))
    const handleDown = (e: MouseEvent) => {
      isActive.current = true
      // small immediate scale
      if (cursorRef.current) cursorRef.current.style.transform += ' scale(0.85)'

      // spawn ripple from pool
      const pool = rippleRefs.current
      const r = pool.shift()
      if (r) {
        // setup ripple
        r.style.left = `${e.clientX - 24}px`
        r.style.top = `${e.clientY - 24}px`
        r.style.transform = 'scale(0)'
        r.style.opacity = '0.45'
        // force reflow then animate
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        r.offsetHeight
        r.style.transform = 'scale(3)'
        r.style.opacity = '0'

        // return to pool after animation
        setTimeout(() => {
          r.style.transform = `translate3d(-9999px,-9999px,0) scale(0)`
          r.style.opacity = '0'
          pool.push(r)
        }, 620)
      }
    }
    const handleUp = () => {
      isActive.current = false
      // restore transform smoothing handled by RAF
    }

    const handleFocusIn = (e: FocusEvent) => {
      applyCursorType(detectContext(e.target))
    }
    const handleFocusOut = () => applyCursorType('default')

    const handleSelection = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().length > 0) applyCursorType('text')
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mouseover', handleOver, { passive: true })
    window.addEventListener('mousedown', handleDown, { passive: true })
    window.addEventListener('mouseup', handleUp, { passive: true })
    window.addEventListener('focusin', handleFocusIn, true)
    window.addEventListener('focusout', handleFocusOut, true)
    document.addEventListener('selectionchange', handleSelection)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('focusin', handleFocusIn, true)
      window.removeEventListener('focusout', handleFocusOut, true)
      document.removeEventListener('selectionchange', handleSelection)
    }
  }, [disabled])

  // Attach nodes to DOM once component mounted (separate effect to ensure refs are ready)
  useEffect(() => {
    if (disabled) return
    if (!containerRef.current) return
    // container already appended in initial effect; ensure cursor nodes are referenced
    // Walk children and map refs correctly if component remounted
    const container = containerRef.current
    const nodes = Array.from(container.children) as HTMLElement[]

    // Expect order: cursor, ring, TRAIL_COUNT x trail, RIPPLE_POOL x ripple
    const cursor = nodes[0] as HTMLDivElement | undefined
    const ring = nodes[1] as HTMLDivElement | undefined
    if (cursor) cursorRef.current = cursor
    if (ring) ringRef.current = ring

    const trails: HTMLDivElement[] = []
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const t = nodes[2 + i] as HTMLDivElement | undefined
      if (t) trails.push(t)
    }
    trailRefs.current = trails

    const ripples: HTMLDivElement[] = []
    for (let i = 0; i < RIPPLE_POOL; i++) {
      const r = nodes[2 + TRAIL_COUNT + i] as HTMLDivElement | undefined
      if (r) ripples.push(r)
    }
    rippleRefs.current = ripples
  }, [disabled])

  // Render nothing, DOM nodes are managed manually
  return null
})

OptimizedBubbleCursor.displayName = 'OptimizedBubbleCursor'
export default OptimizedBubbleCursor
