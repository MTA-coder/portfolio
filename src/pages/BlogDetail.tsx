import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  ChevronRight,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import AnimatedPage from '@/components/AnimatedPage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { blogPosts, BlogPost } from '@/data/blogData'
import OptimizedImage from '@/components/OptimizedImage'

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const navigate = useNavigate()

  // Find the post and related posts
  useEffect(() => {
    const currentPost = blogPosts.find((p) => p.slug === slug)

    if (currentPost) {
      // Redirect to external URL if the post is hosted externally
      if (currentPost.externalUrl) {
        window.open(currentPost.externalUrl, '_blank', 'noopener,noreferrer')
        navigate('/blog')
        return
      }

      setPost(currentPost)

      // Set related posts (same category, but not the current post)
      const related = blogPosts
        .filter(
          (p) =>
            p.category === currentPost.category && p.slug !== currentPost.slug,
        )
        .slice(0, 3)
      setRelatedPosts(related)

      document.title = `${currentPost.title} | Mohammed Tawfeq Amiri`
    } else {
      // If post not found, redirect to blog page
      navigate('/blog')
    }

    window.scrollTo(0, 0)
  }, [slug, navigate])

  if (!post) {
    return null // Will redirect to blog page
  }

  return (
    <AnimatedPage>
      <div className="flex flex-col min-h-screen relative overflow-hidden">
        <Navbar />
        <Helmet>
          <link
            rel="canonical"
            href={`https://mta-coder.github.io/portfolio/blog/${post.slug}`}
          />
          <meta name="robots" content="index,follow,max-image-preview:large" />
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Blog',
                  item: 'https://mta-coder.github.io/portfolio/blog',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: post.title,
                  item: `https://mta-coder.github.io/portfolio/blog/${post.slug}`,
                },
              ],
            })}
          </script>
        </Helmet>
        {/* Page content */}
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-tech-purple transition-colors">
                Home
              </Link>
              <ChevronRight className="mx-2" size={14} />
              <Link
                to="/blog"
                className="hover:text-tech-purple transition-colors"
              >
                Blog
              </Link>
              <ChevronRight className="mx-2" size={14} />
              <span className="text-tech-purple">{post.title}</span>
            </nav>

            {/* Blog hero */}
            <div className="blog-detail-hero rounded-lg relative overflow-hidden mb-12">
              <OptimizedImage
                src={post.image}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                withSkeleton
                widths={[640, 960, 1280]}
              />
              <div className="blog-detail-meta">
                <div className="flex items-center gap-2 mb-3">
                  <span className="blog-tag">{post.category}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-md">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-white/90 drop-shadow-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
              {/* Main content */}
              <div className="flex-grow lg:max-w-[70%]">
                {/* Author info */}
                <div className="flex items-center gap-4 p-6 bg-secondary/30 rounded-lg mb-8 backdrop-blur-sm">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">{post.author.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {post.author.title}
                    </div>
                  </div>
                </div>

                {/* Blog content */}
                <motion.div
                  className="blog-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  dangerouslySetInnerHTML={{
                    __html: convertMarkdownToHTML(post.content),
                  }}
                />

                <div className="mt-12 pt-8 border-t border-border flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to="/blog" className="flex items-center gap-2">
                      <ArrowLeft size={16} />
                      Back to all articles
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-[30%]">
                {/* Related posts */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.length > 0 ? (
                      relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.slug}
                          to={`/blog/${relatedPost.slug}`}
                          className="flex gap-4 group p-3 rounded-lg hover:bg-secondary/20 transition-colors"
                        >
                          <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                            <OptimizedImage
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              decoding="async"
                              withSkeleton
                              widths={[160, 240, 320]}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium group-hover:text-tech-purple transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <Calendar size={12} />
                              <span>{relatedPost.date}</span>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        No related articles found
                      </p>
                    )}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {[...new Set(blogPosts.map((p) => p.category))].map(
                      (category) => (
                        <Link
                          key={category}
                          to={`/blog?category=${category}`}
                          className="blog-tag text-sm py-1 px-3 hover:bg-tech-purple/30 transition-colors"
                        >
                          {category}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <Helmet>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta
          property="og:url"
          content={`https://mta-coder.github.io/portfolio/blog/${post.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            image: [post.image],
            datePublished: new Date(post.date).toISOString(),
            author: { '@type': 'Person', name: post.author.name },
            description: post.excerpt,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://mta-coder.github.io/portfolio/blog/${post.slug}`,
            },
          })}
        </script>
      </Helmet>
    </AnimatedPage>
  )
}

// Helper function to convert markdown to HTML
function convertMarkdownToHTML(markdown: string): string {
  // Simple markdown conversion (for a real app, use a proper markdown library)
  const html = markdown
    // Convert headings
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/### (.*)/g, '<h3>$1</h3>')

    // Convert paragraphs - text blocks with empty lines between them
    .replace(/(?:^|\n\n)([^\n]+)(?:\n\n|$)/g, '<p>$1</p>')

    // Convert code blocks
    .replace(/```([^`]*?)```/g, '<pre><code>$1</code></pre>')

    // Convert inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')

    // Convert lists
    .replace(/^\s*-\s+(.*)/gm, '<li>$1</li>')

    // Wrap lists in <ul>
    .replace(/(?:<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

    // Convert bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    // Convert italics
    .replace(/\*(.*?)\*/g, '<em>$1</em>')

  return html
}

export default BlogDetail
