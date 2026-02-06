'use client';

import { motion } from 'framer-motion';
import { MapPin, Building2, ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import { teamLocations, ciscoLocation } from '@/data/teamLocations';

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
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"
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
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full border border-white/20 transition-all duration-300"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Back to Europe</span>
      </motion.button>

      <div className="w-full max-w-6xl mx-auto text-center relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Portugal
          </h2>
          <p className="text-base sm:text-lg text-blue-200">
            Our Graduate Team Across the Country
          </p>
        </motion.div>

        {/* Map and Pins Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          {/* Main container with map and overlays */}
          <div className="relative" style={{ width: '500px', height: '550px' }}>
            {/* Portugal Map */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.4))' }}>
              <Portugal
                type="select-single"
                size={500}
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

            {/* Team location pins - positioned relative to center of map */}
            {/* The @react-map/portugal SVG includes islands, mainland is roughly in center-left */}
            {/* Approximate positions: mainland X ~18-35%, Y ~8-60% of SVG */}
            {teamLocations.map((location, index) => {
              // Convert teamLocations (0-100 of mainland) to position on full SVG
              // Mainland spans roughly: X from 18% to 35% (17% width), Y from 8% to 60% (52% height)
              const svgX = 18 + (location.x / 100) * 17;
              const svgY = 8 + (location.y / 100) * 52;
              
              return (
                <motion.div
                  key={location.id}
                  className="absolute z-20"
                  style={{
                    left: `${svgX}%`,
                    top: `${svgY}%`,
                    transform: 'translate(-50%, -100%)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: 0.8 + index * 0.15,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  <motion.div
                    className="relative cursor-pointer"
                    whileHover={{ scale: 1.2, y: -5 }}
                  >
                    <div className="relative">
                      <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500 fill-blue-500 stroke-white" style={{ strokeWidth: 1.5 }} />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-[8px] font-bold text-white">{location.memberCount}</span>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                      <div className="bg-black/80 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
                        {location.city}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Cisco Office */}
            <motion.div
              className="absolute z-30 cursor-pointer"
              style={{
                left: `${18 + (ciscoLocation.x / 100) * 17}%`,
                top: `${8 + (ciscoLocation.y / 100) * 52}%`,
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
                className="absolute w-20 h-20 -top-10 -left-10 rounded-full bg-yellow-400/40"
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
              <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center border-4 border-yellow-400 shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>

              {/* Label */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <div className="bg-emerald-600/95 text-white px-3 py-1.5 rounded-lg border-2 border-yellow-400 shadow-lg">
                  <p className="font-bold text-xs">{ciscoLocation.address}</p>
                  <p className="text-yellow-200 text-[10px]">Click to Continue</p>
                </div>
              </motion.div>

              {/* Pulse ring */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-yellow-400"
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
          className="mt-4 flex justify-center gap-6 flex-wrap"
        >
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-white font-medium text-xs">Team Members</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-medium text-xs">Cisco Office</span>
          </div>
        </motion.div>

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-3 text-blue-200 text-xs"
        >
          Click the Cisco Lisbon office to explore our project timeline
        </motion.p>
      </div>
    </div>
  );
}
