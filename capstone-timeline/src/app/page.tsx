'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Timeline from '@/components/timeline/Timeline';
import Header from '@/components/ui/Header';
import EuropeMap from '@/components/map/EuropeMap';
import PortugalMap from '@/components/map/PortugalMap';
import { timelineData } from '@/data/timelineData';
import { ArrowLeft } from 'lucide-react';

type ViewState = 'europe' | 'portugal' | 'timeline';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('europe');

  const handlePortugalClick = () => {
    setCurrentView('portugal');
  };

  const handleCiscoClick = () => {
    setCurrentView('timeline');
  };

  const handleBackToEurope = () => {
    setCurrentView('europe');
  };

  const handleBackToPortugal = () => {
    setCurrentView('portugal');
  };

  return (
    <main className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'europe' && (
          <motion.div
            key="europe-map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.5 }
            }}
            transition={{ duration: 0.5 }}
          >
            <EuropeMap onPortugalClick={handlePortugalClick} />
          </motion.div>
        )}

        {currentView === 'portugal' && (
          <motion.div
            key="portugal-map"
            initial={{ 
              opacity: 0,
              scale: 0.9,
              x: -100
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              x: 0
            }}
            exit={{ 
              opacity: 0,
              scale: 0.9,
              x: 100,
              transition: { duration: 0.4 }
            }}
            transition={{ 
              duration: 0.6,
              ease: 'easeOut'
            }}
          >
            <PortugalMap 
              onCiscoClick={handleCiscoClick}
              onBackClick={handleBackToEurope}
            />
          </motion.div>
        )}

        {currentView === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ 
              opacity: 0,
              scale: 1.1,
              y: 100
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{ 
              opacity: 0,
              scale: 0.9,
              y: -100,
              transition: { duration: 0.4 }
            }}
            transition={{ 
              duration: 0.6,
              ease: 'easeOut'
            }}
            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
          >
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="fixed top-6 left-6 z-50"
            >
              <motion.button
                onClick={handleBackToPortugal}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Portugal</span>
              </motion.button>
            </motion.div>

            <Header title={timelineData.title} subtitle={timelineData.subtitle} />
            <Timeline events={timelineData.events} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
