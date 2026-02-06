'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TimelineEvent as TimelineEventType } from '@/types/timeline';
import TimelineEvent from './TimelineEvent';

interface TimelineProps {
  events: TimelineEventType[];
}

export default function Timeline({ events }: TimelineProps) {
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: false, amount: 0.1 });

  return (
    <div ref={timelineRef} className="max-w-7xl mx-auto px-4 py-20 relative">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"
        animate={{
          y: [0, 30, 0],
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative">
        {/* Vertical timeline line with gradient */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 hidden md:block"
          style={{ 
            height: '100%',
            background: 'linear-gradient(180deg, rgba(96, 165, 250, 0.3) 0%, rgba(147, 51, 234, 0.5) 50%, rgba(236, 72, 153, 0.3) 100%)',
            transformOrigin: 'top',
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 w-2 -left-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 blur-sm"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Timeline events */}
        <div className="space-y-12">
          {events.map((event, index) => (
            <TimelineEvent
              key={event.id}
              event={event}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>

      {/* End marker with enhanced animation */}
      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: events.length * 0.15,
          type: 'spring',
          stiffness: 200,
        }}
      >
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl relative z-10">
            <motion.svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </motion.svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
