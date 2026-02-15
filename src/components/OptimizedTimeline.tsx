
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Building, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useOptimizedPerformance } from '@/hooks/useOptimizedPerformance';

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  company: string;
  location: string;
  description: string[];
  isRight?: boolean;
}

interface OptimizedTimelineProps {
  items: TimelineItem[];
}

const OptimizedTimeline: React.FC<OptimizedTimelineProps> = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { capabilities, getOptimalSettings } = useOptimizedPerformance();
  const settings = getOptimalSettings;
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  useEffect(() => {
    if (!settings.animations) return;
    
    const handleScroll = () => {
      items.forEach(item => {
        const itemElement = document.getElementById(`timeline-item-${item.id}`);
        if (itemElement) {
          const itemRect = itemElement.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          if (itemRect.top <= viewportHeight * 0.6 && itemRect.bottom >= viewportHeight * 0.4) {
            setActiveItemId(item.id);
          }
        }
      });
    };
    
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [items, settings.animations]);
  
  return (
    <div className="timeline-container relative px-4 md:px-0" ref={timelineRef}>
      {/* Fixed mobile timeline line */}
      <div className={cn(
        "absolute h-full bg-gradient-to-b from-transparent via-border to-transparent",
        isMobile ? "left-6 w-0.5" : "left-1/2 transform -translate-x-1/2 w-1"
      )}>
        {settings.animations && (
          <motion.div 
            className="w-full bg-gradient-to-b from-tech-purple via-tech-purple to-tech-purple"
            style={{ height: lineHeight }}
          />
        )}
      </div>
      
      {/* Timeline items */}
      <div className="space-y-8 md:space-y-16">
        {items.map((item, index) => (
          <OptimizedTimelineItem 
            key={item.id} 
            item={item} 
            index={index}
            isActive={activeItemId === item.id}
            isMobile={isMobile}
            settings={settings}
          />
        ))}
      </div>
    </div>
  );
};

interface OptimizedTimelineItemProps {
  item: TimelineItem;
  index: number;
  isActive: boolean;
  isMobile: boolean;
  settings: any;
}

const OptimizedTimelineItem: React.FC<OptimizedTimelineItemProps> = ({ 
  item, 
  index, 
  isActive, 
  isMobile,
  settings 
}) => {
  const isRight = isMobile ? true : item.isRight;
  
  const getCountryFlag = (location: string) => {
    const country = location.split(', ').pop() || '';
    if (country.includes('UAE') || country.includes('Dubai')) return '🇦🇪';
    if (country.includes('Germany')) return '🇩🇪';
    if (country.includes('Saudi Arabia')) return '🇸🇦';
    if (country.includes('Syria')) return '🇸🇾';
    return '🌍';
  };
  
  return (
    <motion.div 
      id={`timeline-item-${item.id}`}
      className={cn(
        "timeline-item relative flex items-center",
        isActive ? "z-20" : "z-10"
      )}
      initial={settings.animations ? { opacity: 0, y: 20 } : {}}
      whileInView={settings.animations ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Fixed node positioning */}
      <div className={cn(
        "absolute z-10",
        isMobile ? "left-6 w-3 h-3 transform -translate-x-1/2" : "left-1/2 w-4 h-4 transform -translate-x-1/2"
      )}>
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full border-2 border-tech-purple bg-background shadow-md",
            isActive && settings.animations && "ring-2 ring-tech-purple/20"
          )}
          animate={settings.animations ? {
            scale: isActive ? 1.1 : 1,
          } : {}}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0.5 rounded-full bg-tech-purple" />
        </motion.div>
        
        {/* Connection line - fixed for mobile */}
        <div
          className={cn(
            "absolute top-1/2 h-0.5 bg-tech-purple/40",
            isMobile ? "left-full w-6" : (isRight ? 'left-full w-8' : 'right-full w-8')
          )}
        />
      </div>
      
      {/* Content card */}
      <motion.div 
        className={cn(
          "timeline-content relative w-full p-4 md:p-6 rounded-lg bg-card border shadow-lg touch-target",
          isMobile 
            ? "ml-10 mr-2" 
            : (isRight ? "w-[calc(50%-2rem)] ml-auto mr-0" : "w-[calc(50%-2rem)] mr-auto ml-0")
        )}
        whileHover={settings.enableHover ? { 
          scale: 1.01,
          boxShadow: "0 10px 25px rgba(168, 85, 247, 0.1)"
        } : {}}
        animate={settings.animations ? {
          borderColor: isActive ? "rgb(168 85 247)" : "hsl(var(--border))"
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-tech-purple/10 border border-tech-purple/20 flex items-center justify-center flex-shrink-0">
              <Briefcase className="text-tech-purple" size={isMobile ? 16 : 20} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm md:text-base text-foreground truncate">{item.company}</h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin size={10} />
                <span className="truncate">{item.location}</span>
              </p>
            </div>
          </div>
          
          <span className="text-lg flex-shrink-0" role="img" aria-label="country flag">
            {getCountryFlag(item.location)}
          </span>
        </div>
        
        {/* Date and title */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs mb-2 text-tech-purple font-medium">
            <Calendar size={12} />
            <span>{item.date}</span>
          </div>
          
          <h3 className="text-base md:text-lg font-bold mb-2 leading-tight text-foreground">{item.title}</h3>
        </div>
        
        {/* Description */}
        <ul className="space-y-2">
          {item.description.map((desc, i) => (
            <li 
              key={i} 
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-tech-purple mt-2 flex-shrink-0" />
              <span className="leading-relaxed">{desc}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

// Utility function for throttling
function throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeoutId: number | null = null;
  let lastExecTime = 0;
  
  return ((...args: any[]) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  }) as T;
}

export default OptimizedTimeline;
