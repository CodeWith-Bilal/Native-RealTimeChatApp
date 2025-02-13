import React from 'react';
import { View} from 'react-native';
import InputField from '../../../components/InputField';
import {ScrollView} from 'react-native-gesture-handler';
import ActionButton from '../../../components/actionButton/ActionButton';
import AuthHeaderSection from '../../../components/AuthSectionHeader';
import Loader from '../../../components/loader/Loader';
import useAuthFunctionality from '../../../hooks/useAuthFunctionality';

const SignIn: React.FC = () => {
  const {userData, handleSignUpInputChange, signUpHandler, loading, error, setError} =
    useAuthFunctionality();

  return (
    <>
      {loading && <Loader />}
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 20,
          paddingVertical: 60,
          columnGap: 40,
        }}>
        <AuthHeaderSection
          title="Sign up with Email"
          subText="Get chatting with friends and family today by signing up for our chat
        app!"
          styleSubTitle={{width: '80%'}} style={{marginBottom: 20}}
        />

        <View style={{flex: 6, paddingHorizontal: 10, paddingVertical: 50}}>
          <View style={{gap: 30}}>
            <InputField
              val={userData.name}
              setVal={value => handleSignUpInputChange('name', value)}
              title="Enter Name"
              type="default"
              placeholder="Jhon Doe"
              setError={setError}
            />
            <InputField
              val={userData.email}
              setVal={value => handleSignUpInputChange('email', value)}
              title="Enter Email"
              type="email-address"
              placeholder="i.e. Jhon@gmail.com"
              setError={setError}
            />

            <InputField
              val={userData.password}
              setVal={value => handleSignUpInputChange('password', value)}
              placeholder="Enter your password"
              title="Password"
              type="default"
              secureTextEntry={true}
              setError={setError}
            />

            <InputField
              val={userData.confirmPassword}
              setVal={value => handleSignUpInputChange('confirmPassword', value)}
              title="Confirm Password"
              type="default"
              secureTextEntry={true}
              placeholder="Enter confirm password"
              setError={setError}
            />
          </View>
        </View>

        <View style={{flex: 2, marginTop: 30, paddingVertical: 10}}>
          <ActionButton
            onClick={signUpHandler}
            loader={loading}
            error={error}
            onLoadText="Adding yourself...">
            Reginster Me
          </ActionButton>
        </View>
      </ScrollView>
    </>
  );
};

export default SignIn;
