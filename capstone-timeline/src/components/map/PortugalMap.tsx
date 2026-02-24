'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ArrowLeft, Users, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ciscoLocation, teamLocations } from '@/data/teamLocations';

// Dynamically import the Portugal map to avoid SSR issues
const Portugal = dynamic(() => import('@react-map/portugal'), { 
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center" style={{ height: '60vh' }}>
      <div className="animate-pulse text-white text-xl">Loading map...</div>
    </div>
  )
});

interface PortugalMapProps {
  onCiscoClick: () => void;
  onBackClick: () => void;
}

// Island district names to hide
const ISLAND_DISTRICTS = ['Açores', 'Madeira'];

// Unique SVG path identifiers for districts (substring from each district's path 'd' attribute)
const DISTRICT_PATH_IDS: Record<string, string> = {
  'Porto': '713.01,179.9',
  'Lisboa': '698.66,281.01',
  'Aveiro': '714.45,186.3',
  'Leiria': '713.14,245.57',
  'Braga': '733.2,152.59',
  'Coimbra': '717.1',
  'Faro': '718.55',
  'Setúbal': '709.67',
};

export default function PortugalMap({ onCiscoClick, onBackClick }: PortugalMapProps) {
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const [markerPos, setMarkerPos] = useState<{ x: number; y: number } | null>(null);
  const [cityPositions, setCityPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [clipStyle, setClipStyle] = useState<React.CSSProperties>({});
  const [clipOffset, setClipOffset] = useState({ left: 0, top: 0 });
  const [ready, setReady] = useState(false);
  const [mapSize, setMapSize] = useState(800);
  const [showOfficePreview, setShowOfficePreview] = useState(false);
  const ciscoMarkerRef = useRef<HTMLDivElement>(null);
  const lastSvgSizeRef = useRef<{ width: number; height: number } | null>(null);

  // We want the mainland to fill ~55vh in height.
  // Mainland SVG coords: y ~130-370 => height ~240
  // Full SVG coords: x ~140-770, y ~100-400 => width ~630, height ~300
  // Mainland is ~80% of SVG height, so size = targetHeight / 0.8
  useEffect(() => {
    const update = () => {
      const targetHeight = window.innerHeight * 1.68;
      setMapSize(Math.round(targetHeight / 0.55));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const computePositions = useCallback(() => {
    if (!mapWrapperRef.current) return false;
    const svgEl = mapWrapperRef.current.querySelector('svg');
    if (!svgEl) return false;

    const vb = svgEl.viewBox?.baseVal;
    if (!vb || (vb.width === 100 && vb.height === 100)) return false;

    // Reset margins before measuring so we get consistent values
    mapWrapperRef.current.style.marginLeft = '0px';
    mapWrapperRef.current.style.marginTop = '0px';

    const svgRect = svgEl.getBoundingClientRect();
    if (svgRect.width === 0 || svgRect.height === 0) return false;
    const scaleX = svgRect.width / vb.width;
    const scaleY = svgRect.height / vb.height;
    if (!isFinite(scaleX) || !isFinite(scaleY) || scaleX === 0 || scaleY === 0) return false;

    // Hide island paths and find mainland bounding box
    const paths = svgEl.querySelectorAll('path');
    let lisbonPath = null as SVGPathElement | null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    paths.forEach((p) => {
      const d = p.getAttribute('d') || '';
      
      // Hide islands: Açores paths start around x=140-400, Madeira around x=480-530
      // Mainland paths all start with x > 680
      const firstCoord = d.match(/[ML]\s*(\d+\.?\d*)/);
      const xStart = firstCoord ? parseFloat(firstCoord[1]) : 0;
      
      if (xStart < 650) {
        // This is an island path — hide it
        (p as SVGPathElement).style.display = 'none';
      } else {
        // Mainland path — include in bounding box
        const bbox = p.getBBox();
        minX = Math.min(minX, bbox.x);
        minY = Math.min(minY, bbox.y);
        maxX = Math.max(maxX, bbox.x + bbox.width);
        maxY = Math.max(maxY, bbox.y + bbox.height);
      }

      // Find Lisboa
      if (d.includes('698.66,281.01')) {
        lisbonPath = p as SVGPathElement;
      }
    });

    // Marker on Lisboa center
    if (lisbonPath) {
      const bbox = lisbonPath.getBBox();
      const cx = bbox.x + bbox.width / 2;
      const cy = bbox.y + bbox.height / 2;
      const px = (cx - vb.x) * scaleX;
      const py = (cy - vb.y) * scaleY;
      setMarkerPos({ x: px, y: py });
    }

    // Find all team city positions from the SVG paths
    const positions: Record<string, { x: number; y: number }> = {};
    const teamCities = teamLocations.map(t => t.city).filter(c => c !== 'Lisboa');
    
    for (const city of teamCities) {
      const pathId = DISTRICT_PATH_IDS[city];
      if (!pathId) continue;
      
      paths.forEach((p) => {
        const d = p.getAttribute('d') || '';
        if (d.includes(pathId)) {
          const bbox = p.getBBox();
          const cx = bbox.x + bbox.width / 2;
          const cy = bbox.y + bbox.height / 2;
          positions[city] = {
            x: (cx - vb.x) * scaleX,
            y: (cy - vb.y) * scaleY,
          };
        }
      });
    }
    // Compute clip region: pixel coords of mainland bbox within the SVG element
    const paddingLeft = 60;
    const paddingRight = 100; // extra right padding to avoid clipping effects
    const paddingTop = 60;
    const paddingBottom = 60;
    const clipLeft = (minX - vb.x) * scaleX - paddingLeft;
    const clipTop = (minY - vb.y) * scaleY - paddingTop;
    const clipWidth = (maxX - minX) * scaleX + paddingLeft + paddingRight;
    const clipHeight = (maxY - minY) * scaleY + paddingTop + paddingBottom;

    // Position the clip container so that only mainland is visible and centered
    setCityPositions(positions);

    setClipStyle({
      width: clipWidth,
      height: clipHeight,
      overflow: 'hidden',
    });

    if (mapWrapperRef.current) {
      mapWrapperRef.current.style.marginLeft = `-${clipLeft}px`;
      mapWrapperRef.current.style.marginTop = `-${clipTop}px`;
    }

    setClipOffset({ left: clipLeft, top: clipTop });

    setReady(true);
    return true;
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let settleTimeout: ReturnType<typeof setTimeout> | undefined;
    let mutationObserver: MutationObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let done = false;
    let attempts = 0;
    let stableCount = 0;
    const maxAttempts = 80;

    const runCompute = () => {
      if (done || !mapWrapperRef.current) return;

      attempts += 1;
      const ok = computePositions();
      const svgEl = mapWrapperRef.current.querySelector('svg');

      if (ok && svgEl) {
        const rect = svgEl.getBoundingClientRect();
        const previous = lastSvgSizeRef.current;

        if (previous) {
          const widthDelta = Math.abs(previous.width - rect.width);
          const heightDelta = Math.abs(previous.height - rect.height);

          if (widthDelta < 1 && heightDelta < 1) {
            stableCount += 1;
          } else {
            stableCount = 0;
          }
        }

        lastSvgSizeRef.current = { width: rect.width, height: rect.height };

        if (stableCount >= 4) {
          done = true;
          if (intervalId) clearInterval(intervalId);
          if (settleTimeout) clearTimeout(settleTimeout);
          mutationObserver?.disconnect();
          resizeObserver?.disconnect();
          return;
        }
      }

      if (attempts >= maxAttempts) {
        done = true;
        if (intervalId) clearInterval(intervalId);
        if (settleTimeout) clearTimeout(settleTimeout);
        mutationObserver?.disconnect();
        resizeObserver?.disconnect();
      }
    };

    const scheduleCompute = () => {
      if (done) return;
      if (settleTimeout) clearTimeout(settleTimeout);
      settleTimeout = setTimeout(runCompute, 80);
    };

    // Start quickly and keep recomputing until SVG dimensions settle.
    requestAnimationFrame(() => {
      requestAnimationFrame(runCompute);
    });
    intervalId = setInterval(runCompute, 120);

    if (mapWrapperRef.current) {
      mutationObserver = new MutationObserver(scheduleCompute);
      mutationObserver.observe(mapWrapperRef.current, { childList: true, subtree: true, attributes: true });
    }

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleCompute);
      if (mapWrapperRef.current) resizeObserver.observe(mapWrapperRef.current);
      if (clipRef.current) resizeObserver.observe(clipRef.current);
    }

    return () => {
      done = true;
      if (intervalId) clearInterval(intervalId);
      if (settleTimeout) clearTimeout(settleTimeout);
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
    };
  }, [computePositions, mapSize]);

  useEffect(() => {
    const onResize = () => computePositions();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [computePositions]);

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

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-between relative z-10 min-h-[calc(100vh-2rem)]">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 pt-12 sm:pt-8 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            Portugal
          </h2>
        </motion.div>

        {/* Map - clipped to mainland only, centered below title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          ref={clipRef}
          className="relative mx-auto"
          style={{
            ...clipStyle,
            filter: ready ? 'drop-shadow(0 10px 30px rgba(0,0,0,0.4))' : undefined,
          }}
        >
          <div ref={mapWrapperRef} className="portugal-map-wrapper relative">
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

            {/* Team city markers */}
            {teamLocations.filter(t => t.city !== 'Lisboa').map((location, idx) => {
              const pos = cityPositions[location.city];
              if (!pos) return null;
              return (
                <motion.div
                  key={location.city}
                  className="absolute"
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 25,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + idx * 0.2, type: 'spring', stiffness: 150 }}
                >
                  <div className="relative w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center border-2 border-blue-300 shadow-lg">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <motion.div
                    className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + idx * 0.2 }}
                  >
                    <div className="bg-blue-600/90 text-white px-2 py-1 rounded-md text-[8px] sm:text-[10px] font-medium shadow-lg border border-blue-400/50">
                      {location.city} • {location.memberCount} {location.memberCount === 1 ? 'member' : 'members'}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Lisboa team member marker (smaller, next to Cisco marker) */}
            {(() => {
              const lisboaTeam = teamLocations.find(t => t.city === 'Lisboa');
              if (!lisboaTeam || !markerPos) return null;
              return (
                <motion.div
                  className="absolute"
                  style={{
                    left: `${markerPos.x + 55}px`,
                    top: `${markerPos.y - 30}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 25,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4, type: 'spring', stiffness: 150 }}
                >
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center border-2 border-blue-300 shadow-lg">
                    <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  </div>
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 mt-0.5 whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    <div className="bg-blue-600/90 text-white px-2 py-0.5 rounded-md text-[7px] sm:text-[9px] font-medium shadow-lg border border-blue-400/50">
                      {lisboaTeam.memberCount} Lisbon
                    </div>
                  </motion.div>
                </motion.div>
              );
            })()}

            {/* Cisco Office marker on Lisboa */}
            {markerPos && (
              <motion.div
                ref={ciscoMarkerRef}
                className="absolute cursor-pointer"
                style={{
                  left: `${markerPos.x}px`,
                  top: `${markerPos.y}px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 30,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
                onClick={onCiscoClick}
                onMouseEnter={() => setShowOfficePreview(true)}
                onMouseLeave={() => setShowOfficePreview(false)}
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
                  transition={{ delay: 0.8 }}
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
            )}

          {/* Animated flight paths SVG overlay: All cities → Lisbon */}
          {markerPos && Object.keys(cityPositions).length > 0 && (
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{ width: '100%', height: '100%', overflow: 'visible', zIndex: 20 }}
            >
              <defs>
                <linearGradient id="flightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Flight paths from each team city to Lisbon */}
              {teamLocations.filter(t => t.city !== 'Lisboa').map((location, idx) => {
                const fromPos = cityPositions[location.city];
                if (!fromPos) return null;

                const fromX = fromPos.x;
                const fromY = fromPos.y;
                const toX = markerPos.x;
                const toY = markerPos.y;
                // Curve to the left (west), varied by index to avoid overlapping
                const curveOffset = -30 - idx * 15;
                const midX = (fromX + toX) / 2 + curveOffset;
                const midY = (fromY + toY) / 2;
                const pathD = `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`;
                const delay = 1.5 + idx * 0.3;

                return (
                  <g key={location.city}>
                    {/* Dashed path */}
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke="url(#flightGradient)"
                      strokeWidth="2"
                      strokeDasharray="8 6"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay, duration: 1.5, ease: 'easeInOut' }}
                    />

                    {/* Animated dot */}
                    <motion.circle
                      r="4"
                      fill="#60a5fa"
                      filter="url(#glow)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1, 0] }}
                      transition={{ delay: delay + 2, duration: 3, repeat: Infinity, repeatDelay: 1 + idx * 0.5 }}
                    >
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        begin={`${delay + 2}s`}
                        path={pathD}
                      />
                    </motion.circle>
                  </g>
                );
              })}

              {/* Flight path from Lisboa team marker to Cisco office */}
              {(() => {
                const lisboaTeam = teamLocations.find(t => t.city === 'Lisboa');
                if (!lisboaTeam) return null;

                const fromX = markerPos.x + 55;
                const fromY = markerPos.y - 30;
                const toX = markerPos.x;
                const toY = markerPos.y;
                const midX = (fromX + toX) / 2 + 12;
                const midY = (fromY + toY) / 2 - 8;
                const pathD = `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`;
                const delay = 1.2;

                return (
                  <g key="lisboa-flight-path">
                    <motion.path
                      d={pathD}
                      fill="none"
                      stroke="url(#flightGradient)"
                      strokeWidth="2"
                      strokeDasharray="8 6"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay, duration: 1.2, ease: 'easeInOut' }}
                    />

                    <motion.circle
                      r="4"
                      fill="#60a5fa"
                      filter="url(#glow)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1, 0] }}
                      transition={{ delay: delay + 1.6, duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                      <animateMotion
                        dur="2.5s"
                        repeatCount="indefinite"
                        begin={`${delay + 1.6}s`}
                        path={pathD}
                      />
                    </motion.circle>
                  </g>
                );
              })()}
            </svg>
          )}
          </div>
        </motion.div>

        {/* Cisco Office Preview - rendered outside clip container so it's not clipped */}
        <AnimatePresence>
          {showOfficePreview && markerPos && clipRef.current && (() => {
            // Calculate pin screen position from clip container + markerPos - clipOffset
            const clipRect = clipRef.current!.getBoundingClientRect();
            const pinScreenX = clipRect.left + (markerPos.x - clipOffset.left);
            const pinScreenY = clipRect.top + (markerPos.y - clipOffset.top);
            return (
              <motion.div
                className="fixed z-[100] flex items-center"
                onMouseEnter={() => setShowOfficePreview(true)}
                onMouseLeave={() => setShowOfficePreview(false)}
                style={{
                  left: pinScreenX - 20,
                  top: pinScreenY,
                }}
                initial={{ opacity: 0, x: 'calc(-100% + 20px)', y: '-50%', scale: 0.9 }}
                animate={{ opacity: 1, x: '-100%', y: '-50%', scale: 1 }}
                exit={{ opacity: 0, x: 'calc(-100% + 20px)', y: '-50%', scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-slate-800/95 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden w-64 sm:w-80">
                  <div className="w-full h-36 sm:h-44 relative overflow-hidden">
                    <img
                      src="https://www.itinsight.pt/img/uploads/1140x641_23c5283fce5420c09971ca477e5c3e1e.jpg"
                      alt="Cisco Office Lisbon"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800/60 to-transparent pointer-events-none" />
                  </div>
                  <div className="p-2.5 sm:p-3">
                    <p className="text-white font-bold text-xs sm:text-sm flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                      Cisco Systems Portugal
                    </p>
                    <p className="text-blue-300 text-[9px] sm:text-[11px] mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Lisbon, Portugal
                    </p>
                  </div>
                </div>
                {/* Arrow pointing right toward the marker */}
                <div className="flex-shrink-0 -ml-[1px]">
                  <div className="w-3 h-3 bg-slate-800/95 border-r border-b border-white/20 transform -rotate-45" />
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-6 flex justify-center gap-4 sm:gap-6 flex-wrap px-2 pb-4"
        >
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-medium text-xs sm:text-sm">Cisco Office</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-white font-medium text-xs sm:text-sm">Team Origin</span>
          </div>
        </motion.div>

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-2 text-blue-200 text-xs sm:text-sm px-4"
        >
          Click the Cisco Lisbon office to continue
        </motion.p>
      </div>
    </div>
  );
}
