import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const savedUser = localStorage.getItem('linguaforge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
      streak: 0,
      xp: 0,
      level: 1,
      languages: [],
      subscription: 'free',
      joinedAt: new Date().toISOString(),
      ...userData
    };
    setUser(newUser);
    localStorage.setItem('linguaforge_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('linguaforge_user');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('linguaforge_user', JSON.stringify(updatedUser));
  };

  const addXP = (amount) => {
    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    updateUser({ xp: newXP, level: newLevel });
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastActive = user.lastActive ? new Date(user.lastActive).toDateString() : null;
    
    if (lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toDateString();
      
      if (lastActive === yesterdayString) {
        updateUser({ streak: user.streak + 1, lastActive: new Date().toISOString() });
      } else {
        updateUser({ streak: 1, lastActive: new Date().toISOString() });
      }
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    addXP,
    updateStreak
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};