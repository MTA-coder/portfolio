import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useClarity } from '@/hooks/useClarity'

/**
 * Tracks SPA route changes in Microsoft Clarity.
 *
 * On every React Router navigation this component:
 *  1. Tags the current page path   → `clarity("set", "page", "/projects")`
 *  2. Tags a human-readable name   → `clarity("set", "pageName", "Projects")`
 *  3. Fires a custom pageview event → `clarity("event", "pageview")`
 *
 * Drop this component once inside `<BrowserRouter>`:
 *   <ClarityRouteTracker />
 */

const PAGE_NAMES: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/blog': 'Blog',
  '/privacy-policy': 'Privacy Policy',
  '/terms': 'Terms',
}

function resolvePageName(pathname: string): string {
  // Exact match
  if (PAGE_NAMES[pathname]) return PAGE_NAMES[pathname]

  // Dynamic routes
  if (pathname.startsWith('/projects/')) return 'Project Detail'
  if (pathname.startsWith('/blog/')) return 'Blog Detail'

  return 'Unknown'
}

export default function ClarityRouteTracker() {
  const location = useLocation()
  const { setTag, trackEvent } = useClarity()
  const prevPath = useRef<string | null>(null)

  useEffect(() => {
    // Skip the very first mount — Clarity already captures the initial pageview
    if (prevPath.current === null) {
      prevPath.current = location.pathname
      // Still tag the initial page for custom filtering
      setTag('page', location.pathname)
      setTag('pageName', resolvePageName(location.pathname))
      return
    }

    // Only fire on actual route changes
    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname

      setTag('page', location.pathname)
      setTag('pageName', resolvePageName(location.pathname))
      trackEvent('pageview')
    }
  }, [location.pathname, setTag, trackEvent])

  return null
}
