import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Mail,
  MapPin,
  Send,
  Linkedin,
  Github,
  MessageCircle,
  Download,
} from 'lucide-react'
import { toast } from 'sonner'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useClarity } from '@/hooks/useClarity'

// 3D Social Media Icon component
const GeometricSocialIcon = ({
  icon: Icon,
  href,
  label,
  color = 'tech-purple',
  index = 0,
}: {
  icon: React.ElementType
  href: string
  label: string
  color?: string
  index?: number
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Track mouse position relative to element
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smoother follow with spring
  const springConfig = { damping: 15, stiffness: 150 }
  const followX = useSpring(mouseX, springConfig)
  const followY = useSpring(mouseY, springConfig)

  // Transform for rotation
  const rotateX = useTransform(followY, [-100, 100], [30, -30])
  const rotateY = useTransform(followX, [-100, 100], [-30, 30])

  // Handle mouse move
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      onClick={() => setClicked(true)}
      onAnimationComplete={() => setClicked(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: clicked ? 0.8 : 1,
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
      }}
      className="perspective-container group mb-4 w-20"
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 preserve-3d flex flex-col items-center"
      >
        <motion.div
          className={`relative w-16 h-16 bg-${color}/10 backdrop-blur-sm rounded-lg border border-${color}/30
            overflow-hidden transform-gpu transition-all duration-300 shadow-lg flex items-center justify-center`}
          animate={{
            boxShadow: hovered
              ? `0 10px 25px -5px rgba(155,135,245,0.5)`
              : `0 5px 15px -5px rgba(155,135,245,0.2)`,
          }}
        >
          {/* Front face */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={24} className={`text-${color}`} />
          </div>

          {/* Background geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute top-1/2 left-1/2 w-8 h-8 bg-${color} rounded-md`}
                style={{
                  x: -16,
                  y: -16,
                  rotate: i * 45,
                }}
                animate={{
                  rotate: [i * 45, (i + 1) * 45, i * 45],
                  scale: hovered ? [1, 1.2, 1] : 1,
                  opacity: hovered ? [0.1, 0.2, 0.1] : 0.1,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.p
          className={`text-xs mt-2 text-${color} font-medium opacity-80`}
          animate={{
            opacity: hovered ? 1 : 0.8,
          }}
        >
          {label}
        </motion.p>
      </motion.a>
    </motion.div>
  )
}

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subject = formData.subject.trim() || 'New Contact Message'
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      '',
      formData.message,
    ].join('\n')

    const mailto = `mailto:mohammed.tawfeq.amiri@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    toast.info('Opening your email app...', {
      description: 'Your message is ready to send.',
    })

    window.location.href = mailto

    // Track the contact form submission in Clarity
    if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
      window.clarity('event', 'contact_form_submit')
      window.clarity('set', 'contactSubject', subject)
    }

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
    setIsSubmitting(false)
  }

  return (
    <section
      id="contact"
      className="py-24 bg-secondary/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-tech-purple/5 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-tech-purple mx-auto mb-8"></div>
          <p className="text-muted-foreground">
            Have a project in mind or want to discuss collaboration
            opportunities? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.div
            className="bg-secondary/30 backdrop-blur-sm p-8 rounded-lg border border-border card-hover perspective-container"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your email"
                    className="bg-muted/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Message subject"
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message here..."
                  rows={5}
                  className="bg-muted/50 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="bg-tech-purple hover:bg-tech-purple/90 text-white w-full flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="space-y-8 perspective-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="bg-secondary/30 backdrop-blur-sm p-8 rounded-lg border border-border card-hover">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-tech-purple/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-tech-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email Address</h4>
                    <a
                      href="mailto:mohammed.tawfeq.amiri@gmail.com"
                      className="text-muted-foreground text-sm hover:text-tech-purple"
                    >
                      mohammed.tawfeq.amiri@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-tech-purple/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-tech-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-muted-foreground text-sm">
                      Abu Dhabi, United Arab Emirates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social media - with new 3D geometric design */}
            <div className="bg-secondary/30 backdrop-blur-sm p-8 rounded-lg border border-border card-hover">
              <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
              <div className="flex flex-wrap justify-center gap-6">
                <GeometricSocialIcon
                  icon={Linkedin}
                  href="https://www.linkedin.com/in/mohammed-tawfeq-amiri"
                  label="LinkedIn"
                  color="tech-purple"
                  index={0}
                />
                <GeometricSocialIcon
                  icon={Github}
                  href="https://github.com/MTA-coder"
                  label="GitHub"
                  color="tech-purple"
                  index={1}
                />
                <GeometricSocialIcon
                  icon={Mail}
                  href="mailto:mohammed.tawfeq.amiri@gmail.com"
                  label="Email"
                  color="tech-purple"
                  index={2}
                />
                <GeometricSocialIcon
                  icon={MessageCircle}
                  href="https://wa.me/971505941856"
                  label="WhatsApp"
                  color="tech-purple"
                  index={3}
                />
              </div>
            </div>

            {/* Resume download */}
            <a
              href="/assets/Mohammed%20Tawfeq%20Amiri%20Full%20Stack%20Developer.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full bg-tech-purple hover:bg-tech-purple/90 text-white h-12 flex items-center justify-center gap-2">
                <Download size={18} />
                Download My Full Resume
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
