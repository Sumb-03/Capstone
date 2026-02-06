'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

// Dynamically import the Europe map to avoid SSR issues
const Europe = dynamic(() => import('@react-map/europe'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center">
      <div className="animate-pulse text-white text-xl">Loading map...</div>
    </div>
  )
});

interface EuropeMapProps {
  onPortugalClick: () => void;
}

export default function EuropeMap({ onPortugalClick }: EuropeMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Find and highlight Portugal path after the map renders
  useEffect(() => {
    const highlightPortugal = () => {
      if (!mapContainerRef.current) return;
      
      // Find Portugal in the SVG - try various selectors
      const svg = mapContainerRef.current.querySelector('svg');
      if (!svg) return;

      // The library might use different attributes - try them all
      const portugalPath = svg.querySelector('path[name="Portugal"]') ||
                          svg.querySelector('path[data-name="Portugal"]') ||
                          svg.querySelector('path[id="PT"]') ||
                          svg.querySelector('path[data-id="PT"]') ||
                          svg.querySelector('[name="Portugal"]') ||
                          svg.querySelector('[id="Portugal"]');
      
      if (portugalPath) {
        portugalPath.setAttribute('style', 
          'fill: #22c55e !important; ' +
          'filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.9)); ' +
          'cursor: pointer;'
        );
        portugalPath.classList.add('portugal-highlighted');
      }
    };

    // Try immediately and then with delays for dynamic loading
    highlightPortugal();
    const timer1 = setTimeout(highlightPortugal, 500);
    const timer2 = setTimeout(highlightPortugal, 1000);
    const timer3 = setTimeout(highlightPortugal, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleCountrySelect = (countryCode: string | null) => {
    // PT is the country code for Portugal
    if (countryCode === 'PT' || countryCode === 'Portugal') {
      onPortugalClick();
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden relative">
      {/* Animated background elements */}
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
      <motion.div
        className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-500 opacity-20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-7xl mx-auto text-center relative z-10 w-full flex flex-col h-full justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-2 sm:mb-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
            Capstone Presentation
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-blue-100 mb-1">
            Graduates Lisbon FY26Q1
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-blue-200">
            Click on Portugal to begin
          </p>
        </motion.div>

        {/* Europe Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex-1 flex items-center justify-center max-h-[70vh]"
        >
          {/* Interactive Europe Map */}
          <div 
            ref={mapContainerRef}
            className="relative europe-map-container" 
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
          >
            {/* Global CSS to style Portugal and add pulse animation */}
            <style jsx global>{`
              .europe-map-container svg path.portugal-highlighted {
                fill: #22c55e !important;
                filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.9));
                animation: portugalGlow 2s ease-in-out infinite;
              }
              @keyframes portugalGlow {
                0%, 100% { 
                  fill: #22c55e;
                  filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.8));
                }
                50% { 
                  fill: #4ade80;
                  filter: drop-shadow(0 0 15px rgba(74, 222, 128, 1));
                }
              }
            `}</style>
            <Europe
              type="select-single"
              size={715}
              mapColor="#334155"
              strokeColor="#1e293b"
              strokeWidth={0.5}
              hoverColor="#3b82f6"
              selectColor="#22c55e"
              hints={true}
              hintTextColor="#ffffff"
              hintBackgroundColor="#1e293b"
              hintPadding="8px 12px"
              hintBorderRadius={8}
              onSelect={handleCountrySelect}
            />
            
            {/* Portugal label indicator */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: '19%',
                top: '55%',
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-green-600/90 to-green-700/90 backdrop-blur-md px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border-2 border-yellow-400 shadow-2xl">
                <div className="flex items-center gap-1 sm:gap-2">
                  <motion.div
                    className="w-1.5 sm:w-2 md:w-2.5 h-1.5 sm:h-2 md:h-2.5 bg-yellow-400 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <p className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg">Portugal</p>
                </div>
                <p className="text-yellow-200 text-[10px] sm:text-xs mt-0.5 hidden sm:block">Lisbon FY26Q1</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Click hint */}
        <motion.div
          className="mt-2 sm:mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white font-medium text-xs sm:text-sm">Hover over Portugal and click to explore</span>
            <motion.span
              className="text-base sm:text-lg"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
