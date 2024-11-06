import { useState, useEffect } from 'react';
import './ThemeToggle.css';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    // Appliquer le thème au niveau du document
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button 
      className="theme-toggle" 
      onClick={() => setIsDark(!isDark)}
      aria-label="Changer le thème"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;