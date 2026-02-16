import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Calendar,
  MapPin,
  ExternalLink,
  Building,
  Flag,
  Zap,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'

interface TimelineItem {
  id: number
  date: string
  title: string
  company: string
  location: string
  description: string[]
  isRight?: boolean
  storyTitle?: string
  impact?: string
}

interface StorytellingTimelineProps {
  items: TimelineItem[]
}

const StorytellingTimeline: React.FC<StorytellingTimelineProps> = ({
  items,
}) => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

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
      {/* Enhanced central timeline */}
      <div
        className={cn(
          'absolute h-full w-1 bg-gradient-to-b from-transparent via-border to-transparent',
          isMobile
            ? 'left-6 transform-none'
            : 'left-1/2 transform -translate-x-1/2',
        )}
      >
        <motion.div
          className="w-full bg-gradient-to-b from-tech-purple via-tech-blue to-tech-purple relative"
          style={{ height: lineHeight }}
        >
          {/* Animated particles along the line */}
          <motion.div
            className="absolute w-2 h-2 bg-tech-purple rounded-full -left-0.5"
            animate={{ y: [0, 100, 200, 300] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>

      {/* Timeline items with enhanced storytelling */}
      {items.map((item, index) => (
        <StoryTimelineItem
          key={item.id}
          item={item}
          index={index}
          isActive={1 === item.id}
          isMobile={isMobile}
        />
      ))}
    </div>
  )
}

interface StoryTimelineItemProps {
  item: TimelineItem
  index: number
  isActive: boolean
  isMobile: boolean
}

const StoryTimelineItem: React.FC<StoryTimelineItemProps> = ({
  item,
  index,
  isActive,
  isMobile,
}) => {
  const isRight = isMobile ? true : item.isRight

  const getCountryFlag = (location: string) => {
    const country = location || ''
    // const country = location.split(', ').pop() || ''
    if (country.includes('UAE')) return '🇦🇪'
    if (country.includes('Dubai')) return '🇦🇪'
    if (country.includes('Abu Dhabi')) return '🇦🇪'
    if (country.includes('Sharjah')) return '🇦🇪'
    if (country.includes('Germany')) return '🇩🇪'
    if (country.includes('Saudi Arabia')) return '🇸🇦'
    if (country.includes('Saudi')) return '🇸🇦'
    if (country.includes('Syria')) return '🇸🇾'
    return '🌍'
  }

  return (
    <motion.div
      id={`timeline-item-${item.id}`}
      className={cn(
        'timeline-item relative my-20 md:my-32 flex items-center',
        isActive ? 'z-20' : 'z-10',
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Enhanced central node */}
      <div
        className={cn(
          'absolute w-8 h-8 z-10',
          isMobile
            ? 'left-6 transform -translate-x-1/2'
            : 'left-1/2 transform -translate-x-1/2',
        )}
      >
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full border-2 bg-background shadow-xl',
            isActive
              ? 'border-tech-purple ring-4 ring-tech-purple/20'
              : 'border-tech-purple/60',
          )}
          animate={{
            scale: isActive ? 1.2 : 1,
            borderColor: isActive ? 'rgb(168 85 247)' : 'rgb(168 85 247 / 0.6)',
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-1 rounded-full bg-gradient-to-br from-tech-purple to-tech-blue"
            animate={{
              scale: isActive ? [1, 1.3, 1] : 1,
              opacity: isActive ? [0.8, 1, 0.8] : 0.8,
            }}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          />
        </motion.div>

        {/* Enhanced connection lines */}
        <motion.div
          className={cn(
            'absolute top-1/2 w-16 h-0.5 bg-gradient-to-r from-tech-purple to-tech-blue/40',
            isMobile ? 'left-full' : isRight ? 'left-full' : 'right-full',
          )}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>

      {/* Enhanced content card with storytelling elements */}
      <motion.div
        className={cn(
          'timeline-content relative w-full rounded-xl border shadow-2xl backdrop-blur-sm',
          'bg-gradient-to-br from-card/90 to-card/60 p-6 md:p-8',
          isMobile
            ? 'ml-20 mr-4'
            : isRight
            ? 'w-[45%] ml-auto mr-0'
            : 'w-[45%] mr-auto ml-0',
        )}
        whileHover={{
          scale: 1.02,
          boxShadow: '0 25px 50px rgba(168, 85, 247, 0.2)',
        }}
        animate={{
          borderColor: isActive ? 'rgb(168 85 247)' : 'hsl(var(--border))',
          boxShadow: isActive
            ? '0 20px 40px rgba(168, 85, 247, 0.3)'
            : '0 10px 25px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Story title and impact badge */}
        {item.storyTitle && (
          <motion.div
            className="mb-4 flex items-center justify-between flex-wrap gap-2"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-lg font-bold text-foreground flex items-center gap-2">
              {item.storyTitle}
            </div>
            {item.impact && (
              <div className="bg-tech-purple/10 border border-tech-purple/20 rounded-full px-3 py-1 text-xs font-medium text-tech-purple flex items-center gap-1">
                <TrendingUp size={12} />
                Impact
              </div>
            )}
          </motion.div>
        )}

        {/* Company header with enhanced styling */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-tech-purple/20 to-tech-blue/20 border border-tech-purple/30 flex items-center justify-center backdrop-blur-sm"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Building className="text-tech-purple" size={24} />
            </motion.div>
            <div>
              <h4 className="font-bold text-lg text-foreground">
                {item.company}
              </h4>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin size={14} />
                {item.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="country flag">
              {getCountryFlag(item.location)}
            </span>
          </div>
        </div>

        {/* Date and title section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm mb-3 text-tech-purple font-medium bg-tech-purple/10 rounded-lg px-3 py-2 w-fit">
            <Calendar size={16} />
            <span>{item.date}</span>
          </div>

          <h3 className="text-xl font-bold mb-3 leading-tight text-foreground">
            {item.title}
          </h3>

          {item.impact && (
            <div className="bg-gradient-to-r from-tech-purple/10 to-tech-blue/10 rounded-lg p-3 mb-4 border border-tech-purple/20">
              <div className="flex items-center gap-2 text-sm font-medium text-tech-purple mb-1">
                <Zap size={14} />
                Key Impact
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.impact}
              </p>
            </div>
          )}
        </div>

        {/* Enhanced description with better formatting */}
        <ul className="space-y-3">
          {item.description.map((desc, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-sm text-muted-foreground group"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-tech-purple to-tech-blue mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
              <span className="leading-relaxed group-hover:text-foreground transition-colors">
                {desc}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Active state indicator with enhanced styling */}
        {isActive && (
          <motion.div
            className="mt-6 py-3 px-4 rounded-lg bg-gradient-to-r from-tech-purple/10 to-tech-blue/10 border border-tech-purple/30 flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <ExternalLink className="text-tech-purple" size={18} />
            </motion.div>
            <span className="text-sm font-medium text-tech-purple">
              Currently in focus - part of my journey
            </span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default StorytellingTimeline
