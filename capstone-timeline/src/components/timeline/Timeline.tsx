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
  Maximize2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventType | null>(null);
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
      if (selectedEvent) return; // Don't navigate when dialog is open
      
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
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setSelectedEvent(events[currentIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, goToIndex, events, currentIndex, selectedEvent]);

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
          className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl"
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
            className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-white/10 backdrop-blur-md rounded-full shadow-lg text-xs sm:text-sm text-blue-200 z-20 border border-white/10"
          >
            <Keyboard className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Use arrow keys to navigate • Enter to expand</span>
            <span className="sm:hidden">← → navigate</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-full max-w-4xl mb-4 sm:mb-8 relative z-10 px-2 sm:px-0">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="text-xs sm:text-sm font-medium text-blue-300">
            {currentIndex + 1} / {events.length}
          </span>
          <span className="text-xs sm:text-sm font-medium text-blue-300">
            {Math.round(((currentIndex + 1) / events.length) * 100)}% Complete
          </span>
        </div>
        <div className="h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-400 rounded-full"
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
          <div className="absolute left-0 right-0 h-1 bg-white/10 rounded-full" />
          <motion.div
            className="absolute left-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-400 rounded-full"
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
                        ? 'bg-gradient-to-br from-blue-500 via-emerald-400 to-blue-400 shadow-lg shadow-blue-500/30'
                        : isPast
                        ? 'bg-gradient-to-br from-blue-400 to-emerald-400'
                        : 'bg-white/10 border border-white/20'
                    }`}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                  >
                    <DotIcon className={`w-5 h-5 ${isActive || isPast ? 'text-white' : 'text-blue-200/50'}`} />
                  </motion.div>
                  
                  {/* Label */}
                  <motion.span
                    className={`absolute -bottom-6 text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? 'text-emerald-400'
                        : 'text-blue-300/40 group-hover:text-blue-200'
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
        <Button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          variant="outline"
          size="icon"
          className={cn(
            "absolute left-1 sm:left-0 z-20 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white",
            currentIndex === 0 && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </Button>

        <Button
          onClick={goToNext}
          disabled={currentIndex === events.length - 1}
          variant="outline"
          size="icon"
          className={cn(
            "absolute right-1 sm:right-0 z-20 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white",
            currentIndex === events.length - 1 && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </Button>

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
              {/* Event card - clickable to expand */}
              <Card 
                className="overflow-hidden h-full flex flex-col md:flex-row cursor-pointer group hover:shadow-2xl transition-all duration-300 border-0 shadow-xl bg-slate-800/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/10"
                onClick={() => setSelectedEvent(currentEvent)}
              >
                {/* Image side */}
                {currentEvent.image && !imageError[currentEvent.id] && (
                  <div className="relative w-full md:w-1/2 h-36 sm:h-48 md:h-full overflow-hidden">
                    <Image
                      src={currentEvent.image}
                      alt={currentEvent.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => setImageError(prev => ({ ...prev, [currentEvent.id]: true }))}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-800/30" />
                    
                    {/* Category badge */}
                    {currentEvent.category && (
                      <motion.div
                        className="absolute top-2 left-2 sm:top-4 sm:left-4"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-black/50 backdrop-blur-sm text-white shadow-lg border border-white/10">
                          <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                          {currentEvent.category}
                        </span>
                      </motion.div>
                    )}

                    {/* Expand indicator */}
                    <motion.div
                      className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-black/70 text-white backdrop-blur-sm">
                        <Maximize2 className="w-3 h-3" />
                        Click to expand
                      </span>
                    </motion.div>
                  </div>
                )}

                {/* Content side */}
                <CardContent className={cn(
                  "flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-center",
                  (!currentEvent.image || imageError[currentEvent.id]) && 'items-center text-center'
                )}>
                  {/* Icon */}
                  <motion.div
                    className={cn(
                      "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg",
                      currentEvent.color
                    )}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </motion.div>

                  {/* Date */}
                  <motion.div
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-blue-300 mb-2 sm:mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium">{currentEvent.date}</span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {currentEvent.title}
                  </motion.h2>

                  {/* Description (truncated) */}
                  <motion.p
                    className="text-sm sm:text-base md:text-lg text-blue-100/70 leading-relaxed mb-3 sm:mb-4 md:mb-6 line-clamp-2 sm:line-clamp-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {currentEvent.description}
                  </motion.p>

                  {/* Click to expand hint */}
                  <motion.div
                    className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Click card for full details</span>
                  </motion.div>
                </CardContent>
              </Card>
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
            className={cn(
              "h-2 sm:h-3 rounded-full transition-all duration-300",
              index === currentIndex
                ? 'bg-gradient-to-r from-blue-500 to-emerald-400 w-6 sm:w-8'
                : 'bg-white/20 w-2 sm:w-3'
            )}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Expanded Event Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-slate-900 border-white/10 text-white">
          {selectedEvent && (
            <>
              {/* Dialog Image */}
              {selectedEvent.image && !imageError[selectedEvent.id] && (
                <div className="relative w-full h-48 sm:h-64 md:h-80">
                  <Image
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(prev => ({ ...prev, [selectedEvent.id]: true }))}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category badge on image */}
                  {selectedEvent.category && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-white/10 text-blue-200 border border-white/10">
                        <Tag className="w-4 h-4" />
                        {selectedEvent.category}
                      </span>
                    </div>
                  )}

                  {/* Title overlay on image */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                      {selectedEvent.title}
                    </h2>
                  </div>
                </div>
              )}

              {/* Dialog Content */}
              <div className="p-6 sm:p-8">
                {/* If no image, show title here */}
                {(!selectedEvent.image || imageError[selectedEvent.id]) && (
                  <DialogHeader className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      {(() => {
                        const SelectedIcon = selectedEvent.icon ? iconMap[selectedEvent.icon] || Rocket : Rocket;
                        return (
                          <div className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center shadow-lg",
                            selectedEvent.color
                          )}>
                            <SelectedIcon className="w-7 h-7 text-white" />
                          </div>
                        );
                      })()}
                      {selectedEvent.category && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-white/10 text-blue-200 border border-white/10">
                          <Tag className="w-4 h-4" />
                          {selectedEvent.category}
                        </span>
                      )}
                    </div>
                    <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                      {selectedEvent.title}
                    </DialogTitle>
                  </DialogHeader>
                )}

                {/* Date and Icon row (when image exists) */}
                {selectedEvent.image && !imageError[selectedEvent.id] && (
                  <div className="flex items-center gap-4 mb-6">
                    {(() => {
                      const SelectedIcon = selectedEvent.icon ? iconMap[selectedEvent.icon] || Rocket : Rocket;
                      return (
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg",
                          selectedEvent.color
                        )}>
                          <SelectedIcon className="w-6 h-6 text-white" />
                        </div>
                      );
                    })()}
                    <div className="flex items-center gap-2 text-blue-300">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium text-lg">{selectedEvent.date}</span>
                    </div>
                  </div>
                )}

                {/* Date (when no image) */}
                {(!selectedEvent.image || imageError[selectedEvent.id]) && (
                  <div className="flex items-center gap-2 text-blue-300 mb-6">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium text-lg">{selectedEvent.date}</span>
                  </div>
                )}

                {/* Full Description */}
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-blue-100/80 leading-relaxed text-base sm:text-lg">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Additional details section */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" className="gap-2 bg-white/10 border-white/20 text-blue-200 hover:bg-white/20 hover:text-white">
                      <Calendar className="w-4 h-4" />
                      {selectedEvent.date}
                    </Button>
                    {selectedEvent.category && (
                      <Button variant="secondary" size="sm" className="gap-2 bg-white/10 border-white/20 text-blue-200 hover:bg-white/20 hover:text-white">
                        <Tag className="w-4 h-4" />
                        {selectedEvent.category}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
