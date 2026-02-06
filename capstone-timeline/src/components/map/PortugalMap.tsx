'use client';

import { motion } from 'framer-motion';
import { Building2, ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ciscoLocation } from '@/data/teamLocations';

// Dynamically import the Portugal map to avoid SSR issues
const Portugal = dynamic(() => import('@react-map/portugal'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="animate-pulse text-white text-xl">Loading map...</div>
    </div>
  )
});

interface PortugalMapProps {
  onCiscoClick: () => void;
  onBackClick: () => void;
}

export default function PortugalMap({ onCiscoClick, onBackClick }: PortugalMapProps) {
  const [mapSize, setMapSize] = useState(500);

  // Responsive map size - bigger for better visibility
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setMapSize(450);
      } else if (width < 640) {
        setMapSize(550);
      } else if (width < 768) {
        setMapSize(650);
      } else {
        setMapSize(750);
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Crop configuration - the @react-map/portugal SVG has islands on the left
  // Mainland Portugal occupies roughly the right 35% of the SVG width
  const cropLeftOffset = 0.62; // How much to shift left (hides islands)
  const visibleWidth = 0.35;   // Width of visible area (mainland)
  const visibleHeight = 0.95;  // Height of visible area
  const cropTopOffset = 0.03;  // Small top adjustment
  
  // Lisbon position in the FULL SVG coordinates (before cropping)
  // Lisbon is on the west coast, roughly at 72% from left.  In the cropped window:
  const lisbonFullX = 72;  // % in full SVG
  const lisbonFullY = 58;  // % in full SVG
  
  // Convert to cropped container coordinates
  const lisbonX = ((lisbonFullX / 100) - cropLeftOffset) / visibleWidth * 100;
  const lisbonY = ((lisbonFullY / 100) - cropTopOffset) / visibleHeight * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-start sm:justify-center px-2 sm:px-4 py-4 overflow-hidden relative">
      {/* Animated background */}
      <motion.div
        className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Back button */}
      <motion.button
        onClick={onBackClick}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full border border-white/20 transition-all duration-300"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-xs sm:text-base">Back</span>
      </motion.button>

      <div className="w-full max-w-6xl mx-auto text-center relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 pt-12 sm:pt-0"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            Portugal
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-blue-200">
            Our Graduate Team Across the Country
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center w-full"
        >
          {/* Outer container with overflow hidden to crop islands */}
          <div 
            className="relative overflow-hidden"
            style={{ 
              width: `${mapSize * visibleWidth}px`, 
              height: `${mapSize * visibleHeight}px`,
              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.4))',
              margin: '0 auto',
            }}
          >
            {/* Inner wrapper shifted left to show only mainland */}
            <div 
              className="portugal-map-wrapper absolute"
              style={{
                left: `-${mapSize * cropLeftOffset}px`,
                top: `-${mapSize * cropTopOffset}px`,
              }}
            >
              <Portugal
                type="select-single"
                size={mapSize}
                mapColor="#334155"
                strokeColor="#1e293b"
                strokeWidth={0.5}
                hoverColor="#3b82f6"
                selectColor="#22c55e"
                hints={true}
                hintTextColor="#ffffff"
                hintBackgroundColor="#1e293b"
                hintPadding="6px 10px"
                hintBorderRadius={6}
              />
            </div>

            {/* Cisco Office marker - positioned on Lisbon */}
            <motion.div
              className="absolute z-30 cursor-pointer"
              style={{
                left: `${lisbonX}%`,
                top: `${lisbonY}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, type: 'spring', stiffness: 150 }}
              onClick={onCiscoClick}
              whileHover={{ scale: 1.15 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute w-12 h-12 sm:w-16 sm:h-16 -top-6 -left-6 sm:-top-8 sm:-left-8 rounded-full bg-yellow-400/40"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Building icon */}
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center border-3 border-yellow-400 shadow-lg">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>

              {/* Label */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <div className="bg-emerald-600/95 text-white px-3 py-1.5 rounded-lg border-2 border-yellow-400 shadow-lg">
                  <p className="font-bold text-[10px] sm:text-xs">{ciscoLocation.address}</p>
                  <p className="text-yellow-200 text-[8px] sm:text-[10px]">Click to Continue</p>
                </div>
              </motion.div>

              {/* Pulse ring */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-yellow-400"
                animate={{
                  scale: [0.8, 2],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-4 flex justify-center gap-4 sm:gap-6 flex-wrap px-2"
        >
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-medium text-xs sm:text-sm">Cisco Office</span>
          </div>
        </motion.div>

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-2 text-blue-200 text-xs sm:text-sm px-4"
        >
          Hover over districts to see names • Click the Cisco Lisbon office to continue
        </motion.p>
      </div>
    </div>
  );
}
