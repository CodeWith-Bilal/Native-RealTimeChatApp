import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './navigation';
import {RouteProp} from '@react-navigation/native';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

export type ProfileProps = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

export type userProfile = {
  uid: string;
  displayName: string;
  photoURL: string | null;
  status?: string;
};
