import React from 'react'
import { motion } from 'framer-motion'
import {
  University,
  Calendar,
  MapPin,
  Award,
  GraduationCap,
} from 'lucide-react'
import SyriaFlag from './SyriaFlag'

interface EducationItem {
  id: number
  degree: string
  institution: string
  location: string
  date: string
  achievements: string
  scores: string
}

interface EducationCardProps {
  education: EducationItem
}

const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  return (
    <motion.div
      className="bg-background/60 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg overflow-hidden relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring' }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 10px 30px rgba(155,135,245,0.3)',
        borderColor: 'rgba(155,135,245,0.5)',
      }}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-tech-purple/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 bg-tech-blue/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Country flag */}
      <div className="absolute top-6 right-6 text-3xl">
        <SyriaFlag size={32} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-tech-purple/20 flex items-center justify-center">
            <GraduationCap className="text-tech-purple h-8 w-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{education.degree}</h3>
            <p className="text-tech-purple">{education.scores}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mt-1 w-8 h-8 rounded-full bg-tech-purple/20 flex items-center justify-center flex-shrink-0">
              <University className="text-tech-purple h-4 w-4" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Institution</p>
              <p className="font-medium">{education.institution}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="mt-1 w-8 h-8 rounded-full bg-tech-purple/20 flex items-center justify-center flex-shrink-0">
              <Calendar className="text-tech-purple h-4 w-4" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Duration</p>
              <p className="font-medium">{education.date}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="mt-1 w-8 h-8 rounded-full bg-tech-purple/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="text-tech-purple h-4 w-4" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Location</p>
              <p className="font-medium">{education.location}</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mt-1 w-8 h-8 rounded-full bg-tech-purple/20 flex items-center justify-center flex-shrink-0">
              <Award className="text-tech-purple h-4 w-4" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Achievement</p>
              <p className="font-medium">92% in AI project</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bg-tech-purple/10 rounded-lg p-4 border border-tech-purple/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className="font-medium text-tech-purple mb-2">
            Project Highlight
          </h4>
          <p className="text-muted-foreground">{education.achievements}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default EducationCard
