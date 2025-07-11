import React, { createContext, useContext, useState, useRef } from 'react';
import aiService from '../services/aiService';

const VoiceContext = createContext();

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};

export const VoiceProvider = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState(null);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'es-ES';
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognitionRef.current.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      processVoiceInput(result);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'no-speech') {
        addMessage('ai', "I didn't hear anything. Please try speaking again.");
      } else if (event.error === 'audio-capture') {
        addMessage('ai', "Please check your microphone permissions and try again.");
      } else {
        addMessage('ai', "Sorry, there was an error with speech recognition. Please try again.");
      }
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const speak = (text, lang = 'en-US') => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const addMessage = (sender, text, analysis = null) => {
    const message = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date().toISOString(),
      analysis
    };
    setMessages(prev => [...prev, message]);
    return message;
  };

  const processVoiceInput = async (input) => {
    // Add user message
    addMessage('user', input);
    
    setIsAnalyzing(true);
    
    try {
      // Get AI response with analysis
      const response = await aiService.generateResponse(input);
      
      // Add AI response with analysis
      const aiMessage = addMessage('ai', response.message, response);
      
      // Save analysis for display
      setLastAnalysis(response);
      
      // Speak the response
      speak(response.message, 'en-US');
      
    } catch (error) {
      console.error('Error processing voice input:', error);
      addMessage('ai', "Sorry, I'm having trouble understanding right now. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setLastAnalysis(null);
  };

  const value = {
    isListening,
    isSpeaking,
    transcript,
    messages,
    isAnalyzing,
    lastAnalysis,
    startListening,
    stopListening,
    speak,
    clearMessages,
    addMessage
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
};