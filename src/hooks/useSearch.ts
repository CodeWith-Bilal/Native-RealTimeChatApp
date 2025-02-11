import {useState} from 'react';
import {addContact} from '../hooks/useContacts';
import {addContact as addContactToStore} from '../store/slices/contactSlice';
import {addUserToContact} from '../store/slices/userSlice';
import useAuth from '../hooks/useAuth';
import {useAppDispatch, useAppSelector} from '../store/store';
import {User} from '../types/firestoreService';
import { ToastAndroid } from 'react-native';

const useAppSearch = () => {
  const [searchText, setSearchText] = useState<string>('');
  const {user} = useAuth();
  const dispatch = useAppDispatch();
  const {users: usersInStore} = useAppSelector(state => state.users);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(usersInStore);
  const {contacts} = useAppSelector(state => state.contacts);

  const handleSearch = (text: string) => {
    setSearchText(text);

    const filtered = usersInStore.filter(
      (u: User) =>
        u.displayName?.toLowerCase().includes(text.toLowerCase()) ||
        u.email?.toLowerCase().includes(text.toLowerCase()),
    ).filter((u: User) => u.uid !== user?.uid);

    setFilteredUsers(filtered);
  };

  const handleAddContact = async (contactId: string) => {
    try {
      if (contactId) {
        dispatch(addContactToStore(contactId));
        dispatch(addUserToContact(contactId));
        await addContact(user?.uid || '', contactId);
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      ToastAndroid.show('Failed to add contact', ToastAndroid.LONG);
    }
  };

  return {
    searchText,
    setSearchText,
    filteredUsers,
    handleSearch,
    handleAddContact,
    contacts,
  };
};

export default useAppSearch;