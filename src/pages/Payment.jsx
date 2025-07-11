import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import paymentService from '../services/paymentService';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiLoader, FiCreditCard, FiShield, FiArrowLeft } = FiIcons;

const Payment = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans = {
    pro: {
      name: 'Pro',
      price: 8.99,
      originalPrice: 10.49,
      features: [
        'Unlimited lessons',
        'AI Voice Tutor access',
        'Advanced analytics',
        'Priority support',
        'Offline lesson downloads',
        'Custom learning paths'
      ]
    },
    premium: {
      name: 'Premium',
      price: 12.99,
      originalPrice: 15.29,
      features: [
        'Everything in Pro',
        '1-on-1 tutoring sessions',
        'Advanced conversation practice',
        'Personalized curriculum',
        'Certificate of completion',
        'Multiple language access',
        'Family sharing (up to 4 users)'
      ]
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const result = await paymentService.simulatePayment(selectedPlan);
      
      if (result.success) {
        // Update user subscription
        updateUser({
          subscription: selectedPlan,
          subscriptionId: result.transactionId,
          subscriptionStart: new Date().toISOString()
        });
        
        setPaymentSuccess(true);
        
        // Redirect to dashboard after success
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-8 text-center max-w-md mx-4"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Welcome to LinguaForge {plans[selectedPlan].name}! Your subscription is now active.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              You've saved ${(plans[selectedPlan].originalPrice - plans[selectedPlan].price).toFixed(2)} per month compared to other platforms!
            </p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <SafeIcon icon={FiLoader} className="w-6 h-6 text-purple-500" />
          </motion.div>
          <p className="text-sm text-gray-600 mt-2">
            Redirecting to dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/pricing')}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-4"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            <span>Back to Pricing</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
          <p className="text-gray-600 mt-2">
            Join thousands of learners mastering languages with LinguaForge
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Selection */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Plan</h2>
              <div className="space-y-4">
                {Object.entries(plans).map(([key, plan]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPlan === key
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedPlan(key)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">${plan.price}</span>
                          <span className="text-sm text-gray-500">/month</span>
                          <span className="text-sm text-gray-400 line-through">${plan.originalPrice}</span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan === key
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedPlan === key && (
                          <SafeIcon icon={FiCheck} className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <SafeIcon icon={FiShield} className="inline w-5 h-5 mr-2" />
                Secure Payment
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>
            
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">LinguaForge {plans[selectedPlan].name}</span>
                <span className="font-medium">${plans[selectedPlan].price}/month</span>
              </div>
              <div className="flex justify-between items-center text-sm text-green-600">
                <span>Savings vs. competitors</span>
                <span>-${(plans[selectedPlan].originalPrice - plans[selectedPlan].price).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>${plans[selectedPlan].price}/month</span>
              </div>
            </div>

            {/* Demo Payment Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isProcessing}
                  />
                  <SafeIcon icon={FiCreditCard} className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="12/25"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isProcessing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isProcessing}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isProcessing}
                />
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full mt-6 py-4 rounded-lg font-semibold transition-all ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
              } text-white`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                `Subscribe to ${plans[selectedPlan].name} - $${plans[selectedPlan].price}/month`
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
              You can cancel your subscription at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;