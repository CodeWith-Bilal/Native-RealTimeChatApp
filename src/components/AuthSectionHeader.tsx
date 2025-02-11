import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthHeaderSectionProps} from '../types/sectionHeaders';
import SimpleText from './SimpleText';
import {COLOR} from '../constants/colors';

const AuthHeaderSection: React.FC<AuthHeaderSectionProps> = ({
  title,
  subText,
  styleSubTitle,
  styleTitle,
}) => {
  return (
    <View style={styles.container}>
      <SimpleText
        type="h"
        text={title}
        styles={StyleSheet.flatten([styles.title, styleTitle])}
      />
      <SimpleText
        text={subText}
        color={COLOR.black}
        align="center"
        styles={StyleSheet.flatten([styleSubTitle])}
      />
    </View>
  );
};

export default AuthHeaderSection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    paddingTop: 40,
  },
  title: {
    color: COLOR.blue,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
