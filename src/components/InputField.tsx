import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {InputFieldProps} from '../types/inputField';
import {COLOR} from '../constants/colors';
import useInputValidation from '../hooks/useInputValidation';

function InputField({
  placeholder,
  type = 'default',
  title,
  secureTextEntry = false,
  setVal,
  val,
  setError,
}: InputFieldProps) {
  const {isError, handleChange} = useInputValidation(
    title,
    type,
    setVal,
    setError,
  );

  return (
    <View>
      <Text
        style={{
          color: isError ? COLOR.red : COLOR.primary,
          fontWeight: '500',
          fontSize: 16,
        }}>
        {title}
      </Text>
      <TextInput
        style={{
          height: 38,
          borderBottomWidth: 1,
          borderBottomColor: isError ? COLOR.light_red : COLOR.light_grey,
          paddingInlineStart: 0,
          color: COLOR.black,
        }}
        placeholder={placeholder || ''}
        placeholderTextColor={COLOR.gray}
        value={val}
        secureTextEntry={secureTextEntry}
        onChangeText={text => handleChange(text)}
        keyboardType={type}
        autoCapitalize="none"
      />
      {isError && (
        <Text
          style={{
            color: COLOR.red,
            fontSize: 12,
            fontWeight: '300',
            marginTop: 2,
            textAlign: 'right',
          }}>
          {isError}
        </Text>
      )}
    </View>
  );
}

export default InputField;
