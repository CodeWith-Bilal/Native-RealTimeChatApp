import {FirebaseError} from '@firebase/util';
import auth from '@react-native-firebase/auth';
import useNavigate from '../../hooks/useNavigationHook';
import {useState} from 'react';
import {showToast} from '../../components/Toast';

const initialState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const appChangePassword = () => {
  const [passwords, setPasswords] = useState(initialState);
  const {navigation} = useNavigate();
  const user = auth().currentUser;

  const handlePasswordReset = async () => {
    const {currentPassword, newPassword, confirmPassword} = passwords;

    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('Error', 'All fields are required.', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast(
        'Error',
        'Passwords & Confirm Password are different.',
        'error',
      );
      return;
    }
    if (!user) {
      showToast('Error', 'No authenticated user found.', 'error');
      return;
    }

    try {
      if (!user.email) {
        showToast('Error', 'No email found for the user.', 'error');
        return;
      }
      const credential = auth.EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await user.reauthenticateWithCredential(credential);

      await user.updatePassword(newPassword);

      showToast('Success', 'Password updated successfully!', 'success');
      navigation.goBack();
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/wrong-password') {
          showToast('Error', 'The current password is incorrect.', 'error');
        } else {
          showToast(
            'Error',
            'Failed to update the password. Please try again.',
            'error',
          );
        }
      } else {
        showToast('Error', 'An unexpected error occurred.', 'error');
      }
    }
  };

  return {passwords, setPasswords, handlePasswordReset};
};

export default appChangePassword;
