'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { TimelineEvent as TimelineEventType } from '@/types/timeline';
import Image from 'next/image';
import {
  Rocket,
  Search,
  Palette,
  Code,
  CheckCircle,
  Presentation,
  Calendar,
  Tag,
} from 'lucide-react';

interface TimelineEventProps {
  event: TimelineEventType;
  index: number;
  isLeft: boolean;
}

const iconMap: Record<string, any> = {
  rocket: Rocket,
  search: Search,
  palette: Palette,
  code: Code,
  'check-circle': CheckCircle,
  presentation: Presentation,
};

export default function TimelineEvent({ event, index, isLeft }: TimelineEventProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [imageError, setImageError] = useState(false);

  const Icon = event.icon ? iconMap[event.icon] || Rocket : Rocket;

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -100 : 100,
      scale: 0.8,
      rotateY: isLeft ? -15 : 15,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.15 + 0.2,
      },
    },
  };

  return (
    <div ref={ref} className="relative">
      {/* Timeline node - desktop */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg z-10 hidden md:flex items-center justify-center"
        variants={iconVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className={`w-10 h-10 rounded-full ${event.color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </motion.div>

      {/* Event card */}
      <motion.div
        className={`md:w-[calc(50%-3rem)] ${
          isLeft ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'
        } w-full`}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative"
          whileHover={{ 
            y: -8,
            scale: 1.02,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ 
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, transparent 0%, transparent 50%, transparent 100%)`,
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Image */}
          {event.image && !imageError && (
            <motion.div 
              className="relative h-64 w-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Category badge on image */}
              {event.category && (
                <motion.div 
                  className="absolute top-4 right-4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800">
                    <Tag className="w-3 h-3" />
                    {event.category}
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Mobile icon */}
            <div className="md:hidden flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full ${event.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              {event.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <Tag className="w-3 h-3" />
                  {event.category}
                </span>
              )}
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{event.date}</span>
            </div>

            {/* Title */}
            <motion.h3 
              className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 + 0.6 }}
            >
              {event.title}
            </motion.h3>

            {/* Description */}
            <motion.p 
              className="text-gray-600 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.7 }}
            >
              {event.description}
            </motion.p>
          </div>

          {/* Decorative bottom border with animation */}
          <motion.div 
            className={`h-1 ${event.color}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: index * 0.15 + 0.8, duration: 0.6 }}
            style={{ transformOrigin: isLeft ? 'left' : 'right' }}
          />
        </motion.div>

        {/* Connector line to center - desktop only */}
        <div
          className={`hidden md:block absolute top-6 w-16 h-0.5 bg-gradient-to-r ${
            isLeft
              ? 'right-0 from-transparent to-gray-300'
              : 'left-0 from-gray-300 to-transparent'
          }`}
        />
      </motion.div>
    </div>
  );
}
