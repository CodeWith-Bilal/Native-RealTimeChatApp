import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore, { Timestamp } from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';
import { Message } from '../types/firestoreService';

const useChatInput = () => {
  const handleCamera = async (chatId: string, senderId: string) => {
    try {
      const response = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      });

      if (response.didCancel) {
        ToastAndroid.show('User canceled camera', ToastAndroid.SHORT);
        return;
      }

      if (response.errorCode) {
        ToastAndroid.show('Something went wrong... \n Sorry, for that 😶', ToastAndroid.SHORT);
        console.error('Camera Error:(useChatInput.tsx)', response.errorMessage);
        return;
      }

      const base64Image = response.assets?.[0]?.base64;
      console.log('base64Image => ', base64Image);
      if (base64Image) {
          await sendImageMessage(chatId, senderId, base64Image);
      }
      console.log('%c Image sent.... 🤩', 'font-size:20px;color:yellow;', base64Image);
    } catch (error) {
      console.error('Error handling camera:', error);
    }
  };

const handleSelectImages = async (chatId: string, senderId: string) => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      });

      if (response.didCancel) {
        console.log('User canceled image picker');
        return;
      }

      if (response.errorCode) {
        console.error('Image Picker Error:', response.errorMessage);
        return;
      }

      const base64Image = response.assets?.[0]?.base64;
      console.log('base64Image => ', base64Image);
      if (base64Image) {
          await sendImageMessage(chatId, senderId, base64Image);
        }
        console.log('%c Image sent.... 🤩', 'font-size:20px;color:yellow;', base64Image);
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const sendImageMessage = async (
    recvId: string,
    senderId: string,
    imageBase64: string,
  ) => {
    const chatId = senderId < recvId ? senderId + recvId : recvId + senderId;

    const chatRef = firestore().collection('chats').doc(chatId);
    const messageRef = chatRef.collection('messages').doc();
    try {
      const messageData: Message = {
        id: `${Date.now()}`,
        senderId,
        text: `data:image/jpeg;base64,${imageBase64}`,
        contentType: 'image',
        timestamp: Timestamp.fromDate(new Date()),
        status: {sender: 'sent', receiver: 'unread'},
      };


      await messageRef.set(messageData);

      await chatRef.set(
        {
          lastMessage: '📸 Image',
          lastActive: firestore.FieldValue.serverTimestamp(),
          unreadCount: firestore.FieldValue.increment(1),
        },
        {merge: true},
      );
      console.log('%c Congratulations 🎉, Image sent successfully....', 'font-size:24px;color:white;backgroung-color:pink;');
      console.log('messageData => ', messageData);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  return {handleCamera, handleSelectImages};
};

export default useChatInput;
