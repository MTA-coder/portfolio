import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Linkedin,
  Github,
  Mail,
  MessageCircle,
  Download,
  Menu,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '@/components/ThemeToggle'

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = [
        'home',
        'about',
        'skills',
        'experience',
        'projects',
        'blog',
        'contact',
      ]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    const willClose = mobileMenuOpen
    setMobileMenuOpen(!mobileMenuOpen)
    if (willClose) {
      // Return focus to the menu button when closing
      requestAnimationFrame(() => menuButtonRef.current?.focus())
    }
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-md py-2'
            : 'bg-background/80 backdrop-blur-sm py-4',
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden">
              <img
                src="/android-chrome-512x512.png"
                alt="MTA Logo"
                className="w-12 h-12 rounded-lg"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gradient">
              Mohammed
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'nav-link transition-colors hover:text-tech-purple text-base relative',
                  activeSection === item.id ? 'active text-tech-purple' : '',
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-tech-purple"
                    layoutId="activeSection"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle size={18} />
            <a
              href="https://www.linkedin.com/in/mohammed-tawfeq-amiri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="text-muted-foreground hover:text-tech-purple transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/MTA-coder"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="text-muted-foreground hover:text-tech-purple transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:mohammed.tawfeq.amiri@gmail.com"
              aria-label="Email"
              title="Email"
              className="text-muted-foreground hover:text-tech-purple transition-colors"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://wa.me/971505941856"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              className="text-muted-foreground hover:text-tech-purple transition-colors"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href="/assets/Mohammed%20Tawfeq%20Amiri%20Full%20Stack%20Developer.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                variant="default"
                className="flex items-center gap-2 bg-tech-purple text-white hover:bg-tech-purple/90"
              >
                <Download size={16} />
                Resume
              </Button>
            </a>
          </div>

          {/* Mobile Navigation - Theme Toggle and Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle size={18} />

            <motion.button
              ref={menuButtonRef}
              className="text-foreground relative z-[60] p-2"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={
                mobileMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-lg"
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/95 pt-16 pb-6 px-6 flex flex-col h-screen overflow-y-auto"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* Navigation items */}
              <nav className="flex flex-col space-y-3 flex-1 justify-center min-h-0">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={cn(
                      'text-lg py-2.5 px-5 w-full text-center rounded-lg transition-all duration-300',
                      activeSection === item.id
                        ? 'bg-tech-purple/20 text-tech-purple border border-tech-purple/30'
                        : 'hover:bg-tech-purple/10 border border-transparent',
                    )}
                    onClick={() => {
                      setMobileMenuOpen(false)
                      requestAnimationFrame(() =>
                        menuButtonRef.current?.focus(),
                      )
                    }}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    whileTap={{
                      scale: 0.95,
                      backgroundColor: 'rgba(168, 85, 247, 0.3)',
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* Social links in mobile menu */}
              <motion.div
                className="flex justify-center gap-4 border-t border-border pt-4 pb-2"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <a
                  href="https://www.linkedin.com/in/mohammed-tawfeq-amiri"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="p-3 rounded-full bg-tech-purple/10 text-tech-purple"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://github.com/MTA-coder"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="p-3 rounded-full bg-tech-purple/10 text-tech-purple"
                >
                  <Github size={20} />
                </a>
                <a
                  href="mailto:mohammed.tawfeq.amiri@gmail.com"
                  aria-label="Email"
                  title="Email"
                  className="p-3 rounded-full bg-tech-purple/10 text-tech-purple"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="https://wa.me/971505941856"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="p-3 rounded-full bg-tech-purple/10 text-tech-purple"
                >
                  <MessageCircle size={20} />
                </a>
              </motion.div>

              {/* Resume button */}
              <motion.div
                className="pb-4 flex justify-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <a
                  href="/assets/Mohammed%20Tawfeq%20Amiri%20Full%20Stack%20Developer.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="bg-tech-purple hover:bg-tech-purple/90 text-white flex items-center gap-2 px-6 py-2.5 text-base w-full">
                    <Download size={18} /> Resume
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
