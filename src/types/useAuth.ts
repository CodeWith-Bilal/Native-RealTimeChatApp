import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User } from "./firestoreService";

export interface UseAuthReturn {
    user: User | null;
    loading: boolean;
    error: string | null;
    handleLogin: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential | void>;
    handleSignUp: (email: string, password: string, name: string) => Promise<FirebaseAuthTypes.UserCredential | void>;
    handleLogout: () => Promise<void>;
  }
  