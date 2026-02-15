import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import LazyLoadSection from './LazyLoadSection'
import OptimizedImage from '@/components/OptimizedImage'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  projectType: string
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      role: 'IT Director',
      company: 'Government Agency',
      content:
        'The automated correspondence system has revolutionized our workflow. Communication efficiency improved by 40% and the AI integration is seamless. Outstanding work!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      projectType: 'Government System',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Project Manager',
      company: 'IT-TRENDCO',
      content:
        'The restaurant SaaS platform exceeded our expectations. Real-time kitchen tracking and the ecommerce integration work flawlessly. Highly recommended!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786',
      projectType: 'SaaS Platform',
    },
    {
      id: '3',
      name: 'Mohammed Hassan',
      role: 'CTO',
      company: 'YESSER Recruitment',
      content:
        'The ERP system is robust and user-friendly. The Angular implementation with NgRx state management is top-notch. Great attention to detail!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      projectType: 'ERP System',
    },
    {
      id: '4',
      name: 'Lisa Chen',
      role: 'Digital Manager',
      company: '404 Developers',
      content:
        'The e-learning platform has excellent user experience. Students love the interactive features and progress tracking. Professional delivery!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      projectType: 'E-Learning',
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <LazyLoadSection
      id="testimonials"
      className="py-24 bg-gradient-to-br from-tech-dark-purple/20 to-tech-blue/10 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-5"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-tech-purple/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-tech-blue/10 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-tech-purple mx-auto mb-8"></div>
          <p className="text-muted-foreground">
            What my clients say about working with me and the solutions I've
            delivered
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-6 h-full border border-tech-purple/20 hover:border-tech-purple/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(155,135,245,0.2)]">
                {/* Quote icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote
                    className="w-8 h-8 text-tech-purple/60"
                    aria-hidden="true"
                    focusable="false"
                  />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-tech-purple text-tech-purple"
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    {/* Replaced raw img with OptimizedImage for responsive AVIF/WebP (Unsplash) + skeleton */}
                    <OptimizedImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full"
                      widths={[48, 72, 96, 128]}
                      withSkeleton
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-tech-purple">
                      {testimonial.company}
                    </p>
                  </div>
                  <div className="text-xs bg-tech-purple/20 text-tech-purple px-2 py-1 rounded">
                    {testimonial.projectType}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">
            Ready to start your project?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-tech-purple hover:bg-tech-purple/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Get Started Today
          </a>
        </motion.div>
      </div>
    </LazyLoadSection>
  )
}

export default TestimonialsSection
