import {useEffect, useState} from 'react';
import { ToastAndroid } from 'react-native';
import {FirebaseError} from '@firebase/util';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {UseAuthReturn} from '../types/auth';
import {useAppDispatch, useAppSelector} from './../store/store';
import {login, signUp, observeAuthState} from '../services/auth';
import {setLoading, setUser, UserState} from '../store/slices/user.slice';

const appAuth = (): UseAuthReturn => {
  const user = useAppSelector(state => state.user);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const loading = user.isLoading;

  useEffect(() => {
    const unsubscribe = observeAuthState(currentUser => {
      if (currentUser)
        dispatch(setUser(currentUser as Partial<UserState> & {uid: string}));
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential | void> => {
    try {
      const userCredential = await login(email, password);
      const firebaseUser = userCredential?.user;

      if (firebaseUser) {
        const userData: Partial<UserState> & {uid: string} = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || null,
          email: firebaseUser.email || null,
          photoURL: firebaseUser.photoURL || null,
          status: null,
          chats: [],
          contacts: [],
        };

        dispatch(setUser(userData));
      }
      if (userCredential) {
        return userCredential;
      } else {
        ToastAndroid.show('Email or Password may invalid.', ToastAndroid.SHORT);
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

      const firebaseUser = userCredential?.user;

      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          displayName: name,
          email: firebaseUser.email || '',
          status: null,
          photoURL: firebaseUser.photoURL || null,
        };

        dispatch(setUser(userData));
      }

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
    observeAuth: () => () => {},
  };
};

export default appAuth;
