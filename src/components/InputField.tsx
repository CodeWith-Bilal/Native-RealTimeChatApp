import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { InputFieldProps } from '../types/inputField';
import { COLOR } from '../constants/colors';

function InputField({
  placeholder,
  type = 'default',
  title,
  secureTextEntry = false,
  setVal,
  val,
}: InputFieldProps) {
  return (
    <View>
      <Text
        style={{
          color: COLOR.primary,
          fontWeight: '500',
          fontSize: 16,
        }}>
        {title}
      </Text>
      <TextInput
        style={{
          height: 38,
          borderBottomWidth: 1,
          borderBottomColor: COLOR.light_grey,
          paddingInlineStart: 0,
          color: COLOR.black,
        }}
        placeholder={placeholder || ''}
        placeholderTextColor={COLOR.gray}
        value={val}
        secureTextEntry={secureTextEntry}
        onChangeText={text => setVal(text)} // Directly set the value
        keyboardType={type}
        autoCapitalize="none"
      />
    </View>
  );
}

export default InputField;
