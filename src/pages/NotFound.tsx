import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Helmet } from 'react-helmet-async'
import PerformantBackground from '@/components/PerformantBackground'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <Helmet>
        <title>Page Not Found | Mohammed Tawfeq Amiri</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Themed animated background */}
      <PerformantBackground />

      <motion.div
        className="relative z-10 text-center max-w-lg mx-auto p-8 rounded-2xl bg-background/70 backdrop-blur-md border border-border shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Animated glitch-style 404 */}
        <motion.div
          className="relative mb-6"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="text-8xl md:text-9xl font-extrabold text-tech-purple drop-shadow-lg">
            404
          </h1>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <span className="text-8xl md:text-9xl font-extrabold text-tech-blue blur-[2px]">
              404
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="mb-2"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <Search className="w-10 h-10 text-tech-purple/60 mx-auto mb-3" />
          <p className="text-2xl text-foreground font-semibold mb-2">
            Page not found
          </p>
          <p className="text-base text-muted-foreground mb-8 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved to a
            different URL.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-tech-purple hover:bg-tech-purple/90 text-white"
          >
            <Link to="/">
              <Home size={18} className="mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-tech-purple text-tech-purple hover:bg-tech-purple/10"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </Button>
        </motion.div>

        {/* Helpful links */}
        <motion.div
          className="mt-8 pt-6 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground mb-3">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/projects"
              className="text-sm text-tech-purple hover:underline"
            >
              Projects
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link
              to="/blog"
              className="text-sm text-tech-purple hover:underline"
            >
              Blog
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/" className="text-sm text-tech-purple hover:underline">
              Portfolio
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound
