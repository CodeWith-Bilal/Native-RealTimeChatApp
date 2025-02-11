import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ToastAndroid } from 'react-native';
import { FirebaseError } from '@firebase/util';
import { User } from '../types/firestoreService';
import {GOOGLE_CLIENT_ID} from '@env';

// Google Sign-In configuration
GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
  offlineAccess: true,
});

// Function to handle user data retrieval from Firestore
const getUserDataFromFirestore = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await firestore().collection('users').doc(uid).get();

    if (!userDoc.exists) {
      console.error(`User document for UID: ${uid} not found.`);
      return null;
    }

    const userData = userDoc.data();
    if (!userData) {
      console.error(`User data is empty for UID: ${uid}`);
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
    console.error('Error retrieving user data:', error);
    return null;
  }
};


// Observe authentication state changes
// export const observeAuthState = (callback: (user: User | null) => void): (() => void) => {
//   return auth().onAuthStateChanged(async (firebaseUser) => {
//     if (firebaseUser) {
//       const user = await getUserDataFromFirestore(firebaseUser.uid);
//       callback(user);
//     } else {
//       callback(null);
//     }
//   });
// };

// Login function
export const login = async (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential | null> => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const user = await getUserDataFromFirestore(userCredential.user.uid);
    ToastAndroid.show('Logged in successfully! 🌟', ToastAndroid.SHORT);
    return userCredential;
  } catch (error) {
    handleAuthError(error);
    return null;
  }
};

// Sign-up function
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

// Google Sign-In function
// export const signInWithGoogle = async () => {
//   try {
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

//     await GoogleSignin.signOut();

//     const signInResponse = await GoogleSignin.signIn();
//     const { data } = signInResponse;

//     if (!data?.idToken) {
//       throw new Error('Google Sign-In failed: idToken is null.');
//     }

//     const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
//     const response = await auth().signInWithCredential(googleCredential);
//     const { uid, email, displayName, photoURL } = response?.user;

//     return { uid, email, displayName, photoURL };
//   } catch (err) {
//     const error = err as FirebaseError;
//     ToastAndroid.show('Google login failed. Please try again.', ToastAndroid.LONG);
//     throw error.message || 'An unknown error occurred';
//   }
// };

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

    // Get Google credentials and sign in with Firebase Auth
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // const response = await auth().signInWithCredential(googleCredential);
    // const { uid, email, displayName, photoURL } = response?.user;

    // Check if the user exists in Firestore
    const userDocRef = firestore().collection('users').doc(uid);
    const userSnapshot = await userDocRef.get();

    if (!userSnapshot.exists) {
      // Create a new user document if it doesn't exist
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

    // Notify the user of successful login
    ToastAndroid.show('Google login successful! 🎉', ToastAndroid.SHORT);

    // Return the user details
    return { uid, email, displayName, photoURL };
  } catch (err) {
    const error = err as FirebaseError;
    ToastAndroid.show('Google login failed. Please try again.', ToastAndroid.LONG);
    throw error.message || 'An unknown error occurred';
  }
};


// Logout function
export const logoutUser = async () => {
  try {
    const providers = auth().currentUser?.providerData.map(provider => provider.providerId);
    if (providers?.includes('google.com')) {
      await GoogleSignin.signOut();
    }
    await auth().signOut();
    ToastAndroid.show('Logged out successfully! 🙂', ToastAndroid.SHORT);
  } catch (error) {
    console.error('Logout error:', error);
    ToastAndroid.show('Failed to log out. Please try again.', ToastAndroid.SHORT);
  }
};

// Handle authentication errors
const handleAuthError = (error: any) => {
  const errorMessage = error instanceof FirebaseError ? mapFirebaseError(error.code) : 'An unexpected error occurred.';
  ToastAndroid.show(errorMessage, ToastAndroid.LONG);
  console.error('Auth error:', error);
};

// Map Firebase error codes to error messages
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
