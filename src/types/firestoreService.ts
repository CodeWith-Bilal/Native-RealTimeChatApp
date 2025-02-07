import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface User {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
  status: string | null;
  chats?: string[];
  contacts?: string[];
}

export interface FirestoreMessage {
  id?: string;
  senderId: string;
  text: string;
  timestamp: FirebaseFirestoreTypes.Timestamp | null;
}

export interface FirestoreChat {
  id?: string;
  members: string[];
  messages?: FirestoreMessage[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  contentType: 'text' | 'image';
  timestamp: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue | null;
  status: {
    sender: string;
    receiver: string;
  };
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  unreadMessages: number;
  notificationStatus: boolean;
  lastActive: string | null;
  participantsDetails: {uid: string; name: string; createdAt: string}[];
}
