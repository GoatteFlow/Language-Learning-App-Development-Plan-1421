import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiMic, FiTrendingUp, FiGlobe, FiStar, FiCheck } = FiIcons;

const Home = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      login(formData);
      navigate('/dashboard');
    }
  };

  const features = [
    {
      icon: FiMic,
      title: "AI Voice Tutor",
      description: "Practice with our advanced AI tutor using voice recognition"
    },
    {
      icon: FiTrendingUp,
      title: "Adaptive Learning",
      description: "Personalized lessons that adapt to your learning pace"
    },
    {
      icon: FiGlobe,
      title: "15+ Languages",
      description: "Learn Spanish, French, German, Italian, and many more"
    },
    {
      icon: FiStar,
      title: "Gamified Experience",
      description: "Earn XP, maintain streaks, and unlock achievements"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      features: ["5 lessons per day", "Basic exercises", "Community support"],
      popular: false
    },
    {
      name: "Pro",
      price: "$8.99",
      originalPrice: "$10.49",
      features: ["Unlimited lessons", "AI Voice Tutor", "Advanced analytics", "Priority support"],
      popular: true
    },
    {
      name: "Premium",
      price: "$12.99",
      originalPrice: "$15.29",
      features: ["Everything in Pro", "1-on-1 tutoring", "Custom learning paths", "Offline mode"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center space-x-3 mb-8"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <SafeIcon icon={FiZap} className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white">LinguaForge</h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              Master languages faster with AI-powered tutoring at 15% less cost than traditional apps
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={() => setShowLoginForm(true)}
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Learning Free
              </button>
              <button className="text-white border-2 border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose LinguaForge?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of language learning with cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Save 15% compared to other language learning platforms
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-8 rounded-xl ${
                  plan.popular
                    ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
                    : 'bg-white text-gray-900'
                } shadow-lg`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm opacity-75">/month</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm opacity-75 line-through">
                      {plan.originalPrice}/month
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <SafeIcon
                        icon={FiCheck}
                        className={`w-5 h-5 ${
                          plan.popular ? 'text-white' : 'text-green-500'
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-xl max-w-md w-full mx-4"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Started</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Start Learning
                </button>
                <button
                  type="button"
                  onClick={() => setShowLoginForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;