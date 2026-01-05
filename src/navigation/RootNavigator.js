import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { listenToAuthChanges } from '../services/AuthService';
import apiHandler from '../handler/apiHandler';
import { API } from '../constants/api';
import { setUserProfile } from '../store/slices/userSlice';

import Splash from '../screens/Splash';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Get pending data from Redux
  const pendingData = useSelector(state => state.user.pendingRegisterData);
  const hasSyncedRef = useRef(false);

  // Keep a Ref of pending data so the listener always has the latest values
  const pendingRef = useRef(pendingData);
  useEffect(() => {
    pendingRef.current = pendingData;
  }, [pendingData]);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(async firebaseUser => {
      if (!firebaseUser) {
        setUser(null);
        hasSyncedRef.current = false;
        setLoading(false);
        return;
      }

      if (!hasSyncedRef.current) {
        hasSyncedRef.current = true;
        try {
          const token = await firebaseUser.getIdToken();
          const { name, role } = pendingRef.current || {};

          const response = await apiHandler('POST', API.AUTH.SYNC, token, {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name,
            role,
          });
          Console.log('Sync response:', response);
          if (response.success) {
            dispatch(setUserProfile(response.user));
          }
        } catch (error) {
          console.warn('Sync failed:', error.message);
        }
      }

      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return <Splash />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
