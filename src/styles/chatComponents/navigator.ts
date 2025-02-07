import {StyleSheet} from 'react-native';
import { COLOR } from '../../constants/colors';

export const ChatNavigatorStyles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLOR.white,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  defaultImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  defaultImageText: {
    color: COLOR.white,
    fontWeight: 'bold',
  },
  chatDetails: {
    flex: 1,
  },
  chatText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.black,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
