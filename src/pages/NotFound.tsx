import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PerformantBackground from '@/components/PerformantBackground'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Themed animated background */}
      <PerformantBackground />
      <motion.div
        className="relative z-10 text-center max-w-lg mx-auto p-8 rounded-2xl bg-background/70 backdrop-blur-md border border-border shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-7xl font-extrabold text-tech-purple mb-4 drop-shadow-lg"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-2xl text-tech-blue mb-6 font-semibold"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          Oops! Page not found
        </motion.p>
        <motion.p
          className="text-base text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          The page you are looking for does not exist or has been moved.
        </motion.p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg bg-tech-purple text-white font-bold shadow-md hover:bg-tech-blue transition-colors duration-200"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound
