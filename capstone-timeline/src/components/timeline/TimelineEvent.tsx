'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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
  Circle,
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
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  const Icon = event.icon ? iconMap[event.icon] || Rocket : Rocket;

  // Fetch images from folder if imageFolder is specified
  useEffect(() => {
    const loadImages = async () => {
      if (event.imageFolder) {
        try {
          const response = await fetch(`/api/timeline-images?folder=${encodeURIComponent(event.imageFolder)}`);
          const data = await response.json();
          if (data.images && data.images.length > 0) {
            setImages(data.images);
          } else if (event.images && event.images.length > 0) {
            setImages(event.images);
          } else if (event.image) {
            setImages([event.image]);
          }
        } catch (error) {
          console.error('Error loading images:', error);
          if (event.images && event.images.length > 0) {
            setImages(event.images);
          } else if (event.image) {
            setImages([event.image]);
          }
        }
      } else if (event.images && event.images.length > 0) {
        setImages(event.images);
      } else if (event.image) {
        setImages([event.image]);
      }
    };

    loadImages();
  }, [event.imageFolder, event.images, event.image]);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleImageError = (idx: number) => {
    setImageError(prev => ({ ...prev, [idx]: true }));
  };

  const currentImage = images[currentImageIndex];
  const hasMultipleImages = images.length > 1;

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
    <div ref={ref} className="relative mb-8">
      {/* Timeline node - desktop */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-slate-800/80 backdrop-blur-md shadow-lg shadow-blue-500/20 border border-white/10 z-10 hidden md:flex items-center justify-center"
        variants={iconVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className={`w-12 h-12 rounded-full ${event.color} flex items-center justify-center shadow-inner`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </motion.div>

      {/* Event card - PPT style, larger */}
      <motion.div
        className={`md:w-[calc(50%-4rem)] ${
          isLeft ? 'md:mr-auto md:pr-20' : 'md:ml-auto md:pl-20'
        } w-full`}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className="bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/10 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:border-white/20 transition-all duration-500 relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          whileHover={{ 
            y: -12,
            scale: 1.02,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ 
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Image carousel - larger, 16:9 aspect ratio for PPT feel */}
          {images.length > 0 && currentImage && !imageError[currentImageIndex] && (
            <div 
              className="relative w-full overflow-hidden bg-slate-700"
              style={{ aspectRatio: '16/9' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentImage}
                    alt={`${event.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(currentImageIndex)}
                    priority={index < 2}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Navigation arrows - only show if multiple images */}
              {hasMultipleImages && (
                <>
                  <motion.button
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm shadow-lg flex items-center justify-center text-white border border-white/20 hover:bg-black/70 hover:scale-110 transition-all z-10"
                    onClick={handlePrevImage}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isHovering ? 1 : 0.6, x: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm shadow-lg flex items-center justify-center text-white border border-white/20 hover:bg-black/70 hover:scale-110 transition-all z-10"
                    onClick={handleNextImage}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: isHovering ? 1 : 0.6, x: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}

              {/* Image counter & dots */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                  <div className="flex items-center gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                        className="group"
                      >
                        <Circle
                          className={`w-3 h-3 transition-all ${
                            idx === currentImageIndex
                              ? 'fill-white text-white scale-125'
                              : 'fill-white/40 text-white/40 hover:fill-white/70 hover:text-white/70'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-white/80 font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                </div>
              )}

              {/* Category badge on image */}
              {event.category && (
                <motion.div 
                  className="absolute top-4 right-4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-black/50 backdrop-blur-sm text-white border border-white/20 shadow-md">
                    <Tag className="w-4 h-4" />
                    {event.category}
                  </span>
                </motion.div>
              )}
            </div>
          )}

          {/* Content - larger padding for PPT feel */}
          <div className="p-8 md:p-10">
            {/* Mobile icon */}
            <div className="md:hidden flex items-center gap-3 mb-5">
              <div className={`w-12 h-12 rounded-full ${event.color} flex items-center justify-center shadow-md`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              {event.category && (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 text-white border border-white/10">
                  <Tag className="w-4 h-4" />
                  {event.category}
                </span>
              )}
            </div>

            {/* Date - larger */}
            <div className="flex items-center gap-2 text-base text-blue-300 mb-4">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold tracking-wide">{event.date}</span>
            </div>

            {/* Title - much larger for presentation feel */}
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 + 0.6 }}
            >
              {event.title}
            </motion.h3>

            {/* Description - larger text for readability */}
            <motion.p 
              className="text-lg text-blue-100/70 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.7 }}
            >
              {event.description}
            </motion.p>
          </div>

          {/* Decorative bottom border with animation - thicker */}
          <motion.div 
            className={`h-2 ${event.color}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: index * 0.15 + 0.8, duration: 0.6 }}
            style={{ transformOrigin: isLeft ? 'left' : 'right' }}
          />
        </motion.div>

        {/* Connector line to center - desktop only */}
        <div
          className={`hidden md:block absolute top-7 w-20 h-1 bg-gradient-to-r rounded-full ${
            isLeft
              ? 'right-0 from-transparent to-white/10'
              : 'left-0 from-white/10 to-transparent'
          }`}
        />
      </motion.div>
    </div>
  );
}
