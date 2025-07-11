import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoice } from '../contexts/VoiceContext';
import { useUser } from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMic, FiMicOff, FiTrash2, FiUser, FiBot, FiVolume2, FiBarChart, FiAward } = FiIcons;

const VoiceChat = () => {
  const { 
    isListening, 
    isSpeaking, 
    messages, 
    isAnalyzing,
    lastAnalysis,
    startListening, 
    stopListening, 
    clearMessages, 
    speak 
  } = useVoice();
  const { user, addXP } = useUser();
  const messagesEndRef = useRef(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      addXP(2);
    }
  };

  const conversationStarters = [
    "¡Hola! ¿Cómo estás?",
    "¿Cuál es tu nombre?",
    "¿De dónde eres?",
    "¿Qué te gusta hacer?",
    "Buenos días"
  ];

  const handleStarterClick = (starter) => {
    speak(starter, 'es-ES');
  };

  const PronunciationScore = ({ score, label }) => (
    <div className="text-center">
      <div className={`text-2xl font-bold ${score >= 8 ? 'text-green-500' : score >= 6 ? 'text-yellow-500' : 'text-red-500'}`}>
        {score.toFixed(1)}
      </div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );

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
                <button
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <SafeIcon icon={FiBarChart} className="w-5 h-5" />
                </button>
                <button
                  onClick={clearMessages}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <SafeIcon icon={FiTrash2} className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Panel */}
          <AnimatePresence>
            {showAnalysis && lastAnalysis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  <SafeIcon icon={FiAward} className="inline w-5 h-5 mr-2" />
                  Latest Performance Analysis
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <PronunciationScore score={lastAnalysis.scores.pronunciation} label="Pronunciation" />
                  <PronunciationScore score={lastAnalysis.scores.grammar} label="Grammar" />
                  <PronunciationScore score={lastAnalysis.scores.fluency} label="Fluency" />
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Feedback:</strong> {lastAnalysis.feedback}
                  </p>
                  <div className="text-xs text-gray-600">
                    <strong>Suggestions:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {lastAnalysis.suggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                    <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                        <SafeIcon icon={message.sender === 'user' ? FiUser : FiBot} className="w-4 h-4" />
                      </div>
                      <div className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                        <p className="text-sm">{message.text}</p>
                        {message.sender === 'ai' && (
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => speak(message.text, 'en-US')}
                              className="p-1 opacity-70 hover:opacity-100 transition-opacity"
                            >
                              <SafeIcon icon={FiVolume2} className="w-3 h-3" />
                            </button>
                            {message.analysis && (
                              <div className="flex items-center space-x-1 text-xs">
                                <span className="text-green-600">✓</span>
                                <span>Analyzed</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isAnalyzing && (
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
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="typing-indicator"></div>
                            <div className="typing-indicator"></div>
                            <div className="typing-indicator"></div>
                          </div>
                          <span className="text-xs text-gray-600">Analyzing...</span>
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
                  disabled={isAnalyzing}
                  className={`p-6 rounded-full transition-all shadow-lg ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 pulse-animation' 
                      : isAnalyzing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-purple-500 hover:bg-purple-600'
                  } text-white`}
                >
                  <SafeIcon 
                    icon={isListening ? FiMicOff : FiMic} 
                    className="w-8 h-8" 
                  />
                </motion.button>
                <p className="text-sm text-gray-600 mt-2">
                  {isListening 
                    ? 'Listening... Speak now!' 
                    : isAnalyzing 
                    ? 'Analyzing...' 
                    : 'Tap to speak'}
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                💡 Tip: Speak clearly in Spanish. The AI will provide detailed feedback on your pronunciation and grammar!
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
              <h4 className="font-medium text-gray-800">Speak Clearly</h4>
              <p className="text-sm text-gray-600">Pronounce each word distinctly for better recognition</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">🔄</div>
              <h4 className="font-medium text-gray-800">Practice Regularly</h4>
              <p className="text-sm text-gray-600">Daily practice improves fluency faster</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">💪</div>
              <h4 className="font-medium text-gray-800">Use Feedback</h4>
              <p className="text-sm text-gray-600">Pay attention to pronunciation scores and suggestions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceChat;