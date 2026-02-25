import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, MapPin, Building, Zap, Code, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'
import { useTheme } from '@/hooks/useTheme'
import SyriaFlag from './SyriaFlag'

interface TimelineItem {
  id: number
  date: string
  title: string
  company: string
  location: string
  description: string[]
  isRight?: boolean
}

interface CyberTimelineProps {
  items: TimelineItem[]
}

const CyberTimeline: React.FC<CyberTimelineProps> = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { theme } = useTheme()

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const handleScroll = () => {
      items.forEach((item) => {
        const itemElement = document.getElementById(`timeline-item-${item.id}`)
        if (itemElement) {
          const itemRect = itemElement.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          if (
            itemRect.top <= viewportHeight * 0.6 &&
            itemRect.bottom >= viewportHeight * 0.4
          ) {
            setActiveItemId(item.id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  return (
    <div className="timeline-container relative" ref={timelineRef}>
      {/* Central Timeline - Left side on mobile */}
      <div
        className={cn(
          'absolute h-full w-1 bg-gradient-to-b from-transparent via-border to-transparent',
          isMobile
            ? 'left-6 transform-none'
            : 'left-1/2 transform -translate-x-1/2',
        )}
      >
        <motion.div
          className="w-full bg-gradient-to-b from-tech-purple via-tech-purple to-tech-purple"
          style={{
            height: lineHeight,
          }}
        />
      </div>

      {/* Timeline items */}
      {items.map((item, index) => (
        <TimelineItem
          key={item.id}
          item={item}
          index={index}
          isActive={activeItemId === item.id}
          isMobile={isMobile}
          theme={theme}
        />
      ))}
    </div>
  )
}

interface TimelineItemProps {
  item: TimelineItem
  index: number
  isActive: boolean
  isMobile: boolean
  theme: string
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  index,
  isActive,
  isMobile,
  theme,
}) => {
  const isRight = isMobile ? true : item.isRight

  const getCountryFlag = (location: string) => {
    const country = location.split(', ').pop() || ''
    if (country.includes('UAE')) return '🇦🇪'
    if (country.includes('Dubai')) return '🇦🇪'
    if (country.includes('Abu Dhabi')) return '🇦🇪'
    if (country.includes('Sharjah')) return '🇦🇪'
    if (country.includes('Germany')) return '🇩🇪'
    if (country.includes('Saudi Arabia')) return '🇸🇦'
    if (country.includes('Syria')) return <SyriaFlag size={22} />
    return '🌍'
  }

  return (
    <motion.div
      id={`timeline-item-${item.id}`}
      className={cn(
        'timeline-item relative my-16 md:my-24 flex items-center',
        isActive ? 'z-20' : 'z-10',
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Central Node - Left side on mobile */}
      <div
        className={cn(
          'absolute w-6 h-6 z-10',
          isMobile
            ? 'left-6 transform -translate-x-1/2'
            : 'left-1/2 transform -translate-x-1/2',
        )}
      >
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full border-2 border-tech-purple bg-background shadow-lg',
            isActive && 'ring-4 ring-tech-purple/20',
          )}
          animate={{
            scale: isActive ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-1 rounded-full bg-tech-purple"
            animate={{
              scale: isActive ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          />
        </motion.div>

        {/* Connection Lines */}
        <motion.div
          className={cn(
            'absolute top-1/2 w-12 h-0.5 bg-tech-purple/40',
            isMobile ? 'left-full' : isRight ? 'left-full' : 'right-full',
          )}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </div>

      {/* Content card */}
      <motion.div
        className={cn(
          'timeline-content relative w-full p-6 rounded-lg bg-card border shadow-lg',
          isMobile
            ? 'ml-16 mr-4'
            : isRight
            ? 'w-[45%] ml-auto mr-0'
            : 'w-[45%] mr-auto ml-0',
        )}
        whileHover={{
          scale: 1.02,
          boxShadow:
            theme === 'dark'
              ? '0 20px 40px rgba(168, 85, 247, 0.15)'
              : '0 20px 40px rgba(168, 85, 247, 0.25)',
        }}
        animate={{
          borderColor: isActive ? 'rgb(168 85 247)' : 'hsl(var(--border))',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-lg bg-tech-purple/10 border border-tech-purple/20 flex items-center justify-center"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Briefcase className="text-tech-purple" size={20} />
            </motion.div>
            <div>
              <h4 className="font-semibold text-base text-foreground">
                {item.company}
              </h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin size={12} />
                {item.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl" role="img" aria-label="country flag">
              {getCountryFlag(item.location)}
            </span>
          </div>
        </div>

        {/* Date and title */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs mb-2 text-tech-purple font-medium">
            <Calendar size={14} />
            <span>{item.date}</span>
          </div>

          <h3 className="text-lg font-bold mb-2 leading-tight text-foreground">
            {item.title}
          </h3>
        </div>

        {/* Description */}
        <ul className="space-y-2">
          {item.description.map((desc, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-sm text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-tech-purple mt-2 flex-shrink-0" />
              <span className="leading-relaxed">{desc}</span>
            </motion.li>
          ))}
        </ul>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="mt-4 py-2 px-3 rounded-md bg-tech-purple/10 border border-tech-purple/20 flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Code className="text-tech-purple" size={16} />
            </motion.div>
            <span className="text-xs font-medium text-tech-purple">
              Currently Viewing
            </span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default CyberTimeline
