import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {User} from './firestoreService';

export interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  observeAuth: () => () => void;
  handleLogin: (
    email: string,
    password: string,
  ) => Promise<FirebaseAuthTypes.UserCredential | void>;
  handleSignUp: (
    email: string,
    password: string,
    name: string,
  ) => Promise<FirebaseAuthTypes.UserCredential | void>;
}

export interface GoogleUser {
  user: {
    id: string;
    name: string;
    email: string;
    photo: string | null;
    familyName?: string;
    givenName?: string;
  };
}
