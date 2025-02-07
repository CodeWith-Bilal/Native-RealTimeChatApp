import React from 'react';
import {Text, TextStyle} from 'react-native';
import {COLOR as ThemeColor} from '../constants/colors';

type SimpleTextProps = {
  text: string;
  color?: string;
  align?: 'center' | 'left' | 'right';
  styles?: TextStyle;
  type?: 'h' | 'p';
};

const SimpleText: React.FC<SimpleTextProps> = ({
  text,
  type = 'p',
  color = ThemeColor.black,
  align,
  styles,
}) => {
  return (
    <Text
      style={
        type === 'p'
          ? [
              {
                fontSize: 16,
                lineHeight: 26,
                fontWeight: 400,
                paddingVertical: 15,
              },
              {color, textAlign: align},
              styles,
            ]
          : styles
      }>
      {text}
    </Text>
  );
};

export default SimpleText;
