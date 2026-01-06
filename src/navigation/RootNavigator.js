import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { listenToAuthChanges } from '../services/AuthService';
import apiHandler from '../handler/apiHandler';
import { API } from '../constants/api';
import { setUserProfile, setPendingRegisterData } from '../store/slices/userSlice';

import Splash from '../screens/Splash';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Get data from Redux (Persisted via Redux-Persist)
  const pendingData = useSelector(state => state.user.pendingRegisterData);
  const profile = useSelector(state => state.user.profile);
  
  // Ref to prevent multiple sync calls in one session
  const hasSyncedRef = useRef(false);

  // Keep a Ref of pending data so the listener always has access to the most recent values
  const pendingRef = useRef(pendingData);
  useEffect(() => {
    pendingRef.current = pendingData;
  }, [pendingData]);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(async (firebaseUser) => {
      if (!firebaseUser) {
        // User logged out: Reset states
        setUser(null);
        hasSyncedRef.current = false;
        setLoading(false);
        return;
      }

      // 1. HYBRID STEP: Enter the app immediately
      // Because we use Redux-Persist, AppNavigator will use the last saved role.
      setUser(firebaseUser);
      setLoading(false);

      // 2. BACKGROUND SYNC: Sync with MongoDB quietly
      if (!hasSyncedRef.current) {
        hasSyncedRef.current = true; // Optimistically set to true to avoid double calls
        
        try {
          const token = await firebaseUser.getIdToken();
          
          // Get name/role from pending registration or existing profile
          const name = pendingRef.current?.name || profile?.name;
          const role = pendingRef.current?.role || profile?.role;

          const response = await apiHandler('POST', API.AUTH.SYNC, token, {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: name,
            role: role,
          });

          if (response.success) {
            // Update Redux with official data from MongoDB
            dispatch(setUserProfile(response.user));
            
            // Cleanup: Clear pending registration data after successful sync
            if (pendingRef.current) {
              dispatch(setPendingRegisterData(null));
            }
            console.log('Background Sync Successful');
          } else {
            // If API returned failure, allow a retry later
            hasSyncedRef.current = false;
          }
        } catch (error) {
          hasSyncedRef.current = false;
          console.warn('Background sync failed:', error.message);
          // User is still in the app, sync will retry on next app reload or mount
        }
      }
    });

    return unsubscribe;
  }, [dispatch, profile?.name, profile?.role]);

  // Show Splash while checking initial Firebase Auth state
  if (loading) return <Splash />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // AppNavigator will handle Trainer vs User logic using Redux Profile or PendingData
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}