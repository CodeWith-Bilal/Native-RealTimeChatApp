import React from 'react';
import {StyleSheet, View} from 'react-native';
import InputField from '../../components/InputField';
import AuthHeaderSection from '../../components/AuthSectionHeader';
import ActionButton from '../../components/actionButton/ActionButton';
import useForgetPassword from '../../hooks/useForgetPassword';

const ForgetPassword = () => {
  const {email, setEmail, setError, error, handlePasswordReset} =
    useForgetPassword();
  return (
    <>
      <View style={ForgetPasswordScreen.header}>
        <AuthHeaderSection
          title="Forget Password"
          subText="Forgot your password? Don’t worry, we’ll send you a magic link right
          at your inbox!"
          styleSubTitle={{width: '80%'}}
        />
      </View>
      <View style={ForgetPasswordScreen.formBody}>
        <View style={ForgetPasswordScreen.formBody_Content}>
          <InputField
            title="Email"
            placeholder="Enter your email"
            type="email-address"
            val={email}
            setVal={(value: string) => setEmail(value)}
            setError={(err: string) => setError(err)}
          />
          <ActionButton
            onLoadText="Sending email..."
            error={error}
            onClick={handlePasswordReset}>
            Send Magic Link
          </ActionButton>
        </View>
      </View>
    </>
  );
};

export default ForgetPassword;

const ForgetPasswordScreen = StyleSheet.create({
  header: {flex: 3, justifyContent: 'flex-end', alignItems: 'flex-start'},
  formBody: {
    flex: 5,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  formBody_Content: {
    width: '90%',
    margin: 'auto',
    height: '100%',
    justifyContent: 'space-between',
  },
});
