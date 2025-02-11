import { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { FirebaseError } from '@firebase/util';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { UseAuthReturn } from '../types/auth';
import { useAppDispatch, useAppSelector } from './../store/store';
import { login, signUp } from './useAuthService';
import { setLoading, setUser, UserState } from '../store/slices/userSlice';
import auth from '@react-native-firebase/auth';
const useAuth = (): UseAuthReturn => {
  const user = useAppSelector(state => state.user);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const loading = user.isLoading;

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        const userData: Partial<UserState> & { uid: string } = {
          uid: currentUser.uid,
          displayName: currentUser.displayName || null,
          email: currentUser.email || null,
          photoURL: currentUser.photoURL || null,
          status: null,
          chats: [],
          contacts: [],
        };
        dispatch(setUser(userData));
      } else {
        dispatch(setUser({} as Partial<UserState> & { uid: string })); // Clear user state if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [dispatch]);

  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential | void> => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await login(email, password);
      if (userCredential) {
        return userCredential;
      } else {
        ToastAndroid.show('Email or Password may be invalid.', ToastAndroid.SHORT);
        console.error('User not created (useAuth.ts)... Error:', user);
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(mapFirebaseError(err.code));
      }
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    name: string,
  ): Promise<FirebaseAuthTypes.UserCredential | void> => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signUp(email, password, name);
      if (userCredential) {
        return userCredential;
      } else {
        console.error('User not created (useAuth.ts)... Error:', user);
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(mapFirebaseError(err.code));
      }
      console.error('Sign-Up Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const mapFirebaseError = (code: string): string => {
    switch (code) {
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Wrong password';
      case 'auth/invalid-email':
        return 'Invalid email';
      case 'auth/invalid-credential':
        return 'Invalid email or password';
      default:
        return 'An error occurred';
    }
  };

  return {
    user,
    handleLogin,
    handleSignUp,
    error,
    loading,
  };
};

export default useAuth;
