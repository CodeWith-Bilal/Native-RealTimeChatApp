import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ContentViewer from '../../components/ContentViewer';
import useContacts from '../../hooks/useContacts';
import Contacts from '../../components/ContactsList';
import Loader from '../../components/loader/Loader';
import {useAppSelector} from '../../store/store';

const ContactsScreen: React.FC = () => {
  const {sections} = useContacts();
  const {contacts, loading} = useAppSelector(state => state.contacts);
  return (
    <ContentViewer title="Contacts">
      <Text style={styles.pageHead}>My Contacts</Text>
      {contacts.length === 0 && loading ? (
        <View>
          <Loader />
        </View>
      ) : (
        <Contacts sections={sections} />
      )}
    </ContentViewer>
  );
};

const styles = StyleSheet.create({
  pageHead: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
});

export default ContactsScreen;
