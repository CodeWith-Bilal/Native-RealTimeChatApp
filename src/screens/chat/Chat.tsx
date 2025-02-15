import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Timestamp } from '@react-native-firebase/firestore';
import ChatInput from '../../components/chatComponents/ChatInput';
import ChatHeader from '../../components/chatComponents/ChatHeader';
import MessageBubble from '../../components/chatComponents/MessageBubble';
import useChat from '../../hooks/useChat';
import { ChatProps } from '../../types/chat';
import firestore from '@react-native-firebase/firestore';

const ChatScreen: React.FC<ChatProps> = ({ route }) => {
  if (!route || !route.params) {
    return null;
  }
  
  const { chatId, participant } = route.params;
  const { messages, newMessage, setNewMessage, handleSend, user } = useChat(chatId, participant.uid);

  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (participant.uid && messages.length > 0) {
        await firestore().collection('chats').doc(chatId).update({
          [`unreadCount.${user?.uid}`]: 0,
        });
      }
    };

    markMessagesAsRead();
  }, [chatId, participant.uid, messages.length, user?.uid]);

  return (
    <View style={styles.container}>
      <ChatHeader
        displayName={participant.displayName}
        profileImage={participant.photoURL}
        status={participant.status}
      />
      <FlatList
        data={messages}
        style={{ gap: 5, padding: 10 }}
        renderItem={({ item, index }) => (
          <MessageBubble
            text={item.text}
            participantName={participant.displayName || 'unknown'}
            photoURL={participant.photoURL || ''}
            isUserMessage={item.senderId === user?.uid}
            type={item.contentType}
            timestamp={
              item.timestamp
                ? item.timestamp instanceof Timestamp
                  ? item.timestamp.toDate().toLocaleString()
                  : typeof item.timestamp === 'string'
                  ? new Date(item.timestamp).toLocaleString()
                  : null
                : null
            }
            previousMessage={messages[index - 1] || null}
            nextMessage={messages[index + 1] || null}
          />
        )}
        keyExtractor={item => item.id}
      />
      <ChatInput
        value={newMessage}
        onChangeText={setNewMessage}
        onSend={handleSend}
        recvId={participant.uid}
        senderId={user?.uid || ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default ChatScreen;
