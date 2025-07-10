import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLesson } from '../contexts/LessonContext';
import { useUser } from '../contexts/UserContext';
import { useVoice } from '../contexts/VoiceContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX, FiMic, FiMicOff, FiVolume2, FiArrowRight, FiHome } = FiIcons;

const Lesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { lessons, startLesson, completeExercise, completeLesson } = useLesson();
  const { addXP } = useUser();
  const { isListening, startListening, stopListening, speak } = useVoice();

  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const lesson = lessons.find(l => l.id === parseInt(lessonId));

  useEffect(() => {
    if (lesson) {
      startLesson(lesson.id);
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const exercise = lesson.exercises[currentExercise];

  const handleAnswer = (answerIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === exercise.correct;
    setIsCorrect(correct);
    setShowResult(true);
    
    completeExercise(lesson.id, exercise.id, correct);
    
    if (correct) {
      addXP(5);
    }
  };

  const handleNext = () => {
    if (currentExercise < lesson.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    } else {
      // Lesson completed
      completeLesson(lesson.id);
      addXP(lesson.xp);
      setLessonCompleted(true);
    }
  };

  const handleSpeakQuestion = () => {
    if (exercise.type === 'audio') {
      speak(exercise.audio, 'es-ES');
    } else {
      speak(exercise.question, 'en-US');
    }
  };

  const renderExercise = () => {
    switch (exercise.type) {
      case 'translation':
      case 'audio':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {exercise.question}
              </h2>
              {exercise.type === 'audio' && (
                <button
                  onClick={handleSpeakQuestion}
                  className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <SafeIcon icon={FiVolume2} className="w-6 h-6" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exercise.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(index)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedAnswer === index
                      ? isCorrect
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                  disabled={showResult}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showResult && selectedAnswer === index && (
                      <SafeIcon
                        icon={isCorrect ? FiCheck : FiX}
                        className={`w-6 h-6 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 'speaking':
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {exercise.question}
            </h2>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-600 mb-4">Expected: {exercise.expectedAnswer}</p>
              <div className="space-y-4">
                {exercise.hints.map((hint, index) => (
                  <p key={index} className="text-sm text-gray-500">💡 {hint}</p>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-6 rounded-full transition-all ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 pulse-animation'
                    : 'bg-purple-500 hover:bg-purple-600'
                } text-white`}
              >
                <SafeIcon icon={isListening ? FiMicOff : FiMic} className="w-8 h-8" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600">
              {isListening ? 'Listening... Speak now!' : 'Tap the microphone to start speaking'}
            </p>

            <button
              onClick={() => {
                setShowResult(true);
                setIsCorrect(true);
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              I said it correctly
            </button>
          </div>
        );

      default:
        return <div>Exercise type not supported</div>;
    }
  };

  if (lessonCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-8 text-center max-w-md mx-4"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lesson Complete!
          </h2>
          <p className="text-gray-600 mb-6">
            You earned {lesson.xp} XP and completed "{lesson.title}"
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Continue Learning
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SafeIcon icon={FiHome} className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-400">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white">
              {currentExercise + 1} of {lesson.exercises.length}
            </span>
            <span className="text-sm text-white">{lesson.title}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentExercise + 1) / lesson.exercises.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Exercise Card */}
        <motion.div
          key={currentExercise}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white rounded-xl shadow-lg p-8 min-h-[400px] flex flex-col justify-between"
        >
          <div className="flex-1">
            {renderExercise()}
          </div>

          {/* Result and Next Button */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <div className={`p-4 rounded-lg mb-4 ${
                  isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <SafeIcon
                      icon={isCorrect ? FiCheck : FiX}
                      className={`w-5 h-5 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
                    />
                    <span className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? 'Correct!' : 'Not quite right'}
                    </span>
                  </div>
                  {exercise.explanation && (
                    <p className="text-sm text-gray-700">{exercise.explanation}</p>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>
                    {currentExercise < lesson.exercises.length - 1 ? 'Next' : 'Complete Lesson'}
                  </span>
                  <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Lesson;