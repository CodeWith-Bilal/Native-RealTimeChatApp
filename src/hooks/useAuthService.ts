import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ToastAndroid } from 'react-native';
import { FirebaseError } from '@firebase/util';
import { User } from '../types/firestoreService';
import {GOOGLE_CLIENT_ID} from '@env';

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
  offlineAccess: true,
});

const getUserDataFromFirestore = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await firestore().collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return null;
    }

    const userData = userDoc.data();
    if (!userData) {
      return null;
    }

    return {
      uid,
      displayName: userData.displayName || '',
      email: userData.email || '',
      photoURL: userData.photoURL || null,
      status: userData.status || null,
      chats: userData.chats || [],
      contacts: userData.contacts || [],
    };
  } catch (error) {
    return null;
  }
};

export const login = async (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential | null> => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
     await getUserDataFromFirestore(userCredential.user.uid);
    ToastAndroid.show('Logged in successfully! 🌟', ToastAndroid.SHORT);
    return userCredential;
  } catch (error) {
    handleAuthError(error);
    return null;
  }
};

export const signUp = async (email: string, password: string, name: string): Promise<FirebaseAuthTypes.UserCredential | null> => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({ displayName: name });

    const userDoc: User = {
      uid: userCredential.user.uid,
      displayName: name,
      email,
      status: null,
      photoURL: null,
      chats: [],
      contacts: [],
    };

    if (userDoc.uid) {
      await firestore().collection('users').doc(userDoc.uid).set(userDoc);
    } else {
      throw new Error('User UID is null.');
    }
    ToastAndroid.show('Account created successfully! 🤠', ToastAndroid.SHORT);
    return userCredential;
  } catch (error) {
    handleAuthError(error);
    return null;
  }
};


export const signInWithGoogle = async () => {
  try {
       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    await GoogleSignin.signOut();

    const signInResponse = await GoogleSignin.signIn();
    const { data } = signInResponse;

    if (!data?.idToken) {
      throw new Error('Google Sign-In failed: idToken is null.');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
    const response = await auth().signInWithCredential(googleCredential);
    const { uid, email, displayName, photoURL } = response?.user;


    const userDocRef = firestore().collection('users').doc(uid);
    const userSnapshot = await userDocRef.get();

    if (!userSnapshot.exists) {
      const newUserDoc = {
        uid,
        displayName: displayName || 'Unknown User',
        email: email || 'No Email',
        photoURL: photoURL || null,
        status: null,
        chats: [],
        contacts: [],
      };

      await userDocRef.set(newUserDoc);
    }

    ToastAndroid.show('Google login successful! 🎉', ToastAndroid.SHORT);

    return { uid, email, displayName, photoURL };
  } catch (err) {
    const error = err as FirebaseError;
    ToastAndroid.show('Google login failed. Please try again.', ToastAndroid.LONG);
    throw error.message || 'An unknown error occurred';
  }
};


export const logoutUser = async () => {
  try {
    const providers = auth().currentUser?.providerData.map(provider => provider.providerId);
    if (providers?.includes('google.com')) {
      await GoogleSignin.signOut();
    }
    await auth().signOut();
    ToastAndroid.show('Logged out successfully! 🙂', ToastAndroid.SHORT);
  } catch (error) {
    ToastAndroid.show('Failed to log out. Please try again.', ToastAndroid.SHORT);
  }
};

const handleAuthError = (error: any) => {
  const errorMessage = error instanceof FirebaseError ? mapFirebaseError(error.code) : 'An unexpected error occurred.';
  ToastAndroid.show(errorMessage, ToastAndroid.LONG);
};

const mapFirebaseError = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    'auth/user-not-found': 'No user found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Invalid email address format.',
    'auth/email-already-in-use': 'Email is already in use.',
    'auth/weak-password': 'Password is too weak. Use a stronger one.',
  };
  return errorMessages[errorCode] || 'An error occurred. Please try again.';
};
