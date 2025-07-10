import React, { createContext, useContext, useState } from 'react';

const LessonContext = createContext();

export const useLesson = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLesson must be used within a LessonProvider');
  }
  return context;
};

export const LessonProvider = ({ children }) => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonProgress, setLessonProgress] = useState({});

  const lessons = [
    {
      id: 1,
      title: "Basic Greetings",
      language: "spanish",
      difficulty: "beginner",
      xp: 20,
      exercises: [
        {
          id: 1,
          type: "translation",
          question: "How do you say 'Hello' in Spanish?",
          options: ["Hola", "Adiós", "Gracias", "Por favor"],
          correct: 0,
          explanation: "Hola is the most common way to say hello in Spanish."
        },
        {
          id: 2,
          type: "audio",
          question: "Listen and select the correct translation",
          audio: "Buenos días",
          options: ["Good morning", "Good night", "Good afternoon", "Goodbye"],
          correct: 0,
          explanation: "Buenos días means 'Good morning' in Spanish."
        },
        {
          id: 3,
          type: "speaking",
          question: "Say 'Nice to meet you' in Spanish",
          expectedAnswer: "Mucho gusto",
          hints: ["Think about expressing pleasure", "It's a formal greeting"]
        }
      ]
    },
    {
      id: 2,
      title: "Numbers 1-10",
      language: "spanish",
      difficulty: "beginner",
      xp: 25,
      exercises: [
        {
          id: 1,
          type: "translation",
          question: "What is 'cinco' in English?",
          options: ["Four", "Five", "Six", "Seven"],
          correct: 1,
          explanation: "Cinco means 'five' in Spanish."
        },
        {
          id: 2,
          type: "matching",
          question: "Match the Spanish numbers with their English equivalents",
          pairs: [
            { spanish: "uno", english: "one" },
            { spanish: "dos", english: "two" },
            { spanish: "tres", english: "three" },
            { spanish: "cuatro", english: "four" }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Family Members",
      language: "spanish",
      difficulty: "beginner",
      xp: 30,
      exercises: [
        {
          id: 1,
          type: "translation",
          question: "How do you say 'mother' in Spanish?",
          options: ["Padre", "Madre", "Hermana", "Abuela"],
          correct: 1,
          explanation: "Madre means 'mother' in Spanish."
        }
      ]
    }
  ];

  const startLesson = (lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    setCurrentLesson(lesson);
  };

  const completeExercise = (lessonId, exerciseId, isCorrect) => {
    setLessonProgress(prev => ({
      ...prev,
      [`${lessonId}-${exerciseId}`]: {
        completed: true,
        correct: isCorrect,
        timestamp: new Date().toISOString()
      }
    }));
  };

  const completeLesson = (lessonId) => {
    setLessonProgress(prev => ({
      ...prev,
      [lessonId]: {
        completed: true,
        completedAt: new Date().toISOString()
      }
    }));
  };

  const value = {
    lessons,
    currentLesson,
    lessonProgress,
    startLesson,
    completeExercise,
    completeLesson
  };

  return (
    <LessonContext.Provider value={value}>
      {children}
    </LessonContext.Provider>
  );
};