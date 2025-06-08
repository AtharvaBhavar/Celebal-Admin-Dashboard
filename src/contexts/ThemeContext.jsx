
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [colorScheme, setColorScheme] = useState('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColorScheme = localStorage.getItem('colorScheme') || 'blue';
    
    setTheme(savedTheme);
    setColorScheme(savedColorScheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const htmlElement = document.documentElement;
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme);
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, toggleTheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


//   const toggleTheme = () => {
//     setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
