import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import OpenSans from '../../constants/Fonts';
import { logout, getCurrentUser } from '../../services/AuthService';
import useTheme from '../../hooks/useTheme';

const TrainerDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { colors, isDark, toggle } = useTheme();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          const result = await logout();
          setLoading(false);

          if (!result.success) {
            Alert.alert('Error', result.error || 'Failed to logout');
          }
          // Navigation handled by auth listener
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Theme Toggle Button - Top Right */}
      <TouchableOpacity 
        style={[styles.toggleButton, { backgroundColor: colors.surface }]}
        onPress={toggle}
        activeOpacity={0.7}
      >
        <View style={[styles.toggleTrack, { backgroundColor: isDark ? colors.primary : colors.border }]}>
          <View style={[
            styles.toggleThumb,
            { backgroundColor: colors.buttonText },
            isDark ? styles.toggleThumbActive : styles.toggleThumbInactive
          ]}>
            <Text style={styles.toggleIcon}>
              {isDark ? '🌙' : '☀️'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Trainer Dashboard
        </Text>

        {user && (
          <Text style={[styles.email, { color: colors.textSecondary }]}>
            {user.email}
          </Text>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.error },
            loading && styles.buttonDisabled
          ]}
          onPress={handleLogout}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={colors.buttonText} />
          ) : (
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              Logout
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrainerDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  toggleButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    borderRadius: 25,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleTrack: {
    width: 60,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    padding: 2,
  },
  toggleThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbInactive: {
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  toggleIcon: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: OpenSans.Bold,
    fontSize: 28,
    marginBottom: 12,
  },
  email: {
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
    minWidth: 150,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});