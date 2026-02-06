'use client';

import { motion } from 'framer-motion';
import { MapPin, Building2 } from 'lucide-react';
import { teamLocations, ciscoLocation } from '@/data/teamLocations';

interface PortugalMapProps {
  onCiscoClick: () => void;
  onBackClick: () => void;
}

export default function PortugalMap({ onCiscoClick, onBackClick }: PortugalMapProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8 overflow-hidden relative">
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

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Back button */}
        <motion.button
          onClick={onBackClick}
          className="absolute top-0 left-0 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full border border-white/20 transition-all duration-300"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Europe
        </motion.button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">
            Portugal
          </h2>
          <p className="text-xl text-blue-200">
            Our Graduate Team Across the Country
          </p>
        </motion.div>

        {/* Portugal Map - Realistic geographic shape */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <svg
            viewBox="0 0 400 700"
            className="w-full max-w-2xl mx-auto"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
          >
            {/* Portugal mainland - Accurate geographic coastline */}
            <motion.path
              d="M 245,52 
                 L 255,48 L 268,50 L 280,56 L 288,65 L 292,78
                 L 290,92 L 285,105 L 278,118 L 275,132
                 L 270,148 L 265,165 L 262,180 L 258,195
                 L 255,212 L 250,230 L 248,248 L 245,268
                 L 242,290 L 240,312 L 238,335 L 235,358
                 L 232,382 L 228,405 L 222,428 L 215,448
                 L 205,468 L 195,485 L 185,500 L 178,515
                 L 172,528 L 168,542 L 165,555 L 162,568
                 L 160,582 L 158,595 L 155,608 L 150,620
                 L 142,632 L 132,642 L 120,650 L 108,655
                 L 95,658 L 82,658 L 72,652 L 65,642
                 L 62,628 L 65,612 L 72,598 L 80,585
                 L 88,575 L 95,562 L 100,548 L 102,532
                 L 105,515 L 108,498 L 112,480 L 115,462
                 L 118,442 L 122,422 L 125,400 L 128,378
                 L 130,355 L 132,332 L 135,308 L 138,285
                 L 142,262 L 148,240 L 155,220 L 162,202
                 L 170,185 L 180,170 L 190,158 L 200,148
                 L 212,140 L 225,135 L 235,132 L 242,125
                 L 248,115 L 252,102 L 255,88 L 258,72
                 L 255,60 Z"
              fill="url(#portugalMainGradient)"
              stroke="#e5e7eb"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />

            {/* Northern region detail - Minho */}
            <path
              d="M 245,52 L 250,58 L 255,65 L 252,72 L 248,68 L 245,60 Z"
              fill="url(#portugalMainGradient)"
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* Porto coastal indent */}
            <path
              d="M 108,195 L 102,200 L 98,208 L 102,215 L 110,212 L 115,205 Z"
              fill="url(#portugalMainGradient)"
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* Lisbon/Tagus estuary detail */}
            <path
              d="M 120,445 L 112,452 L 108,462 L 115,472 L 125,468 L 128,458 Z"
              fill="url(#portugalMainGradient)"
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* Setúbal peninsula */}
            <path
              d="M 125,480 L 118,488 L 115,498 L 122,508 L 132,505 L 138,495 Z"
              fill="url(#portugalMainGradient)"
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* Cape São Vicente - southwestern tip */}
            <path
              d="M 62,628 L 55,635 L 52,645 L 58,652 L 68,648 L 72,638 Z"
              fill="url(#portugalMainGradient)"
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* Algarve southern coast */}
            <path
              d="M 72,652 L 85,658 L 100,662 L 118,665 L 135,662 L 148,655 L 158,645"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
              opacity="0.7"
            />

            {/* Azores islands (Atlantic - northwest) */}
            <g opacity="0.8">
              <motion.ellipse
                cx="55"
                cy="180"
                rx="18"
                ry="10"
                fill="#6366f1"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: 'spring' }}
              />
              <motion.ellipse
                cx="38"
                cy="190"
                rx="12"
                ry="7"
                fill="#6366f1"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.6, type: 'spring' }}
              />
              <text x="48" y="212" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="500">Azores</text>
            </g>

            {/* Madeira islands (Atlantic - southwest) */}
            <g opacity="0.8">
              <motion.ellipse
                cx="65"
                cy="520"
                rx="15"
                ry="9"
                fill="#6366f1"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.7, type: 'spring' }}
              />
              <motion.ellipse
                cx="48"
                cy="528"
                rx="9"
                ry="6"
                fill="#6366f1"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.8, type: 'spring' }}
              />
              <text x="58" y="548" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="500">Madeira</text>
            </g>

            {/* Team location pins */}
            {teamLocations.map((location, index) => (
              <motion.g
                key={location.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 1 + index * 0.15,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                {/* Pin shadow */}
                <ellipse
                  cx={location.x}
                  cy={location.y + 25}
                  rx="8"
                  ry="3"
                  fill="black"
                  opacity="0.3"
                />
                
                {/* Pin */}
                <motion.g
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="cursor-pointer"
                >
                  {/* Pin marker */}
                  <path
                    d={`M ${location.x} ${location.y - 15} 
                        L ${location.x - 8} ${location.y + 5}
                        Q ${location.x} ${location.y + 8} ${location.x + 8} ${location.y + 5}
                        Z`}
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle
                    cx={location.x}
                    cy={location.y - 15}
                    r="8"
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <circle
                    cx={location.x}
                    cy={location.y - 15}
                    r="4"
                    fill="white"
                  />
                  
                  {/* Count badge */}
                  <circle
                    cx={location.x + 10}
                    cy={location.y - 22}
                    r="8"
                    fill="#ef4444"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={location.x + 10}
                    y={location.y - 18}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {location.memberCount}
                  </text>
                </motion.g>

                {/* Location label */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + index * 0.15 }}
                >
                  <rect
                    x={location.x - 25}
                    y={location.y + 10}
                    width="50"
                    height="20"
                    rx="10"
                    fill="rgba(0,0,0,0.7)"
                    stroke="white"
                    strokeWidth="1"
                  />
                  <text
                    x={location.x}
                    y={location.y + 23}
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {location.city}
                  </text>
                </motion.g>

                {/* Pulse effect */}
                <motion.circle
                  cx={location.x}
                  cy={location.y - 15}
                  r="15"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{
                    scale: [0.5, 2],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1 + index * 0.3,
                    ease: 'easeOut',
                  }}
                />
              </motion.g>
            ))}

            {/* Cisco Office in Lisbon - HIGHLIGHTED */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 2,
                type: 'spring',
                stiffness: 150,
              }}
              onClick={onCiscoClick}
              className="cursor-pointer"
              whileHover={{ scale: 1.15 }}
            >
              {/* Glow effect */}
              <motion.circle
                cx={ciscoLocation.x}
                cy={ciscoLocation.y}
                r="35"
                fill="url(#ciscoGlow)"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Building icon background */}
              <circle
                cx={ciscoLocation.x}
                cy={ciscoLocation.y}
                r="25"
                fill="url(#ciscoGradient)"
                stroke="#fbbf24"
                strokeWidth="3"
              />

              {/* Building icon */}
              <g transform={`translate(${ciscoLocation.x - 15}, ${ciscoLocation.y - 15})`}>
                <rect x="5" y="8" width="20" height="22" fill="white" opacity="0.9" />
                <rect x="8" y="11" width="4" height="4" fill="#0d9488" />
                <rect x="13" y="11" width="4" height="4" fill="#0d9488" />
                <rect x="8" y="17" width="4" height="4" fill="#0d9488" />
                <rect x="13" y="17" width="4" height="4" fill="#0d9488" />
                <rect x="8" y="23" width="4" height="7" fill="#0d9488" />
                <rect x="13" y="23" width="4" height="7" fill="#0d9488" />
              </g>

              {/* Pulse rings */}
              <motion.circle
                cx={ciscoLocation.x}
                cy={ciscoLocation.y}
                r="30"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="3"
                initial={{ scale: 0.8, opacity: 1 }}
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
            </motion.g>

            {/* Lisbon Cisco label */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3 }}
            >
              <rect
                x={ciscoLocation.x - 55}
                y={ciscoLocation.y + 40}
                width="110"
                height="45"
                rx="8"
                fill="rgba(5, 150, 105, 0.95)"
                stroke="#fbbf24"
                strokeWidth="2"
              />
              <text
                x={ciscoLocation.x}
                y={ciscoLocation.y + 58}
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {ciscoLocation.address}
              </text>
              <text
                x={ciscoLocation.x}
                y={ciscoLocation.y + 75}
                textAnchor="middle"
                fill="#fde68a"
                fontSize="11"
              >
                Click to Continue
              </text>
            </motion.g>

            {/* Gradients */}
            <defs>
              <linearGradient id="portugalMainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              
              <linearGradient id="ciscoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              
              <radialGradient id="ciscoGlow">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-12 flex justify-center gap-8 flex-wrap"
        >
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <MapPin className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">Team Members</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <span className="text-white font-medium">Cisco Office</span>
          </div>
        </motion.div>

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-8 text-blue-200 text-sm"
        >
          Click the Cisco Lisbon office to explore our project timeline
        </motion.p>
      </div>
    </div>
  );
}
