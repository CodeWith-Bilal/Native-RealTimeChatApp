import React from 'react';
import {Text, StyleSheet} from 'react-native';
import ContentViewer from '../../components/ContentViewer';
import useContacts from '../../hooks/useContacts';
import Contacts from '../../components/ContactsList';

const ContactsScreen: React.FC = () => {
  const {sections} = useContacts();
  return (
    <ContentViewer title="Contacts">
      <Text style={styles.pageHead}>My Contacts</Text>
      <Contacts sections={sections} />
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