import React from 'react'
import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import { Code, Users, Award, Clock, Coffee, MapPin } from 'lucide-react'
import OptimizedDigitalGlobe from './OptimizedDigitalGlobe'

interface Stat {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  description: string
}

const StatsSection = () => {
  const stats: Stat[] = [
    {
      icon: <Code className="w-8 h-8" />,
      value: 50,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Successful web applications delivered',
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: 25,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Satisfied clients across different industries',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: 5,
      suffix: '+',
      label: 'Years Experience',
      description: 'Professional development experience',
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      value: 2847,
      suffix: '',
      label: 'Coffee Cups',
      description: 'Fuel for coding marathons and late nights',
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: 15,
      suffix: '+',
      label: 'Technologies',
      description: 'Modern frameworks and tools mastered',
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      value: 7,
      suffix: '',
      label: 'Countries',
      description: 'International markets served',
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-16 bg-tech-dark-purple/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-tech-purple/5 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced responsive layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Stats Grid - Enhanced responsive design with consistent sizing */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="bg-secondary/30 backdrop-blur-sm rounded-lg border border-tech-purple/20 hover:border-tech-purple/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(155,135,245,0.2)] h-full flex flex-col justify-between p-3 sm:p-4 lg:p-5 min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]">
                  {/* Icon - Responsive sizing with consistent proportions */}
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-tech-purple/20 rounded-full mb-2 lg:mb-3 text-tech-purple group-hover:scale-110 transition-transform duration-300 mx-auto flex-shrink-0">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7">
                      {stat.icon}
                    </div>
                  </div>

                  {/* Counter - Responsive text sizing with consistent heights */}
                  <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 text-foreground flex-shrink-0">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      className="text-gradient"
                    />
                  </div>

                  {/* Label - Consistent sizing across all cards */}
                  <h3 className="font-semibold text-xs sm:text-sm lg:text-base text-foreground mb-1 leading-tight flex-shrink-0">
                    {stat.label}
                  </h3>

                  {/* Description - Consistent sizing and hidden on smallest screens */}
                  <p className="text-xs sm:text-xs lg:text-sm text-muted-foreground hidden sm:block leading-tight flex-grow">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Digital Globe - Improved mobile sizing and positioning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-lg">
              {/* Use optimized globe which lazy loads heavy three.js logic */}
              <OptimizedDigitalGlobe />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
