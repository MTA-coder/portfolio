import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { blogPosts } from '@/data/blogData'
import OptimizedImage from '@/components/OptimizedImage'

const BlogSection = () => {
  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-tech-blue/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-tech-purple/5 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest <span className="text-gradient">Articles</span>
          </h2>
          <div className="w-20 h-1 bg-tech-purple mx-auto mb-8"></div>
          <p className="text-muted-foreground">
            Thoughts, insights, and tutorials on web development, software
            engineering, and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              aria-label={`Read blog post: ${post.title}`}
              className={cn('blog-card group', 'animate-fade-in')}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={(e) => {
                if (post.externalUrl) {
                  e.preventDefault()
                  window.open(post.externalUrl, '_blank', 'noopener,noreferrer')
                }
              }}
            >
              <article className="h-full flex flex-col">
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  {/* Replaced raw img with OptimizedImage for responsive Unsplash sources */}
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    withSkeleton
                    widths={[400, 640, 768, 1024]}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="blog-tag">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-tech-purple transition-colors">
                    {post.title}
                  </h3>
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
                    <span className="text-tech-purple flex items-center group-hover:gap-1 transition-all">
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
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-tech-purple hover:bg-tech-purple/90 text-white"
          >
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
