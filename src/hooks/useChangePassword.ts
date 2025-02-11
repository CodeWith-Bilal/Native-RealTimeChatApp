import { FirebaseError } from '@firebase/util';
import auth from '@react-native-firebase/auth';
import useNavigate from './useNavigationHook';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';

const initialState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const useChangePassword = () => {
  const [passwords, setPasswords] = useState(initialState);
  const { navigation } = useNavigate();
  const user = auth().currentUser;

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const handlePasswordReset = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwords;

    // Validation: Check if all fields are filled
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('All fields are required.');
      return;
    }

    // Validation: Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      showToast('New password and confirm password do not match.');
      return;
    }

    // Check if a user is logged in
    if (!user) {
      showToast('No authenticated user found.');
      return;
    }

    try {
      // Ensure user has an email
      if (!user.email) {
        showToast('No email found for the user.');
        return;
      }

      // Reauthenticate the user with the current password
      const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
      await user.reauthenticateWithCredential(credential);

      // Update the password
      await user.updatePassword(newPassword);

      // Success feedback
      showToast('Password updated successfully!');
      navigation.goBack();
    } catch (error) {
      // Handle FirebaseError
      if (error instanceof FirebaseError) {
        const errorMessages: Record<string, string> = {
          'auth/wrong-password': 'The current password is incorrect.',
          'auth/weak-password': 'The new password is too weak.',
        };
        const errorMessage = errorMessages[error.code] || 'Failed to update the password. Please try again.';
        showToast(errorMessage);
      } else {
        // Handle unexpected errors
        console.error('Unexpected error:', error);
        showToast('An unexpected error occurred.');
      }
    }
  };

  return { passwords, setPasswords, handlePasswordReset };
};

export default useChangePassword;
