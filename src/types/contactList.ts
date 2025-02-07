import { User } from "./firestoreService";

export interface ContactsProps {
  sections: {title: string; data: User[]}[];
}
