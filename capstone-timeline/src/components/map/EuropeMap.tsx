'use client';

import { motion } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Dynamically import the Europe map to avoid SSR issues
const Europe = dynamic(() => import('@react-map/europe'), { 
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center" style={{ height: '50vh' }}>
      {/* Skeleton map outline */}
      <div className="relative w-full max-w-lg aspect-[4/3]">
        <div className="absolute inset-0 rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="flex items-center gap-3"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <span className="text-blue-300 text-sm font-medium">Loading Europe...</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
          </motion.div>
        </div>
      </div>
    </div>
  )
});

// Generate random star positions once (stable across renders)
const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 2,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 3,
}));

interface EuropeMapProps {
  onPortugalClick: () => void;
}

export default function EuropeMap({ onPortugalClick }: EuropeMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapSize, setMapSize] = useState(715);
  const [portugalPos, setPortugalPos] = useState<{ x: number; y: number } | null>(null);

  // Responsive map size
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setMapSize(350);
      } else if (width < 640) {
        setMapSize(420);
      } else if (width < 768) {
        setMapSize(500);
      } else if (width < 1024) {
        setMapSize(600);
      } else {
        setMapSize(715);
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Find and highlight Portugal path after the map renders
  useEffect(() => {
    const highlightPortugal = () => {
      if (!mapContainerRef.current) return;
      
      const svg = mapContainerRef.current.querySelector('svg');
      if (!svg) return;

      const allPaths = svg.querySelectorAll('path');
      let mainlandPath: SVGPathElement | null = null;

      allPaths.forEach((path) => {
        if (path.classList.contains('portugal-highlighted')) return;
        
        const name = path.getAttribute('name') || '';
        const dataName = path.getAttribute('data-name') || '';
        const id = path.getAttribute('id') || '';
        
        if (name.toLowerCase().includes('portugal') || 
            dataName.toLowerCase().includes('portugal') ||
            id.toLowerCase() === 'pt' ||
            id.toLowerCase().includes('portugal')) {
          path.setAttribute('fill', '#22c55e');
          path.style.fill = '#22c55e';
          path.style.filter = 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.9))';
          path.style.cursor = 'pointer';
          path.classList.add('portugal-highlighted');

          // Find the mainland path (largest bounding box, x > 100 to skip Azores)
          const d = path.getAttribute('d') || '';
          const firstCoord = d.match(/[ML]\s*(\d+\.?\d*)/);
          const xStart = firstCoord ? parseFloat(firstCoord[1]) : 0;
          if (xStart > 100) {
            mainlandPath = path as SVGPathElement;
          }
        }
      });

      // Compute Portugal mainland position relative to map container
      if (mainlandPath && mapContainerRef.current) {
        const bbox = (mainlandPath as SVGPathElement).getBBox();
        const vb = svg.viewBox?.baseVal;
        if (vb && vb.width > 100) {
          const svgRect = svg.getBoundingClientRect();
          const containerRect = mapContainerRef.current.getBoundingClientRect();
          const scaleX = svgRect.width / vb.width;
          const scaleY = svgRect.height / vb.height;
          const cx = (bbox.x + bbox.width / 2 - vb.x) * scaleX + (svgRect.left - containerRect.left);
          const cy = (bbox.y + bbox.height / 2 - vb.y) * scaleY + (svgRect.top - containerRect.top);
          setPortugalPos({ x: cx, y: cy });
        }
      }
    };

    const timer1 = setTimeout(highlightPortugal, 100);
    const timer2 = setTimeout(highlightPortugal, 500);
    const timer3 = setTimeout(highlightPortugal, 1000);
    const timer4 = setTimeout(highlightPortugal, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleCountrySelect = (countryCode: string | null) => {
    if (countryCode === 'PT' || countryCode === 'Portugal') {
      onPortugalClick();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-start sm:justify-center px-2 sm:px-4 py-4 sm:py-6 overflow-hidden relative">
      {/* Floating stars */}
      {STARS.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white/60"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated background blobs */}
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
      {/* Third accent blob */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500 opacity-10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-7xl mx-auto text-center relative z-10 w-full flex flex-col">
        {/* Title - Staggered cinematic entrance */}
        <motion.div
          className="mb-4 sm:mb-6 pt-2 sm:pt-0"
        >
          {/* Main title */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              Capstone Presentation
            </span>
          </motion.h1>

          {/* Subtitle - lighter, distinct from title */}
          <motion.h2
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide text-blue-300/80 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            Graduates Lisbon &middot; FY26Q1
          </motion.h2>

          {/* Decorative divider */}
          <motion.div
            className="mx-auto w-24 sm:w-32 h-0.5 rounded-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
        </motion.div>

        {/* Europe Map Container - with glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="relative flex items-center justify-center flex-1"
        >
          {/* Glass card wrapper */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm p-3 sm:p-5 shadow-2xl shadow-black/20">
            <div 
              ref={mapContainerRef}
              className="relative europe-map-container" 
            >
              {/* Global CSS to style Portugal, add pulse animation, and hide Iceland/Svalbard */}
              <style jsx global>{`
                .europe-map-container svg path[name="Portugal"],
                .europe-map-container svg path[data-name="Portugal"],
                .europe-map-container svg path[id="PT"],
                .europe-map-container svg path[data-id="PT"],
                .europe-map-container svg [name="Portugal"],
                .europe-map-container svg [id="Portugal"],
                .europe-map-container svg path.portugal-highlighted {
                  fill: #22c55e !important;
                  filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.9));
                  animation: portugalGlow 2s ease-in-out infinite;
                  cursor: pointer;
                }
                @keyframes portugalGlow {
                  0%, 100% { 
                    fill: #22c55e !important;
                    filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.8));
                  }
                  50% { 
                    fill: #4ade80 !important;
                    filter: drop-shadow(0 0 15px rgba(74, 222, 128, 1));
                  }
                }
                .europe-map-container svg path[name="Iceland"],
                .europe-map-container svg path[data-name="Iceland"],
                .europe-map-container svg path[id="IS"],
                .europe-map-container svg path[data-id="IS"],
                .europe-map-container svg [name="Iceland"],
                .europe-map-container svg [id="Iceland"] {
                  display: none !important;
                }
                .europe-map-container svg path[name="Svalbard"],
                .europe-map-container svg path[data-name="Svalbard"],
                .europe-map-container svg path[id="SJ"],
                .europe-map-container svg path[data-id="SJ"],
                .europe-map-container svg [name="Svalbard"],
                .europe-map-container svg [id="Svalbard"],
                .europe-map-container svg [name*="Svalbard"],
                .europe-map-container svg [id*="svalbard"],
                .europe-map-container svg [id*="Svalbard"] {
                  display: none !important;
                }
                .europe-map-container .map-hint,
                .europe-map-container [class*="hint"],
                .europe-map-container [class*="tooltip"] {
                  z-index: 100 !important;
                  pointer-events: none !important;
                }
              `}</style>
              <Europe
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
                hintPadding="8px 12px"
                hintBorderRadius={8}
                onSelect={handleCountrySelect}
              />
              
              {/* Animated pointer arrow to Portugal - positioned dynamically */}
              {portugalPos && (
                <motion.div
                  className="absolute pointer-events-none z-20"
                  style={{
                    left: `${portugalPos.x - 140}px`,
                    top: `${portugalPos.y - 20}px`,
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2, duration: 0.6, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-0">
                    <motion.div 
                      className="bg-gradient-to-br from-green-600/95 to-green-700/95 backdrop-blur-md px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border-2 border-yellow-400 shadow-2xl whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <MousePointerClick className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-300" />
                        <p className="text-white font-bold text-xs sm:text-sm md:text-base">Portugal</p>
                      </div>
                      <motion.p
                        className="text-yellow-200 text-[9px] sm:text-[11px] mt-0.5 text-center"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Click to explore
                      </motion.p>
                    </motion.div>

                    {/* Arrow pointing right toward Portugal */}
                    <svg width="40" height="20" className="flex-shrink-0 -ml-0.5">
                      <motion.line
                        x1="0" y1="10" x2="30" y2="10"
                        stroke="#facc15"
                        strokeWidth="2"
                        strokeDasharray="4 3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 2.4, duration: 0.4 }}
                      />
                      <motion.polygon
                        points="27,5 37,10 27,15"
                        fill="#facc15"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.7 }}
                      />
                    </svg>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
