import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginWithEmail, signupWithEmail, logout, getIdToken } from '../services/AuthService';
import apiHandler from '../handlers/apihandler'; // your axios wrapper

// ===========================
// 🔹 Async Thunks
// ===========================

// Login & Sync with backend
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // 1️⃣ Login with Firebase
      const loginResult = await loginWithEmail(email, password);
      if (!loginResult.success) return rejectWithValue(loginResult.error);

      // 2️⃣ Get Firebase ID Token
      const token = loginResult.token;

      // 3️⃣ Call backend sync API
      const response = await apiHandler(
        'POST',
        '/auth/sync',   // backend endpoint
        token,
        { email: loginResult.user.email } // any data you need
      );

      // 4️⃣ Return backend user + token for Redux state
      return { user: response.user || loginResult.user, token };
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Signup & Sync with backend
export const signupThunk = createAsyncThunk(
  'auth/signup',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const signupResult = await signupWithEmail(email, password);
      if (!signupResult.success) return rejectWithValue(signupResult.error);

      const token = signupResult.token;

      const response = await apiHandler(
        'POST',
        '/auth/sync',
        token,
        { email: signupResult.user.email }
      );

      return { user: response.user || signupResult.user, token };
    } catch (error) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);

// Logout
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const result = await logout();
      if (!result.success) return rejectWithValue(result.error);
      return true;
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);