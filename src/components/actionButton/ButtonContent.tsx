
import React from 'react';
import {ActivityIndicator, Text, ToastAndroid, TouchableOpacity} from 'react-native';
import {ActionButtonProps} from '../../types/actionButton';
import { COLOR } from '../../constants/colors';

const ButtonContent: React.FC<ActionButtonProps> = ({
  onClick,
  loader,
  children,
  error = false,
}) => {
  const handleClick = () => {
    error
      ? ToastAndroid.show(
          'Error',
          ToastAndroid.LONG,
        )
      : onClick();
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleClick}
      disabled={loader}
      >
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          color: COLOR.white,
          fontWeight: 600,
        }}>
        {!error && loader ? <ActivityIndicator color="#fff" /> : children}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonContent;
