import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { useLesson } from '../contexts/LessonContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMail, FiCalendar, FiTrendingUp, FiTarget, FiAward, FiSettings, FiEdit3 } = FiIcons;

const Profile = () => {
  const { user, updateUser } = useUser();
  const { lessons, lessonProgress } = useLesson();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleSaveProfile = () => {
    updateUser(editForm);
    setIsEditing(false);
  };

  const getCompletedLessons = () => {
    return lessons.filter(lesson => lessonProgress[lesson.id]?.completed).length;
  };

  const getProgressPercentage = () => {
    return Math.round((getCompletedLessons() / lessons.length) * 100);
  };

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      unlocked: getCompletedLessons() >= 1,
      progress: Math.min(getCompletedLessons(), 1)
    },
    {
      id: 2,
      title: "Streak Master",
      description: "Maintain a 7-day streak",
      icon: "🔥",
      unlocked: (user?.streak || 0) >= 7,
      progress: Math.min((user?.streak || 0), 7)
    },
    {
      id: 3,
      title: "XP Collector",
      description: "Earn 500 XP",
      icon: "⚡",
      unlocked: (user?.xp || 0) >= 500,
      progress: Math.min((user?.xp || 0), 500)
    },
    {
      id: 4,
      title: "Level Up",
      description: "Reach level 5",
      icon: "🏆",
      unlocked: (user?.level || 0) >= 5,
      progress: Math.min((user?.level || 0), 5)
    }
  ];

  const stats = [
    { label: 'Total XP', value: user?.xp || 0, icon: FiTrendingUp },
    { label: 'Current Level', value: user?.level || 1, icon: FiTarget },
    { label: 'Lessons Completed', value: getCompletedLessons(), icon: FiAward },
    { label: 'Current Streak', value: user?.streak || 0, icon: FiTrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full border-4 border-purple-200"
                />
                <div className="absolute -bottom-2 -right-2 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {user?.level}
                </div>
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="text-2xl font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full"
                      placeholder="Your name"
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="text-gray-600 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full"
                      placeholder="Your email"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                    <p className="text-gray-600 mb-2">{user?.email}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                        <span>Joined {new Date(user?.joinedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiTarget} className="w-4 h-4" />
                        <span>{getProgressPercentage()}% Complete</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Learning Progress</span>
              <span className="text-sm text-gray-500">{getCompletedLessons()} / {lessons.length} lessons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="lesson-progress h-3"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Subscription Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Subscription:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user?.subscription === 'premium' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : user?.subscription === 'pro'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {user?.subscription || 'Free'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center"
            >
              <SafeIcon icon={stat.icon} className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-6 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      achievement.unlocked ? 'text-green-800' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    
                    {!achievement.unlocked && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-400 h-2 rounded-full transition-all"
                          style={{ 
                            width: `${(achievement.progress / (achievement.id === 2 ? 7 : achievement.id === 3 ? 500 : achievement.id === 4 ? 5 : 1)) * 100}%` 
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                  
                  {achievement.unlocked && (
                    <div className="text-green-500">
                      <SafeIcon icon={FiAward} className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;