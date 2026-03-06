import { useCallback } from 'react'

/**
 * React hook that wraps the Microsoft Clarity JS API.
 *
 * Provides type-safe helpers for every Clarity command so you can
 * instrument your SPA without scattering `window.clarity` calls.
 *
 * Usage:
 *   const { trackEvent, setTag, identifyUser, upgradeSesison } = useClarity()
 *   trackEvent('cta_click')
 *   setTag('page', 'projects')
 */
export function useClarity() {
  /** True when the Clarity snippet has loaded */
  const isReady = typeof window !== 'undefined' && typeof window.clarity === 'function'

  /**
   * Set a custom tag (key-value) on the current session / page.
   * These appear in the Clarity dashboard under "Custom Tags".
   */
  const setTag = useCallback((key: string, value: string) => {
    if (isReady) window.clarity!('set', key, value)
  }, [isReady])

  /**
   * Fire a named custom event.
   * Visible under "Smart Events" in the Clarity dashboard.
   */
  const trackEvent = useCallback((eventName: string) => {
    if (isReady) window.clarity!('event', eventName)
  }, [isReady])

  /**
   * Identify the current user so Clarity can tie multiple sessions together.
   * Pass a stable, non-PII identifier (e.g. hashed user ID).
   */
  const identifyUser = useCallback(
    (
      customId: string,
      customSessionId?: string,
      customPageId?: string,
      friendlyName?: string,
    ) => {
      if (isReady)
        window.clarity!('identify', customId, customSessionId, customPageId, friendlyName)
    },
    [isReady],
  )

  /**
   * Upgrade the session to record at full fidelity.
   * Useful when a user hits a critical flow (checkout, error, etc.).
   */
  const upgradeSession = useCallback((reason: string) => {
    if (isReady) window.clarity!('upgrade', reason)
  }, [isReady])

  /**
   * Signal user consent to Clarity (for GDPR / cookie-consent flows).
   * Call this AFTER the user accepts analytics cookies.
   */
  const consent = useCallback(() => {
    if (isReady) window.clarity!('consent')
  }, [isReady])

  return {
    isReady,
    setTag,
    trackEvent,
    identifyUser,
    upgradeSession,
    consent,
  } as const
}
