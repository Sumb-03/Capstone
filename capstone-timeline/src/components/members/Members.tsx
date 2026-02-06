'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import {
  MapPin,
  Mail,
  Linkedin,
  Github,
  User,
  Briefcase,
  X,
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  city: string;
  bio: string;
  avatar?: string;
  skills: string[];
  linkedin?: string;
  github?: string;
  email?: string;
}

export default function Members() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  // Fetch team members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/team');
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        setMembers(data.members || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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

  const groupedByCity = members.reduce((acc, member) => {
    if (!acc[member.city]) {
      acc[member.city] = [];
    }
    acc[member.city].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  return (
    <div className="w-full min-h-[calc(100vh-200px)] px-3 sm:px-4 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading team members...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && members.length === 0 && (
          <div className="text-center py-20">
            <User className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">No team members yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Add team members by creating folders in /public/team/
            </p>
          </div>
        )}

        {/* Main content - only show when loaded and has members */}
        {!loading && !error && members.length > 0 && (
          <>
            {/* Header */}
            <motion.div
              className="text-center mb-6 sm:mb-8 md:mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
                Meet Our Team
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                Talented individuals from across Portugal, working together to build amazing things.
              </p>
            </motion.div>

            {/* Team stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              {members.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Team Members</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              {Object.keys(groupedByCity).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Cities</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">
              {new Set(members.flatMap(m => m.skills)).size}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Skills</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
              100%
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Dedication</div>
          </div>
        </motion.div>

        {/* Members grid by city */}
        {Object.entries(groupedByCity).map(([city, cityMembers], cityIndex) => (
          <div key={city} className="mb-6 sm:mb-8 md:mb-12">
            <motion.div
              className="flex items-center gap-2 mb-4 sm:mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: cityIndex * 0.1 }}
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                {city}
              </h3>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                ({cityMembers.length} member{cityMembers.length > 1 ? 's' : ''})
              </span>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {cityMembers.map((member) => (
                <motion.div
                  key={member.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMember(member)}
                  className="cursor-pointer"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
                    {/* Avatar */}
                    <div className="relative h-40 sm:h-48 bg-gradient-to-br from-purple-500 to-pink-500">
                      {member.avatar && !imageError[member.id] ? (
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover"
                          onError={() => setImageError(prev => ({ ...prev, [member.id]: true }))}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <User className="w-16 h-16 sm:w-20 sm:h-20 text-white/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Name overlay on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <h4 className="text-lg sm:text-xl font-bold text-white">{member.name}</h4>
                        <div className="flex items-center gap-1 text-white/80 text-xs sm:text-sm">
                          <Briefcase className="w-3 h-3" />
                          {member.role}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 sm:p-4">
                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {member.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Social links */}
                      <div className="flex items-center gap-2">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
          </>
        )}
      </div>

      {/* Member detail modal */}
      {selectedMember && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedMember(null)}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Avatar */}
            <div className="relative h-64 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
              {selectedMember.avatar && !imageError[selectedMember.id] ? (
                <Image
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="w-32 h-32 text-white/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 -mt-16 relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {selectedMember.name}
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                  {selectedMember.role}
                </p>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  {selectedMember.city}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedMember.bio}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-3">
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  {selectedMember.github && (
                    <a
                      href={selectedMember.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {selectedMember.email && (
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
