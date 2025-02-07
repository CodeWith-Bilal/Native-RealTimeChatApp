import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import useNavigationHook from '../hooks/useNavigationHook';
import Loader from '../components/loader/Loader';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { user, isAuthChecked, userLoader } = useNavigationHook();

  if (userLoader) {
    return <Loader />;
  }

  return isAuthChecked ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={user?.uid ? "MainTabs" : "WelcomeScreen"}>
      {user?.uid ? (
        <>
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="MainTabs" component={BottomTabsNavigator} />
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
