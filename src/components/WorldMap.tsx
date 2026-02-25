import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Globe } from 'lucide-react'
import SyriaFlag from './SyriaFlag'

interface Country {
  name: string
  coordinates: [number, number]
  flag: string
  projects: number
}

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [isGlobeView, setIsGlobeView] = useState(true)
  const globeRef = useRef<HTMLDivElement>(null)

  const countries: Country[] = [
    { name: 'Syria', coordinates: [36.2, 38.0], flag: 'SY', projects: 3 },
    { name: 'UAE', coordinates: [54.0, 24.0], flag: '🇦🇪', projects: 8 },
    {
      name: 'Saudi Arabia',
      coordinates: [45.0, 24.0],
      flag: '🇸🇦',
      projects: 5,
    },
    { name: 'Malaysia', coordinates: [102.0, 4.2], flag: '🇲🇾', projects: 4 },
    { name: 'Germany', coordinates: [10.4, 51.1], flag: '🇩🇪', projects: 7 },
    { name: 'Finland', coordinates: [26.0, 64.9], flag: '🇫🇮', projects: 2 },
    {
      name: 'United Kingdom',
      coordinates: [-3.4, 55.4],
      flag: '🇬🇧',
      projects: 6,
    },
  ]

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    let animationId: number
    let rotation = 0

    const animate = () => {
      rotation += 0.5
      globe.style.transform = `rotateY(${rotation}deg) rotateX(10deg)`
      animationId = requestAnimationFrame(animate)
    }

    if (isGlobeView) {
      animate()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isGlobeView])

  const convertToMapPosition = (coordinates: [number, number]) => {
    const [lng, lat] = coordinates
    const x = ((lng + 180) / 360) * 100
    const y = ((90 - lat) / 180) * 100
    return { x: `${x}%`, y: `${y}%` }
  }

  return (
    <div className="relative">
      {/* View Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-1 border border-tech-purple/20">
          <button
            onClick={() => setIsGlobeView(true)}
            className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 ${
              isGlobeView
                ? 'bg-tech-purple text-white shadow-[0_0_10px_rgba(155,135,245,0.5)]'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Globe className="w-4 h-4" />
            Globe View
          </button>
          <button
            onClick={() => setIsGlobeView(false)}
            className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 ${
              !isGlobeView
                ? 'bg-tech-purple text-white shadow-[0_0_10px_rgba(155,135,245,0.5)]'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Map View
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isGlobeView ? (
          <motion.div
            key="globe"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center h-96"
          >
            <div
              ref={globeRef}
              className="relative w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-2xl"
              style={{
                background:
                  'conic-gradient(from 0deg, #3b82f6, #1d4ed8, #1e40af, #3b82f6)',
                boxShadow:
                  '0 0 50px rgba(59, 130, 246, 0.4), inset 0 0 50px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Globe continents overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/30 via-yellow-400/20 to-green-600/40 opacity-70"></div>

              {/* Atmosphere effect */}
              <div className="absolute -inset-4 rounded-full bg-blue-400/20 blur-xl animate-pulse-soft"></div>

              {/* Country markers on globe */}
              {countries.map((country, index) => (
                <motion.div
                  key={country.name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="absolute w-4 h-4 bg-tech-purple rounded-full border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform duration-200"
                  style={{
                    left: `${Math.random() * 70 + 15}%`,
                    top: `${Math.random() * 70 + 15}%`,
                  }}
                  onClick={() => setSelectedCountry(country)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {country.flag === 'SY' ? (
                      <SyriaFlag size={16} />
                    ) : (
                      country.flag
                    )}{' '}
                    {country.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative h-96 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden"
          >
            {/* World map SVG placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 1000 500" className="w-full h-full opacity-20">
                <path
                  d="M150,200 Q200,150 300,180 T500,200 Q600,220 700,200 T900,180"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M100,300 Q200,250 400,280 T700,300 Q800,320 900,300"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            {/* Country markers */}
            {countries.map((country, index) => {
              const position = convertToMapPosition(country.coordinates)
              return (
                <motion.div
                  key={country.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="absolute w-6 h-6 bg-tech-purple rounded-full border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-200 hover:shadow-[0_0_15px_rgba(155,135,245,0.6)]"
                  style={{ left: position.x, top: position.y }}
                  onClick={() => setSelectedCountry(country)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-sm px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    <div className="font-semibold">
                      {country.flag === 'SY' ? (
                        <SyriaFlag size={18} />
                      ) : (
                        country.flag
                      )}{' '}
                      {country.name}
                    </div>
                    <div className="text-xs text-tech-purple">
                      {country.projects} projects
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Country Details Modal */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedCountry(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-secondary/90 backdrop-blur-sm rounded-lg p-6 border border-tech-purple/20 max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {selectedCountry.flag === 'SY' ? (
                    <SyriaFlag size={64} />
                  ) : (
                    selectedCountry.flag
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {selectedCountry.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Successfully delivered{' '}
                  <span className="text-tech-purple font-semibold">
                    {selectedCountry.projects} projects
                  </span>
                </p>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="px-4 py-2 bg-tech-purple text-white rounded-lg hover:bg-tech-purple/80 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Countries Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 grid grid-cols-3 md:grid-cols-7 gap-4"
      >
        {countries.map((country, index) => (
          <motion.div
            key={country.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
            className="text-center p-3 bg-secondary/30 rounded-lg border border-tech-purple/10 hover:border-tech-purple/30 transition-all duration-200 cursor-pointer hover:shadow-[0_0_10px_rgba(155,135,245,0.2)]"
            onClick={() => setSelectedCountry(country)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-1">
              {country.flag === 'SY' ? <SyriaFlag size={28} /> : country.flag}
            </div>
            <div className="text-xs font-medium text-foreground">
              {country.name}
            </div>
            <div className="text-xs text-tech-purple">
              {country.projects} proj.
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default WorldMap
