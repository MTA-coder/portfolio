import { useEffect } from 'react'

// Broadcast a custom event when user toggles reduced motion preference or page visibility
export const useGlobalAnimationControl = () => {
    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)')
        const dispatch = () => {
            window.dispatchEvent(new CustomEvent('global-animation-preference', {
                detail: { reduced: media.matches, hidden: document.hidden }
            }))
        }
        const handleVisibility = () => dispatch()
        media.addEventListener('change', dispatch)
        document.addEventListener('visibilitychange', handleVisibility)
        return () => {
            media.removeEventListener('change', dispatch)
            document.removeEventListener('visibilitychange', handleVisibility)
        }
    }, [])
}
