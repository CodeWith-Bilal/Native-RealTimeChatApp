import {useState} from 'react';
import {addContact} from '../../services/contacts';
import {addContact as addContactToStore} from '../../store/slices/contacts.slice';
import {addUserToContact} from '../../store/slices/user.slice';
import useAuth from '../../hooks/useAuth';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {saveUserToStorage} from '../../services/async_storage';
import {User} from '../../types/firestoreService';

const appSearch = () => {
  const [searchText, setSearchText] = useState<string>('');
  const {user} = useAuth();
  const dispatch = useAppDispatch();
  const {users: usersInStore} = useAppSelector(state => state.users);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(usersInStore);
  const {contacts} = useAppSelector(state => state.contacts);

  const handleSearch = (text: string) => {
    setSearchText(text);

    const filtered = usersInStore.filter(
      (user: User) =>
        user.displayName?.toLowerCase().includes(text.toLowerCase()) ||
        user.email?.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredUsers(filtered);
  };

  const handleAddContact = async (contactId: string) => {
    try {
      if (contactId) {
        dispatch(addContactToStore(contactId));
        dispatch(addUserToContact(contactId));
        await addContact(user?.uid || '', contactId);
        if (user) {
          await saveUserToStorage(user);
          console.log(
            '%c Contact added successfully...',
            'font-size:16px;color:green;',
          );
        }
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    } finally {
      console.log(
        'Added via Store...',
        contacts.map(c => c?.displayName),
      );
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
