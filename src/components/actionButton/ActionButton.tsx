import {
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ActionButtonProps} from '../../types/actionButton';
import ButtonContent from './ButtonContent';

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  loader,
  color,
  onLoadText,
  children,
  error,
}) => {
  return !color ? (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}
      style={{
        padding: 14,
        borderRadius: 16,
      }}
      colors={['#010102', '#192f6a', '#3b5998']}>
      <ButtonContent
        onClick={onClick}
        loader={loader}
        onLoadText={onLoadText}
        children={children}
        error={error}
      />
    </LinearGradient>
  ) : (
    <View
      style={{
        padding: 14,
        borderRadius: 16,
        backgroundColor: color,
      }}>
      <ButtonContent
        onClick={onClick}
        loader={loader}
        onLoadText={onLoadText}
        children={children}
      />
    </View>
  );
};

export default ActionButton;
