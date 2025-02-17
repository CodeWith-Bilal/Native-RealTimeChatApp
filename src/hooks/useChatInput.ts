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
        return;
      }

      const base64Image = response.assets?.[0]?.base64;
      if (base64Image) {
          await sendImageMessage(chatId, senderId, base64Image);
      }
    } catch (error) {
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
        return;
      }

      if (response.errorCode) {
        return;
      }

      const base64Image = response.assets?.[0]?.base64;
      if (base64Image) {
          await sendImageMessage(chatId, senderId, base64Image);
        }
    } catch (error) {
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
    } catch (error) {
    }
  };
  return {handleCamera, handleSelectImages};
};

export default useChatInput;
