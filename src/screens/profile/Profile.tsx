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
import {ScrollView} from 'react-native-gesture-handler';
import Images from '../../constants/imgs';
import {COLOR} from '../../constants/colors';
import LoaderScreen from '../../components/loader/Loader';
import useProfile from './useProfile';

const Profile: React.FC = () => {
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

  return (
    <>
      {updateLoader && <LoaderScreen />}
      <ContentViewer title="Profile">
        <ScrollView style={{flex: 1, paddingHorizontal: 12}}>
          <TouchableOpacity
            onPress={handlePickAndUploadImage}
            activeOpacity={0.8}
            style={styles.header}>
            {
              <Image
                style={styles.profileImage}
                source={
                  userData.imageUri
                    ? {uri: userData.imageUri}
                    : Images.PlaceholderImg
                }
              />
            }

            <View style={styles.editButton}>
              <Image source={Images.EditIcon} style={{width: 10, height: 10}} />
            </View>
          </TouchableOpacity>

          <KeyboardAvoidingView style={{flex: 6, gap: 40, padding: 20}}>
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

          <View style={{flex: 2, rowGap: 10}}>
            <ActionButton
              onClick={handleUpdateProfile}
              color="#3D4A7A"
              loader={updateLoader}
              onLoadText="Updating...">
              Update Profile
            </ActionButton>

            <ActionButton
              onClick={handleLogout}
              color="tomato"
              loader={logoutLoader}
              onLoadText="Logging out...">
              Logout
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
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#3D4A7A',
  },
  emailText: {
    fontSize: 16,
    color: '#3D4A7A',
    marginBottom: 10,
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
