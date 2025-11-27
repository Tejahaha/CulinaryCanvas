import React, { createContext, useState, useEffect } from 'react';

// Create a context for theme management
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Detect system's default theme
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Check if theme preference exists in localStorage, otherwise use system theme
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || getSystemTheme();
  });

  // Update theme in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);

    // Apply theme class to the document root element
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    } else {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    }
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;