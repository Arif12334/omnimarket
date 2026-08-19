import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported, Analytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAqr_2NUSenVUHG34oUv0auTbDOFp_WXjI",
  authDomain: "omnimarket-75822.firebaseapp.com",
  projectId: "omnimarket-75822",
  storageBucket: "omnimarket-75822.firebasestorage.app",
  messagingSenderId: "929389435708",
  appId: "1:929389435708:web:0b0fc84b3d25939b401c39",
  measurementId: "G-15DCRNPNQD"
};

// Initialize Firebase app singleton
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Analytics safely (only if browser environment supports it)
export let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized successfully');
    }
  }).catch((err) => {
    console.warn('Firebase Analytics not supported in this environment:', err);
  });
}

// Authentication Helpers
export const signInWithFirebaseGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      user: result.user,
      error: null
    };
  } catch (error: any) {
    console.warn('Firebase Google Sign-In popup notice:', error);
    return {
      user: null,
      error: error?.message || 'Failed to sign in with Google'
    };
  }
};

export const signInWithFirebaseEmail = async (email: string, pass: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error?.message || 'Login failed' };
  }
};

export const signUpWithFirebaseEmail = async (email: string, pass: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error?.message || 'Sign up failed' };
  }
};

export const logoutFromFirebase = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Firebase sign out error:', error);
  }
};

export { onAuthStateChanged };
export type { FirebaseUser };
