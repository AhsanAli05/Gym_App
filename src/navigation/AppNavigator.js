import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

// Screen Imports
import TrainerDashboard from '../screens/Trainer/TrainerDashboard';
import UserDashboard from '../screens/UserDashboard';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  console.log('AppNavigator initialization started');
  // 1. Get the user profile from Redux
  const profile = useSelector(state => state.user.profile);
  const pendingData = useSelector(state => state.user.pendingRegisterData);
  console.log('AppNavigator rendered with profile:', profile);  

  // 2. Determine the role (defaulting to 'user' as a fallback)
  // const role = profile?.role;
  const role = profile?.role || pendingData?.role;
  console.log('User role determined as:', role);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === 'trainer' ? (
        // --- Trainer Specific Screen ---
        <Stack.Screen name="TrainerDashboard" component={TrainerDashboard} />
      ) : (
        // --- User Specific Screen ---
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
      )}

      {/* You can add common screens here that both roles can see */}
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}
