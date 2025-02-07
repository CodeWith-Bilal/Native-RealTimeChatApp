import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ActionTextProps} from '../types/actionText';

const ActionText: React.FC<ActionTextProps> = ({onPress, children, styles}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Text style={[styles]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ActionText;
