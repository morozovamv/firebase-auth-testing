import {
  GoogleAuthProvider,
  getAuth,
  signOut as authSignOut,
  onAuthStateChanged,
  type User,
  setPersistence,
  browserLocalPersistence,
  signInWithRedirect,
} from 'firebase/auth';
import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { useState, useEffect } from 'react';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAbJ9gyJmuNrPM9hZqM6MlKfNre8TlQC64',
  authDomain: 'auth--testing.web.app',
  projectId: 'auth--testing',
  storageBucket: 'auth--testing.appspot.com',
  messagingSenderId: '1099014622325',
  appId: '1:1099014622325:web:d30f9df6ce5c76fdb7bc3c',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

const provider = new GoogleAuthProvider();

export const signIn = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error('Sign in failed', error);
  }
};

export const signOut = async () => {
  try {
    await authSignOut(auth);
  } catch (error) {
    console.error('Sign out failed', error);
  }
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
