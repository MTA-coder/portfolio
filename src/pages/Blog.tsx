import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Search, Calendar, Clock, Filter } from 'lucide-react'
import AnimatedPage from '@/components/AnimatedPage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Input } from '@/components/ui/input'
import { blogPosts } from '@/data/blogData'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Helmet } from 'react-helmet-async'
import OptimizedImage from '@/components/OptimizedImage'

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Extract unique categories
  const categories = ['All', ...new Set(blogPosts.map((post) => post.category))]

  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    document.title = 'Blog | Mohammed Tawfeq Amiri'
    window.scrollTo(0, 0)
  }, [])

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen relative overflow-hidden">
        <Helmet>
          <title>Blog | Portfolio</title>
          <link
            rel="canonical"
            href="https://mta-coder.github.io/portfolio//blog"
          />
          <meta name="robots" content="index,follow,max-image-preview:large" />
          <meta
            name="description"
            content="Technical articles and insights on full-stack engineering, performance, and architecture."
          />
          <meta property="og:title" content="Blog" />
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'Engineering Blog',
              description:
                'Technical articles and insights on full-stack engineering, performance, and architecture.',
              url: 'https://mta-coder.github.io/portfolio//blog',
              blogPost: blogPosts.slice(0, 10).map((p) => ({
                '@type': 'BlogPosting',
                headline: p.title,
                description: p.excerpt,
                datePublished: new Date(p.date).toISOString(),
                image: p.image,
                url: `https://mta-coder.github.io/portfolio//blog/${p.slug}`,
                author: { '@type': 'Person', name: p.author.name },
              })),
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
                  name: 'Blog',
                  item: 'https://mta-coder.github.io/portfolio//blog',
                },
              ],
            })}
          </script>
        </Helmet>
        <Navbar />

        {/* Page content */}
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Blog</span> & Articles
              </h1>
              <p className="text-muted-foreground text-lg">
                Thoughts, tutorials, and insights on web development and
                technology.
              </p>
            </div>

            {/* Search and filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-4xl mx-auto mb-12">
              <div className="relative w-full md:w-2/3">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    {selectedCategory === 'All'
                      ? 'All Categories'
                      : selectedCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? 'bg-tech-purple/20 text-tech-purple'
                          : ''
                      }
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Blog posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="blog-card h-full flex flex-col"
                      onClick={(e) => {
                        if (post.externalUrl) {
                          e.preventDefault()
                          window.open(
                            post.externalUrl,
                            '_blank',
                            'noopener,noreferrer',
                          )
                        }
                      }}
                    >
                      <article className="h-full flex flex-col">
                        {/* Image */}
                        <div className="h-48 overflow-hidden">
                          <OptimizedImage
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                            withSkeleton
                            widths={[400, 640, 768, 1024]}
                          />
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="blog-tag">{post.category}</span>
                          </div>
                          <h2 className="text-xl font-bold mb-3 group-hover:text-tech-purple transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-muted-foreground text-sm mb-4 flex-grow">
                            {post.excerpt}
                          </p>

                          {/* Post meta */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4 border-t border-border">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {post.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {post.readTime}
                              </span>
                            </div>
                            <span className="text-tech-purple flex items-center gap-1">
                              Read{' '}
                              <ArrowRight
                                size={14}
                                className="transition-transform group-hover:translate-x-1"
                              />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">
                    No articles found matching your search.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('All')
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedPage>
  )
}

export default Blog
