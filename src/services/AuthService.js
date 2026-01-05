import auth from '@react-native-firebase/auth';

// 🔹 Listen to auth state changes
export const listenToAuthChanges = (callback) => {
  const unsubscribe = auth().onAuthStateChanged(user => {
    callback(user);
  });

  return unsubscribe;
};

// 🔹 Get current user
export const getCurrentUser = () => {
  return auth().currentUser;
};

// 🔹 Login
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let errorMessage = 'An error occurred during login';
    
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid email or password';
        break;
      default:
        errorMessage = error.message || errorMessage;
    }
    
    return { success: false, error: errorMessage };
  }
};

// 🔹 Signup
export const signupWithEmail = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    let errorMessage = 'An error occurred during signup';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'An account already exists with this email';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Email/password accounts are not enabled';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak';
        break;
      default:
        errorMessage = error.message || errorMessage;
    }
    
    return { success: false, error: errorMessage };
  }
};

// 🔹 Logout
export const logout = async () => {
  try {
    await auth().signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || 'Failed to logout' };
  }
};
