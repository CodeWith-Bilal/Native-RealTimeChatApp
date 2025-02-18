import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/colors";

export const styles = StyleSheet.create({
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