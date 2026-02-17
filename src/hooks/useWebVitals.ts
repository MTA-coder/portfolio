import { useEffect, useRef } from 'react'
import { onCLS, onFCP, onINP, onLCP, onTTFB, CLSMetric, FCPMetric, INPMetric, LCPMetric, TTFBMetric } from 'web-vitals'

interface SerializedMetric {
    name: string
    value?: number
    id?: string
    rating?: string
    navigationType?: string | PerformanceNavigationTiming['type']
    ts?: number
    duration?: number
    startTime?: number
    attribution?: any
}

// Enhanced Web Vitals collection using web-vitals library with batching + long task capture
export const useWebVitals = () => {
    const queueRef = useRef<SerializedMetric[]>([])
    const timeoutRef = useRef<number | null>(null)

    useEffect(() => {
        type AnyMetric = CLSMetric | FCPMetric | INPMetric | LCPMetric | TTFBMetric
        const flush = () => {
            if (!queueRef.current.length) return
            const payload = { metrics: queueRef.current, ts: Date.now() }
            // Only send analytics if a backend endpoint exists (skip on static hosts like GitHub Pages)
            if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                console.debug('[WebVitals] Skipping beacon on static host', payload)
                queueRef.current = []
                return
            }
            try {
                navigator.sendBeacon?.('/__analytics', JSON.stringify(payload))
            } catch {
                fetch('/__analytics', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    keepalive: true,
                    headers: { 'Content-Type': 'application/json' },
                }).catch(() => { })
            }
            queueRef.current = []
        }
        const enqueue = (metric: SerializedMetric) => {
            queueRef.current.push(metric)
            console.log('[PerfMetric]', metric)
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
            timeoutRef.current = window.setTimeout(flush, 3000)
        }

        const handler = (metric: AnyMetric) =>
            enqueue({
                name: metric.name,
                value: metric.value,
                id: metric.id,
                rating: (metric as any).rating,
                navigationType: (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined)?.type,
                ts: Date.now(),
            })

        onFCP(handler)
        onLCP(handler)
        onINP(handler)
        onCLS(handler)
        onTTFB(handler)

        if ('PerformanceObserver' in window) {
            try {
                const longTaskObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if ((entry as any).duration >= 50) {
                            enqueue({
                                name: 'long-task',
                                duration: entry.duration,
                                startTime: entry.startTime,
                            })
                        }
                    })
                })
                // @ts-expect-error experimental type
                longTaskObserver.observe({ type: 'longtask', buffered: true })
            } catch {
                // ignore
            }
        }

        return () => {
            flush()
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
        }
    }, [])
}
