import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiBook, FiUser, FiMic, FiCreditCard, FiLogOut, FiZap, FiFlame } = FiIcons;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/voice-chat', icon: FiMic, label: 'AI Tutor' },
    { path: '/pricing', icon: FiCreditCard, label: 'Pricing' },
    { path: '/profile', icon: FiUser, label: 'Profile' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiZap} className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">LinguaForge</span>
          </Link>

          <div className="flex items-center space-x-6">
            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <SafeIcon icon={FiFlame} className="w-4 h-4 streak-fire" />
                  <span className="font-medium">{user.streak}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <SafeIcon icon={FiZap} className="w-4 h-4 xp-glow" />
                  <span className="font-medium">{user.xp} XP</span>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {user && (
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;