import {StyleSheet} from 'react-native';
import {COLOR} from '../../constants/colors';

export const chatScreenStyles = StyleSheet.create({
  container: {flex: 1},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  attachmentButton: {
    padding: 5,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 45,
    textAlignVertical: 'top',
    backgroundColor: COLOR.offwhite,
  },
  input: {
    fontSize: 16,
    color: COLOR.black,
    width: '80%',
  },
  inputIcon: {
    width: 20,
    height: 20,
    tintColor: COLOR.dark_gray,
  },
  cameraButton: {
    padding: 10,
  },
  cameraIcon: {
    width: 25,
    height: 25,
    tintColor: COLOR.dark_gray,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 3,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  participantMessage: {
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  userMessageText: {
    color: COLOR.offwhite,
    fontSize: 16,
    backgroundColor: COLOR.light_blue,
    padding: 10,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  participantMessageText: {
    color: COLOR.black,
    fontSize: 16,
    backgroundColor: COLOR.bluish_white,
    padding: 10,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  timestampText: {
    color: COLOR.dark_gray,
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
});
