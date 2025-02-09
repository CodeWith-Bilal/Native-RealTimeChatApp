import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconButton from '../../../components/IconButton';
import RulerText from '../../../components/RulerText';
import InputField from '../../../components/InputField';
import {ScrollView} from 'react-native-gesture-handler';
import ActionButton from '../../../components/actionButton/ActionButton';
import {COLOR} from '../../../constants/colors';
import AuthHeaderSection from '../../../components/AuthSectionHeader';
// import useSign from './useSignIn';
import Images from '../../../constants/imgs';
import Loader from '../../../components/loader/Loader';
import useAuthFunctionality from '../../../hooks/useAuthFunctionality';
// import useAuthFunctionality from '../../../hooks/useAuthService';

const SignIn: React.FC = () => {
  const {
    signInData,
    handleSignInInputChange,
    handleSignIn,
    loading,
    navigation,
    signInWithGoogle,
    error,
    setError,
  } = useAuthFunctionality();

  return (
    <>
      {loading && <Loader />}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : undefined}
        style={{flex: 1, flexDirection: 'column', padding: 20}}>
        <ScrollView
          contentContainerStyle={{flex: 1, maxWidth: 400, margin: 'auto'}}>
          <View style={{flex: 3}}>
            <AuthHeaderSection
              title="Log in to Chatbox"
              subText="Welcome back! Sign in using your social account or email to continue
            with us"
            />
          </View>

          <View style={{flex: 6}}>
            <IconButton src={Images.GoogleIcon} onPress={signInWithGoogle} />
            <View style={styles.gapVertical}>
              <RulerText />
            </View>

            <View style={{gap: 25}}>
              <InputField
                val={signInData.email}
                setVal={value => handleSignInInputChange('email', value)}
                title="Enter Email"
                type="email-address"
                placeholder="i.e. Jhon@gmail.com"
                setError={setError}
              />

              <InputField
                val={signInData.password}
                setVal={value => handleSignInInputChange('password', value)}
                title="Password"
                type="default"
                secureTextEntry={true}
                placeholder="Enter your password"
                setError={setError}
              />
            </View>
          </View>

          <View style={{flex: 2, rowGap: 10}}>
            <ActionButton
              onClick={handleSignIn}
              loader={loading}
              error={error}
              onLoadText="Signing in...">
              Sign in with email
            </ActionButton>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ForgetPassword')}>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 15,
                  color: COLOR.blue,
                  fontWeight: 600,
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  ghostIcon: {
    paddingVertical: 5,
    width: 40,
    height: 40,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.ghost,
    alignSelf: 'center',
  },
  gapVertical: {marginTop: 10},
});