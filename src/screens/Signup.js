import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  User,
  Dumbbell,
  Mail,
  Lock,
  UserCircle,
  CheckCircle,
} from 'lucide-react-native';
import { signupWithEmail } from '../services/AuthService';
import { useDispatch } from 'react-redux';
import { setPendingRegisterData } from '../store/slices/userSlice';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    dispatch(
      setPendingRegisterData({
        name: name.trim(),
        role: role,
      }),
    );

    const result = await signupWithEmail(email.trim(), password);
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', 'Account created successfully!');
    } else {
      Alert.alert('Signup Failed', result.error || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.headerGradient}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.subtitle}>
                Create your account to get started
              </Text>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Role Selection Cards */}
            <View style={styles.roleSection}>
              <Text style={styles.sectionTitle}>Choose Your Role</Text>
              <View style={styles.roleCards}>
                <Pressable
                  style={({ pressed }) => [
                    styles.roleCard,
                    role === 'user' && styles.roleCardSelected,
                    pressed && styles.roleCardPressed,
                  ]}
                  onPress={() => setRole('user')}
                  disabled={loading}
                >
                  <View
                    style={[
                      styles.roleIconContainer,
                      role === 'user' && styles.roleIconContainerSelected,
                    ]}
                  >
                    <User
                      size={wp('8%')}
                      color={role === 'user' ? '#fff' : '#007AFF'}
                      strokeWidth={2}
                    />
                  </View>
                  <Text
                    style={[
                      styles.roleCardTitle,
                      role === 'user' && styles.roleCardTitleSelected,
                    ]}
                  >
                    Client
                  </Text>
                  <Text
                    style={[
                      styles.roleCardDesc,
                      role === 'user' && styles.roleCardDescSelected,
                    ]}
                  >
                    Book sessions with trainers
                  </Text>
                  {role === 'user' && (
                    <View style={styles.checkBadge}>
                      <CheckCircle
                        size={wp('5%')}
                        color="#00C853"
                        fill="#00C853"
                      />
                    </View>
                  )}
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.roleCard,
                    role === 'trainer' && styles.roleCardSelected,
                    pressed && styles.roleCardPressed,
                  ]}
                  onPress={() => setRole('trainer')}
                  disabled={loading}
                >
                  <View
                    style={[
                      styles.roleIconContainer,
                      role === 'trainer' && styles.roleIconContainerSelected,
                    ]}
                  >
                    <Dumbbell
                      size={wp('8%')}
                      color={role === 'trainer' ? '#fff' : '#007AFF'}
                      strokeWidth={2}
                    />
                  </View>
                  <Text
                    style={[
                      styles.roleCardTitle,
                      role === 'trainer' && styles.roleCardTitleSelected,
                    ]}
                  >
                    Trainer
                  </Text>
                  <Text
                    style={[
                      styles.roleCardDesc,
                      role === 'trainer' && styles.roleCardDescSelected,
                    ]}
                  >
                    Offer training sessions
                  </Text>
                  {role === 'trainer' && (
                    <View style={styles.checkBadge}>
                      <CheckCircle
                        size={wp('5%')}
                        color="#00C853"
                        fill="#00C853"
                      />
                    </View>
                  )}
                </Pressable>
              </View>
            </View>

            {/* Input Fields */}
            <View style={styles.inputSection}>
              <Text style={styles.sectionTitle}>Your Information</Text>

              <View style={styles.inputWrapper}>
                <View style={styles.inputIconContainer}>
                  <UserCircle size={wp('5%')} color="#007AFF" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputWrapper}>
                <View style={styles.inputIconContainer}>
                  <Mail size={wp('5%')} color="#007AFF" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>

              <View style={styles.inputWrapper}>
                <View style={styles.inputIconContainer}>
                  <Lock size={wp('5%')} color="#007AFF" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputWrapper}>
                <View style={styles.inputIconContainer}>
                  <Lock size={wp('5%')} color="#007AFF" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>
            </View>

            {/* Sign Up Button */}
            <Pressable
              style={({ pressed }) => [
                styles.signupButton,
                pressed && styles.signupButtonPressed,
              ]}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.signupButtonText}>Create Account</Text>
              )}
            </Pressable>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.loginLink,
                  pressed && styles.loginLinkPressed,
                ]}
                onPress={() => navigation.navigate('Login')}
                disabled={loading}
              >
                <Text style={styles.loginLinkText}>Sign In</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: hp('1%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('6%'),
  },
  headerGradient: {
    backgroundColor: '#007AFF',
    borderRadius: wp('4%'),
    padding: wp('6%'),
  },
  welcomeText: {
    fontSize: wp('9%'),
    fontWeight: '700',
    color: '#fff',
    marginBottom: hp('0.5%'),
  },
  subtitle: {
    fontSize: wp('3.8%'),
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('4%'),
  },
  roleSection: {
    marginBottom: hp('3%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: hp('2%'),
  },
  roleCards: {
    flexDirection: 'row',
    gap: wp('3%'),
  },
  roleCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: wp('4%'),
    padding: wp('5%'),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  roleCardSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F7FF',
  },
  roleCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  roleIconContainer: {
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('8%'),
    backgroundColor: '#F0F7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1.5%'),
  },
  roleIconContainerSelected: {
    backgroundColor: '#007AFF',
  },
  roleCardTitle: {
    fontSize: wp('4.2%'),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: hp('0.5%'),
  },
  roleCardTitleSelected: {
    color: '#007AFF',
  },
  roleCardDesc: {
    fontSize: wp('3%'),
    color: '#666',
    textAlign: 'center',
  },
  roleCardDescSelected: {
    color: '#007AFF',
  },
  checkBadge: {
    marginTop: hp('1%'),
  },
  inputSection: {
    marginBottom: hp('3%'),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    marginBottom: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIconContainer: {
    marginRight: wp('3%'),
  },
  input: {
    flex: 1,
    paddingVertical: hp('2%'),
    fontSize: wp('4%'),
    color: '#1a1a1a',
  },
  signupButton: {
    backgroundColor: '#007AFF',
    borderRadius: wp('3%'),
    paddingVertical: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  signupButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  signupButtonText: {
    color: '#fff',
    fontSize: wp('4.2%'),
    fontWeight: '700',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
  loginText: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  loginLink: {
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('1%'),
  },
  loginLinkPressed: {
    opacity: 0.6,
  },
  loginLinkText: {
    fontSize: wp('3.5%'),
    color: '#007AFF',
    fontWeight: '700',
  },
});
