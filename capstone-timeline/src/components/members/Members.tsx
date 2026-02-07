'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import {
  MapPin,
  Mail,
  Linkedin,
  User,
  Briefcase,
  X,
  Heart,
  Lightbulb,
  Sparkles,
  GraduationCap,
  Quote,
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
  email?: string;
  hobbies?: string[];
  interests?: string[];
  funFact?: string;
  education?: string;
  quote?: string;
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
            <Loader2 className="w-8 h-8 animate-spin text-blue-400 mb-4" />
            <p className="text-blue-200/60">Loading team members...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && members.length === 0 && (
          <div className="text-center py-20">
            <User className="w-16 h-16 mx-auto text-blue-300/30 mb-4" />
            <p className="text-blue-200/60 mb-2">No team members yet</p>
            <p className="text-sm text-blue-200/40">
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
                Meet Our Team
              </h2>
              <p className="text-sm sm:text-base text-blue-200/60 max-w-2xl mx-auto px-4">
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
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center shadow-lg border border-white/10">
            <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              {members.length}
            </div>
            <div className="text-xs sm:text-sm text-blue-200/60">Team Members</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center shadow-lg border border-white/10">
            <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              {Object.keys(groupedByCity).length}
            </div>
            <div className="text-xs sm:text-sm text-blue-200/60">Cities</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center shadow-lg border border-white/10">
            <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              {new Set(members.flatMap(m => m.skills)).size}
            </div>
            <div className="text-xs sm:text-sm text-blue-200/60">Skills</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center shadow-lg border border-white/10">
            <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              100%
            </div>
            <div className="text-xs sm:text-sm text-blue-200/60">Dedication</div>
          </div>
        </motion.div>

        {/* Members grid - all together */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {members.map((member) => (
                <motion.div
                  key={member.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMember(member)}
                  className="cursor-pointer"
                >
                  <div className="bg-slate-800/60 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-white/10 hover:shadow-2xl hover:border-white/20 transition-all duration-300">
                    {/* Avatar */}
                    <div className="relative h-40 sm:h-48 bg-gradient-to-br from-blue-500 to-emerald-500">
                      {member.avatar && !imageError[member.id] ? (
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          unoptimized
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
                      {/* City */}
                      <div className="flex items-center gap-1 text-blue-300/70 text-xs mb-2">
                        <MapPin className="w-3 h-3" />
                        {member.city}
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {member.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/20"
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
                            className="p-2 rounded-full bg-white/10 text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full bg-white/10 text-emerald-300 hover:bg-emerald-500/30 hover:text-emerald-200 transition-colors"
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
            className="bg-slate-800/60 backdrop-blur-md rounded-3xl shadow-2xl max-w-7xl w-full border border-white/10 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content - No separate avatar section */}
            <div className="p-4 md:p-5 relative">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4">
                {/* Avatar - Smaller inline */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 via-emerald-500 to-cyan-500">
                    {selectedMember.avatar && !imageError[selectedMember.id] ? (
                      <Image
                        src={selectedMember.avatar}
                        alt={selectedMember.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <User className="w-20 h-20 text-white/50" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Header Info - Compact */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {selectedMember.name}
                  </h3>
                  <p className="text-emerald-400 font-medium text-sm md:text-base mb-1">
                    {selectedMember.role}
                  </p>
                  <div className="flex items-center gap-1 text-blue-300/70 text-xs md:text-sm mb-2">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                    {selectedMember.city}
                  </div>
                  <p className="text-blue-100/70 text-xs md:text-sm line-clamp-3">
                    {selectedMember.bio}
                  </p>
                </div>
              </div>

              {/* Three Column Layout for Info Sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    {/* Skills */}
                    <div>
                      <h4 className="text-xs font-semibold text-blue-200/80 mb-1.5 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedMember.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    {selectedMember.education && (
                      <div>
                        <h4 className="text-xs font-semibold text-blue-200/80 mb-1.5 flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5" />
                          Education
                        </h4>
                        <p className="text-blue-100/70 text-xs">
                          {selectedMember.education}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    {/* Hobbies */}
                    {selectedMember.hobbies && selectedMember.hobbies.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-blue-200/80 mb-1.5 flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5" />
                          Hobbies
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedMember.hobbies.map((hobby) => (
                            <span
                              key={hobby}
                              className="px-2 py-0.5 text-xs rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/20"
                            >
                              {hobby}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interests */}
                    {selectedMember.interests && selectedMember.interests.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-blue-200/80 mb-1.5 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5" />
                          Interests
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedMember.interests.map((interest) => (
                            <span
                              key={interest}
                              className="px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/20"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-4">
                    {/* Fun Fact */}
                    {selectedMember.funFact && (
                      <div>
                        <h4 className="text-xs font-semibold text-blue-200/80 mb-1.5 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Fun Fact
                        </h4>
                        <p className="text-blue-100/70 text-xs italic">
                          &quot;{selectedMember.funFact}&quot;
                        </p>
                      </div>
                    )}

                    {/* Personal Quote */}
                    {selectedMember.quote && (
                      <div className="p-3 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-xl border border-blue-400/20">
                        <div className="flex items-start gap-2">
                          <Quote className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <p className="text-blue-100/90 text-xs italic leading-relaxed">
                            &quot;{selectedMember.quote}&quot;
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social links */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors text-xs"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                  )}
                  {selectedMember.email && (
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors text-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email
                    </a>
                  )}
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
