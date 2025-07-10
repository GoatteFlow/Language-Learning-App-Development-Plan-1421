import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useLesson } from '../contexts/LessonContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiLock, FiCheck, FiTrendingUp, FiTarget, FiFlame, FiZap } = FiIcons;

const Dashboard = () => {
  const { user, updateStreak } = useUser();
  const { lessons, lessonProgress } = useLesson();

  useEffect(() => {
    if (user) {
      updateStreak();
    }
  }, []);

  const getProgressPercentage = () => {
    const completedLessons = lessons.filter(lesson => 
      lessonProgress[lesson.id]?.completed
    ).length;
    return Math.round((completedLessons / lessons.length) * 100);
  };

  const getLessonStatus = (lessonId) => {
    if (lessonProgress[lessonId]?.completed) return 'completed';
    if (lessonId === 1) return 'current';
    
    const previousLessonCompleted = lessonProgress[lessonId - 1]?.completed;
    return previousLessonCompleted ? 'current' : 'locked';
  };

  const stats = [
    { icon: FiFlame, label: 'Day Streak', value: user?.streak || 0, color: 'text-orange-500' },
    { icon: FiZap, label: 'Total XP', value: user?.xp || 0, color: 'text-blue-500' },
    { icon: FiTrendingUp, label: 'Level', value: user?.level || 1, color: 'text-purple-500' },
    { icon: FiTarget, label: 'Progress', value: `${getProgressPercentage()}%`, color: 'text-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Ready to continue your language learning journey?
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <SafeIcon icon={stat.icon} className={`w-8 h-8 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Path */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Spanish Learning Path
              </h2>
              
              <div className="learning-path space-y-8">
                {lessons.map((lesson, index) => {
                  const status = getLessonStatus(lesson.id);
                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className={`lesson-node ${status}`}>
                        {status === 'completed' && <SafeIcon icon={FiCheck} className="w-6 h-6" />}
                        {status === 'current' && <SafeIcon icon={FiPlay} className="w-6 h-6" />}
                        {status === 'locked' && <SafeIcon icon={FiLock} className="w-6 h-6" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                            <p className="text-sm text-gray-600 capitalize">
                              {lesson.difficulty} • {lesson.xp} XP
                            </p>
                          </div>
                          
                          {status !== 'locked' && (
                            <Link
                              to={`/lesson/${lesson.id}`}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                status === 'completed'
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                              }`}
                            >
                              {status === 'completed' ? 'Review' : 'Start'}
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Goal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Daily Goal
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">2/3 lessons</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="lesson-progress w-2/3 h-2"></div>
                </div>
                <p className="text-xs text-gray-500">
                  Complete 1 more lesson to reach your daily goal!
                </p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/voice-chat"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  <SafeIcon icon={FiPlay} className="w-5 h-5" />
                  <span className="font-medium">Practice with AI Tutor</span>
                </Link>
                
                <Link
                  to="/lesson/1"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <SafeIcon icon={FiTarget} className="w-5 h-5" />
                  <span className="font-medium">Continue Learning</span>
                </Link>
              </div>
            </motion.div>

            {/* Achievement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-sm p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-2">🎉 Achievement Unlocked!</h3>
              <p className="text-sm opacity-90">
                You've maintained a 3-day streak! Keep it up!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;