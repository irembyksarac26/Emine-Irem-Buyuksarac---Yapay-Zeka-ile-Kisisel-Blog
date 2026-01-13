
import { useState, useEffect } from 'react';
import { ThemeService } from '../services/ThemeService';

export const useThemeController = () => {
  const [mode, setMode] = useState<'light' | 'dark'>(ThemeService.getInitialMode());

  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    ThemeService.saveMode(mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const colors = ThemeService.getColors(mode);

  return {
    mode,
    colors,
    toggleTheme
  };
};
