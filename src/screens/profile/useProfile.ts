import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {showToast} from '../../components/Toast';
import {logoutUser} from '../../services/auth';
import {clearUser, setLoading, setUser} from '../../store/slices/user.slice';

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

  const handlePickAndUploadImage = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      });

      if (response.didCancel) {
        console.error('User canceled image picker');
        setLoading(false);
        setUpdateLoader(false);
        return;
      }

      if (response.errorCode) {
        showToast(
          'Image Picker Error',
          response.errorMessage || 'Unknown error',
          'error',
        );
        setLoading(false);
        setUpdateLoader(false);
        return;
      }

      const imageBase64 = response.assets?.[0].base64;
      if (!imageBase64) {
        showToast('Error', 'Failed to get image data', 'error');
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
      showToast('Error', 'Failed to upload image', 'error');
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

      showToast('Success', 'Profile updated successfully', 'success');
    } catch (error) {
      console.error('Failed to update profile (Profile.tsx):', error);
      showToast(
        'Failed to update profile',
        'There are some issue, that your profile is not updated. Please try again later.',
        'error',
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
    } catch (error) {
      console.error('Failed to logout:', error);
      showToast('Error', 'Failed to logout', 'error');
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
