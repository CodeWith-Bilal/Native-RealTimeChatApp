import {StyleSheet} from 'react-native';
import {COLOR} from '../../constants/colors';

export const ChatHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    elevation: 2,
  },
  backIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    position: 'relative',
  },
  onlineStatus: {
    width: 12,
    height: 12,
    borderRadius: 7.5,
    backgroundColor: COLOR.green,
    position: 'absolute',
    right: 10,
    bottom: -2,
    borderWidth: 2,
    borderColor: COLOR.white,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  displayName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 12,
    color: COLOR.pure_gray,
  },
});
