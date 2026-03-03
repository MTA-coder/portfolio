import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import BubbleBackground from './BubbleBackground'
import { useIsMobile } from '@/hooks/use-mobile'
import LazyLoadSection from './LazyLoadSection'
import OptimizedImage from '@/components/OptimizedImage'

interface Skill {
  name: string
  percentage: number
  icon: string
  color: string
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Frontend')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const skillCategories: SkillCategory[] = [
    {
      name: 'Frontend',
      skills: [
        {
          name: 'Angular',
          percentage: 95,
          icon: 'https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg',
          color: '#dd0031',
        },
        {
          name: 'HTML/CSS/SCSS',
          percentage: 90,
          icon: 'https://cdn.worldvectorlogo.com/logos/css-3.svg',
          color: '#264de4',
        },
        {
          name: 'JavaScript/TypeScript',
          percentage: 92,
          icon: 'https://cdn.worldvectorlogo.com/logos/typescript.svg',
          color: '#3178c6',
        },
        {
          name: 'RxJS/NgRx',
          percentage: 85,
          icon: 'https://rxjs.dev/assets/images/logos/Rx_Logo_S.png',
          color: '#b7178c',
        },
        {
          name: 'JQuery/Ajax',
          percentage: 88,
          icon: 'https://cdn.worldvectorlogo.com/logos/jquery-4.svg',
          color: '#0769ad',
        },
      ],
    },
    {
      name: 'Backend',
      skills: [
        {
          name: 'ASP.NET Core',
          percentage: 90,
          icon: 'https://cdn.worldvectorlogo.com/logos/dot-net-core-7.svg',
          color: '#512bd4',
        },
        {
          name: 'Laravel',
          percentage: 85,
          icon: 'https://cdn.worldvectorlogo.com/logos/laravel-2.svg',
          color: '#ff2d20',
        },
        {
          name: 'Node.js/Express',
          percentage: 75,
          icon: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg',
          color: '#43853d',
        },
        {
          name: 'Visual Basic VB.NET',
          percentage: 88,
          icon: 'https://cdn.worldvectorlogo.com/logos/visual-studio-2013.svg',
          color: '#5C2D91',
        },
        {
          name: 'Entity Framework',
          percentage: 90,
          icon: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg',
          color: '#5E5E5E',
        },
      ],
    },
    {
      name: 'Database',
      skills: [
        {
          name: 'MySQL',
          percentage: 88,
          icon: 'https://cdn.worldvectorlogo.com/logos/mysql-6.svg',
          color: '#4479A1',
        },
        {
          name: 'SSMS/SQL Server',
          percentage: 92,
          icon:
            'https://cdn.worldvectorlogo.com/logos/microsoft-sql-server-1.svg',
          color: '#CC2927',
        },
        {
          name: 'SQLite',
          percentage: 85,
          icon: 'https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg',
          color: '#044a64',
        },
        {
          name: 'MongoDB',
          percentage: 70,
          icon: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg',
          color: '#4DB33D',
        },
      ],
    },
    {
      name: 'Other',
      skills: [
        {
          name: 'Git/GitHub/GitLab',
          percentage: 90,
          icon: 'https://cdn.worldvectorlogo.com/logos/git-icon.svg',
          color: '#F05032',
        },
        {
          name: 'Docker',
          percentage: 82,
          icon: 'https://cdn.worldvectorlogo.com/logos/docker.svg',
          color: '#2496ED',
        },
        {
          name: 'Unit Testing',
          percentage: 85,
          icon: 'https://cdn.worldvectorlogo.com/logos/jest-2.svg',
          color: '#C63D14',
        },
        {
          name: 'Agile Methodology',
          percentage: 90,
          icon: 'https://cdn.worldvectorlogo.com/logos/jira-3.svg',
          color: '#2684FF',
        },
        {
          name: 'SEO & PWA',
          percentage: 75,
          icon:
            'https://cdn.worldvectorlogo.com/logos/google-webmaster-tools-1.svg',
          color: '#4285F4',
        },
      ],
    },
  ]

  return (
    <LazyLoadSection
      id="skills"
      className="py-24 bg-secondary/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <BubbleBackground />
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10"></div>
      <div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full bg-tech-purple/5 blur-3xl opacity-30"
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-tech-purple mx-auto mb-8"></div>
          <p className="text-muted-foreground">
            With over 5 years of experience, I've developed expertise in a wide
            range of technologies across the full development stack.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={cn(
                'px-6 py-3 rounded-full font-medium transition-all',
                activeCategory === category.name
                  ? 'bg-tech-purple text-white shadow-lg shadow-tech-purple/20'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary',
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
            layout
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="popLayout">
              {skillCategories
                .find((category) => category.name === activeCategory)
                ?.skills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={index}
                    isHovered={hoveredSkill === skill.name}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  />
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </LazyLoadSection>
  )
}

/* ------------------------------------------------------------------ */
/*  Skill Card with glow + liquid fill                                  */
/* ------------------------------------------------------------------ */

interface SkillCardProps {
  skill: Skill
  index: number
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}

const SkillCard: React.FC<SkillCardProps> = React.memo(
  ({ skill, index, isHovered, onHoverStart, onHoverEnd }) => {
    return (
      <motion.div
        layout
        key={skill.name}
        className="relative"
        aria-label={`Skill ${skill.name} proficiency ${skill.percentage} percent`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: index * 0.08, duration: 0.35 }}
        whileHover={{ scale: 1.06, zIndex: 10 }}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        onTouchStart={onHoverStart}
        onTouchEnd={onHoverEnd}
      >
        <div
          className={cn(
            'rounded-lg p-4 flex flex-col items-center justify-center text-center',
            'bg-secondary/30 backdrop-blur-sm',
            'border border-tech-purple/20',
            'shadow-lg',
            'relative overflow-hidden',
            'transition-[border-color,box-shadow] duration-500 ease-out',
            'h-[220px] md:h-[220px] lg:h-[220px] min-h-[220px] max-h-[220px]', // fixed height
          )}
          style={{
            boxShadow: isHovered
              ? `0 0 24px ${skill.color}50, 0 0 48px ${skill.color}20`
              : undefined,
            borderColor: isHovered ? `${skill.color}90` : undefined,
          }}
        >
          {/* Liquid fill layer – rises from the bottom based on percentage */}
          <motion.div
            className="absolute bottom-0 left-0 w-full pointer-events-none"
            initial={{ height: '0%' }}
            animate={{ height: isHovered ? `${skill.percentage}%` : '0%' }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1], // custom ease-out expo
            }}
            style={{
              background: `linear-gradient(to top, ${skill.color}30, ${skill.color}08)`,
            }}
          />

          {/* Liquid surface wave when hovered */}
          {isHovered && (
            <motion.div
              className="absolute left-0 w-full h-[6px] pointer-events-none"
              initial={{ bottom: '0%', opacity: 0 }}
              animate={{
                bottom: `${skill.percentage}%`,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                background: `radial-gradient(ellipse at center, ${skill.color}60 0%, transparent 70%)`,
                filter: 'blur(1px)',
              }}
            />
          )}

          {/* Content layer – always above the liquid */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div
              className="w-16 h-16 mb-4 rounded-full flex items-center justify-center p-3 transition-all duration-500"
              style={{
                backgroundColor: isHovered
                  ? `${skill.color}25`
                  : `${skill.color}15`,
                border: `1px solid ${
                  isHovered ? `${skill.color}60` : `${skill.color}30`
                }`,
                boxShadow: isHovered ? `0 0 16px ${skill.color}40` : 'none',
              }}
            >
              <OptimizedImage
                src={skill.icon}
                alt={skill.name}
                className="w-full h-full object-contain transition-transform duration-300"
                style={{
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                  filter: isHovered
                    ? `drop-shadow(0 0 6px ${skill.color}80)`
                    : 'none',
                }}
                withSkeleton
                widths={[48, 64, 80, 96]}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    const text = document.createElement('span')
                    text.className = 'text-2xl font-bold'
                    text.style.color = skill.color
                    text.innerText = skill.name.substring(0, 2)
                    parent.appendChild(text)
                  }
                }}
              />
            </div>

            <h4
              className="text-lg font-medium truncate overflow-hidden whitespace-nowrap w-full text-center"
              style={{ lineHeight: '1.2em', height: '1.2em' }}
            >
              {skill.name}
            </h4>

            {/* Percentage label – appears on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="mt-2 text-center"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.25 }}
                >
                  <span
                    className="text-sm font-bold"
                    style={{ color: skill.color }}
                  >
                    {skill.percentage}%
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    )
  },
)

export default SkillsSection
