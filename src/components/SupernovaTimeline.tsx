
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Building, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/hooks/useTheme';

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  company: string;
  location: string;
  description: string[];
  isRight?: boolean;
}

interface SupernovaTimelineProps {
  items: TimelineItem[];
}

const SupernovaTimeline: React.FC<SupernovaTimelineProps> = ({ items }) => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [lineProgress, setLineProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const rect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      if (rect.top <= viewportHeight && rect.bottom >= 0) {
        const visiblePortion = Math.min(viewportHeight, rect.bottom) - Math.max(0, rect.top);
        const visiblePercentage = Math.min(100, Math.max(0, (visiblePortion / rect.height) * 150));
        setLineProgress(visiblePercentage);
        
        items.forEach(item => {
          const itemElement = document.getElementById(`supernova-item-${item.id}`);
          if (itemElement) {
            const itemRect = itemElement.getBoundingClientRect();
            if (itemRect.top <= viewportHeight * 0.6 && itemRect.bottom >= viewportHeight * 0.4) {
              setActiveItemId(item.id);
            }
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);
  
  return (
    <div className="supernova-timeline-container relative" ref={timelineRef}>
      {/* Supernova Core Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1">
        {/* Animated gradient line */}
        <motion.div 
          className={`absolute top-0 left-0 w-full h-full ${
            theme === 'dark' 
              ? 'bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600' 
              : 'bg-gradient-to-b from-blue-400 via-purple-500 to-pink-600'
          } rounded-full`}
          style={{ 
            height: `${lineProgress}%`,
            boxShadow: theme === 'dark' 
              ? '0 0 20px rgba(251, 191, 36, 0.6), 0 0 40px rgba(249, 115, 22, 0.4)'
              : '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(168, 85, 247, 0.4)'
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Pulsing core */}
        <motion.div
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full ${
            theme === 'dark' ? 'bg-yellow-300' : 'bg-blue-300'
          }`}
          style={{ top: `${lineProgress}%` }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Timeline items with supernova effects */}
      {items.map((item, index) => (
        <SupernovaTimelineItem 
          key={item.id} 
          item={item} 
          index={index}
          isActive={activeItemId === item.id}
          isMobile={isMobile}
          theme={theme}
        />
      ))}
    </div>
  );
};

interface SupernovaTimelineItemProps {
  item: TimelineItem;
  index: number;
  isActive: boolean;
  isMobile: boolean;
  theme: string;
}

const SupernovaTimelineItem: React.FC<SupernovaTimelineItemProps> = ({ 
  item, 
  index, 
  isActive, 
  isMobile,
  theme 
}) => {
  const isRight = isMobile ? true : item.isRight;
  
  const getCountryFlag = (location: string) => {
    const country = location.split(', ').pop() || '';
    if (country.includes('UAE')) return '🇦🇪';
    if (country.includes('Dubai')) return '🇦🇪';
    if (country.includes('Abu Dhabi')) return '🇦🇪';
    if (country.includes('Sharjah')) return '🇦🇪';
    return '🌍';
  };
  
  return (
    <motion.div 
      id={`supernova-item-${item.id}`}
      className={cn(
        "supernova-timeline-item relative my-20 md:my-32 flex items-center",
        isActive ? "z-20" : "z-10"
      )}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Supernova burst effect on the timeline */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 z-10">
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full border-2",
            theme === 'dark' 
              ? 'border-yellow-400 bg-orange-500' 
              : 'border-blue-400 bg-purple-500',
            isActive ? "scale-150" : "scale-100"
          )}
          animate={{
            boxShadow: isActive 
              ? theme === 'dark'
                ? ["0 0 10px rgba(251, 191, 36, 0.5)", "0 0 30px rgba(249, 115, 22, 0.8)", "0 0 10px rgba(251, 191, 36, 0.5)"]
                : ["0 0 10px rgba(59, 130, 246, 0.5)", "0 0 30px rgba(168, 85, 247, 0.8)", "0 0 10px rgba(59, 130, 246, 0.5)"]
              : theme === 'dark'
                ? "0 0 5px rgba(251, 191, 36, 0.3)"
                : "0 0 5px rgba(59, 130, 246, 0.3)"
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Radiating particles */}
        {isActive && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${
                  theme === 'dark' ? 'bg-yellow-300' : 'bg-blue-300'
                }`}
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0',
                }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 8) * 30,
                  y: Math.sin((i * Math.PI * 2) / 8) * 30,
                  opacity: [1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </>
        )}
      </div>
      
      {/* Content card with supernova styling */}
      <motion.div 
        className={cn(
          "supernova-content relative w-full md:w-[45%] p-8 rounded-xl backdrop-blur-sm border shadow-2xl",
          theme === 'dark'
            ? "bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-yellow-400/20"
            : "bg-gradient-to-br from-white/90 to-gray-50/90 border-blue-400/20",
          isRight ? "ml-8 md:ml-auto mr-0 md:mr-0" : "mr-8 md:mr-auto ml-0 md:ml-0"
        )}
        whileHover={{ 
          scale: 1.03,
          boxShadow: theme === 'dark'
            ? "0 20px 40px rgba(251, 191, 36, 0.3)"
            : "0 20px 40px rgba(59, 130, 246, 0.3)"
        }}
        animate={{
          borderColor: isActive 
            ? theme === 'dark' 
              ? "rgba(251, 191, 36, 0.5)" 
              : "rgba(59, 130, 246, 0.5)"
            : theme === 'dark'
              ? "rgba(251, 191, 36, 0.2)"
              : "rgba(59, 130, 246, 0.2)"
        }}
      >
        {/* Stellar header */}
        <div className={cn(
          "flex items-center justify-between mb-6",
          isRight ? "flex-row" : "flex-row-reverse"
        )}>
          <div className="flex items-center gap-3">
            <motion.div 
              className={`w-12 h-12 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20' 
                  : 'bg-gradient-to-br from-blue-400/20 to-purple-500/20'
              } flex items-center justify-center border ${
                theme === 'dark' ? 'border-yellow-400/30' : 'border-blue-400/30'
              }`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Building className={theme === 'dark' ? 'text-yellow-400' : 'text-blue-400'} size={24} />
            </motion.div>
            <div>
              <h4 className="font-bold text-lg">{item.company}</h4>
              <p className="text-sm text-muted-foreground">{item.location.split(', ')[0]}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-3xl" role="img" aria-label="country flag">
              {getCountryFlag(item.location)}
            </span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className={theme === 'dark' ? 'text-yellow-400' : 'text-blue-400'} size={20} />
            </motion.div>
          </div>
        </div>
        
        {/* Date and title */}
        <div className="mb-6">
          <div className={`flex items-center gap-2 text-sm mb-3 ${
            theme === 'dark' ? 'text-yellow-400' : 'text-blue-400'
          }`}>
            <Calendar size={16} />
            <span className="font-medium">{item.date}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 leading-tight">{item.title}</h3>
        </div>
        
        {/* Description with stellar bullets */}
        <ul className="space-y-4">
          {item.description.map((desc, i) => (
            <motion.li 
              key={i} 
              className="flex items-start gap-3 text-sm text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  theme === 'dark' ? 'bg-yellow-400' : 'bg-blue-400'
                }`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
              <span className="leading-relaxed">{desc}</span>
            </motion.li>
          ))}
        </ul>
        
        {/* Active supernova indicator */}
        {isActive && (
          <motion.div 
            className={`mt-6 py-3 px-4 rounded-lg flex items-center gap-3 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20'
                : 'bg-gradient-to-r from-blue-400/10 to-purple-500/10 border border-blue-400/20'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className={theme === 'dark' ? 'text-yellow-400' : 'text-blue-400'} size={18} />
            </motion.div>
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-yellow-400' : 'text-blue-400'
            }`}>
              Currently in focus
            </span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SupernovaTimeline;
