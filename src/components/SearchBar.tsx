import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SearchBarProps} from '../types/search';
import {COLOR} from '../constants/colors';
import useNavigationHook from '../hooks/useNavigationHook';

const SearchBar: React.FC<SearchBarProps> = ({searchText, setSearchText}) => {
  const {navigation} = useNavigationHook();
  const handleExit = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/icons/search_dark.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Find new people or groups"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <TouchableOpacity onPress={handleExit} style={styles.clearButton}>
        <Image
          source={require('../assets/icons/cross_dark.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#888',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLOR.gray,
  },
  clearButton: {
    padding: 5,
  },
});

export default SearchBar;
