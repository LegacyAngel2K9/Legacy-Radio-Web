import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useThemeStore from '../lib/theme';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
};

export default ThemeToggle;