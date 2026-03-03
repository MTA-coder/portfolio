import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, GraduationCap, Sparkles } from 'lucide-react'
import StorytellingTimeline from './StorytellingTimeline'
import EducationCard from './EducationCard'

interface ExperienceItem {
  id: number
  date: string
  title: string
  company: string
  location: string
  description: string[]
  isRight?: boolean
  storyTitle?: string
  impact?: string
}

interface EducationItem {
  id: number
  degree: string
  institution: string
  location: string
  date: string
  achievements: string
  scores: string
}

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  const educationData: EducationItem[] = [
    {
      id: 1,
      degree: 'BSc in Information Technology',
      institution: 'University of Aleppo',
      location: 'Syria, Aleppo',
      date: '2016 - 2022',
      scores: 'Percentage: 84.74% | GPA: 3.7 / 4.0 | CGPA: 8.4 / 10',
      achievements:
        'Scored 92% on AI-focused graduation project—leveraging neural networks, Genie AI, and computer vision to generate 3D images of fruits from simple sketches. Studied advanced courses in Artificial Intelligence, Database Systems, Software Engineering, and Web Development.',
    },
  ]

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      date: 'July 2024 - Present',
      title: 'Full Stack Web Developer',
      company: 'Smart Works for Information System',
      location: 'UAE, Abu Dhabi',
      storyTitle: '🚀 The AI Integration Pioneer',
      impact: 'Revolutionizing government systems with AI-powered solutions',
      description: [
        'Developed five high-impact web applications for government and private clients, including an automated Correspondence System and a licensing system for the MOEI, integrating AI-driven chatbots and incorporating UAE PASS and UAE ICP for seamless user authentication.',
        'Architected and developed comprehensive web applications using Angular, ASP.NET Core & VB.NET—enhancing communication efficiency by 40% and reducing approval processing time by 30%.',
        'Spearheaded AI-driven chatbot integration across multiple platforms, improving user experience and reducing manual support intervention by 50%.',
        'Optimized database management with SQL Server Management Studio, implementing best practices for efficient data storage and retrieval to boost overall application performance.',
        'Championed Agile methodologies across all projects, achieving a 70% increase in project efficiency and adaptability to evolving requirements.',
      ],
      isRight: true,
    },
    {
      id: 2,
      date: 'April 2021 - January 2024',
      title: 'Full Stack Web Developer',
      company: 'IT-TRENDCO',
      location: 'Germany, Remote',
      storyTitle: '🌍 The Remote Entrepreneur',
      impact: 'Building global SaaS platforms from innovation to delivery',
      description: [
        'Built an e-commerce SaaS platform powering indoor & outdoor restaurant operations with a real-time cooker tracking system, plus over 5 landing pages and an e-commerce store with full admin control panels.',
        'Leveraged entrepreneurial mindset to analyze business requirements, gather customer feedback, and ship new features—resulting in a 40% increase in product success rate.',
        'Collaborated with cross-functional teams using Angular & Laravel to ensure seamless coordination and adherence to Agile methodology, boosting project efficiency by 70%.',
        'Boosted meal delivery efficiency by 80% through a real-time event-driven system powered by Pusher technology.',
        'Achieved a 60% improvement in landing page load speed through lazy loading strategies, code splitting, and Progressive Web App (PWA) implementation.',
      ],
      isRight: false,
    },
    {
      id: 3,
      date: 'April 2023 - September 2023',
      title: 'Angular Developer',
      company: 'Yesser Recruitment Project',
      location: 'Saudi Arabia, Remote',
      storyTitle: '⚡ The Efficiency Architect',
      impact: 'Streamlining enterprise operations with scalable solutions',
      description: [
        'Built ERP modules for managing employees, clients, and workers—including financial accounts, worker housing, and optimized client contract workflows.',
        'Created reusable shared and isolated ag-grid component templates, reducing development time by 30% across the team.',
        'Enhanced codebase maintainability by 60% and scalability by 40% through architectural refactoring with NgRx Store for state management.',
        'Implemented Agile methodology to deliver on-time releases with a 90% sprint success rate.',
        'Achieved 90% unit test coverage, decreasing production bugs by 30% and cementing CI/CD confidence.',
      ],
      isRight: true,
    },
    {
      id: 4,
      date: 'July 2020 - April 2021',
      title: 'Full Stack Web Developer',
      company: '404 Developers',
      location: 'Syria, Aleppo',
      storyTitle: '🎯 The Foundation Builder',
      impact: 'Laying the groundwork with solid full-stack fundamentals',
      description: [
        'Developed a full-featured restaurant management system and an E-learning platform using Angular, Laravel & Laravel Blade.',
        'Built reusable services for REST API integration and form validation, improving coding and debugging speed by 20%.',
        'Collaborated in a small agile team delivering school management platforms and other client projects.',
        'Optimized database queries and front-end components, reducing page load times by 30% and improving overall UX.',
        'Integrated comprehensive error logging and monitoring tools, cutting bug identification and resolution time by 50%.',
      ],
      isRight: false,
    },
    {
      id: 5,
      date: '2019 - 2021',
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      location: 'Remote',
      storyTitle: '💡 The Independent Creator',
      impact: 'Turning ideas into live products as a solo developer',
      description: [
        'Designed, developed, and launched multiple freelance projects spanning web applications, landing pages, and e-commerce solutions for diverse clients.',
        'Built WordPress websites and custom web applications tailored to small business needs, from concept to deployment.',
        'Managed complete project lifecycles independently—client communication, requirements gathering, development, testing, and delivery.',
        'Rapidly adopted new technologies and frameworks to meet varying client requirements, strengthening full-stack problem-solving skills.',
      ],
      isRight: true,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <motion.section
      id="experience"
      className="py-24 relative bg-gradient-to-b from-background via-secondary/10 to-background"
      ref={sectionRef}
      style={{ opacity }}
    >
      {/* Enhanced background with storytelling elements */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-tech-purple/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-tech-blue/10 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced storytelling header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex justify-center items-center gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-tech-purple/20 to-tech-blue/20 flex items-center justify-center backdrop-blur-sm border border-tech-purple/30">
              <Sparkles className="text-tech-purple" size={28} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              My <span className="text-gradient">Journey</span>
            </h2>
          </motion.div>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-tech-purple to-tech-blue mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            6+ years of full-stack expertise spanning Angular, React, ASP.NET
            Core, Laravel & more—from freelance roots to AI-powered government
            systems. Discover the story behind every milestone and breakthrough.
          </motion.p>

          <motion.div
            className="mt-8 flex items-center justify-center gap-2 text-sm text-tech-purple"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={16} />
            </motion.div>
            <span>Scroll to explore the interactive timeline</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-6xl mx-auto"
        >
          <StorytellingTimeline items={experiences} />
        </motion.div>

        {/* Education Section with enhanced styling */}
        <motion.div
          className="text-center max-w-3xl mx-auto mt-32 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex justify-center items-center gap-3 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 rounded-lg bg-tech-purple/20 flex items-center justify-center">
              <GraduationCap className="text-tech-purple" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Academic <span className="text-gradient">Foundation</span>
            </h2>
          </motion.div>

          <motion.div
            className="w-20 h-1 bg-tech-purple mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {educationData.map((item) => (
            <EducationCard key={item.id} education={item} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default ExperienceSection
