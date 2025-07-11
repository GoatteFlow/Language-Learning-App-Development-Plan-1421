import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiStar, FiZap, FiMic, FiTrendingUp, FiUsers, FiHeadphones, FiDownload } = FiIcons;

const Pricing = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '5 lessons per day',
        'Basic exercises',
        'Community support',
        'Mobile app access',
        'Basic progress tracking'
      ],
      icon: FiStar,
      color: 'gray',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$8.99',
      originalPrice: '$10.49',
      period: 'per month',
      description: 'Most popular choice for serious learners',
      features: [
        'Unlimited lessons',
        'AI Voice Tutor access',
        'Advanced analytics',
        'Priority support',
        'Offline lesson downloads',
        'Custom learning paths',
        'Progress insights'
      ],
      icon: FiZap,
      color: 'purple',
      popular: true,
      savings: '15% off'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$12.99',
      originalPrice: '$15.29',
      period: 'per month',
      description: 'Complete language mastery experience',
      features: [
        'Everything in Pro',
        '1-on-1 tutoring sessions',
        'Advanced conversation practice',
        'Personalized curriculum',
        'Certificate of completion',
        'Multiple language access',
        'Family sharing (up to 4 users)',
        'Premium support'
      ],
      icon: FiTrendingUp,
      color: 'indigo',
      popular: false,
      savings: '15% off'
    }
  ];

  const handleSubscribe = (planId) => {
    if (planId === 'free') {
      updateUser({ subscription: planId });
      alert('You are now on the Free plan!');
    } else {
      // Navigate to payment page
      navigate('/payment', { state: { selectedPlan: planId } });
    }
  };

  const comparisonFeatures = [
    { name: 'Daily Lessons', free: '5', pro: 'Unlimited', premium: 'Unlimited' },
    { name: 'AI Voice Tutor', free: '❌', pro: '✅', premium: '✅' },
    { name: 'Offline Access', free: '❌', pro: '✅', premium: '✅' },
    { name: '1-on-1 Tutoring', free: '❌', pro: '❌', premium: '✅' },
    { name: 'Multiple Languages', free: '1', pro: '3', premium: 'All' },
    { name: 'Family Sharing', free: '❌', pro: '❌', premium: '✅' },
    { name: 'Certificate', free: '❌', pro: '❌', premium: '✅' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Journey
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Save 15% compared to other language learning platforms
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <SafeIcon icon={FiCheck} className="w-4 h-4" />
            <span className="text-sm font-medium">30-day money-back guarantee</span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl shadow-lg overflow-hidden ${
                plan.popular
                  ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-yellow-400 text-yellow-900 text-center py-2 text-sm font-semibold">
                  Most Popular - {plan.savings}
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    plan.popular
                      ? 'bg-white/20'
                      : plan.color === 'gray'
                      ? 'bg-gray-100'
                      : 'bg-purple-100'
                  }`}>
                    <SafeIcon
                      icon={plan.icon}
                      className={`w-8 h-8 ${
                        plan.popular
                          ? 'text-white'
                          : plan.color === 'gray'
                          ? 'text-gray-600'
                          : 'text-purple-600'
                      }`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  </div>
                  {plan.originalPrice && (
                    <div className={`text-sm line-through ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>
                      {plan.originalPrice} {plan.period}
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <SafeIcon
                        icon={FiCheck}
                        className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-green-500'}`}
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={user?.subscription === plan.id}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    user?.subscription === plan.id
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {user?.subscription === plan.id
                    ? 'Current Plan'
                    : plan.id === 'free'
                    ? 'Get Started'
                    : 'Subscribe Now'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-16"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Free</th>
                    <th className="text-center py-3 px-4 font-semibold text-purple-600">Pro</th>
                    <th className="text-center py-3 px-4 font-semibold text-indigo-600">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{feature.name}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{feature.free}</td>
                      <td className="py-3 px-4 text-center text-purple-600">{feature.pro}</td>
                      <td className="py-3 px-4 text-center text-indigo-600">{feature.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Why Choose LinguaForge?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FiMic, title: 'AI Voice Tutor', desc: 'Practice with advanced AI' },
              { icon: FiDownload, title: 'Offline Learning', desc: 'Learn anywhere, anytime' },
              { icon: FiUsers, title: 'Expert Support', desc: '24/7 learning assistance' },
              { icon: FiHeadphones, title: 'Native Audio', desc: 'Perfect pronunciation' }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <SafeIcon icon={benefit.icon} className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;