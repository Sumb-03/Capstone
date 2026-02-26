'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Timeline from '@/components/timeline/Timeline';
import Header from '@/components/ui/Header';
import EuropeMap from '@/components/map/EuropeMap';
import PortugalMap from '@/components/map/PortugalMap';
import Members from '@/components/members/Members';
import Albums from '@/components/albums/Albums';
import { timelineData } from '@/data/timelineData';
import { TimelineEvent } from '@/types/timeline';
import { ArrowLeft, Clock, Users, Image as ImageIcon, Globe } from 'lucide-react';

type ViewState = 'europe' | 'portugal' | 'main';
type TabState = 'timeline' | 'members' | 'albums';
const INTRO_TITLE = 'In 2025, 7 Stars from across Portugal (and Greece/Brazil) joined Cisco together.';

function getStateFromHash(): { view: ViewState; tab: TabState } {
  if (typeof window === 'undefined') return { view: 'europe', tab: 'timeline' };
  const hash = window.location.hash.replace('#', '');
  const parts = hash.split('/');
  const view = (['europe', 'portugal', 'main'].includes(parts[0]) ? parts[0] : 'europe') as ViewState;
  const tab = (['timeline', 'members', 'albums'].includes(parts[1]) ? parts[1] : 'timeline') as TabState;
  return { view, tab };
}

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('europe');
  const [currentTab, setCurrentTab] = useState<TabState>('timeline');
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(timelineData.events);
  const [showIntro, setShowIntro] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');

  // Restore state from URL hash on mount
  useEffect(() => {
    const { view, tab } = getStateFromHash();
    setCurrentView(view);
    setCurrentTab(tab);
    setShowIntro(view === 'europe');
  }, []);

  useEffect(() => {
    if (!showIntro) return;
    const timeout = setTimeout(() => setShowIntro(false), 12000);
    return () => clearTimeout(timeout);
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) {
      setTypedTitle('');
      return;
    }

    let index = 0;
    setTypedTitle('');
    const timer = setInterval(() => {
      index += 1;
      setTypedTitle(INTRO_TITLE.slice(0, index));
      if (index >= INTRO_TITLE.length) {
        clearInterval(timer);
      }
    }, 42);

    return () => clearInterval(timer);
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        setShowIntro(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showIntro]);

  // Sync URL hash when state changes
  useEffect(() => {
    const hash = currentView === 'main' ? `main/${currentTab}` : currentView;
    window.history.replaceState(null, '', `#${hash}`);
  }, [currentView, currentTab]);

  // Listen for browser back/forward
  useEffect(() => {
    const onHashChange = () => {
      const { view, tab } = getStateFromHash();
      setCurrentView(view);
      setCurrentTab(tab);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Fetch timeline events from API
  useEffect(() => {
    async function fetchTimeline() {
      try {
        const response = await fetch('/api/timeline');
        if (response.ok) {
          const data = await response.json();
          if (data.events && data.events.length > 0) {
            setTimelineEvents(data.events);
          }
        }
      } catch (error) {
        console.error('Failed to fetch timeline:', error);
        // Keep using static data as fallback
      }
    }
    fetchTimeline();
  }, []);

  const handlePortugalClick = useCallback(() => {
    setCurrentView('portugal');
  }, []);

  const handleCiscoClick = useCallback(() => {
    setCurrentView('main');
  }, []);

  const handleBackToEurope = useCallback(() => {
    setCurrentView('europe');
  }, []);

  const handleBackToPortugal = useCallback(() => {
    setCurrentView('portugal');
  }, []);

  const tabs = [
    { id: 'timeline' as TabState, label: 'Timeline', icon: Clock },
    { id: 'members' as TabState, label: 'Team', icon: Users },
    { id: 'albums' as TabState, label: 'Albums', icon: ImageIcon },
  ];

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Cisco logo - clickable to go back to landing, hidden on main content */}
      {currentView !== 'main' && !showIntro && (
        <motion.button
          onClick={handleBackToEurope}
          className="fixed top-4 right-4 z-[200] cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Back to landing page"
        >
          <img src="/images/cisco-logo.png" alt="Cisco" className="w-20 sm:w-24 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      )}

      <AnimatePresence>
        {showIntro && currentView === 'europe' && (
          <motion.div
            key="movie-intro"
            className="fixed inset-0 z-[300] overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-black" />

            <motion.div
              className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-500/25 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <motion.p
                className="text-blue-200/90 text-sm sm:text-base tracking-[0.25em] uppercase"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Capstone Story
              </motion.p>

              <motion.div
                className="mt-4 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs sm:text-sm text-blue-100/95"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
              >
                September 2025 • Graduate Program Begins
              </motion.div>

              <motion.h1
                className="mt-4 max-w-4xl text-white text-2xl sm:text-4xl md:text-5xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
              >
                {typedTitle}
                <motion.span
                  className="inline-block w-[0.08em] h-[1em] align-[-0.1em] ml-1 bg-white/90"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.h1>

              <motion.p
                className="mt-6 max-w-3xl text-blue-100/90 text-base sm:text-xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.9 }}
              >
                One team, one journey, one shared mission.
              </motion.p>

              <motion.p
                className="mt-3 max-w-3xl text-emerald-200/90 text-sm sm:text-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.6, duration: 0.9 }}
              >
                This is our timeline.
              </motion.p>

              <motion.p
                className="mt-8 text-cyan-200/90 text-xs sm:text-sm tracking-[0.2em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 9.5, duration: 0.8 }}
              >
                Preparing map...
              </motion.p>

              <motion.button
                onClick={() => setShowIntro(false)}
                className="mt-10 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm sm:text-base transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.6, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Skip Intro
              </motion.button>

              <motion.p
                className="mt-3 text-white/65 text-[11px] sm:text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5.2, duration: 0.7 }}
              >
                Press Space or Enter to skip
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950"
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
                className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 text-sm sm:text-base"
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold hidden sm:inline">Back to Map</span>
              </motion.button>
            </motion.div>

            {/* Tab navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50"
            >
              <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-white/10 backdrop-blur-lg rounded-full shadow-lg border border-white/20">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setCurrentTab(tab.id)}
                      className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 ${
                        currentTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-md shadow-blue-500/30'
                          : 'text-blue-200 hover:bg-white/10'
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
                  <Timeline events={timelineEvents} />
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
