import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import OptimizedImage from '@/components/OptimizedImage'

interface Project {
  id: string
  title: string
  description: string
  image: string
  logo?: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
  featured?: boolean
}

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const projects: Project[] = [
    {
      id: 'restuo',
      title: 'Restuo – Smart Restaurant SaaS Platform',
      description:
        'Restaurant SaaS ecosystem for orders, kitchen flow, cashier, delivery, and reporting.',
      image: '/assets/Restu/Cover%20Hero%20Section.png',
      tags: ['Angular', 'Laravel', 'PHP', 'MySQL', 'Payments'],
      featured: true,
    },
    {
      id: 'nova-tech',
      title: 'We Nova-Tech – Dynamic Company Platform',
      description:
        'High-performance landing page plus CMS dashboard for dynamic company content and branding.',
      image: '/assets/nova-tech/NovaTech%20Landing%20Page.png',
      tags: ['Angular', 'Laravel', 'PHP', 'MySQL', 'REST APIs'],
      demoUrl: 'https://galaxy-pi-mauve.vercel.app',
      featured: true,
    },
    {
      id: 'issan-mosque-dmk',
      title: 'Ihssan Mosque DMK – Donation & Services Website',
      description:
        'Multilingual donation and education platform with multi-gateway payments and a secure admin dashboard.',
      image: '/assets/ihssan-dmk/Hero%20section.jpg',
      tags: ['Angular', 'Laravel', 'PHP', 'MySQL', 'Payments'],
      featured: true,
    },
    {
      id: 'pro-decor',
      title: 'Pro Decor – VIP Dynamic Landing Page',
      description:
        'Multilingual VIP landing page with rich media, REST APIs, and a secure admin dashboard for end-to-end content control.',
      image: '/assets/pro-decor/Hero Section ProDecor.jpg',
      tags: ['Angular', 'Laravel', 'PHP', 'MySQL', 'REST APIs'],
      featured: true,
    },
    {
      id: 'correspondence',
      title: 'Automated Correspondence System',
      description:
        'A comprehensive correspondence system for government employees, enhancing communication efficiency by 40%.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      logo: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952',
      tags: ['Angular', 'ASP.NET Core', 'SQL Server', 'AI Integration'],
      featured: true,
    },
    {
      id: 'moei',
      title: 'Ministry of Energy Industry System',
      description:
        'Licensing system for MOEI with AI-driven chatbots and integrated authentication via UAE PASS.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      tags: ['ASP.NET Core', 'Angular', 'Entity Framework', 'AI Chatbot'],
      demoUrl: '#',
      featured: true,
    },
    {
      id: 'restaurant',
      title: 'Restaurant SaaS Platform',
      description:
        'Ecommerce SaaS platform for indoor and outdoor restaurant operations with real-time kitchen tracking.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
      tags: ['Angular', 'Laravel', 'Pusher', 'eCommerce'],
      githubUrl: '#',
      demoUrl: '#',
    },
    {
      id: 'erp',
      title: 'Employee Management ERP',
      description:
        'ERP system for managing employee, client, and worker information with financial account tracking.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      tags: ['Angular', 'Ngrx', 'Ag-Grid', 'Unit Testing'],
      demoUrl: '#',
    },
    {
      id: 'elearning',
      title: 'E-Learning Platform',
      description:
        'Interactive learning platform with course management, quizzes, and student progress tracking.',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      tags: ['Angular', 'Laravel', 'REST API', 'Video Streaming'],
      githubUrl: '#',
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Store & Admin Panel',
      description:
        'Comprehensive e-commerce solution with customer-facing store and admin control dashboard.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      tags: ['Angular', 'Laravel', 'Payment Integration', 'Admin Panel'],
      demoUrl: '#',
      githubUrl: '#',
    },
  ]

  const filters = [
    'all',
    'Angular',
    'ASP.NET Core',
    'Laravel',
    'PHP',
    'AI Integration',
  ]

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter))

  return (
    <section
      id="projects"
      className="py-24 bg-tech-dark-purple/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-tech-blue/5 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-tech-purple mx-auto mb-8"></div>
          <p className="text-muted-foreground">
            A showcase of my recent work across various technologies and
            industries.
          </p>
        </div>

        {/* Project filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              className={cn(
                'px-4 py-2 rounded-full text-sm transition-all',
                activeFilter === filter
                  ? 'bg-tech-purple text-white'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary',
              )}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'all' ? 'All Projects' : filter}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link
              to={`/projects/${project.id}`}
              key={project.id}
              className="perspective-container group"
              data-cursor="project"
            >
              <div className="bg-secondary/30 backdrop-blur-sm rounded-lg overflow-hidden transition-transform duration-500 h-full flex flex-col card-hover">
                {/* Project image */}
                <div className="h-48 overflow-hidden relative">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-tech-purple text-white text-xs py-1 px-2 rounded">
                      Featured
                    </div>
                  )}

                  {/* Logo overlay */}
                  {project.logo && (
                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <OptimizedImage
                        src={project.logo}
                        alt="Client logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-tech-dark-purple/80 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
                </div>

                {/* Project content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links row */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="text-muted-foreground hover:text-tech-purple"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`GitHub repository for ${project.title}`}
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          className="text-muted-foreground hover:text-tech-purple"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Live demo of ${project.title}`}
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                    <span className="text-tech-purple flex items-center text-sm group-hover:gap-1 transition-all">
                      View Details{' '}
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-tech-purple hover:bg-tech-purple/90 text-white"
          >
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
