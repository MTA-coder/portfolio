import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TypewriterEffect from '@/components/TypewriterEffect'

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Mohammed Tawfeq Amiri'
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    document
      .getElementById('root')
      ?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-background/80 via-background to-background/90 flex items-center justify-center py-12 px-4">
      <section className="w-full max-w-3xl mx-auto bg-background/80 rounded-2xl shadow-2xl border border-tech-purple/30 p-8 md:p-14 backdrop-blur-lg transition-all duration-300">
        <nav className="mb-8 flex justify-start">
          <Link to="/">
            <Button
              className="flex items-center gap-2"
              aria-label="Back to Home"
            >
              <ArrowLeft size={18} />
              <span className="font-medium">Back to Home</span>
            </Button>
          </Link>
        </nav>
        <header className="mb-10 text-center">
          <TypewriterEffect
            texts={['Privacy Policy']}
            speed={60}
            delay={1400}
            className="text-4xl md:text-5xl font-extrabold text-gradient drop-shadow-lg"
            cursorClassName="text-tech-purple"
          />
          <p className="mt-3 text-base text-muted-foreground font-medium">
            Last updated: April 29, 2025
          </p>
        </header>
        <article className="space-y-10 text-muted-foreground text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              1. Introduction
            </h2>
            <p>
              Welcome to Mohammed Tawfeq Amiri's portfolio website. I value your
              privacy and am committed to protecting your personal information.
              This Privacy Policy explains how your data is collected, used, and
              safeguarded when you interact with this site.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              2. Data Collection
            </h2>
            <p>
              When you use the contact form, the following information may be
              collected:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Subject of inquiry</li>
              <li>Message content</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              3. Data Usage
            </h2>
            <p>
              Your information is used solely to respond to your inquiries or
              requests. It will not be used for marketing purposes or shared
              with third parties without your explicit consent.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              4. Data Retention
            </h2>
            <p>
              Your contact information is retained only as long as necessary to
              fulfill the purpose for which it was collected, or to comply with
              legal, accounting, or reporting requirements.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              5. Your Rights
            </h2>
            <p>You have rights under data protection laws, including:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              6. Analytics &amp; Cookies
            </h2>
            <p>
              This site uses{' '}
              <a
                href="https://clarity.microsoft.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tech-purple underline"
              >
                Microsoft Clarity
              </a>{' '}
              to collect anonymous usage data such as session recordings,
              heatmaps, and scroll-depth analytics. Clarity operates in{' '}
              <strong>cookieless mode by default</strong> — cookies are only
              enabled once you click &quot;Accept Cookies&quot; in the consent
              banner.
            </p>
            <p className="mt-3">
              When cookies are enabled, Clarity can link multiple page views
              within a single visit into a unified session. If you deny cookies,
              Clarity will still function but each page view is treated
              independently.
            </p>
            <p className="mt-3">
              You can change your cookie preference at any time by clicking the
              &quot;Manage Cookies&quot; link in the footer, or by clearing your
              browser&apos;s local storage.
            </p>
            <p className="mt-3">
              For more information about how Clarity handles data, see{' '}
              <a
                href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tech-purple underline"
              >
                Microsoft Clarity — Consent Mode
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              7. Contact
            </h2>
            <p>
              For any questions regarding this Privacy Policy or your data,
              please contact:{' '}
              <a
                href="mailto:mohammed.tawfeq.amiri@gmail.com"
                className="text-tech-purple underline"
              >
                mohammed.tawfeq.amiri@gmail.com
              </a>
            </p>
          </section>
        </article>
      </section>
    </main>
  )
}

export default PrivacyPolicy
