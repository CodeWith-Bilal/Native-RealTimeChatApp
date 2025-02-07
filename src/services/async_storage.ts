// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { User } from "../types/firestoreService";

// const USER_STORAGE_KEY = "USER_SESSION";

// export const saveUserToStorage = async (user: User) => {
//   try {
//     await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
//     console.log('User saved to storage...', user.displayName);
//   } catch (error) {
//     console.error('Error saving user to storage:', error);
//   }
// };

// export const getUserFromStorage = async () => {
//   try {
//     const userJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
//     const user = userJson ? JSON.parse(userJson) : null;
//     return user;
//   } catch (error) {
//     console.error('Error retrieving user from storage:', error);
//     return null;
//   }
// };

// export const removeUserFromStorage = async () => {
//   await AsyncStorage.removeItem(USER_STORAGE_KEY);
// };
