import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Github, ExternalLink, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'
import { Helmet } from 'react-helmet-async'
import OptimizedImage from '@/components/OptimizedImage'

interface Project {
  id: string
  title: string
  description: string
  image: string
  logo?: string
  tags: string[]
  client: string
  year: string
  demoUrl?: string
  githubUrl?: string
  featured?: boolean
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const projects: Project[] = [
    {
      id: 'lamasat-erp',
      title: 'Lamasat – Automated Business ERP System',
      description:
        'Full-featured ERP automating end-to-end operations—customers, employees, production, orders, shipping, invoicing, and financials with smart filtering, CSV/PDF exports, and real-time analytics.',
      image: '/assets/lamsat/Lamsat%20Logo.jpg',
      tags: [
        'Angular',
        'Laravel',
        'PHP',
        'MySQL',
        'Angular Material',
        'ApexCharts',
        'ERP',
      ],
      client: 'Lamasat',
      year: '2021',
      featured: true,
    },
    {
      id: 'yesser-recruitment',
      title: 'Yesser – Recruitment Agency ERP System',
      description:
        'Enterprise ERP platform for recruitment agencies managing the full lifecycle—contracts, clients, workers, sponsorship transfers, housing, financial operations, and compliance with Saudi labor systems.',
      image: '/assets/Yesser/Yesser%20Logo.png',
      tags: ['Angular', 'ASP.NET Core', 'AG Grid', 'NgRx', 'Firebase', 'ERP'],
      client: 'Yesser Recruitment',
      year: '2023',
      githubUrl: 'https://github.com/MTA-coder/yesser-recruitment',
      demoUrl: 'https://8264-58682.el-alt.com/',
      featured: true,
    },
    {
      id: 'smart-race-application',
      title: 'Smart Race Application – Camel Race Association',
      description:
        'Enterprise mobile and management platform for UAE camel racing with secure workflows, payments, and real-time communications.',
      image: '/assets/CRA/Cover%20Image.jpg',
      tags: [
        'Flutter',
        'ASP.NET Core',
        'SQL Server',
        'Payments',
        'Government',
        'Mobile',
      ],
      client: 'UAE Camel Race Association',
      year: '2024',
      featured: true,
    },
    {
      id: 'restuo',
      title: 'Restuo – Smart Restaurant SaaS Platform',
      description:
        'Cloud-based restaurant operating system covering menu, orders, kitchen, cashier, delivery, and analytics with multi-channel payments.',
      image: '/assets/Restu/Cover%20Hero%20Section.png',
      tags: ['Angular', 'Laravel', 'PHP', 'MySQL', 'Payments', 'SaaS', 'POS'],
      client: 'Restuo',
      year: '2024',
      featured: true,
    },
    {
      id: 'nova-tech',
      title: 'We Nova-Tech – Dynamic Company Platform',
      description:
        'Enterprise-style company platform with a high-performance landing page and a full CMS dashboard for dynamic content management.',
      image: '/assets/nova-tech/NovaTech%20Landing%20Page.png',
      tags: [
        'Angular',
        'Laravel',
        'PHP',
        'MySQL',
        'REST APIs',
        'Admin Dashboard',
        'SEO',
      ],
      client: 'We Nova-Tech',
      year: '2024',
      demoUrl: 'https://galaxy-pi-mauve.vercel.app',
      featured: true,
    },
    {
      id: 'issan-mosque-dmk',
      title: 'Ihssan Mosque DMK – Donation & Services Website',
      description:
        'Dynamic, multilingual donation platform with education program registrations, multi-gateway payments, and a full admin dashboard for charities.',
      image: '/assets/ihssan-dmk/Hero%20section.jpg',
      tags: [
        'Angular',
        'Laravel',
        'PHP',
        'MySQL',
        'REST APIs',
        'Payments',
        'SEO',
      ],
      client: 'Ihssan Mosque DMK',
      year: '2024',
      featured: true,
    },
    {
      id: 'pro-decor',
      title: 'Pro Decor – VIP Dynamic Landing Page',
      description:
        'Premium multilingual landing experience for VIP clients, powered by REST APIs and an admin dashboard for full content control across four languages.',
      image: '/assets/pro-decor/Hero Section ProDecor.jpg',
      tags: ['Angular', 'Laravel', 'PHP', 'MySQL', 'REST APIs', 'Multilingual'],
      client: 'Pro Decor',
      year: '2024',
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
      client: 'Government Agency',
      year: '2024',
      featured: true,
    },
    {
      id: 'moei',
      title: 'Ministry of Energy Industry System',
      description:
        'Licensing system for MOEI with AI-driven chatbots and integrated authentication via UAE PASS.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      tags: ['ASP.NET Core', 'Angular', 'Entity Framework', 'AI Chatbot'],
      client: 'Ministry of Energy',
      year: '2023',
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
      client: 'IT-TRENDCO',
      year: '2023',
      githubUrl: '#',
      demoUrl: '#',
    },

    {
      id: 'elearning',
      title: 'E-Learning Platform',
      description:
        'Interactive learning platform with course management, quizzes, and student progress tracking.',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      tags: ['Angular', 'Laravel', 'REST API', 'Video Streaming'],
      client: '404 Developers',
      year: '2021',
      githubUrl: '#',
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Store & Admin Panel',
      description:
        'Comprehensive e-commerce solution with customer-facing store and admin control dashboard.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      tags: ['Angular', 'Laravel', 'Payment Integration', 'Admin Panel'],
      client: 'IT-TRENDCO',
      year: '2022',
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 'crm',
      title: 'Customer Relationship Management System',
      description:
        'Comprehensive CRM solution for tracking customer interactions and managing sales pipelines.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      tags: ['Angular', 'ASP.NET Core', 'Entity Framework', 'SQL Server'],
      client: 'Corporate Client',
      year: '2022',
      demoUrl: '#',
    },
    {
      id: 'payroll',
      title: 'Payroll Management System',
      description:
        'Automated payroll processing system with tax calculations and employee self-service portal.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      tags: ['Angular', 'ASP.NET Core', 'SQL Server', 'Reporting'],
      client: 'Financial Services Firm',
      year: '2021',
    },
  ]

  const filters = [
    'all',
    'Angular',
    'ASP.NET Core',
    'Laravel',
    'PHP',
    'SQL Server',
    'AG Grid',
    'ApexCharts',
    'AI Integration',
  ]

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter))

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Projects | Portfolio</title>
        <link
          rel="canonical"
          href="https://mta-coder.github.io/mta-digital-storyteller/projects"
        />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta
          name="description"
          content="Browse software engineering projects across enterprise, SaaS, and AI domains."
        />
        <meta property="og:title" content="Projects" />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Projects',
              itemListElement: filteredProjects.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `https://mta-coder.github.io/mta-digital-storyteller/projects/${p.id}`,
                name: p.title,
                description: p.description,
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://mta-coder.github.io/mta-digital-storyteller/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Projects',
                  item:
                    'https://mta-coder.github.io/mta-digital-storyteller/projects',
                },
              ],
            },
          ])}
        </script>
      </Helmet>

      <Navbar />

      {/* Hero section */}
      <section className="pt-28 sm:pt-32 pb-16 bg-secondary/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-tech-blue/5 blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-tech-purple/15 blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-32 h-32 rounded-full bg-tech-purple/10 blur-2xl motion-safe:animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-tech-purple">
                    Home
                  </Link>
                </li>
                <li className="text-muted-foreground/60">/</li>
                <li className="text-tech-purple">Projects</li>
              </ol>
            </nav>
            <div className="relative inline-block">
              <div className="absolute -inset-6 rounded-full bg-tech-purple/10 blur-2xl motion-safe:animate-pulse" />
              <h1 className="relative text-4xl md:text-5xl font-bold mb-6">
                My <span className="text-gradient">Projects</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Explore my portfolio of web development projects, showcasing
              expertise in Angular, .NET Core, Laravel, and other technologies.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tech-purple/30 to-transparent" />
      </section>

      {/* Projects section */}
      <section className="py-12 sm:py-16 relative">
        {/* Background decorations */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-tech-purple/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-tech-blue/5 blur-3xl"></div>
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-tech-purple/5 blur-3xl"></div>
        <div className="absolute top-24 right-16 w-16 h-16 rounded-full bg-tech-purple/15 blur-xl motion-safe:animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Project filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in">
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
            {filteredProjects.map((project, index) => (
              <Link
                to={`/projects/${project.id}`}
                key={project.id}
                className={cn(
                  'perspective-container group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tech-purple/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  'animate-fade-in',
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-secondary/30 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-500 h-full flex flex-col card-hover">
                  {/* Project image */}
                  <div className="h-48 overflow-hidden relative">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      withSkeleton
                      widths={[400, 640, 768, 1024]}
                    />
                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-tech-purple text-white text-xs py-1 px-2 rounded">
                        Featured
                      </div>
                    )}

                    {/* Logo overlay */}
                    {project.logo && (
                      <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full overflow-hidden border-2 border-border">
                        <OptimizedImage
                          src={project.logo}
                          alt="Client logo"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          withSkeleton
                          widths={[40, 80, 120]}
                        />
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  </div>

                  {/* Project content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold group-hover:text-tech-purple transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {project.client}
                    </p>
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
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            className="text-muted-foreground hover:text-tech-purple"
                            target="_blank"
                            rel="noopener noreferrer"
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

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16 bg-secondary/30 backdrop-blur-sm rounded-lg">
              <h3 className="text-xl font-bold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                No projects match the selected filter.
              </p>
              <Button
                onClick={() => setActiveFilter('all')}
                className="bg-tech-purple hover:bg-tech-purple/90 text-white"
              >
                Show All Projects
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-16 bg-secondary/30 relative overflow-hidden">
        <div className="absolute -top-10 left-0 w-full h-10 bg-gradient-to-b from-transparent to-background/60" />
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10"></div>
        <div className="absolute -top-16 right-10 w-40 h-40 rounded-full bg-tech-purple/15 blur-2xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need a similar project?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how I can help you create a stunning web application
              tailored to your specific needs.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-tech-purple hover:bg-tech-purple/90 text-white"
            >
              <a href="/#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Projects
