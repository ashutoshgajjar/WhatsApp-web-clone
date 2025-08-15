import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeContext = React.createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage?.getItem('darkMode');
    if (stored !== null) {
      return JSON.parse(stored);
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage?.setItem('darkMode', JSON.stringify(isDarkMode));

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = () => {
  const context = React.useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return context;
};

const Switch = ({ checked, onChange, disabled = false }) => {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`
        group relative inline-flex py-0.5 w-9 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none
        ${checked ? 'bg-green-500' : 'bg-neutral-200 border border-black/50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full -translate-y-[0.025px] group-hover:scale-x-115  shadow-lg transition-transform duration-100 ease-in-out
          ${checked ? 'translate-x-4.5 bg-white origin-right' : 'translate-x-0.5 bg-black/50 origin-left'}
        `}
      />
    </button>
  );
};

export const DarkModeToggle = ({ onClose }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleToggle = (newValue) => {
    toggleDarkMode();
  };

  return (
    <div className='inline-flex items-center justify-between w-full p-4'>
      <div className='flex items-center gap-5'>
        {isDarkMode ? (
          <Moon className='size-5 text-neutral-200' />
        ) : (
          <Sun className='size-5 text-neutral-500' />
        )}
        <div className='flex flex-col'>
          <span className='text-sm font-medium select-none text-neutral-700 dark:text-neutral-200'>
            Dark Mode
          </span>

          <span className='text-[0.7em] sm:text-xs text-neutral-500 dark:text-white/75 max-w-[7rem] sm:max-w-[12rem]'>
            change appearance between light and dark mode
          </span>
          {/* <span className='text-xs dark:text-white/75'>
            Current mode: {isDarkMode ? 'Dark' : 'Light'}
          </span> */}
        </div>
      </div>
      <Switch checked={isDarkMode} onChange={handleToggle} />
    </div>
  );
};
