import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  glassmorphism: boolean;
  shadows: boolean;
  gradients: boolean;
}

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  toggleDarkMode: () => void;
  resetTheme: () => void;
  isDarkMode: boolean;
  systemPrefersDark: boolean;
}

const defaultTheme: ThemeConfig = {
  mode: 'auto',
  accentColor: '#6366f1',
  fontSize: 'medium',
  animations: true,
  reducedMotion: false,
  highContrast: false,
  glassmorphism: true,
  shadows: true,
  gradients: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeConfig>(defaultTheme);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Load theme from localStorage and system preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('launchplan-theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setThemeState({ ...defaultTheme, ...parsedTheme });
      } catch (error) {
        console.warn('Failed to parse saved theme:', error);
      }
    }

    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('launchplan-theme', JSON.stringify(theme));
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme.mode === 'dark' || (theme.mode === 'auto' && systemPrefersDark);

    // Apply or remove dark mode class
    if (isDark) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }

    // Apply accessibility classes
    if (theme.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    if (theme.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply custom properties
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--font-size-multiplier', 
      theme.fontSize === 'small' ? '0.9' : 
      theme.fontSize === 'large' ? '1.1' : '1'
    );

    // Apply feature flags
    if (!theme.glassmorphism) {
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.95)');
      root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
    }

    if (!theme.shadows) {
      root.style.setProperty('--shadow-sm', 'none');
      root.style.setProperty('--shadow-md', 'none');
      root.style.setProperty('--shadow-lg', 'none');
      root.style.setProperty('--shadow-xl', 'none');
    }

    if (!theme.gradients) {
      root.style.setProperty('--gradient-primary', theme.accentColor);
      root.style.setProperty('--gradient-secondary', theme.accentColor);
      root.style.setProperty('--gradient-accent', theme.accentColor);
    }

    if (!theme.animations) {
      root.style.setProperty('--transition-fast', '0s');
      root.style.setProperty('--transition-normal', '0s');
      root.style.setProperty('--transition-slow', '0s');
    }
  }, [theme, systemPrefersDark]);

  const setTheme = (newTheme: Partial<ThemeConfig>) => {
    setThemeState(prev => ({ ...prev, ...newTheme }));
  };

  const toggleDarkMode = () => {
    if (theme.mode === 'light') {
      setTheme({ mode: 'dark' });
    } else if (theme.mode === 'dark') {
      setTheme({ mode: 'light' });
    } else {
      setTheme({ mode: systemPrefersDark ? 'light' : 'dark' });
    }
  };

  const resetTheme = () => {
    setThemeState(defaultTheme);
  };

  const isDarkMode = theme.mode === 'dark' || (theme.mode === 'auto' && systemPrefersDark);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleDarkMode,
        resetTheme,
        isDarkMode,
        systemPrefersDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
