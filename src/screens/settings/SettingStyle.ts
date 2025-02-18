import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/colors";

export const styles = StyleSheet.create({
    header: {
      fontSize: 20,
      fontWeight: '700',
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      paddingBottom: 20,
      gap: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLOR.light_grey,
    },
    userImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    userName: {
      fontSize: 18,
      marginLeft: 10,
      fontWeight: '500',
    },
    userStatus: {
      fontSize: 14,
      color: COLOR.light_grey,
      fontWeight: '400',
      marginLeft: 10,
    },
  });