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
import { Mail, Lock, LogIn } from 'lucide-react-native';
import { loginWithEmail } from '../services/AuthService';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await loginWithEmail(email.trim(), password);
    setLoading(false);

    if (result.success) {
      // Navigation will be handled automatically by RootNavigator listening to auth state
    } else {
      Alert.alert('Login Failed', result.error || 'An error occurred');
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
              <View style={styles.iconCircle}>
                <LogIn size={wp('10%')} color="#fff" strokeWidth={2.5} />
              </View>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Sign in to continue your journey
              </Text>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Input Fields */}
            <View style={styles.inputSection}>
              <Text style={styles.sectionTitle}>Login to Your Account</Text>

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

              {/* Forgot Password */}
              <Pressable
                style={({ pressed }) => [
                  styles.forgotPassword,
                  pressed && styles.forgotPasswordPressed,
                ]}
                disabled={loading}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Pressable>
            </View>

            {/* Login Button */}
            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <View style={styles.loginButtonContent}>
                  <Text style={styles.loginButtonText}>Sign In</Text>
                  <LogIn size={wp('5%')} color="#fff" strokeWidth={2.5} />
                </View>
              )}
            </Pressable>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.signupLink,
                  pressed && styles.signupLinkPressed,
                ]}
                onPress={() => navigation.navigate('Signup')}
                disabled={loading}
              >
                <Text style={styles.signupLinkText}>Create Account</Text>
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
    paddingTop: hp('8%'),
    paddingBottom: hp('5%'),
    paddingHorizontal: wp('6%'),
  },
  headerGradient: {
    backgroundColor: '#007AFF',
    borderRadius: wp('4%'),
    padding: wp('8%'),
    alignItems: 'center',
  },
  iconCircle: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  welcomeText: {
    fontSize: wp('8%'),
    fontWeight: '700',
    color: '#fff',
    marginBottom: hp('0.5%'),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: wp('3.8%'),
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('4%'),
  },
  inputSection: {
    marginBottom: hp('3%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: hp('2%'),
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
  forgotPassword: {
    alignSelf: 'flex-end',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('1%'),
  },
  forgotPasswordPressed: {
    opacity: 0.6,
  },
  forgotPasswordText: {
    fontSize: wp('3.5%'),
    color: '#007AFF',
    fontWeight: '600',
  },
  loginButton: {
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
  loginButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },
  loginButtonText: {
    color: '#fff',
    fontSize: wp('4.2%'),
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('3%'),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  dividerText: {
    fontSize: wp('3.5%'),
    color: '#999',
    marginHorizontal: wp('3%'),
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: wp('3.5%'),
    color: '#666',
  },
  signupLink: {
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('1%'),
  },
  signupLinkPressed: {
    opacity: 0.6,
  },
  signupLinkText: {
    fontSize: wp('3.5%'),
    color: '#007AFF',
    fontWeight: '700',
  },
});
