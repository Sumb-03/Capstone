'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Keyboard,
} from 'lucide-react';

interface TimelineProps {
  events: TimelineEventType[];
}

const iconMap: Record<string, any> = {
  rocket: Rocket,
  search: Search,
  palette: Palette,
  code: Code,
  'check-circle': CheckCircle,
  presentation: Presentation,
};

export default function Timeline({ events }: TimelineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [showKeyboardHint, setShowKeyboardHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToNext = useCallback(() => {
    if (currentIndex < events.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, events.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const goToIndex = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToIndex(events.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, goToIndex, events.length]);

  // Hide keyboard hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowKeyboardHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Focus container for keyboard events
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const currentEvent = events[currentIndex];
  const Icon = currentEvent?.icon ? iconMap[currentEvent.icon] || Rocket : Rocket;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-8 outline-none relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Keyboard hint */}
      <AnimatePresence>
        {showKeyboardHint && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg text-xs sm:text-sm text-gray-600 dark:text-gray-300 z-20"
          >
            <Keyboard className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Use arrow keys to navigate</span>
            <span className="sm:hidden">← → navigate</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-full max-w-4xl mb-4 sm:mb-8 relative z-10 px-2 sm:px-0">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            {currentIndex + 1} / {events.length}
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            {Math.round(((currentIndex + 1) / events.length) * 100)}% Complete
          </span>
        </div>
        <div className="h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / events.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Horizontal timeline track with dots - hidden on mobile */}
      <div className="w-full max-w-4xl mb-4 sm:mb-8 relative z-10 hidden sm:block">
        <div className="relative h-16 flex items-center">
          {/* Track line */}
          <div className="absolute left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <motion.div
            className="absolute left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            animate={{ width: `${(currentIndex / (events.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          
          {/* Timeline dots */}
          <div className="relative w-full flex justify-between">
            {events.map((event, index) => {
              const DotIcon = event.icon ? iconMap[event.icon] || Rocket : Rocket;
              const isActive = index === currentIndex;
              const isPast = index < currentIndex;
              
              return (
                <motion.button
                  key={event.id}
                  onClick={() => goToIndex(index)}
                  className={`relative flex flex-col items-center group cursor-pointer focus:outline-none`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Dot */}
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/30'
                        : isPast
                        ? 'bg-gradient-to-br from-blue-400 to-purple-400'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                  >
                    <DotIcon className={`w-5 h-5 ${isActive || isPast ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                  </motion.div>
                  
                  {/* Label */}
                  <motion.span
                    className={`absolute -bottom-6 text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0.7 }}
                  >
                    {event.date.split(' ')[0]}
                  </motion.span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative w-full max-w-5xl h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center">
        {/* Navigation buttons */}
        <motion.button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className={`absolute left-1 sm:left-0 z-20 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            currentIndex === 0
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white shadow-xl hover:shadow-2xl hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          whileHover={currentIndex !== 0 ? { scale: 1.1, x: -5 } : {}}
          whileTap={currentIndex !== 0 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.button>

        <motion.button
          onClick={goToNext}
          disabled={currentIndex === events.length - 1}
          className={`absolute right-1 sm:right-0 z-20 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            currentIndex === events.length - 1
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white shadow-xl hover:shadow-2xl hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          whileHover={currentIndex !== events.length - 1 ? { scale: 1.1, x: 5 } : {}}
          whileTap={currentIndex !== events.length - 1 ? { scale: 0.95 } : {}}
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.button>

        {/* Event card carousel */}
        <div className="w-full max-w-3xl h-full overflow-hidden px-12 sm:px-16">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  goToNext();
                } else if (swipe > swipeConfidenceThreshold) {
                  goToPrev();
                }
              }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              {/* Event card */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden h-full flex flex-col md:flex-row"
                whileHover={{ y: -5 }}
              >
                {/* Image side */}
                {currentEvent.image && !imageError[currentEvent.id] && (
                  <div className="relative w-full md:w-1/2 h-36 sm:h-48 md:h-full overflow-hidden">
                    <Image
                      src={currentEvent.image}
                      alt={currentEvent.title}
                      fill
                      className="object-cover"
                      onError={() => setImageError(prev => ({ ...prev, [currentEvent.id]: true }))}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 dark:to-gray-800/20" />
                    
                    {/* Category badge */}
                    {currentEvent.category && (
                      <motion.div
                        className="absolute top-2 left-2 sm:top-4 sm:left-4"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/95 backdrop-blur-sm text-gray-800 shadow-lg">
                          <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                          {currentEvent.category}
                        </span>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Content side */}
                <div className={`flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-center ${!currentEvent.image || imageError[currentEvent.id] ? 'items-center text-center' : ''}`}>
                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl ${currentEvent.color} flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </motion.div>

                  {/* Date */}
                  <motion.div
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium">{currentEvent.date}</span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {currentEvent.title}
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4 md:mb-6 line-clamp-3 sm:line-clamp-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {currentEvent.description}
                  </motion.p>

                  {/* Navigation hint - hidden on small screens */}
                  <motion.div
                    className="hidden sm:flex items-center gap-4 text-xs sm:text-sm text-gray-400 dark:text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">←</kbd>
                      <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">→</kbd>
                      Navigate
                    </span>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <span>Swipe or drag</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Quick navigation dots (mobile) */}
      <div className="flex items-center gap-1.5 sm:gap-2 mt-4 sm:mt-8 sm:hidden">
        {events.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToIndex(index)}
            className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-6 sm:w-8'
                : 'bg-gray-300 dark:bg-gray-600 w-2 sm:w-3'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}
