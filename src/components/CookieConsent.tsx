import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Shield, Settings2, X } from 'lucide-react'

const CONSENT_KEY = 'mta_cookie_consent' // 'accepted' | 'denied'

type ConsentStatus = 'accepted' | 'denied' | null

/** Read the persisted choice (if any) */
function getStoredConsent(): ConsentStatus {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    if (v === 'accepted' || v === 'denied') return v
  } catch {
    /* private browsing */
  }
  return null
}

/** Persist the choice */
function storeConsent(status: 'accepted' | 'denied') {
  try {
    localStorage.setItem(CONSENT_KEY, status)
  } catch {
    /* private browsing */
  }
}

/** Tell Clarity that the user gave consent (enables cookies + multi-page sessions) */
function grantClarityConsent() {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity('consent')
  }
}

/**
 * GDPR-style cookie consent banner for Microsoft Clarity.
 *
 * Behaviour:
 * - On first visit the banner appears after a short delay.
 * - "Accept" → calls `clarity("consent")`, stores choice, hides banner.
 * - "Deny"   → does NOT call consent (Clarity runs cookieless), stores choice, hides banner.
 * - On return visits the stored choice is honoured automatically.
 * - An optional "Manage Cookies" button in the footer / privacy page
 *   can call `resetCookieConsent()` to re-show the banner.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // On mount — check stored preference or show the banner
  useEffect(() => {
    const stored = getStoredConsent()
    if (stored === 'accepted') {
      // Returning visitor who already accepted → silently grant
      grantClarityConsent()
      return
    }
    if (stored === 'denied') {
      // Returning visitor who denied → do nothing, Clarity stays cookieless
      return
    }
    // First-time visitor → show banner after a 1.5 s delay (non-blocking)
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleAccept = useCallback(() => {
    storeConsent('accepted')
    grantClarityConsent()
    setVisible(false)
  }, [])

  const handleDeny = useCallback(() => {
    storeConsent('denied')
    setVisible(false)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-consent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6 pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto max-w-2xl rounded-2xl border border-tech-purple/30 bg-background/95 backdrop-blur-xl shadow-2xl shadow-tech-purple/10">
            {/* Header */}
            <div className="flex items-start gap-3 p-5 pb-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tech-purple/10">
                <Cookie className="h-5 w-5 text-tech-purple" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-semibold text-foreground">
                  Cookie Preferences
                </h2>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  We use{' '}
                  <a
                    href="https://clarity.microsoft.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tech-purple hover:underline font-medium"
                  >
                    Microsoft Clarity
                  </a>{' '}
                  to understand how visitors interact with this site. Cookies
                  enable multi-page session replay &amp; heatmaps.
                </p>
              </div>
              <button
                onClick={handleDeny}
                aria-label="Dismiss cookie banner"
                className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Expandable details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pt-3 space-y-3">
                    {/* Essential */}
                    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3">
                      <Shield className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Essential (always on)
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Theme preference, cookie consent state. No third-party
                          tracking.
                        </p>
                      </div>
                    </div>
                    {/* Analytics */}
                    <div className="flex items-start gap-3 rounded-xl border border-tech-purple/20 bg-tech-purple/5 p-3">
                      <Cookie className="mt-0.5 h-4 w-4 text-tech-purple shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Analytics — Microsoft Clarity
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Session recordings, heatmaps, scroll-depth, and click
                          analytics. Cookies link page views into multi-page
                          sessions.{' '}
                          <a
                            href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-tech-purple hover:underline"
                          >
                            Learn more
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-5 pt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDetails((d) => !d)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Settings2 className="h-3.5 w-3.5" />
                  {showDetails ? 'Hide details' : 'Details'}
                </button>
                <Link
                  to="/privacy-policy"
                  className="text-xs text-muted-foreground hover:text-tech-purple transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDeny}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Deny
                </button>
                <button
                  onClick={handleAccept}
                  className="rounded-lg bg-tech-purple px-4 py-2 text-sm font-medium text-white hover:bg-tech-purple/90 shadow-lg shadow-tech-purple/25 transition-colors"
                >
                  Accept Cookies
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
