import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from './navigation';

export type ChatScreenProps = {
  name: string;
  params: {
    chatId: string;
    participant: {
      uid: string;
      displayName: string;
      photoURL: string;
      status: string;
    };
  };
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

export interface ChatProps {
  route: ChatScreenRouteProp;
}
