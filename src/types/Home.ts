import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation'; 

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};
