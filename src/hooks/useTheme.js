// hooks/useTheme.js
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setThemeMode, setIsDark, toggleTheme } from '../store/slices/themeSlice';
import { lightTheme, darkTheme } from '../constants/colors';

/**
 * Custom hook for managing app theme
 * Automatically detects and responds to system theme changes
 * 
 * @returns {Object} Theme utilities
 * @returns {Object} colors - Current theme colors
 * @returns {boolean} isDark - Whether dark mode is active
 * @returns {string} mode - Current theme mode ('light', 'dark', or 'system')
 * @returns {Function} setMode - Function to set theme mode
 * @returns {Function} toggle - Function to toggle theme
 */
const useTheme = () => {
  const dispatch = useDispatch();
  const systemColorScheme = useColorScheme(); // Detects system theme
  const { mode, isDark } = useSelector((state) => state.theme);

  // Effect to handle system theme changes
  useEffect(() => {
    if (mode === 'system') {
      const isSystemDark = systemColorScheme === 'dark';
      dispatch(setIsDark(isSystemDark));
    }
  }, [systemColorScheme, mode, dispatch]);

  // Effect to initialize theme on app start
  useEffect(() => {
    if (mode === 'system') {
      const isSystemDark = systemColorScheme === 'dark';
      dispatch(setIsDark(isSystemDark));
    }
  }, []);

  // Function to set theme mode
  const setMode = (newMode) => {
    dispatch(setThemeMode(newMode));
    
    if (newMode === 'light') {
      dispatch(setIsDark(false));
    } else if (newMode === 'dark') {
      dispatch(setIsDark(true));
    } else if (newMode === 'system') {
      const isSystemDark = systemColorScheme === 'dark';
      dispatch(setIsDark(isSystemDark));
    }
  };

  // Function to toggle theme
  const toggle = () => {
    dispatch(toggleTheme());
  };

  // Return current theme colors based on isDark
  const colors = isDark ? darkTheme : lightTheme;

  return {
    colors,
    isDark,
    mode,
    setMode,
    toggle,
  };
};

export default useTheme;