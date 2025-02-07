import React from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ContactsProps} from '../types/contactList';
import {userProfile} from '../types/profile';
import useContactHandler from '../hooks/useContactHandler';
import {COLOR} from '../constants/colors';
import Loader from './loader/Loader';
import Images from '../constants/imgs';

const Contacts: React.FC<ContactsProps> = ({sections}) => {
  const {handleContactClick, loader} = useContactHandler();

  return (
    <>
    {loader && <Loader />}
      <SectionList
        sections={sections}
        keyExtractor={item => item.uid as string}
        ListEmptyComponent={() => <Text>No contacts found</Text>}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              handleContactClick(item.uid as string, item as userProfile)
            }
            style={styles.contactContainer}>
            <Image
              source={
                item.photoURL
                  ? {uri: item.photoURL}
                  : Images.PlaceholderImg
              }
              style={styles.contactImage}
            />
            <View>
              <Text style={styles.contactName}>{item.displayName}</Text>
              {item.status && (
                <Text style={styles.contactStatus}>{item.status}</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  contactImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  contactName: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '500',
  },
  contactStatus: {
    fontSize: 14,
    color: COLOR.dark_gray,
    fontWeight: '400',
    marginLeft: 10,
  },
});

export default Contacts;
