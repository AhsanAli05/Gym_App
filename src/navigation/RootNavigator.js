import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState, useRef } from 'react';

import { listenToAuthChanges } from '../services/AuthService';
import apiHandler from '../handler/apiHandler';
import { API } from '../constants/api';

import Splash from '../screens/Splash';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔒 Prevent multiple sync calls
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(async firebaseUser => {
      setUser(firebaseUser);
      setLoading(false);

      // ✅ Call sync ONLY when user exists & not already synced
      if (firebaseUser && !hasSyncedRef.current) {
        try {
          hasSyncedRef.current = true;

          const token = await firebaseUser.getIdToken();
          console.log('the firebase token is', token);

          // await apiHandler('POST', API.AUTH.SYNC, token, {
          //   uid: firebaseUser.uid,
          //   email: firebaseUser.email,
          // });
           // Call your backend sync API
          const response = await apiHandler('POST', API.AUTH.SYNC, token, {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          });
        } catch (error) {
          console.warn('Auth sync failed:', error.message);
          // ❗ Do NOT logout user if sync fails
        }
      }

      // 🔁 Reset sync flag on logout
      if (!firebaseUser) {
        hasSyncedRef.current = false;
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <Splash />;
  }

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
