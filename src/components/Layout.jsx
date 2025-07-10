import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useUser } from '../contexts/UserContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useUser();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen">
      {(user || !isHomePage) && <Navbar />}
      <main className={user || !isHomePage ? 'pt-16' : ''}>
        {children}
      </main>
    </div>
  );
};

export default Layout;