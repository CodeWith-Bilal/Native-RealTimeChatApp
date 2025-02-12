import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAppDispatch, useAppSelector } from '../store/store';
import { ToastAndroid } from 'react-native';
import { logoutUser } from './useAuthService';
import { clearUser, setLoading, setUser } from '../store/slices/userSlice';

const useProfile = () => {
  const { isLoading, ...user } = useAppSelector(state => state.user);
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

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          const userData = doc.data();
          console.log('Fetched User Data:', userData); // Log fetched user data
          setUserData({
            name: userData.displayName || '',
            email: userData.email || '',
            status: userData.status || '',
            imageUri: userData.photoURL || '',
          });
          dispatch(setUser({ ...userData, uid: user.uid }));
        }
      }, error => {
        console.error('Error fetching user data:', error);
      });
  
    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [user.uid, dispatch]);
  
  const handleInputChange = (field: string, value: string | null) => {
    setUserData(prevState => ({ ...prevState, [field]: value }));
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
        return;
      }

      if (response.errorCode) {
        showToast(response.errorMessage || 'Image picker error');
        return;
      }

      const imageBase64 = response.assets?.[0].base64;
      if (!imageBase64) {
        showToast('Failed to get image data');
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
        { merge: true },
      );

      setUserData(prevState => ({
        ...prevState,
        imageUri: imageDataUri,
      }));

      dispatch(setUser({ ...user, photoURL: imageDataUri, uid: user.uid }));
      setUpdateLoader(false);
    } catch (err) {
      console.error('Error handling image:', err);
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
      if (!userId) {
        throw new Error('User ID is not available');
      }

      // Update the Redux store with the new user data
      dispatch(
        setUser({
          uid: userId,
          displayName: userData.name || '',
          email: userData.email || '',
          status: userData.status || '',
        }),
      );

      // Update Firestore
      await firestore().collection('users').doc(userId).set({
        displayName: userData.name || '',
        email: userData.email || '',
        status: userData.status || '',
      }, { merge: true });

      showToast('Profile updated successfully');
    } catch (err) {
      console.error('Failed to update profile:', err);
      showToast('Failed to update profile. Please try again later.');
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
    } catch (err) {
      console.error('Failed to logout:', err);
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

export default useProfile;
