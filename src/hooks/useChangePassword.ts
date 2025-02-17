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

    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('New password and confirm password do not match.');
      return;
    }

    if (!user) {
      showToast('No authenticated user found.');
      return;
    }

    try {
      if (!user.email) {
        showToast('No email found for the user.');
        return;
      }

      const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
      await user.reauthenticateWithCredential(credential);

      await user.updatePassword(newPassword);

      showToast('Password updated successfully!');
      navigation.goBack();
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessages: Record<string, string> = {
          'auth/wrong-password': 'The current password is incorrect.',
          'auth/weak-password': 'The new password is too weak.',
        };
        const errorMessage = errorMessages[error.code] || 'Failed to update the password. Please try again.';
        showToast(errorMessage);
      } else {
        showToast('An unexpected error occurred.');
      }
    }
  };

  return { passwords, setPasswords, handlePasswordReset };
};

export default useChangePassword;
