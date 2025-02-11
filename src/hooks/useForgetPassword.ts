import { useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';

const useForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const handlePasswordReset = async () => {
    if (!email) {
      showToast('Please enter your email address.');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      showToast(
        'A password reset link has been sent to your email address.'
      );
    } catch (err) {
      const errorCode = (err as FirebaseAuthTypes.NativeFirebaseAuthError).code;

      if (errorCode === 'auth/user-not-found') {
        showToast('No user found with this email address.');
      } else if (errorCode === 'auth/invalid-email') {
        showToast('The email address is not valid.');
      } else {
        showToast('Something went wrong. Please try again later.');
      }
    }
  };

  return { email, setEmail, error, setError, handlePasswordReset };
};

export default useForgetPassword;
