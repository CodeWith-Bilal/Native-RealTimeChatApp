import React from 'react';
import {View, Text} from 'react-native';
import {COLOR} from '../../constants/colors';
import useWelcomeScreen from '../../hooks/useWelcomeScreen';
import RulerText from '../../components/RulerText';
import IconButton from '../../components/IconButton';
import {signInWithGoogle} from '../../hooks/useAuthService';
import ActionText from '../../components/ActionText';
import SimpleText from '../../components/SimpleText';
import ActionButton from '../../components/actionButton/ActionButton';
import { styles } from './WelcomScreen';

const Welcome = () => {
  const {navigation} = useWelcomeScreen();

  return (
    <View style={styles.container}>
      <Text style={styles.link}>Connect friends easily & quickly</Text>
      <SimpleText
        text="Our chat app is the perfect way to stay connected with friends and
        family."
        color={COLOR.light_grey}
      />

      <IconButton
        src={require('../../assets/icons/google_icon.png')}
        onPress={signInWithGoogle}
      />

      <RulerText textColor="white" />

      <ActionButton
        onClick={() => navigation.navigate('SignUp')}
        loader={false}
        onLoadText="Signing up...">
        Sign up with mail
      </ActionButton>

      <ActionText
        styles={{
          ...styles.description,
          fontSize: 14,
          color: COLOR.white,
          textAlign: 'center',
          marginTop: 20,
        }}
        onPress={() => navigation.navigate('SignIn')}>
        Existing account?{' '}
        <SimpleText
          text="Log In"
          styles={{fontWeight: 600}}
          color={COLOR.light_grey}
        />{' '}
      </ActionText>
    </View>
  );
};


export default Welcome;
