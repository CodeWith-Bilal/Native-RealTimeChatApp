import {Dimensions, StyleSheet} from 'react-native';
import {COLOR} from '../constants/colors';

export const ContnetViewerStyles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
  },
  content: {
    flex: 9,
    backgroundColor: COLOR.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    paddingHorizontal: 16,
  },
  iconContainer: {
    padding: 8,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.ghost,
    borderRadius: 25,
  },
  iconText: {
    fontWeight: '400',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLOR.white,
    textAlign: 'center',
  },
  profileImage: {
    width: 34,
    height: 34,
    borderRadius: 20,
    backgroundColor: COLOR.ghost,
  },
  childView: {
    width: '20%',
  },
  tabTitle: {
    width: '60%',
  },
});
