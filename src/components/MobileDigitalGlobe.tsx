
import React from 'react';
import { motion } from 'framer-motion';

interface CountryData {
  name: string;
  flag: string;
  capital?: string;
}

const MobileDigitalGlobe = () => {
  const countries = [
    { name: 'Syria', flag: '🇸🇾', capital: 'Damascus' },
    { name: 'Germany', flag: '🇸🇾', capital: 'Berlin' },
    { name: 'Finland', flag: '🇸🇾', capital: 'Helsinki' },
    { name: 'UAE', flag: '🇸🇾', capital: 'Abu Dhabi' },
    { name: 'Saudi Arabia', flag: '🇸🇾', capital: 'Riyadh' },
    { name: 'Malaysia', flag: '🇸🇾', capital: 'Kuala Lumpur' }
  ];

  return (
    <div className="relative w-full aspect-square bg-transparent rounded-lg overflow-hidden">
      {/* Static globe representation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-64 h-64 rounded-full border-2 border-dashed border-tech-purple/40 flex items-center justify-center relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Grid lines */}
          <div className="absolute inset-0 rounded-full border border-tech-purple/20" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-tech-purple/20" />
          <div className="absolute left-1/2 top-0 w-px h-full bg-tech-purple/20" />
          
          {/* Center indicator */}
          <div className="w-4 h-4 rounded-full bg-tech-purple/80 shadow-lg shadow-tech-purple/50" />
        </motion.div>
      </div>
      
      {/* Country markers */}
      <div className="absolute inset-0">
        {countries.map((country, index) => {
          const angle = (index * 60) * Math.PI / 180;
          const radius = 100;
          const x = 50 + (radius * Math.cos(angle)) / 3;
          const y = 50 + (radius * Math.sin(angle)) / 3;
          
          return (
            <motion.div
              key={country.name}
              className="absolute w-8 h-8 rounded-full bg-tech-blue/80 border border-tech-blue flex items-center justify-center"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileTap={{ scale: 1.2 }}
            >
              <span className="text-xs">{country.flag}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileDigitalGlobe;
