import React from 'react'
import { Github, Linkedin, Mail, MessageCircle, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import LazyLoadSection from './LazyLoadSection'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <LazyLoadSection className="bg-secondary/50 backdrop-blur-sm border-t border-border relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-5"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and info */}
          <div className="text-center md:text-left max-w-md">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <img
                src="/android-chrome-512x512.png"
                alt="MTA Logo"
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-xl font-bold tracking-tight text-gradient">
                Mohammed Tawfeq
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Full Stack Web Developer specializing in Angular, .NET Core, and
              modern web applications. Passionate about creating seamless user
              experiences and robust, scalable solutions.
            </p>

            {/* Professional social media links */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <SocialLink
                icon={Linkedin}
                href="https://www.linkedin.com/in/mohammed-tawfeq-amiri"
                label="LinkedIn"
              />
              <SocialLink
                icon={Github}
                href="https://github.com/MTA-coder"
                label="GitHub"
              />
              <SocialLink
                icon={Mail}
                href="mailto:mohammed.tawfeq.amiri@gmail.com"
                label="Email"
              />
              <SocialLink
                icon={MessageCircle}
                href="https://wa.me/971505941856"
                label="WhatsApp"
              />
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-medium mb-4">Navigation</h4>
              <ul className="space-y-2">
                {[
                  'Home',
                  'About',
                  'Skills',
                  'Experience',
                  'Projects',
                  'Blog',
                  'Contact',
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-tech-purple transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Services</h4>
              <ul className="space-y-2">
                {[
                  'Web Development',
                  'Frontend Development',
                  'Backend Development',
                  'UI/UX Design',
                  'Database Design',
                ].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-lg font-medium mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">
                  <strong>Email:</strong> mohammed.tawfeq.amiri@gmail.com
                </li>
                <li className="text-sm text-muted-foreground">
                  <strong>Location:</strong> Abu Dhabi, UAE
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Scroll to top */}
        <div className="absolute right-4 bottom-24 md:right-8 md:bottom-8">
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Scroll to top"
            className="w-10 h-10 rounded-full bg-tech-purple flex items-center justify-center text-white hover:bg-tech-purple/90 transition-colors"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Mohammed Tawfeq Amiri. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-tech-purple"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-tech-purple"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </LazyLoadSection>
  )
}

// Simple professional social media link component
const SocialLink = ({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ElementType
  href: string
  label: string
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative group"
    >
      <div className="p-2 md:p-3 rounded-md bg-secondary/50 backdrop-blur-sm border border-tech-purple/20 text-tech-purple transition-all duration-300 hover:bg-tech-purple/20 hover:border-tech-purple">
        <Icon size={18} />
      </div>
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-tech-purple/90 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {label}
      </span>
    </a>
  )
}

export default Footer
