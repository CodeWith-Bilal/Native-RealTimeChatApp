
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchUserData } from '../store/slices/userSlice';

import WelcomeScreen from '../screens/welcomescreen/WelcomeScreen';
import SignInScreen from '../screens/authScreens/signin/SignIn';
import SignUp from '../screens/authScreens/signup/SignUp';
import Profile from '../screens/profile/Profile';
import Search from '../screens/search/Search';
import BottomTabsNavigator from './BottomTabsNavigator';
import ChangePassword from '../screens/changePassword/ChangePassword';
import ChatScreen from '../screens/chat/Chat';
import ForgetPassword from '../screens/forgetPassword/ForgetPassword';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser?.uid) {
        dispatch(fetchUserData(firebaseUser.uid)); // Fetch user data
      }
      setIsAuthChecked(true); // Mark authentication check as complete
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Ensure user data persists even after screen changes
  useEffect(() => {
    if (user.uid && !user.photoURL) {
      dispatch(fetchUserData(user.uid));
    }
  }, [dispatch, user.uid, user.photoURL]);

  if (!isAuthChecked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={user?.uid ? 'MainTabs' : 'WelcomeScreen'}>
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
  );
};

export default Navigation;


// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, View } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import auth from '@react-native-firebase/auth';
// import { useAppDispatch, useAppSelector } from '../store/store';
// import { fetchUserData } from '../store/slices/userSlice';
// import WelcomeScreen from '../screens/welcomescreen/WelcomeScreen';
// import SignInScreen from '../screens/authScreens/signin/SignIn';
// import SignUp from '../screens/authScreens/signup/SignUp';
// import Profile from '../screens/profile/Profile';
// import Search from '../screens/search/Search';
// import BottomTabsNavigator from './BottomTabsNavigator';
// import ChangePassword from '../screens/changePassword/ChangePassword';
// import ChatScreen from '../screens/chat/Chat';
// import ForgetPassword from '../screens/forgetPassword/ForgetPassword';

// const Stack = createNativeStackNavigator();

// const Navigation = () => {
//   const dispatch = useAppDispatch();
//   const user = useAppSelector(state => state.user);
//   const [isAuthChecked, setIsAuthChecked] = useState(false);

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged(firebaseUser => {
//       if (firebaseUser?.uid) {
//         dispatch(fetchUserData(firebaseUser.uid)); // Fetch user data
//       }
//       setIsAuthChecked(true); // Mark authentication check as complete
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   if (!isAuthChecked) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={user?.uid ? 'MainTabs' : 'WelcomeScreen'}>
//       {user?.uid ? (
//         <>
//           <Stack.Screen name="MainTabs" component={BottomTabsNavigator} />
//           <Stack.Screen name="Search" component={Search} />
//           <Stack.Screen name="Chat" component={ChatScreen} />
//           <Stack.Screen name="Profile" component={Profile} />
//           <Stack.Screen name="ChangePassword" component={ChangePassword} />
//         </>
//       ) : (
//         <>
//           <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
//           <Stack.Screen name="SignUp" component={SignUp} />
//           <Stack.Screen name="SignIn" component={SignInScreen} />
//           <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// };

// export default Navigation;
