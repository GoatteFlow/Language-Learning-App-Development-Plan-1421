import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoice } from '../contexts/VoiceContext';
import { useUser } from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMic, FiMicOff, FiTrash2, FiUser, FiBot, FiVolume2 } = FiIcons;

const VoiceChat = () => {
  const { isListening, isSpeaking, messages, startListening, stopListening, clearMessages, speak } = useVoice();
  const { user, addXP } = useUser();
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }
  }, [messages]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      addXP(2); // Reward for practicing
    }
  };

  const conversationStarters = [
    "¡Hola! ¿Cómo estás?",
    "¿Cuál es tu nombre?",
    "¿De dónde eres?",
    "¿Qué te gusta hacer?",
    "¿Hablas español bien?"
  ];

  const handleStarterClick = (starter) => {
    speak(starter, 'es-ES');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">AI Language Tutor</h1>
                <p className="text-purple-100">Practice Spanish conversation with AI</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {isSpeaking && (
                    <div className="flex items-center space-x-1">
                      <div className="voice-wave"></div>
                      <div className="voice-wave"></div>
                      <div className="voice-wave"></div>
                      <div className="voice-wave"></div>
                      <div className="voice-wave"></div>
                    </div>
                  )}
                </div>
                <button
                  onClick={clearMessages}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <SafeIcon icon={FiTrash2} className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Ready to practice Spanish?
                </h3>
                <p className="text-gray-600 mb-6">
                  Start a conversation with our AI tutor. Click the microphone and speak in Spanish!
                </p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Try these conversation starters:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {conversationStarters.map((starter, index) => (
                      <button
                        key={index}
                        onClick={() => handleStarterClick(starter)}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                      >
                        {starter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-xs ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`p-2 rounded-full ${
                        message.sender === 'user' 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        <SafeIcon icon={message.sender === 'user' ? FiUser : FiBot} className="w-4 h-4" />
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        {message.sender === 'ai' && (
                          <button
                            onClick={() => speak(message.text, 'en-US')}
                            className="mt-1 p-1 opacity-70 hover:opacity-100 transition-opacity"
                          >
                            <SafeIcon icon={FiVolume2} className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="p-2 rounded-full bg-gray-200 text-gray-700">
                        <SafeIcon icon={FiBot} className="w-4 h-4" />
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100">
                        <div className="flex space-x-1">
                          <div className="typing-indicator"></div>
                          <div className="typing-indicator"></div>
                          <div className="typing-indicator"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Control */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVoiceToggle}
                  className={`p-6 rounded-full transition-all shadow-lg ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 pulse-animation'
                      : 'bg-purple-500 hover:bg-purple-600'
                  } text-white`}
                >
                  <SafeIcon icon={isListening ? FiMicOff : FiMic} className="w-8 h-8" />
                </motion.button>
                <p className="text-sm text-gray-600 mt-2">
                  {isListening ? 'Listening... Speak now!' : 'Tap to speak'}
                </p>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                💡 Tip: Speak clearly in Spanish. The AI will respond in English to help you learn!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Practice Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Practice Tips</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-medium text-gray-800">Be Specific</h4>
              <p className="text-sm text-gray-600">Ask about grammar, vocabulary, or pronunciation</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">🔄</div>
              <h4 className="font-medium text-gray-800">Practice Regularly</h4>
              <p className="text-sm text-gray-600">Daily practice improves fluency faster</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">💪</div>
              <h4 className="font-medium text-gray-800">Stay Consistent</h4>
              <p className="text-sm text-gray-600">Even 10 minutes daily makes a difference</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceChat;