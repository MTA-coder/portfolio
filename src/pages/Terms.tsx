import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TypewriterEffect from '@/components/TypewriterEffect'

const Terms = () => {
  useEffect(() => {
    document.title = 'Terms of Service | Mohammed Tawfeq Amiri'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-tech-dark-purple/80 via-tech-dark-purple to-tech-dark-purple/90 flex items-center justify-center py-12 px-4">
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
            texts={['Terms of Service']}
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
              Welcome to Mohammed Tawfeq Amiri's portfolio website. These Terms
              of Service govern your use of my website located at{' '}
              <span className="font-semibold text-tech-purple">
                mohammedtawfeq.com
              </span>{' '}
              and any related services provided by me.
            </p>
            <p>
              By accessing or using my website, you agree to be bound by these
              Terms of Service. If you do not agree with any part of these
              terms, you may not use my website.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              2. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos,
              images, and software, is the property of Mohammed Tawfeq Amiri and
              protected by copyright and other intellectual property laws. You
              may not use, reproduce, distribute, or display any portion of this
              website without prior written consent.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              3. User Conduct
            </h2>
            <p>When using this website, you agree to:</p>
            <ul className="list-disc list-inside ml-6 space-y-2">
              <li>
                Not engage in any activity that disrupts or interferes with the
                website's functionality
              </li>
              <li>
                Not attempt to gain unauthorized access to any part of the
                website
              </li>
              <li>
                Not use the website for any illegal or unauthorized purpose
              </li>
              <li>
                Not transmit any viruses, malware, or other malicious code
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              4. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, Mohammed Tawfeq
              Amiri shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              revenues, whether incurred directly or indirectly, or any loss of
              data, use, goodwill, or other intangible losses, resulting from
              your access to or use of or inability to access or use the
              website.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              5. Changes to Terms
            </h2>
            <p>
              I reserve the right to modify these Terms of Service at any time.
              If I make changes, I will provide notice by updating the date at
              the top of these terms and, in some cases, provide additional
              notice. Your continued use of the website after such changes
              indicates your acceptance of the modified terms.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              6. Contact
            </h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact me at:{' '}
              <a
                href="mailto:mohammed.tawfeq.amiri@gmail.com"
                className="text-tech-purple underline font-semibold"
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

export default Terms
