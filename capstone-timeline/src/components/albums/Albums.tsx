'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Calendar,
  FolderOpen,
  Grid,
  Maximize2,
  Loader2,
} from 'lucide-react';

// Types
interface Photo {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  albumTitle?: string;
}

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  photos: Photo[];
}

export default function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'albums' | 'all'>('albums');

  // Fetch albums from API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/albums');
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setAlbums(data.albums || []);
        }
      } catch (err) {
        setError('Failed to load albums');
        console.error('Error fetching albums:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const allPhotos = albums.flatMap(album => 
    album.photos.map(photo => ({ ...photo, albumTitle: album.title }))
  );

  const handlePhotoClick = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(index);
  };

  const handleNextPhoto = () => {
    if (selectedAlbum) {
      const newIndex = (currentPhotoIndex + 1) % selectedAlbum.photos.length;
      setCurrentPhotoIndex(newIndex);
      setSelectedPhoto(selectedAlbum.photos[newIndex]);
    } else {
      const newIndex = (currentPhotoIndex + 1) % allPhotos.length;
      setCurrentPhotoIndex(newIndex);
      setSelectedPhoto(allPhotos[newIndex]);
    }
  };

  const handlePrevPhoto = () => {
    if (selectedAlbum) {
      const newIndex = currentPhotoIndex === 0 
        ? selectedAlbum.photos.length - 1 
        : currentPhotoIndex - 1;
      setCurrentPhotoIndex(newIndex);
      setSelectedPhoto(selectedAlbum.photos[newIndex]);
    } else {
      const newIndex = currentPhotoIndex === 0 
        ? allPhotos.length - 1 
        : currentPhotoIndex - 1;
      setCurrentPhotoIndex(newIndex);
      setSelectedPhoto(allPhotos[newIndex]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="w-full min-h-[calc(100vh-200px)] px-3 sm:px-4 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading albums...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <FolderOpen className="w-16 h-16 text-red-400 mb-4" />
            <p className="text-red-500 mb-2">Error loading albums</p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && albums.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <FolderOpen className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Albums Found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              Add folders with images to <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">/public/albums/</code> to create albums.
            </p>
          </div>
        )}

        {/* Albums Content */}
        {!loading && !error && albums.length > 0 && (
          <>
        {/* Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            Photo Gallery
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4 sm:mb-6 px-4">
            Capture the moments that define our journey together.
          </p>

          {/* View mode toggle */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => { setViewMode('albums'); setSelectedAlbum(null); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-sm sm:text-base ${
                viewMode === 'albums'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              Albums
            </button>
            <button
              onClick={() => { setViewMode('all'); setSelectedAlbum(null); }}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-sm sm:text-base ${
                viewMode === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
              All Photos
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {albums.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Albums</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {allPhotos.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Photos</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700 col-span-2 md:col-span-1">
            <div className="flex items-center justify-center mb-1 sm:mb-2">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              6 Months
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Of Memories</div>
          </div>
        </motion.div>

        {/* Albums grid view */}
        {viewMode === 'albums' && !selectedAlbum && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {albums.map((album) => (
              <motion.div
                key={album.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedAlbum(album)}
                className="cursor-pointer group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                  {/* Cover image */}
                  <div className="relative h-64 overflow-hidden">
                    {!imageError[album.id] ? (
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() => setImageError(prev => ({ ...prev, [album.id]: true }))}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Photo count badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-gray-800 shadow-lg">
                        <ImageIcon className="w-4 h-4" />
                        {album.photos.length} photos
                      </span>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {album.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">
                        {album.description}
                      </p>
                    </div>
                  </div>

                  {/* Preview thumbnails */}
                  <div className="p-4">
                    <div className="flex gap-2">
                      {album.photos.slice(0, 4).map((photo, idx) => (
                        <div
                          key={photo.id}
                          className="relative w-16 h-16 rounded-lg overflow-hidden"
                        >
                          {!imageError[photo.id] ? (
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              className="object-cover"
                              onError={() => setImageError(prev => ({ ...prev, [photo.id]: true }))}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />
                          )}
                          {idx === 3 && album.photos.length > 4 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                +{album.photos.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Selected album view */}
        {viewMode === 'albums' && selectedAlbum && (
          <div>
            {/* Back button and album title */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <button
                onClick={() => setSelectedAlbum(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Albums
              </button>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedAlbum.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {selectedAlbum.photos.length} photos
                </p>
              </div>
            </motion.div>

            {/* Photos grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {selectedAlbum.photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePhotoClick(photo, index)}
                  className="cursor-pointer group"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                    {!imageError[photo.id] ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() => setImageError(prev => ({ ...prev, [photo.id]: true }))}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-white/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {photo.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm font-medium truncate">
                          {photo.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* All photos view */}
        {viewMode === 'all' && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {allPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePhotoClick(photo, index)}
                className="cursor-pointer group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                  {!imageError[photo.id] ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() => setImageError(prev => ({ ...prev, [photo.id]: true }))}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-white/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedPhoto.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Caption */}
            {selectedPhoto.caption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 left-0 right-0 text-center"
              >
                <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
                  <p className="text-white font-medium">{selectedPhoto.caption}</p>
                  {(selectedPhoto as any).date && (
                    <p className="text-white/70 text-sm">{(selectedPhoto as any).date}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Counter */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              {currentPhotoIndex + 1} / {selectedAlbum ? selectedAlbum.photos.length : allPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
