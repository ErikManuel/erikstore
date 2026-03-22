'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import './ThemeToggle.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className="theme-toggle" style={{ visibility: 'hidden' }} />;
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}