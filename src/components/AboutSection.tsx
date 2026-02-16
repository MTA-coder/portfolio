import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Download, Code, Database, Layout, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'

interface Service {
  icon: React.ElementType
  title: string
  description: string
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])
  const isMobile = useIsMobile()

  // Services data
  const services: Service[] = [
    {
      icon: Code,
      title: 'Frontend Development',
      description:
        'Creating responsive, dynamic user interfaces with Angular, React, and modern JavaScript frameworks.',
    },
    {
      icon: Database,
      title: 'Backend Development',
      description:
        'Building robust server-side applications with .NET Core, Laravel, and database management systems.',
    },
    {
      icon: Layout,
      title: 'UI/UX Design',
      description:
        'Designing intuitive, user-centered interfaces with modern design principles and patterns.',
    },
    {
      icon: Globe,
      title: 'Web Application',
      description:
        'Developing full-stack web solutions for businesses, from e-commerce to enterprise applications.',
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const storyVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
  }

  // Floating bubbles animation
  const floatingBubbles = Array.from({ length: 0 }).map((_, i) => ({
    x: Math.random() * 100 - 50,
    y: Math.random() * 60 - 30,
    duration: Math.random() * 3 + 5,
    delay: Math.random() * 2,
    size: Math.random() * 40 + 20,
  }))

  return (
    <motion.section
      id="about"
      className="py-24 relative overflow-hidden"
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      style={{ opacity }}
    >
      {/* Floating background bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingBubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-tech-purple/10"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${50 + bubble.x}%`,
              top: `${50 + bubble.y}%`,
            }}
            animate={{
              x: [0, 20, 0, -20, 0],
              y: [0, -20, 0, 20, 0],
              scale: [1, 1.1, 1, 0.9, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={itemVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-tech-purple mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="md:w-1/2 space-y-6"
            variants={itemVariants}
            style={{ y }}
          >
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-6"
            >
              <motion.h3
                className="text-2xl font-semibold mb-4"
                variants={storyVariants}
              >
                Full Stack Web Developer & Software Engineer
              </motion.h3>

              <motion.p
                className="text-muted-foreground"
                variants={storyVariants}
                custom={1}
              >
                With 5 years of experience in Informatics Engineering and 4
                years as a Full Stack Web Developer, I specialize in creating
                seamless user experiences using Angular, .NET Core, Entity
                Framework, Visual Basic, ASP.NET, and PHP/Laravel.
              </motion.p>

              <motion.p
                className="text-muted-foreground"
                variants={storyVariants}
                custom={2}
              >
                My expertise spans e-commerce, ERP systems, CRM systems, SaaS
                development, landing pages, and control panels. I'm skilled in
                deploying web applications on different servers, including IIS
                and various web hosting platforms.
              </motion.p>

              <motion.p
                className="text-muted-foreground"
                variants={storyVariants}
                custom={3}
              >
                I'm detail-oriented, organized, and work efficiently under tight
                deadlines. As a proactive team player, I'm always ready to
                contribute to achieving company goals.
              </motion.p>
            </motion.div>

            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <a
                  href="/assets/Mohammed%20Tawfeq%20Amiri%20Full%20Stack%20Developer.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-tech-purple hover:bg-tech-purple/90 text-white flex items-center gap-2"
                  >
                    <Download size={18} />
                    Download Resume
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="md:w-1/2" variants={itemVariants}>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-secondary/30 backdrop-blur-sm p-6 rounded-lg border border-border hover:border-tech-purple/30 transition-all duration-300 card-hover"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 25px -5px rgba(155, 135, 245, 0.3)',
                  }}
                  custom={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.2,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-tech-purple/20 flex items-center justify-center mb-4"
                    whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <service.icon className="text-tech-purple" />
                  </motion.div>
                  <h4 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <motion.div
        className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-tech-purple/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-tech-blue/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          delay: 1,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </motion.section>
  )
}

export default AboutSection
