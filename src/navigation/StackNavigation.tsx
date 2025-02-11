import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth'; // Import Firebase Auth
import WelcomeScreen from '../screens/welcomescreen/WelcomeScreen';
import SignInScreen from '../screens/authScreens/signin/SignIn';
import SignUp from '../screens/authScreens/signup/SignUp';
import Profile from '../screens/profile/Profile';
import { RootStackParamList } from '../types/navigation';
import Search from '../screens/search/Search';
import BottomTabsNavigator from './BottomTabsNavigator';
import ChangePassword from '../screens/changePassword/ChangePassword';
import ChatScreen from '../screens/chat/Chat';
import ForgetPassword from '../screens/forgetPassword/ForgetPassword';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const [user, setUser] = useState<any>(null); // State to hold user data
  const [isAuthChecked, setIsAuthChecked] = useState(false); // State to check if auth is checked

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser); // Set user data
      setIsAuthChecked(true); // Mark auth check as complete
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return isAuthChecked ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={user?.uid ? 'MainTabs' : 'WelcomeScreen'}>
      {user?.uid ? (
        <>
          <Stack.Screen name="MainTabs" component={BottomTabsNavigator} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </>
      ) : (
        <>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </>
      )}
    </Stack.Navigator>
  ) : null; // Optionally return null or a loading screen
};

export default Navigation;
