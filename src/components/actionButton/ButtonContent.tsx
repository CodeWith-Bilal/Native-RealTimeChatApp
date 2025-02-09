import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ActionButtonProps} from '../../types/actionButton';
import {COLOR} from '../../constants/colors';

const ButtonContent: React.FC<ActionButtonProps> = ({
  onClick,
  loader,
  children,
  error = false,
}) => {
  const handleClick = () => {
    if (error) {
      ToastAndroid.show(
        typeof error === 'string' ? error : 'An unknown error occurred',
        ToastAndroid.SHORT,
      );
    } else {
      onClick();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleClick}
      disabled={loader}
      style={{
        borderRadius: 8,
      }}>
      {loader ? (
        
          <ActivityIndicator color={COLOR.white} />

      ) : (
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: COLOR.white,
            fontWeight: '600',
            paddingVertical: 10,
            paddingHorizontal: 10,
            // backgroundColor: COLOR.blue,
            borderRadius: 8,
          }}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonContent;
