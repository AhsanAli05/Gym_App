import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'system', // 'light', 'dark', or 'system'
  isDark: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload; // 'light', 'dark', or 'system'
    },
    setIsDark: (state, action) => {
      state.isDark = action.payload;
    },
    toggleTheme: (state) => {
      if (state.mode === 'system') {
        // If in system mode, switch to manual mode
        state.mode = state.isDark ? 'light' : 'dark';
        state.isDark = !state.isDark;
      } else {
        // Toggle between light and dark
        state.mode = state.mode === 'light' ? 'dark' : 'light';
        state.isDark = state.mode === 'dark';
      }
    },
  },
});

export const { setThemeMode, setIsDark, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;