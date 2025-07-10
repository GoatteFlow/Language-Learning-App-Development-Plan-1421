import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserProvider } from './contexts/UserContext';
import { LessonProvider } from './contexts/LessonContext';
import { VoiceProvider } from './contexts/VoiceContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import VoiceChat from './pages/VoiceChat';
import './App.css';

function App() {
  return (
    <UserProvider>
      <LessonProvider>
        <VoiceProvider>
          <Router>
            <Layout>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/lesson/:lessonId" element={<Lesson />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/voice-chat" element={<VoiceChat />} />
                </Routes>
              </AnimatePresence>
            </Layout>
          </Router>
        </VoiceProvider>
      </LessonProvider>
    </UserProvider>
  );
}

export default App;