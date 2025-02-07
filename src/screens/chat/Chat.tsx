import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Timestamp} from '@react-native-firebase/firestore';
import ChatInput from '../../components/chatComponents/ChatInput';
import ChatHeader from '../../components/chatComponents/ChatHeader';
import MessageBubble from '../../components/chatComponents/MessageBubble';
import useChat from './useChat';
import {ChatProps} from '../../types/chat';

const ChatScreen: React.FC<ChatProps> = ({route}) => {
  if (!route || !route.params) {
    return null;
  }
  const {chatId, participant} = route.params;
  const {messages, newMessage, setNewMessage, handleSend, user} = useChat(
    chatId,
    participant.uid,
  );

  return (
    <>
      <View style={styles.container}>
        <ChatHeader
          displayName={participant.displayName}
          profileImage={participant.photoURL}
          status={participant.status}
        />
        <FlatList
          data={messages}
          style={{gap: 5, padding: 10}}
          renderItem={({item, index}) => (
            <MessageBubble
              text={item.text}
              participantName={participant.displayName || 'unkown'}
              photoURL={participant.photoURL || ''}
              isUserMessage={item.senderId === user?.uid}
              type={item.contentType}
              timestamp={
                item.timestamp
                  ? item.timestamp instanceof Timestamp
                    ? item.timestamp.toDate().toLocaleString() // Convert Firestore Timestamp to Date
                    : typeof item.timestamp === 'string'
                    ? new Date(item.timestamp).toLocaleString() // Convert string timestamp
                    : null // Handle unexpected cases
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
});

export default ChatScreen;
