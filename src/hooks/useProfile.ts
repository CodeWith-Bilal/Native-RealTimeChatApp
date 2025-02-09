import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAppDispatch, useAppSelector} from '../store/store';
import {ToastAndroid} from 'react-native';
import {logoutUser} from './useAuthService';
import {clearUser, setLoading, setUser} from '../store/slices/userSlice';

const appProfile = () => {
  const {isLoading, ...user} = useAppSelector(state => state.user);
  const [userData, setUserData] = useState({
    name: user.displayName || '',
    email: user.email || '',
    status: user.status || '',
    imageUri: user.photoURL || '',
  });
  const [updateLoader, setUpdateLoader] = useState(isLoading);
  const [logoutLoader, setLogoutLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleInputChange = (field: string, value: string | null) => {
    setUserData(prevState => ({...prevState, [field]: value}));
  };

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handlePickAndUploadImage = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      });

      if (response.didCancel) {
        showToast('User canceled image picker');
        setLoading(false);
        setUpdateLoader(false);
        return;
      }

      if (response.errorCode) {
        showToast(response.errorMessage || 'Image picker error');
        setLoading(false);
        setUpdateLoader(false);
        return;
      }

      const imageBase64 = response.assets?.[0].base64;
      if (!imageBase64) {
        showToast('Failed to get image data');
        setLoading(false);
        setUpdateLoader(false);
        return;
      }

      setUpdateLoader(true);
      const imageDataUri = `data:image/jpeg;base64,${imageBase64}`;

      const userId = user?.uid;
      if (!userId) {
        throw new Error('User ID is not available');
      }

      await firestore().collection('users').doc(userId).set(
        {
          photoURL: imageDataUri,
        },
        {merge: true},
      );

      if (user) {
        const updatedUser = {
          ...user,
          photoURL: imageDataUri,
        };

        setUserData(prevState => ({
          ...prevState,
          imageUri: imageDataUri,
        }));
      }

      if (user?.uid) {
        dispatch(setUser({...user, photoURL: imageDataUri, uid: user.uid}));
      }
      setUpdateLoader(false);
    } catch (error) {
      console.error('Error handling image:', error);
      showToast('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setUpdateLoader(true);
    setError(null);

    try {
      const userId = user?.uid;
      dispatch(
        setUser({
          uid: userId || '',
          displayName: userData.name || '',
          email: userData.email || '',
          status: userData.status || '',
        }),
      );

      if (userId) {
        await firestore()
          .collection('users')
          .doc(userId)
          .update({
            displayName: userData.name || '',
            email: userData.email || '',
            status: userData.status || '',
          });
      }

      showToast('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile (Profile.tsx):', error);
      showToast(
        'Failed to update profile. Please try again later.',
      );
    } finally {
      setUpdateLoader(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutLoader(true);
      await logoutUser();
      dispatch(clearUser());
      showToast('Logged out successfully');
    } catch (error) {
      console.error('Failed to logout:', error);
      showToast('Failed to logout');
    } finally {
      setLogoutLoader(false);
    }
  };

  return {
    userData,
    updateLoader,
    error,
    handleInputChange,
    handlePickAndUploadImage,
    handleUpdateProfile,
    handleLogout,
    logoutLoader,
  };
};

export default appProfile;
