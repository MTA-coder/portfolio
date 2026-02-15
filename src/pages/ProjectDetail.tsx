import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  FileVideo,
  Play,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Helmet } from 'react-helmet-async'
import OptimizedImage from '@/components/OptimizedImage'

type ProjectMediaType = 'image' | 'video' | 'document'

interface ProjectMedia {
  type: ProjectMediaType
  url: string
  caption?: string
  thumbnail?: string
}

interface ProjectData {
  id: string
  title: string
  description: string
  coverImage: string
  media: ProjectMedia[]
  client: string
  date: string
  technologies: string[]
  features?: string[]
  featureSections?: Array<{
    title: string
    items: string[]
  }>
  demoUrl?: string
  githubUrl?: string
}

const projects: Record<string, ProjectData> = {
  'pro-decor': {
    id: 'pro-decor',
    title: 'Pro Decor – VIP Dynamic Landing Page',
    description:
      'Pro Decor is a fully dynamic, multilingual landing page crafted for VIP customers in interior design and home improvement. Built on REST APIs, it delivers seamless content management across Arabic, English, Dutch, and Finnish, with an elegant experience optimized for web, mobile, and flat screens.',
    coverImage: '/assets/pro-decor/Hero Section ProDecor.jpg',
    media: [
      {
        type: 'image',
        url: '/assets/pro-decor/Hero Section ProDecor.jpg',
        caption: 'Hero section highlighting premium services',
      },
      {
        type: 'image',
        url: '/assets/pro-decor/Section Services ProDecor.jpg',
        caption: 'Services section with image, name, and description',
      },
      {
        type: 'image',
        url: '/assets/pro-decor/Section History ProDecor.jpg',
        caption: 'Company history and “Who We Are” storytelling',
      },
      {
        type: 'image',
        url: '/assets/pro-decor/About Us.jpg',
        caption: 'About us section and brand narrative',
      },
      {
        type: 'image',
        url: '/assets/pro-decor/Dashboard Services CRUD ProDecor.jpg',
        caption: 'Admin dashboard for multilingual content control',
      },
    ],
    client: 'Pro Decor',
    date: '2024',
    technologies: [
      'Angular',
      'HTML',
      'SCSS',
      'TypeScript',
      'Laravel',
      'PHP',
      'MySQL',
      'REST APIs',
      'Node.js',
      'Linux (IONOS Germany)',
    ],
    featureSections: [
      {
        title: 'Customer Experience & Platform Capabilities',
        items: [
          'Dynamic & multilingual content (AR, EN, DU, FI)',
          'Image & video sliders to showcase services and projects',
          'Services section with image, name, and description',
          'Portfolio gallery with high-quality imagery',
          'Embedded YouTube videos for engagement',
          'News & offers section with image, name, and description',
          'Company history and “Who We Are” storytelling',
          'Meet the Team introductions',
          'Contact form for service requests via email',
          'Integrated Google Maps location',
          'Customer reviews & testimonials',
          'Admin dashboard with login for full content control',
        ],
      },
      {
        title: 'Engineering Impact & Performance Leadership',
        items: [
          'Performance optimizations: lazy loading, gzip compression, CSS minification',
          'Results: FCP 2.65s → 400ms, LCP 8.24s → 1.63s, score 15% → 97%',
          'Role: Frontend UI/UX in Angular (SCSS, TypeScript)',
          'Role: Backend REST APIs in Laravel & MySQL',
          'Role: API & dashboard validations',
          'Role: Hosting & deployment on IONOS Germany server',
        ],
      },
    ],
  },
  correspondence: {
    id: 'correspondence',
    title: 'Automated Correspondence System',
    description:
      'A comprehensive correspondence system developed for government employees that enhances communication efficiency by 40%. This system streamlines document workflows, automates routing, and provides intelligent search capabilities.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
        caption: 'Document management dashboard',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
        caption: 'Correspondence overview',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        caption: 'User permission management',
      },
    ],
    client: 'Government Agency',
    date: 'January 2024',
    technologies: [
      'Angular',
      'ASP.NET Core',
      'SQL Server',
      'Entity Framework',
      'AI Integration',
      'UAE PASS',
    ],
    features: [
      'Document tracking and management',
      'Automated workflow routing',
      'Digital signatures with UAE PASS integration',
      'Role-based access control',
      'Advanced search with AI capabilities',
      'Comprehensive audit logging',
      'Real-time notifications',
    ],
  },
  moei: {
    id: 'moei',
    title: 'Ministry of Energy Industry System',
    description:
      'Licensing system for the Ministry of Energy and Industry with AI-driven chatbots and integrated authentication via UAE PASS. This system reduced processing time for approvals by 30% and streamlined the licensing process for both applicants and administrators.',
    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
        caption: 'Main dashboard view',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
        caption: 'Application processing interface',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1518792528501-352f829886dc',
        caption: 'Chatbot interaction',
      },
    ],
    client: 'Ministry of Energy and Industry',
    date: 'October 2023',
    technologies: [
      'Angular',
      'ASP.NET Core',
      'SQL Server',
      'Entity Framework',
      'AI Chatbot',
      'UAE PASS',
      'UAE ICP',
    ],
    features: [
      'Online license application and renewal',
      'Document validation and verification',
      'AI-powered application review assistance',
      'Integrated payment gateway',
      'Automated notifications',
      'Multi-level approval workflow',
      'Comprehensive reporting dashboard',
    ],
    demoUrl: '#',
  },
  restaurant: {
    id: 'restaurant',
    title: 'Restaurant SaaS Platform',
    description:
      'An ecommerce SaaS platform for indoor and outdoor restaurant operations with real-time kitchen tracking system. This solution boosted meal delivery efficiency by 80% through real-time monitoring and improved coordination between front-of-house and kitchen staff.',
    coverImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
        caption: 'Main dashboard overview',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
        caption: 'Kitchen display system',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7',
        caption: 'Order management interface',
      },
      {
        type: 'video',
        url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
        thumbnail:
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        caption: 'Short walkthrough demo',
      },
      {
        type: 'document',
        url: 'https://samplelib.com/lib/preview/pdf/sample-3.pdf',
        caption: 'Implementation summary (PDF)',
      },
    ],
    client: 'IT-TRENDCO',
    date: 'July 2023',
    technologies: [
      'Angular',
      'Laravel',
      'Pusher',
      'MySQL',
      'PWA',
      'Payment Integration',
    ],
    features: [
      'Real-time order tracking',
      'Table management system',
      'Kitchen display system',
      'Inventory management',
      'Online ordering and payment',
      'Customer loyalty program',
      'Sales and analytics reporting',
    ],
    demoUrl: '#',
    githubUrl: '#',
  },
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const project = id ? projects[id] : undefined
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button
              asChild
              className="bg-tech-purple hover:bg-tech-purple/90 text-white"
            >
              <Link to="/projects">Back to Projects</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const mediaItems = useMemo(() => project.media || [], [project.media])
  const hasSingleDocument =
    mediaItems.length === 1 && mediaItems[0].type === 'document'

  const isPdf = (url: string) => url.toLowerCase().endsWith('.pdf')

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const navigateLightbox = (direction: 1 | -1) => {
    if (lightboxIndex === null) return
    const nextIndex =
      (lightboxIndex + direction + mediaItems.length) % mediaItems.length
    setLightboxIndex(nextIndex)
  }

  useEffect(() => {
    if (lightboxIndex === null) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }
      if (event.key === 'ArrowRight') {
        navigateLightbox(1)
      }
      if (event.key === 'ArrowLeft') {
        navigateLightbox(-1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, mediaItems.length])

  useEffect(() => {
    if (lightboxIndex === null || mediaItems.length < 2) return

    const preloadIndexes = [
      (lightboxIndex + 1) % mediaItems.length,
      (lightboxIndex - 1 + mediaItems.length) % mediaItems.length,
    ]

    preloadIndexes.forEach((index) => {
      const item = mediaItems[index]
      if (item.type === 'image') {
        const image = new Image()
        image.src = item.url
      }
      if (item.type === 'video' && item.thumbnail) {
        const image = new Image()
        image.src = item.thumbnail
      }
    })
  }, [lightboxIndex, mediaItems])

  return (
    <>
      <Helmet>
        <link
          rel="canonical"
          href={`https://yourwebsite.com/projects/${project.id}`}
        />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <title>{project.title} | Project Details</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.coverImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: project.title,
            description: project.description,
            codeRepository: project.githubUrl || undefined,
            dateCreated: new Date(project.date).toISOString(),
            programmingLanguage: project.technologies[0],
            keywords: project.technologies.join(', '),
            image: project.coverImage,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Projects',
                item: 'https://yourwebsite.com/projects',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: project.title,
                item: `https://yourwebsite.com/projects/${project.id}`,
              },
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-12">
        {/* Hero section */}
        <section className="relative h-[60vh] overflow-hidden">
          {/* Optimized hero image */}
          <OptimizedImage
            src={project.coverImage}
            alt={project.title}
            priority
            withSkeleton
            className="absolute inset-0 w-full h-full object-cover"
            widths={[640, 960, 1280, 1600]}
          />
          <OptimizedImage
            src={project.coverImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 blur-[1px]"
            widths={[640, 960, 1280, 1600]}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-tech-purple/20 blur-2xl" />
            <div className="absolute top-24 right-1/3 h-20 w-20 rounded-full bg-tech-purple/15 blur-xl" />
            <div className="absolute bottom-10 left-10 h-24 w-24 rounded-full bg-tech-purple/10 blur-2xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10 h-full flex items-end pb-8">
            <div className="max-w-3xl">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-tech-purple mb-4 hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Projects
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar size={16} />
                  <span>{project.date}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  Client: {project.client}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Project Overview</h2>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>

                {/* Image gallery */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Project Gallery</h2>
                  {mediaItems.length === 0 ? (
                    <div className="text-muted-foreground text-sm">
                      No media available for this project yet.
                    </div>
                  ) : hasSingleDocument ? (
                    <div className="bg-secondary/30 backdrop-blur-sm rounded-lg border border-border p-6 flex flex-col md:flex-row items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-tech-purple/10 flex items-center justify-center">
                        <FileText className="text-tech-purple" size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          Project Document
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {mediaItems[0].caption ||
                            'Open the full project document for a complete view.'}
                        </p>
                      </div>
                      <Button
                        asChild
                        className="bg-tech-purple hover:bg-tech-purple/90 text-white"
                      >
                        <a
                          href={mediaItems[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open Document
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mediaItems.map((media, index) => (
                        <div key={index} className="perspective-container">
                          <div className="bg-secondary/30 backdrop-blur-sm rounded-lg overflow-hidden card-hover">
                            {media.type === 'image' && (
                              <button
                                type="button"
                                onClick={() => openLightbox(index)}
                                className="w-full text-left"
                              >
                                <OptimizedImage
                                  src={media.url}
                                  loading="lazy"
                                  decoding="async"
                                  alt={
                                    media.caption ||
                                    `Project image ${index + 1}`
                                  }
                                  className="w-full h-48 object-cover"
                                  withSkeleton
                                  widths={[400, 640, 768, 1024]}
                                />
                              </button>
                            )}

                            {media.type === 'video' && (
                              <button
                                type="button"
                                onClick={() => openLightbox(index)}
                                className="w-full text-left relative"
                              >
                                {media.thumbnail ? (
                                  <OptimizedImage
                                    src={media.thumbnail}
                                    loading="lazy"
                                    decoding="async"
                                    alt={
                                      media.caption ||
                                      `Project video ${index + 1}`
                                    }
                                    className="w-full h-48 object-cover"
                                    withSkeleton
                                    widths={[400, 640, 768, 1024]}
                                  />
                                ) : (
                                  <div className="w-full h-48 bg-muted/50 flex items-center justify-center">
                                    <FileVideo
                                      className="text-tech-purple"
                                      size={36}
                                    />
                                  </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-12 h-12 rounded-full bg-tech-purple/80 flex items-center justify-center">
                                    <Play className="text-white" size={20} />
                                  </div>
                                </div>
                              </button>
                            )}

                            {media.type === 'document' && (
                              <div className="p-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-tech-purple/10 flex items-center justify-center">
                                  <FileText
                                    className="text-tech-purple"
                                    size={22}
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">
                                    {media.caption || 'Project Document'}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Open to view in full screen
                                  </p>
                                </div>
                                <Button
                                  asChild
                                  variant="outline"
                                  className="border-tech-purple text-tech-purple hover:bg-tech-purple/10"
                                >
                                  <a
                                    href={media.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Open
                                  </a>
                                </Button>
                              </div>
                            )}

                            {media.caption && media.type !== 'document' && (
                              <div className="p-4">
                                <p className="text-sm text-muted-foreground">
                                  {media.caption}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Features */}
                {project.featureSections?.length ? (
                  <div className="space-y-10">
                    {project.featureSections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="space-y-4">
                        <h2 className="text-2xl font-bold">{section.title}</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {section.items.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-tech-purple/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-tech-purple"></div>
                              </div>
                              <span className="text-muted-foreground">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Key Features</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {(project.features ?? []).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-tech-purple/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-tech-purple"></div>
                          </div>
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project details */}
                <div className="bg-secondary/30 backdrop-blur-sm p-6 rounded-lg border border-border card-hover">
                  <h3 className="text-xl font-bold mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Client
                      </h4>
                      <p>{project.client}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Date
                      </h4>
                      <p>{project.date}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="pt-4 space-y-2">
                      {project.demoUrl && (
                        <Button
                          asChild
                          variant="outline"
                          className="w-full flex items-center gap-2 border-tech-purple text-tech-purple hover:bg-tech-purple/10"
                        >
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          asChild
                          variant="outline"
                          className="w-full flex items-center gap-2 border-tech-purple text-tech-purple hover:bg-tech-purple/10"
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={16} />
                            GitHub Repository
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact card */}
                <div className="bg-secondary/30 backdrop-blur-sm p-6 rounded-lg border border-border card-hover">
                  <h3 className="text-xl font-bold mb-4">
                    Need a similar project?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    If you're interested in creating a similar solution for your
                    business, let's discuss how I can help!
                  </p>
                  <Button
                    asChild
                    className="w-full bg-tech-purple hover:bg-tech-purple/90 text-white"
                  >
                    <a href="/#contact">Contact Me</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related projects section - can be implemented if you have more projects */}
      </main>

      <Footer />

      {lightboxIndex !== null && mediaItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center hover:bg-secondary"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {mediaItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => navigateLightbox(-1)}
                className="absolute left-4 md:left-8 w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center hover:bg-secondary"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => navigateLightbox(1)}
                className="absolute right-4 md:right-8 w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center hover:bg-secondary"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <div className="max-w-5xl w-full">
            {mediaItems[lightboxIndex].type === 'image' && (
              <OptimizedImage
                src={mediaItems[lightboxIndex].url}
                alt={
                  mediaItems[lightboxIndex].caption ||
                  `Project image ${lightboxIndex + 1}`
                }
                className="w-full max-h-[75vh] object-contain rounded-lg"
                withSkeleton
                widths={[640, 960, 1280, 1600]}
              />
            )}

            {mediaItems[lightboxIndex].type === 'video' && (
              <div className="w-full">
                <video
                  src={mediaItems[lightboxIndex].url}
                  controls
                  className="w-full max-h-[75vh] rounded-lg bg-black"
                />
              </div>
            )}

            {mediaItems[lightboxIndex].type === 'document' && (
              <div className="bg-secondary/30 border border-border rounded-lg p-6">
                {isPdf(mediaItems[lightboxIndex].url) ? (
                  <iframe
                    title="Project document"
                    src={mediaItems[lightboxIndex].url}
                    className="w-full h-[70vh] rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-tech-purple/10 flex items-center justify-center">
                      <FileText className="text-tech-purple" size={28} />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {mediaItems[lightboxIndex].caption ||
                          'Open the document in a new tab'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This document will open in a new tab for the best view.
                      </p>
                    </div>
                    <Button
                      asChild
                      className="bg-tech-purple hover:bg-tech-purple/90 text-white"
                    >
                      <a
                        href={mediaItems[lightboxIndex].url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Document
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {mediaItems[lightboxIndex].caption && (
              <p className="text-sm text-muted-foreground mt-4 text-center">
                {mediaItems[lightboxIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectDetail
