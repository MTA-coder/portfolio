import { useEffect } from 'react'

// Prefetch route code bundles on idle & when links enter viewport
export const useRoutePrefetch = () => {
    useEffect(() => {
        const links = Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[]
        const preloaded = new Set<string>()

        const prefetch = (href: string) => {
            if (preloaded.has(href)) return
            preloaded.add(href)
            // Trigger dynamic import for known routes
            if (href.startsWith('/projects')) import('@/pages/Projects')
            else if (href.startsWith('/blog/')) import('@/pages/BlogDetail')
            else if (href.startsWith('/blog')) import('@/pages/Blog')
            else if (href.startsWith('/projects/')) import('@/pages/ProjectDetail')
        }

        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    const el = e.target as HTMLAnchorElement
                    prefetch(el.getAttribute('href') || '')
                    io.unobserve(el)
                }
            })
        })

        links.forEach((l) => io.observe(l))

        const idle = (cb: () => void) => {
            if ('requestIdleCallback' in window) {
                (window as typeof window & { requestIdleCallback?: (fn: () => void) => number }).requestIdleCallback?.(cb)
            } else setTimeout(cb, 200)
        }
        idle(() => {
            ['/projects', '/blog'].forEach(prefetch)
        })

        return () => io.disconnect()
    }, [])
}
