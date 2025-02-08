import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import useAuth from './useAuth';
import { fetchContactsThunk, setContactsLoading } from '../store/slices/contactSlice';
import { User } from '../types/firestoreService';
import { useAppDispatch, useAppSelector } from '../store/store';

const useContacts = () => {
  const [sections, setSections] = useState<{ title: string; data: User[] }[]>([]);
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { contacts, error } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    if (user?.uid) {
      setContactsLoading(true);
      dispatch(fetchContactsThunk(user.uid));
      setContactsLoading(false);
    }
  }, [user?.uid, dispatch]);

  useEffect(() => {
    if (contacts.length > 0) {
      setSections(groupContactsByAlphabet(contacts));
    }
  }, [contacts]);

  return { contacts, sections, error, addContact, fetchContactsRealtime };
};

const groupContactsByAlphabet = (contacts: User[]) => {
  const grouped: { [key: string]: User[] } = {};

  contacts.forEach((contact) => {
    const firstLetter = contact.displayName ? contact.displayName[0].toUpperCase() : '';
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(contact);
  });

  const sections = Object.keys(grouped)
    .sort()
    .map((letter) => ({
      title: letter,
      data: grouped[letter],
    }));

  return sections;
};

export const fetchContactsRealtime = (
  userId: string,
  callback: (contacts: User[]) => void
) => {
  const userDocRef = firestore().collection('users').doc(userId);

  const unsubscribeUser = userDocRef.onSnapshot(async (userDoc) => {
    const userData = userDoc.data();
    const contactIds = userData?.contacts || [];

    if (contactIds.length === 0) {
      callback([]);
      return;
    }

    const unsubscribeContacts = firestore()
      .collection('users')
      .where(firestore.FieldPath.documentId(), 'in', contactIds)
      .onSnapshot((snapshot) => {
        const contacts = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            uid: doc.id,
            displayName: data.displayName || '',
            email: data.email || '',
            photoURL: data.photoURL || null,
            description: data.description || '',
            status: data.status || null,
          };
        }) as User[];

        callback(contacts);
      });

    return unsubscribeContacts;
  });

  return () => unsubscribeUser();
};

export const addContact = async (userId: string, contactId: string) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .update({
        contacts: firestore.FieldValue.arrayUnion(contactId),
      });

    await firestore()
      .collection('users')
      .doc(contactId)
      .update({
        contacts: firestore.FieldValue.arrayUnion(userId),
      });
  } catch (error) {
    console.error('Error adding contact:', error);
  }
};

export default useContacts;