import { TextStyle } from "react-native";

export type ActionTextProps = {
  onPress: () => void;
  styles: TextStyle;
  children: React.ReactNode | string;
};
