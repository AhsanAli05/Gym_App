import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
    pendingRegisterData: null,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setPendingRegisterData: (state, action) => {
      state.pendingRegisterData = action.payload;
    },
    clearUserProfile: state => {
      state.profile = null;
    },
  },
});

export const { setUserProfile, clearUserProfile, setPendingRegisterData } =
  userSlice.actions;
export default userSlice.reducer;
