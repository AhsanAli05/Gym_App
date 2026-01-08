// colors.js
// Define all color palettes for light and dark themes

export const lightTheme = {
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  backgroundTertiary: '#E8E8E8',
  
  // Surface colors (for cards, modals, etc.)
  surface: '#FFFFFF',
  surfaceElevated: '#FAFAFA',
  
  // Text colors
  text: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textDisabled: '#CCCCCC',
  
  // Primary brand colors
  primary: '#007AFF',
  primaryLight: '#5AC8FA',
  primaryDark: '#0051D5',
  
  // Secondary colors
  secondary: '#5856D6',
  secondaryLight: '#8E8CD8',
  secondaryDark: '#3634A3',
  
  // Status colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5AC8FA',
  
  // UI elements
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  divider: '#E5E5E5',
  shadow: 'rgba(0, 0, 0, 0.1)',
  
  // Interactive elements
  buttonPrimary: '#007AFF',
  buttonSecondary: '#F2F2F7',
  buttonText: '#FFFFFF',
  buttonTextSecondary: '#000000',
  
  // Input fields
  inputBackground: '#F2F2F7',
  inputBorder: '#E0E0E0',
  inputPlaceholder: '#999999',
  
  // Special colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  highlight: '#FFEB3B',
  link: '#007AFF',
};

export const darkTheme = {
  // Background colors
  background: '#000000',
  backgroundSecondary: '#1C1C1E',
  backgroundTertiary: '#2C2C2E',
  
  // Surface colors (for cards, modals, etc.)
  surface: '#1C1C1E',
  surfaceElevated: '#2C2C2E',
  
  // Text colors
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  textTertiary: '#A1A1A6',
  textDisabled: '#636366',
  
  // Primary brand colors
  primary: '#0A84FF',
  primaryLight: '#64D2FF',
  primaryDark: '#0055CC',
  
  // Secondary colors
  secondary: '#5E5CE6',
  secondaryLight: '#9F9DFF',
  secondaryDark: '#4542B3',
  
  // Status colors
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',
  info: '#64D2FF',
  
  // UI elements
  border: '#38383A',
  borderLight: '#2C2C2E',
  divider: '#38383A',
  shadow: 'rgba(0, 0, 0, 0.3)',
  
  // Interactive elements
  buttonPrimary: '#0A84FF',
  buttonSecondary: '#2C2C2E',
  buttonText: '#FFFFFF',
  buttonTextSecondary: '#FFFFFF',
  
  // Input fields
  inputBackground: '#1C1C1E',
  inputBorder: '#38383A',
  inputPlaceholder: '#A1A1A6',
  
  // Special colors
  overlay: 'rgba(0, 0, 0, 0.7)',
  highlight: '#FFD60A',
  link: '#0A84FF',
};

// Export theme function that returns the appropriate theme
export const getTheme = (isDark) => (isDark ? darkTheme : lightTheme);