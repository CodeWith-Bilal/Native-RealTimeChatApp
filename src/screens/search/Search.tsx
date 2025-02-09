import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {User} from '../../types/firestoreService';
import SearchBar from '../../components/SearchBar';
import useSearch from '../../hooks/useSearch';
import Images from '../../constants/imgs';
import { COLOR } from '../../constants/colors';

const Search = () => {
  const {handleAddContact, handleSearch, searchText, filteredUsers, contacts} =
    useSearch();

  const RenderUserItem = ({item}: {item: User}) => {
    const isContact = contacts.some(contact => contact.uid === item.uid);
    return (
      <View style={styles.itemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item.photoURL
                ? {uri: item.photoURL}
                : Images.PlaceholderImg
            }
            style={styles.userImage}
          />
          <Text style={styles.userName}>{item.displayName}</Text>
        </View>
        {!isContact && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleAddContact(item?.uid || '')}
            style={styles.addContactButton}>
            <Image
              source={Images.AddUserIcon}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderNoResultsMessage = (type: 'People' | 'Group') => (
    <View style={styles.noResultsContainer}>
      <Text style={styles.noResultsText}>No {type} found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        searchText={searchText}
        setSearchText={text => handleSearch(text as string)}
      />
      <View style={styles.resultsContainer}>
        <Text style={styles.sectionTitle}>People</Text>
        {filteredUsers.length > 0 ? (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item, index) => item.uid || `key-${index}`}
            renderItem={RenderUserItem}
          />
        ) : (
          renderNoResultsMessage('People')
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  resultsContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.black,
    marginVertical: 10,
  },
  addContactButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ccc',
    width: 40,
    height: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  userName: {
    fontSize: 16,
    color: COLOR.pure_gray,
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 15,
    color: '#888',
  },
});

export default Search;
