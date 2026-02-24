'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Keyboard,
  Maximize2,
  Sparkles,
  ArrowRight,
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

const MONTH_REGEX = /(january|february|march|april|may|june|july|august|september|october|november|december)/i;
const YEAR_REGEX = /(20\d{2})/;

function getMonthMeta(date: string): { key: string; label: string } {
  if (/december\s+to\s+february/i.test(date)) {
    return {
      key: 'december-to-february',
      label: 'December to February',
    };
  }

  const monthMatch = date.match(MONTH_REGEX);
  const yearMatch = date.match(YEAR_REGEX);

  if (!monthMatch) {
    return {
      key: date.toLowerCase().replace(/\s+/g, '-'),
      label: date,
    };
  }

  const month = monthMatch[1];
  const monthLabel = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
  const year = yearMatch ? yearMatch[1] : '';
  const label = year ? `${monthLabel} ${year}` : monthLabel;

  return {
    key: label.toLowerCase().replace(/\s+/g, '-'),
    label,
  };
}

export default function Timeline({ events }: TimelineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(0);
  const [albumImageIndexes, setAlbumImageIndexes] = useState<Record<string, number>>({});
  const [showKeyboardHint, setShowKeyboardHint] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventType | null>(null);
  const [showEnding, setShowEnding] = useState(false);
  const [endingStage, setEndingStage] = useState<'intro' | 'panel'>('intro');
  const containerRef = useRef<HTMLDivElement>(null);

  const getEventImages = useCallback((event?: TimelineEventType | null): string[] => {
    if (!event) return [];
    if (Array.isArray(event.images) && event.images.length > 0) {
      return event.images;
    }
    return event.image ? [event.image] : [];
  }, []);

  const parseEventDescription = useCallback((description: string) => {
    const lines = description
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const bullets = lines
      .filter((line) => /^[-•*]\s+/.test(line))
      .map((line) => line.replace(/^[-•*]\s+/, ''));

    const textLines = lines.filter((line) => !/^[-•*]\s+/.test(line));

    return {
      text: textLines.join(' '),
      bullets,
    };
  }, []);

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
      if (selectedEvent || showEnding) return; // Don't navigate when dialog/ending is open
      
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
  }, [goToNext, goToPrev, goToIndex, events, currentIndex, selectedEvent, showEnding]);

  useEffect(() => {
    if (!showEnding) return;

    setEndingStage('intro');
    const stageTimer = window.setTimeout(() => {
      setEndingStage('panel');
    }, 2600);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setShowEnding(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(stageTimer);
    };
  }, [showEnding]);

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
  const currentEventImages = getEventImages(currentEvent);
  const currentEventImage = currentEventImages[currentImageIndex];
  const hasMultipleCurrentEventImages = currentEventImages.length > 1;
  const currentEventImageKey = currentEvent ? `${currentEvent.id}-${currentImageIndex}` : '';
  const hasCurrentVisualImage = !!currentEventImage && !imageError[currentEventImageKey];
  const currentEventContent = useMemo(
    () => parseEventDescription(currentEvent?.description || ''),
    [currentEvent?.description, parseEventDescription]
  );

  const selectedEventImages = getEventImages(selectedEvent);
  const selectedEventImage = selectedEventImages[selectedImageIndex];
  const hasMultipleSelectedImages = selectedEventImages.length > 1;
  const selectedEventImageKey = selectedEvent ? `${selectedEvent.id}-${selectedImageIndex}` : '';
  const hasSelectedVisualImage = !!selectedEventImage && !imageError[selectedEventImageKey];
  const selectedEventContent = useMemo(
    () => parseEventDescription(selectedEvent?.description || ''),
    [selectedEvent?.description, parseEventDescription]
  );
  const monthTrack = useMemo(() => {
    const groups: Array<{ key: string; label: string; firstEventIndex: number; lastEventIndex: number }> = [];

    events.forEach((event, eventIndex) => {
      const monthMeta = getMonthMeta(event.date);
      const existing = groups.find((group) => group.key === monthMeta.key);

      if (!existing) {
        groups.push({
          key: monthMeta.key,
          label: monthMeta.label,
          firstEventIndex: eventIndex,
          lastEventIndex: eventIndex,
        });
      } else {
        existing.lastEventIndex = eventIndex;
      }
    });

    return groups;
  }, [events]);
  const currentMonthIndex = useMemo(() => {
    const monthIndex = monthTrack.findIndex(
      (group) => currentIndex >= group.firstEventIndex && currentIndex <= group.lastEventIndex
    );
    return monthIndex >= 0 ? monthIndex : 0;
  }, [monthTrack, currentIndex]);
  const monthProgressRatio = useMemo(() => {
    if (monthTrack.length === 0) return 0;

    const currentMonth = monthTrack[currentMonthIndex];
    if (!currentMonth) return 0;

    const eventsInMonth = currentMonth.lastEventIndex - currentMonth.firstEventIndex + 1;
    const eventOffset = currentIndex - currentMonth.firstEventIndex;
    const withinMonthProgress = eventsInMonth > 0 ? (eventOffset + 1) / eventsInMonth : 1;

    return (currentMonthIndex + withinMonthProgress) / monthTrack.length;
  }, [monthTrack, currentMonthIndex, currentIndex]);
  const isTimelineComplete = useMemo(() => {
    if (events.length === 0) return false;
    return currentIndex === events.length - 1 || monthProgressRatio >= 1;
  }, [currentIndex, events.length, monthProgressRatio]);
  const selectedLinkedAlbums = useMemo(
    () => selectedEvent?.linkedAlbums || [],
    [selectedEvent?.linkedAlbums]
  );
  const activeLinkedAlbum = selectedLinkedAlbums[selectedAlbumIndex];
  const hasMultipleLinkedAlbums = selectedLinkedAlbums.length > 1;
  const activeAlbumImageIndex = activeLinkedAlbum ? (albumImageIndexes[activeLinkedAlbum.folder] || 0) : 0;
  const activeAlbumImage = activeLinkedAlbum?.images[activeAlbumImageIndex];
  const hasActiveAlbumCarousel = !!activeLinkedAlbum && activeLinkedAlbum.images.length > 1;

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentEvent?.id]);

  useEffect(() => {
    if (!hasMultipleCurrentEventImages) return;
    const timer = window.setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentEventImages.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [hasMultipleCurrentEventImages, currentEventImages.length, currentEvent?.id]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedEvent?.id]);

  useEffect(() => {
    const initialIndexes: Record<string, number> = {};

    selectedLinkedAlbums.forEach((album) => {
      initialIndexes[album.folder] = 0;
    });

    setSelectedAlbumIndex(0);
    setAlbumImageIndexes(initialIndexes);
  }, [selectedEvent?.id, selectedLinkedAlbums]);

  useEffect(() => {
    if (selectedAlbumIndex <= selectedLinkedAlbums.length - 1) return;
    setSelectedAlbumIndex(0);
  }, [selectedAlbumIndex, selectedLinkedAlbums.length]);

  useEffect(() => {
    if (!selectedEvent || !hasMultipleSelectedImages) return;
    const timer = window.setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % selectedEventImages.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [selectedEvent, hasMultipleSelectedImages, selectedEventImages.length]);

  useEffect(() => {
    if (!selectedEvent || selectedLinkedAlbums.length === 0) return;

    const hasAnyAlbumCarousel = selectedLinkedAlbums.some((album) => album.images.length > 1);
    if (!hasAnyAlbumCarousel) return;

    const timer = window.setInterval(() => {
      setAlbumImageIndexes((prev) => {
        const next = { ...prev };
        selectedLinkedAlbums.forEach((album) => {
          if (album.images.length > 1) {
            const current = prev[album.folder] || 0;
            next[album.folder] = (current + 1) % album.images.length;
          }
        });
        return next;
      });
    }, 3000);

    return () => window.clearInterval(timer);
  }, [selectedEvent, selectedLinkedAlbums]);

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
            {currentMonthIndex + 1} / {monthTrack.length}
          </span>
          <span className="text-xs sm:text-sm font-medium text-blue-300">
            {Math.round(monthProgressRatio * 100)}% Complete
          </span>
        </div>
        <div className="h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${monthProgressRatio * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <AnimatePresence>
          {isTimelineComplete && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 flex justify-center"
            >
              <Button
                type="button"
                onClick={() => setShowEnding(true)}
                className="rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-semibold bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 text-white border border-cyan-200/30 hover:brightness-110 shadow-[0_10px_30px_-8px_rgba(56,189,248,0.45)]"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Enter Ending
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Horizontal timeline track with dots - hidden on mobile */}
      <div className="w-full max-w-4xl mb-4 sm:mb-8 relative z-10 hidden sm:block">
        <div className="relative h-16 flex items-center">
          {/* Track line */}
          <div className="absolute left-0 right-0 h-1 bg-white/10 rounded-full" />
          <motion.div
            className="absolute left-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-400 rounded-full"
            animate={{ width: `${monthTrack.length > 1 ? (currentMonthIndex / (monthTrack.length - 1)) * 100 : 0}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          
          {/* Timeline dots */}
          <div className="relative w-full flex justify-between">
            {monthTrack.map((month, index) => {
              const DotIcon = Rocket;
              const isActive = index === currentMonthIndex;
              const isPast = index < currentMonthIndex;
              
              return (
                <motion.button
                  key={month.key}
                  onClick={() => goToIndex(month.firstEventIndex)}
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
                    {month.label}
                  </motion.span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative w-full max-w-5xl h-[460px] sm:h-[520px] md:h-[560px] flex items-center justify-center">
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
                className="relative overflow-hidden h-full flex flex-col md:flex-row cursor-pointer group transition-all duration-300 border-0 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.65)] bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/15 hover:border-cyan-300/30 hover:shadow-[0_30px_55px_-20px_rgba(34,211,238,0.25)]"
                onClick={() => setSelectedEvent(currentEvent)}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

                {/* Image side */}
                {hasCurrentVisualImage ? (
                  <div className="relative w-full md:w-1/2 h-36 sm:h-48 md:h-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${currentEvent.id}-${currentImageIndex}`}
                        initial={{ opacity: 0.2, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.2, scale: 0.98 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={currentEventImage}
                          alt={`${currentEvent.title} image ${currentImageIndex + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={() => setImageError(prev => ({ ...prev, [currentEventImageKey]: true }))}
                        />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/45" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

                    {hasMultipleCurrentEventImages && (
                      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-black/55 backdrop-blur-sm text-white border border-white/15">
                        <span>{currentImageIndex + 1}</span>
                        <span className="text-white/60">/</span>
                        <span>{currentEventImages.length}</span>
                      </div>
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
                ) : (
                  <div className="relative w-full md:w-1/2 h-36 sm:h-48 md:h-full overflow-hidden bg-gradient-to-br from-blue-700/30 via-cyan-700/20 to-emerald-700/30 border-b md:border-b-0 md:border-r border-white/10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.25),transparent_45%),radial-gradient(circle_at_70%_75%,rgba(16,185,129,0.2),transparent_45%)]" />
                  </div>
                )}

                {/* Content side */}
                <CardContent className={cn(
                  "flex-1 min-h-0 p-4 sm:p-6 md:p-7 lg:p-8 flex flex-col",
                  !hasCurrentVisualImage && 'md:items-start md:text-left'
                )}>
                  <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                    <motion.div
                      className="flex flex-wrap items-center gap-2 text-xs sm:text-sm mb-2 sm:mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-300/25 text-blue-200">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="font-medium">{currentEvent.date}</span>
                      </span>
                    </motion.div>

                    <motion.h2
                      className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {currentEvent.title}
                    </motion.h2>

                    <motion.div
                      className="space-y-3 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {currentEventContent.text && (
                        <p className="text-sm sm:text-base md:text-[1.02rem] text-blue-100/80 leading-relaxed">
                          {currentEventContent.text}
                        </p>
                      )}

                      {currentEventContent.bullets.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-blue-100/85 marker:text-cyan-300">
                          {currentEventContent.bullets.map((bullet, idx) => (
                            <li key={`${currentEvent.id}-bullet-${idx}`}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </div>

                  {/* Click to expand hint */}
                  <motion.div
                    className="mt-3 inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-300/20 font-medium"
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

      <AnimatePresence>
        {showEnding && (
          <motion.div
            className="fixed inset-0 z-[120] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-black" />

            <motion.div
              className="absolute -top-16 -left-12 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-24 -right-10 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl"
              animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.24, 0.12] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
              <AnimatePresence mode="wait">
                {endingStage === 'intro' ? (
                  <motion.div
                    key="ending-intro"
                    initial={{ opacity: 0, scale: 0.96, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.04, y: -10 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-center"
                  >
                    <motion.p
                      className="text-cyan-200/85 text-xs sm:text-sm tracking-[0.26em] uppercase"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                    >
                      Final Chapter
                    </motion.p>
                    <motion.h3
                      className="mt-4 text-white text-3xl sm:text-5xl md:text-6xl font-bold leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.7 }}
                    >
                      The Future Starts Now
                    </motion.h3>
                    <motion.p
                      className="mt-6 text-blue-100/85 text-sm sm:text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1, duration: 0.6 }}
                    >
                      Transitioning to what comes next...
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ending-panel"
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="w-full max-w-5xl px-4 sm:px-8 text-center"
                  >
                    <motion.p
                      className="text-cyan-200/90 text-xs sm:text-sm tracking-[0.22em] uppercase"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      The Journey Continues
                    </motion.p>

                    <motion.h3
                      className="mt-4 text-white text-3xl sm:text-5xl md:text-6xl font-bold leading-tight"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Beyond 2026, we keep building the future at Cisco.
                    </motion.h3>

                    <motion.p
                      className="mt-7 text-blue-100/90 text-base sm:text-xl max-w-3xl mx-auto"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      From networking to automation, security, and AI — this is only chapter one.
                    </motion.p>

                    <motion.div
                      className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="rounded-full border border-cyan-200/30 bg-cyan-400/10 px-4 py-2 text-cyan-100 text-sm sm:text-base">Scale impact across teams</div>
                      <div className="rounded-full border border-cyan-200/30 bg-cyan-400/10 px-4 py-2 text-cyan-100 text-sm sm:text-base">Lead with innovation</div>
                      <div className="rounded-full border border-cyan-200/30 bg-cyan-400/10 px-4 py-2 text-cyan-100 text-sm sm:text-base">Turn vision into outcomes</div>
                    </motion.div>

                    <motion.div
                      className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.75 }}
                    >
                      <Button
                        type="button"
                        onClick={() => setShowEnding(false)}
                        className="rounded-full px-7 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border border-cyan-200/25"
                      >
                        Back to Timeline
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowEnding(false);
                          goToIndex(0);
                        }}
                        className="rounded-full px-7 py-2.5 bg-white/10 border-white/25 text-white hover:bg-white/20"
                      >
                        Replay Journey
                      </Button>
                    </motion.div>

                    <p className="mt-4 text-white/60 text-xs">Press Esc to close</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Event Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-slate-900 border-white/10 text-white">
          {selectedEvent && (
            <>
              {/* Dialog Image */}
              {hasSelectedVisualImage ? (
                <div className="relative w-full h-48 sm:h-64 md:h-80">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedEvent.id}-${selectedImageIndex}`}
                      initial={{ opacity: 0.2, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.2, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={selectedEventImage}
                        alt={`${selectedEvent.title} image ${selectedImageIndex + 1}`}
                        fill
                        className="object-cover"
                        onError={() => setImageError(prev => ({ ...prev, [selectedEventImageKey]: true }))}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {hasMultipleSelectedImages && (
                    <>
                      <button
                        type="button"
                        onClick={() => setSelectedImageIndex((prev) => (prev - 1 + selectedEventImages.length) % selectedEventImages.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedImageIndex((prev) => (prev + 1) % selectedEventImages.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm text-white border border-white/10">
                        {selectedImageIndex + 1} / {selectedEventImages.length}
                      </div>
                    </>
                  )}
                  
                  {/* Title overlay on image */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                      {selectedEvent.title}
                    </h2>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden bg-gradient-to-br from-blue-700/30 via-cyan-700/20 to-emerald-700/30 border-b border-white/10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.25),transparent_45%),radial-gradient(circle_at_70%_75%,rgba(16,185,129,0.2),transparent_45%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/10 border border-white/20 mb-3">
                      {(() => {
                        const SelectedIcon = selectedEvent.icon ? iconMap[selectedEvent.icon] || Rocket : Rocket;
                        return <SelectedIcon className="w-7 h-7 text-blue-200" />;
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* Dialog Content */}
              <div className="p-6 sm:p-8">
                {/* If no image, show title here */}
                {!hasSelectedVisualImage && (
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
                    </div>
                    <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                      {selectedEvent.title}
                    </DialogTitle>
                  </DialogHeader>
                )}

                {/* Date and Icon row (when image exists) */}
                {hasSelectedVisualImage && (
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
                {!hasSelectedVisualImage && (
                  <div className="flex items-center gap-2 text-blue-300 mb-6">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium text-lg">{selectedEvent.date}</span>
                  </div>
                )}

                {/* Full Description */}
                <div className="prose prose-lg prose-invert max-w-none">
                  {selectedEventContent.text && (
                    <p className="text-blue-100/80 leading-relaxed text-base sm:text-lg">
                      {selectedEventContent.text}
                    </p>
                  )}
                  {selectedEventContent.bullets.length > 0 && (
                    <ul className="mt-4 list-disc pl-6 space-y-2 text-blue-100/85 marker:text-cyan-300">
                      {selectedEventContent.bullets.map((bullet, idx) => (
                        <li key={`${selectedEvent.id}-dialog-bullet-${idx}`}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {selectedLinkedAlbums.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                    <div className="flex items-center gap-2 text-blue-100">
                      <Presentation className="w-5 h-5 text-cyan-300" />
                      <h3 className="text-lg sm:text-xl font-semibold">Album Showcase</h3>
                    </div>

                    <div className="rounded-2xl overflow-hidden border border-white/15 bg-slate-800/55">
                      <div className="relative h-72 sm:h-96">
                        {activeAlbumImage ? (
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`${activeLinkedAlbum?.folder}-${activeAlbumImageIndex}`}
                              initial={{ opacity: 0.2, scale: 1.02 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0.2, scale: 0.98 }}
                              transition={{ duration: 0.35 }}
                              className="absolute inset-0"
                            >
                              <Image
                                src={activeAlbumImage}
                                alt={`${activeLinkedAlbum?.title} image ${activeAlbumImageIndex + 1}`}
                                fill
                                className="object-cover"
                              />
                            </motion.div>
                          </AnimatePresence>
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/30 via-cyan-700/20 to-emerald-700/30" />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                        {hasMultipleLinkedAlbums && (
                          <>
                            <button
                              type="button"
                              onClick={() => setSelectedAlbumIndex((prev) => (prev - 1 + selectedLinkedAlbums.length) % selectedLinkedAlbums.length)}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                              aria-label="Previous album"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedAlbumIndex((prev) => (prev + 1) % selectedLinkedAlbums.length)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                              aria-label="Next album"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        )}

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-white truncate">{activeLinkedAlbum?.title || 'Album'}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white border border-white/20 whitespace-nowrap">
                            {hasMultipleLinkedAlbums ? `${selectedAlbumIndex + 1}/${selectedLinkedAlbums.length} albums` : `${activeLinkedAlbum?.images.length || 0} images`}
                          </span>
                        </div>

                        {hasActiveAlbumCarousel && (
                          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white border border-white/20">
                            {activeAlbumImageIndex + 1}/{activeLinkedAlbum?.images.length}
                          </div>
                        )}
                      </div>

                      {activeLinkedAlbum && activeLinkedAlbum.images.length > 1 && (
                        <div className="p-3 sm:p-4 border-t border-white/10">
                          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {activeLinkedAlbum.images.slice(0, 6).map((image, idx) => (
                              <button
                                key={`${activeLinkedAlbum.folder}-thumb-${idx}`}
                                type="button"
                                className={cn(
                                  'relative aspect-square rounded-md overflow-hidden border transition-colors',
                                  idx === activeAlbumImageIndex ? 'border-cyan-300/80' : 'border-white/15 hover:border-white/35'
                                )}
                                onClick={() => setAlbumImageIndexes((prev) => ({ ...prev, [activeLinkedAlbum.folder]: idx }))}
                              >
                                <Image
                                  src={image}
                                  alt={`${activeLinkedAlbum.title} thumbnail ${idx + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional details section */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" className="gap-2 bg-white/10 border-white/20 text-blue-200 hover:bg-white/20 hover:text-white">
                      <Calendar className="w-4 h-4" />
                      {selectedEvent.date}
                    </Button>
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
