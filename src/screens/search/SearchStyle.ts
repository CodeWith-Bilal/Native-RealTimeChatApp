import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    resultsContainer: {
      marginTop: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLOR.black,
      marginVertical: 10,
    },
    addContactButton: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 20,
      backgroundColor: '#ccc',
      width: 40,
      height: 40,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    userImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: '#ccc',
    },
    userName: {
      fontSize: 16,
      color: COLOR.pure_gray,
    },
    noResultsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    noResultsText: {
      fontSize: 15,
      color: '#888',
    },
  });