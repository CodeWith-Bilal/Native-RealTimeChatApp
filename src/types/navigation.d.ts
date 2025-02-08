import { userProfile } from "./profile";

export type RootStackParamList = {
  WelcomeScreen: undefined;
  SignIn: undefined;
  Home: undefined;
  SignUp: undefined;
  Contacts: undefined;
  Profile: undefined;
  Search: undefined;
  MainTabs: undefined;
  Settings: undefined;
  ForgetPassword: undefined;
  ChangePassword: undefined;
  Chat: {
    chatId: string;
    participant: userProfile;
  };
};

