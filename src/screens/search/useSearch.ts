import { useState } from 'react';
import { addContact } from '../../hooks/useContacts';
import { addContact as addContactToStore } from '../../store/slices/contactSlice';
import { addUserToContact } from '../../store/slices/user.slice';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { User } from '../../types/firestoreService';

const appSearch = () => {
  const [searchText, setSearchText] = useState<string>('');
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const usersInStore = useAppSelector(state => state.users.users);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(usersInStore);
  const contacts = useAppSelector(state => state.contacts.contacts);

  const handleSearch = (text: string) => {
    setSearchText(text);

    const filtered = usersInStore.filter((user: User) =>
      user.displayName?.toLowerCase().includes(text.toLowerCase()) ||
      user.email?.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  const handleAddContact = async (contactId: string) => {
    if (!contactId) return;

    try {
      dispatch(addContactToStore(contactId));
      dispatch(addUserToContact(contactId));
      await addContact(user?.uid || '', contactId);
      console.log('%c Contact added successfully...', 'font-size:16px;color:green;');
    } catch (error) {
      console.error('Error adding contact:', error);
    } finally {
      console.log('Added via Store...', contacts.map(c => c?.displayName));
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

export default appSearch;
