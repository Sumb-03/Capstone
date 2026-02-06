'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Timeline from '@/components/timeline/Timeline';
import Header from '@/components/ui/Header';
import EuropeMap from '@/components/map/EuropeMap';
import PortugalMap from '@/components/map/PortugalMap';
import Members from '@/components/members/Members';
import Albums from '@/components/albums/Albums';
import { timelineData } from '@/data/timelineData';
import { ArrowLeft, Clock, Users, Image as ImageIcon } from 'lucide-react';

type ViewState = 'europe' | 'portugal' | 'main';
type TabState = 'timeline' | 'members' | 'albums';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('europe');
  const [currentTab, setCurrentTab] = useState<TabState>('timeline');

  const handlePortugalClick = () => {
    setCurrentView('portugal');
  };

  const handleCiscoClick = () => {
    setCurrentView('main');
  };

  const handleBackToEurope = () => {
    setCurrentView('europe');
  };

  const handleBackToPortugal = () => {
    setCurrentView('portugal');
  };

  const tabs = [
    { id: 'timeline' as TabState, label: 'Timeline', icon: Clock },
    { id: 'members' as TabState, label: 'Team', icon: Users },
    { id: 'albums' as TabState, label: 'Albums', icon: ImageIcon },
  ];

  return (
    <main className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'europe' && (
          <motion.div
            key="europe-map"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0,
              scale: 4,
              x: '70%',
              y: '80%',
              transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: '30% 80%' }}
          >
            <EuropeMap onPortugalClick={handlePortugalClick} />
          </motion.div>
        )}

        {currentView === 'portugal' && (
          <motion.div
            key="portugal-map"
            initial={{ 
              opacity: 0,
              scale: 0.3,
              transformOrigin: 'center center'
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              transformOrigin: 'center center'
            }}
            exit={{ 
              opacity: 0,
              scale: 3,
              y: '50%',
              transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
            }}
            transition={{ 
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <PortugalMap 
              onCiscoClick={handleCiscoClick}
              onBackClick={handleBackToEurope}
            />
          </motion.div>
        )}

        {currentView === 'main' && (
          <motion.div
            key="main-content"
            initial={{ 
              opacity: 0,
              scale: 0.4,
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
            }}
            exit={{ 
              opacity: 0,
              scale: 0.6,
              transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
            }}
            transition={{ 
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
          >
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50"
            >
              <motion.button
                onClick={handleBackToPortugal}
                className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 text-sm sm:text-base"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold hidden sm:inline">Back to Portugal</span>
              </motion.button>
            </motion.div>

            {/* Tab navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50"
            >
              <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setCurrentTab(tab.id)}
                      className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 ${
                        currentTab === tab.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium hidden md:inline">{tab.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            <Header title={timelineData.title} subtitle={timelineData.subtitle} />
            
            {/* Tab content */}
            <AnimatePresence mode="wait">
              {currentTab === 'timeline' && (
                <motion.div
                  key="timeline-tab"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Timeline events={timelineData.events} />
                </motion.div>
              )}
              
              {currentTab === 'members' && (
                <motion.div
                  key="members-tab"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Members />
                </motion.div>
              )}
              
              {currentTab === 'albums' && (
                <motion.div
                  key="albums-tab"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Albums />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
