import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLOR} from '../../constants/colors';
import useWelcomeScreen from './useWelcomeScreen';
import RulerText from '../../components/RulerText';
import IconButton from '../../components/IconButton';
import {signInWithGoogle} from '../../services/auth';
import ActionText from '../../components/ActionText';
import SimpleText from '../../components/SimpleText';
import ActionButton from '../../components/actionButton/ActionButton';

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#050821',
    flex: 1,
    padding: 15,
    gap: 5,
  },
  link: {
    marginTop: 45,
    fontSize: 68,
    lineHeight: 80,
    fontWeight: 400,
    color: COLOR.white,
    paddingVertical: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: 400,
    color: COLOR.light_grey,
    paddingVertical: 15,
  },
  ghostButton_text: {
    textAlign: 'center',
    color: COLOR.white,
    fontSize: 18,
  },
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
});
export default Welcome;
