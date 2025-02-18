import React from 'react';
import {
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
import { styles } from './SearchStyle';

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



export default Search;
