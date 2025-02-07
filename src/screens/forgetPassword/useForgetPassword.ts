import {useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {showToast} from '../../components/Toast';

const appForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async () => {
    if (!email) {
      showToast('Error', 'Please enter your email address.', 'error');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      showToast(
        'Success',
        'A password reset link has been sent to your email address.',
        'success',
      );
    } catch (error) {
      if (
        (error as FirebaseAuthTypes.NativeFirebaseAuthError).code ===
        'auth/user-not-found'
      ) {
        showToast('Error', 'No user found with this email address.', 'error');
      } else if (
        (error as FirebaseAuthTypes.NativeFirebaseAuthError).code ===
        'auth/invalid-email'
      ) {
        showToast('Error', 'The email address is not valid.', 'error');
      } else {
        showToast(
          'Error',
          'Something went wrong. Please try again later.',
          'error',
        );
      }
    }
  };
  return {email, setEmail, error, setError, handlePasswordReset};
};

export default appForgetPassword;
