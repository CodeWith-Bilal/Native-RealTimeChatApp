import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import InputField from '../../components/InputField';
import ActionButton from '../../components/actionButton/ActionButton';
import ContentViewer from '../../components/ContentViewer';
import { ScrollView } from 'react-native-gesture-handler';
import Images from '../../constants/imgs';
import { COLOR } from '../../constants/colors';
import LoaderScreen from '../../components/loader/Loader';
import useProfile from '../../hooks/useProfile';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch } from '../../store/store';
import { fetchUserData } from '../../store/slices/userSlice';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    handlePickAndUploadImage,
    userData,
    handleInputChange,
    error,
    handleLogout,
    handleUpdateProfile,
    updateLoader,
    logoutLoader,
  } = useProfile();

  // Re-fetch user data when the Profile screen is focused
  useFocusEffect(
    React.useCallback(() => {
      if (userData.uid) {
        dispatch(fetchUserData(userData.uid)); // Fetch user data
      }
    }, [dispatch, userData.uid])
  );

  return (
    <>
      {updateLoader && <LoaderScreen />}
      <ContentViewer title="Profile">
        <ScrollView style={{ flex: 1, paddingHorizontal: 12 }}>
          <TouchableOpacity
            onPress={handlePickAndUploadImage}
            activeOpacity={0.8}
            style={styles.header}>
            <Image
              style={styles.profileImage}
              source={
                userData.imageUri
                  ? { uri: userData.imageUri }
                  : Images.PlaceholderImg
              }
            />
            <View style={styles.editButton}>
              <Image source={Images.EditIcon} style={{ width: 10, height: 10 }} />
            </View>
          </TouchableOpacity>

          <KeyboardAvoidingView style={{ flex: 6, gap: 40, padding: 20 }}>
            <InputField
              title="Name"
              placeholder="Enter your name"
              type="default"
              val={userData.name}
              setVal={value => handleInputChange('name', value)}
            />
            <InputField
              title="Email"
              placeholder="Enter your email"
              type="email-address"
              val={userData.email}
              setVal={value => handleInputChange('email', value)}
            />
            <InputField
              title="Your Status"
              placeholder="Enter your status"
              type="default"
              val={userData.status}
              setVal={value => handleInputChange('status', value)}
            />
            {error && <Text style={styles.error}>{error}</Text>}
          </KeyboardAvoidingView>

          <View style={{ flex: 2, rowGap: 10, width: 290, marginHorizontal: 20 }}>
            <ActionButton
              onClick={handleUpdateProfile}
              color="#3D4A7A"
              loader={updateLoader}
              onLoadText="Updating...">
              Update Profile
            </ActionButton>
            <ActionButton
              onClick={handleLogout}
              color="#3D4A7A"
              loader={logoutLoader}
              onLoadText="Logging out...">
              Log out
            </ActionButton>
          </View>
        </ScrollView>
      </ContentViewer>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '40%',
    alignSelf: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: 15,
    width: 15,
    height: 15,
    borderRadius: 10,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.black,
  },
});

export default Profile;
