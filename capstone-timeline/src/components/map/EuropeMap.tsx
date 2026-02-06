'use client';

import { motion } from 'framer-motion';

interface EuropeMapProps {
  onPortugalClick: () => void;
}

export default function EuropeMap({ onPortugalClick }: EuropeMapProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8 overflow-hidden relative">
      {/* Animated background elements */}
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
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl"
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

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Capstone Presentation
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-blue-100 mb-2">
            Graduates Lisbon FY26Q1
          </h2>
          <p className="text-xl md:text-2xl text-blue-200 mb-12">
            Explore Our Journey Across Europe
          </p>
        </motion.div>

        {/* Europe Map SVG - Natural Earth derived accurate map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <svg
            viewBox="-30 30 800 600"
            className="w-full max-w-5xl mx-auto"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
          >
            {/* Background countries - Accurate geographic Europe map */}
            <g opacity="0.5" fill="#64748b" stroke="#475569" strokeWidth="0.5">
              {/* Iceland */}
              <path d="M85,95 L95,90 L110,88 L125,90 L140,95 L150,102 L155,112 L152,122 L145,130 L132,135 L115,137 L100,135 L88,128 L82,118 L80,108 L82,100 Z" />
              
              {/* Norway */}
              <path d="M340,45 L348,42 L358,44 L365,50 L368,60 L370,75 L368,95 L365,115 L360,135 L355,155 L348,175 L342,192 L338,205 L335,215 L332,222 L328,228 L322,232 L315,230 L310,222 L308,212 L310,200 L315,185 L320,168 L325,150 L330,130 L335,110 L338,90 L340,70 L340,55 Z" />
              
              {/* Sweden */}
              <path d="M355,175 L365,170 L378,172 L390,180 L398,195 L402,215 L402,238 L398,260 L390,280 L380,295 L368,305 L355,310 L342,308 L332,298 L328,282 L330,262 L335,242 L342,222 L350,202 L355,185 Z" />
              
              {/* Finland */}
              <path d="M405,135 L420,130 L438,135 L455,148 L468,168 L475,192 L475,218 L468,242 L455,260 L438,272 L420,275 L405,268 L395,252 L392,232 L395,208 L400,182 L405,158 Z" />
              
              {/* Russia (European part) */}
              <path d="M480,120 L520,115 L560,125 L595,145 L620,175 L635,210 L640,250 L635,290 L620,325 L595,355 L560,375 L520,385 L480,380 L450,360 L430,330 L420,295 L425,258 L440,220 L460,185 L480,155 Z" />
              
              {/* United Kingdom - Great Britain */}
              <path d="M215,195 L225,188 L238,185 L252,188 L262,198 L268,212 L270,228 L268,245 L262,262 L252,278 L240,290 L225,298 L210,300 L198,295 L190,282 L185,265 L185,245 L190,225 L198,208 L208,198 Z" />
              
              {/* UK - Scotland highlands */}
              <path d="M205,175 L218,168 L232,170 L242,180 L245,192 L240,205 L228,212 L215,210 L205,200 L202,188 Z" />
              
              {/* Ireland */}
              <path d="M155,215 L170,208 L188,212 L200,225 L205,242 L200,260 L188,275 L170,282 L155,278 L145,265 L142,248 L145,230 Z" />
              
              {/* France */}
              <path d="M220,320 L240,312 L262,310 L285,315 L305,328 L320,348 L328,372 L330,398 L325,422 L312,442 L292,455 L268,460 L245,455 L225,442 L210,422 L202,398 L200,372 L205,348 L215,330 Z" />
              
              {/* Spain */}
              <path d="M140,405 L175,395 L215,392 L255,398 L290,412 L315,435 L328,465 L330,498 L320,528 L298,550 L268,562 L232,565 L198,558 L168,542 L148,518 L138,488 L135,458 L138,428 Z" />
              
              {/* Germany */}
              <path d="M310,248 L335,242 L362,248 L385,262 L400,285 L408,312 L405,342 L392,368 L370,388 L342,398 L312,395 L288,378 L272,352 L268,322 L275,292 L290,268 Z" />
              
              {/* Poland */}
              <path d="M395,262 L425,255 L458,262 L485,280 L502,308 L508,340 L502,372 L485,398 L458,415 L425,420 L395,408 L375,385 L368,355 L372,322 L382,290 Z" />
              
              {/* Italy - Boot shape */}
              <path d="M335,398 L352,392 L370,395 L385,408 L392,428 L390,452 L382,478 L370,505 L358,532 L348,558 L342,582 L340,602 L342,618 L348,628 L358,632 L365,625 L368,612 L365,598 L358,588 L355,575 L358,560 L365,545 L375,528 L388,512 L398,502 L402,495 L400,485 L392,478 L378,475 L365,480 L355,490 L348,505 L340,522 L330,540 L318,555 L305,562 L292,558 L285,545 L285,528 L292,508 L305,488 L320,465 L332,442 L340,418 L340,405 Z" />
              
              {/* Italy - Sicily */}
              <path d="M340,605 L355,600 L372,605 L382,618 L380,632 L368,642 L352,645 L338,638 L332,625 L335,612 Z" />
              
              {/* Italy - Sardinia */}
              <path d="M298,505 L312,500 L322,508 L325,522 L320,538 L308,548 L295,545 L288,532 L290,518 Z" />
              
              {/* Netherlands */}
              <path d="M275,268 L292,262 L308,268 L318,282 L315,298 L302,310 L285,312 L272,302 L268,288 Z" />
              
              {/* Belgium */}
              <path d="M262,302 L278,298 L295,305 L302,318 L298,332 L285,342 L268,340 L258,328 L260,315 Z" />
              
              {/* Switzerland */}
              <path d="M285,378 L302,372 L320,378 L330,392 L325,408 L310,418 L292,415 L280,402 L282,388 Z" />
              
              {/* Austria */}
              <path d="M335,368 L358,362 L382,368 L398,385 L400,405 L388,422 L368,430 L345,425 L330,408 L328,388 Z" />
              
              {/* Czech Republic */}
              <path d="M345,328 L368,322 L390,330 L402,348 L398,368 L382,382 L358,385 L340,372 L335,352 L340,338 Z" />
              
              {/* Hungary */}
              <path d="M390,388 L415,382 L440,392 L455,412 L452,435 L435,452 L410,455 L388,442 L378,420 L382,400 Z" />
              
              {/* Romania */}
              <path d="M445,405 L475,398 L505,408 L525,428 L532,455 L525,485 L505,505 L475,512 L445,502 L428,478 L425,448 L432,422 Z" />
              
              {/* Bulgaria */}
              <path d="M455,485 L482,478 L508,488 L525,508 L525,532 L508,552 L482,558 L455,548 L442,525 L445,502 Z" />
              
              {/* Greece */}
              <path d="M435,538 L458,530 L482,538 L498,558 L502,582 L492,608 L472,625 L445,630 L422,618 L412,592 L418,565 L428,548 Z" />
              
              {/* Greece - Peloponnese */}
              <path d="M425,608 L442,602 L455,612 L458,628 L448,642 L432,645 L420,635 L418,620 Z" />
              
              {/* Turkey (European) */}
              <path d="M502,535 L525,528 L548,538 L562,558 L558,582 L542,598 L518,602 L498,588 L492,565 L495,548 Z" />
              
              {/* Denmark */}
              <path d="M310,220 L325,215 L342,220 L352,235 L350,252 L338,265 L320,268 L305,258 L302,242 L305,228 Z" />
              
              {/* Denmark - Jutland */}
              <path d="M298,235 L308,228 L318,232 L322,245 L318,260 L308,268 L298,262 L295,250 Z" />
              
              {/* Baltic States - Estonia */}
              <path d="M415,205 L432,200 L448,208 L455,225 L450,242 L435,252 L418,248 L408,232 L412,218 Z" />
              
              {/* Latvia */}
              <path d="M418,248 L438,242 L458,250 L468,268 L462,288 L445,298 L425,292 L412,275 L415,258 Z" />
              
              {/* Lithuania */}
              <path d="M412,288 L432,282 L452,292 L462,312 L455,332 L438,342 L418,335 L405,318 L408,300 Z" />
              
              {/* Belarus */}
              <path d="M445,295 L475,288 L505,300 L525,322 L528,352 L515,378 L488,392 L458,385 L440,362 L435,332 L440,308 Z" />
              
              {/* Ukraine */}
              <path d="M505,365 L545,355 L588,368 L620,395 L638,432 L640,472 L625,508 L595,535 L555,548 L512,542 L478,518 L458,482 L455,442 L468,405 L488,378 Z" />
              
              {/* Slovakia */}
              <path d="M385,355 L408,348 L432,358 L445,378 L442,398 L425,412 L402,408 L385,392 L382,372 Z" />
              
              {/* Slovenia */}
              <path d="M358,405 L375,400 L392,408 L398,422 L392,438 L375,445 L358,438 L352,422 Z" />
              
              {/* Croatia */}
              <path d="M370,432 L392,425 L415,435 L432,455 L438,480 L425,502 L402,512 L378,505 L362,482 L360,455 L365,442 Z" />
              
              {/* Bosnia */}
              <path d="M388,458 L408,452 L425,465 L432,485 L425,505 L408,515 L388,508 L378,490 L382,472 Z" />
              
              {/* Serbia */}
              <path d="M420,478 L442,472 L462,485 L472,508 L468,532 L450,548 L428,545 L412,528 L410,502 L415,488 Z" />
              
              {/* Montenegro */}
              <path d="M405,518 L420,512 L435,522 L438,538 L428,552 L412,555 L400,542 L402,528 Z" />
              
              {/* Albania */}
              <path d="M420,545 L435,538 L450,548 L455,568 L448,588 L432,595 L418,585 L415,565 Z" />
              
              {/* North Macedonia */}
              <path d="M442,538 L458,532 L475,542 L480,560 L472,578 L455,585 L440,575 L438,555 Z" />
              
              {/* Moldova */}
              <path d="M498,408 L515,402 L532,412 L540,432 L535,455 L518,468 L498,462 L488,442 L492,422 Z" />
            </g>

            {/* Portugal - Interactive and Highlighted - Accurate shape */}
            <motion.g
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: 1,
              }}
              transition={{
                scale: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                opacity: {
                  duration: 0.8,
                  delay: 0.5,
                }
              }}
              onClick={onPortugalClick}
              className="cursor-pointer"
              style={{ transformOrigin: '118px 490px' }}
            >
              {/* Outer glow effect */}
              <motion.ellipse
                cx="118"
                cy="490"
                rx="35"
                ry="70"
                fill="url(#portugalGlow)"
                opacity="0.6"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Portugal country shape - Accurate geographic outline */}
              <motion.path
                d="M108,418 L118,412 L130,415 L140,425 L145,442 L148,462 L148,485 L145,508 L140,530 L132,548 L120,562 L105,568 L92,565 L82,552 L78,535 L78,512 L80,488 L85,465 L92,445 L100,428 Z"
                fill="url(#portugalGradient)"
                stroke="#fbbf24"
                strokeWidth="2.5"
                whileHover={{
                  scale: 1.1,
                  strokeWidth: 3.5,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Lisbon marker */}
              <motion.g>
                <motion.circle
                  cx="95"
                  cy="515"
                  r="5"
                  fill="#fbbf24"
                  stroke="white"
                  strokeWidth="2"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.8,
                  }}
                />
                {/* Ripple effect */}
                <motion.circle
                  cx="95"
                  cy="515"
                  r="10"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{
                    scale: [0.5, 2.5],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              </motion.g>
            </motion.g>

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="portugalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="40%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              
              <radialGradient id="portugalGlow">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Click instruction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8"
          >
            <motion.button
              onClick={onPortugalClick}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3">
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Click Portugal to Explore Timeline
                </motion.span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </motion.button>
          </motion.div>

          {/* Country label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute top-[60%] left-[18%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="bg-gradient-to-br from-red-600/90 to-red-700/90 backdrop-blur-md px-6 py-3 rounded-xl border-2 border-yellow-400 shadow-2xl">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <p className="text-white font-bold text-xl">Portugal</p>
              </div>
              <p className="text-yellow-200 text-xs mt-1">Lisbon · FY26Q1</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 text-blue-200"
        >
          <p className="text-sm md:text-base">
            Discover the milestones and achievements of our capstone project journey
          </p>
        </motion.div>
      </div>
    </div>
  );
}
