import React, { useState, useEffect } from 'react';
import Navbar from '../../pages/Navbar/Navbar';
import { Outlet } from 'react-router';

const MainLayouts = () => {
  // Load saved theme or default to 'mylight'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'mylight';
  });

  // Apply theme to <html> and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    // Use DaisyUI classes for background and text colors to follow theme
    <div className="min-h-screen bg-base-100 text-primary-content transition-colors duration-300">
      {/* Pass theme toggle state to Navbar */}
      <Navbar theme={theme} setTheme={setTheme} />
      <Outlet />
    </div>
  );
};

export default MainLayouts;
