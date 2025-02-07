import {RootStackParamList} from './../types/navigation.d';

export const settingItems: {
  icon: string;
  title: string;
  subtitle?: string;
  link: keyof RootStackParamList | null;
}[] = [
  {
    icon: require('../assets/icons/notification.png'),
    title: 'Notifications',
    subtitle: 'Messages, group and others',
    link: null,
  },
  {
    icon: require('../assets/icons/help.png'),
    title: 'Help',
    subtitle: 'Help center, contact us, privacy policy',
    link: null,
  },
  {
    icon: require('../assets/icons/password.png'),
    title: 'Change Password',
    subtitle: 'Change Account Password',
    link: 'ChangePassword',
  },
  {
    icon: require('../assets/icons/password.png'),
    title: 'Invite a friend',
    subtitle: '',
    link: null,
  },
];
