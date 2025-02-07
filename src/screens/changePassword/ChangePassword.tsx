import React from 'react';
import {View, StyleSheet} from 'react-native';
import ContentViewer from '../../components/ContentViewer';
import ActionButton from '../../components/actionButton/ActionButton';
import useChangePassword from './useChangePassword';
import InputField from '../../components/InputField';
import {COLOR} from '../../constants/colors';

const ForgotPasswordScreen = () => {
  const {setPasswords, passwords, handlePasswordReset} = useChangePassword();
  return (
    <ContentViewer title="Reset Password">
      <View style={styles.container}>
        <InputField
          title="Current Password"
          placeholder="Enter current password"
          val={passwords.currentPassword}
          setVal={val => setPasswords({...passwords, currentPassword: val})}
          secureTextEntry={true}
        />
        <InputField
          title="New Password"
          placeholder="Enter new password"
          val={passwords.newPassword}
          setVal={val => setPasswords({...passwords, newPassword: val})}
          secureTextEntry={true}
        />
        <InputField
          title="Confirm new Password"
          placeholder="confirm new password"
          val={passwords.confirmPassword}
          setVal={val => setPasswords({...passwords, confirmPassword: val})}
          secureTextEntry={true}
        />
      </View>
      <View>
        <ActionButton
          color={COLOR.primary}
          onLoadText="Resetting Password..."
          onClick={handlePasswordReset}>
          Reset Password
        </ActionButton>
      </View>
    </ContentViewer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    gap: 30,
  },
});

export default ForgotPasswordScreen;
