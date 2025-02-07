import React from 'react';
import {View, Text, Image} from 'react-native';
import {chatScreenStyles as styles} from '../../styles/chatComponents/screen';
import Images from '../../constants/imgs';
import {Message} from '../../types/firestoreService';
import {useMessageBubble} from '../../hooks/useMessageBubble';

const MessageBubble: React.FC<{
  text: string;
  isUserMessage: boolean;
  photoURL?: string;
  participantName?: string;
  timestamp?: string | null;
  nextMessage?: {
    senderId: string;
  } | null;
  previousMessage?: Message | null;
  type: 'text' | 'image';
}> = ({
  text,
  type,
  photoURL,
  timestamp,
  isUserMessage,
  participantName,
  nextMessage,
  previousMessage,
}) => {
  const {isFirstMessageInSequence, isLastMessageInSequence, validTime} =
    useMessageBubble(isUserMessage, nextMessage, previousMessage, timestamp);

  return (
    <View
      style={[
        styles.messageContainer,
        isUserMessage ? styles.userMessage : styles.participantMessage,
      ]}>
      {!isUserMessage && isFirstMessageInSequence && (
        <View style={{flexDirection: 'row', alignItems: 'flex-start', gap: 10}}>
          <Image
            source={photoURL ? {uri: photoURL} : Images.PlaceholderImg}
            style={{width: 35, height: 35, borderRadius: 17.5}}
          />
          <Text>{participantName}</Text>
        </View>
      )}
      <View
        style={
          !isUserMessage && {marginLeft: isFirstMessageInSequence ? 35 : 0}
        }>
        {type === 'image' ? (
          <Image
            source={{uri: text}}
            style={{width: 200, height: 200, borderRadius: 10}}
          />
        ) : (
          <Text
            style={
              isUserMessage
                ? styles.userMessageText
                : styles.participantMessageText
            }>
            {text}
          </Text>
        )}
        {timestamp && isLastMessageInSequence && (
          <Text style={styles.timestampText}>{validTime}</Text>
        )}
      </View>
    </View>
  );
};

export default MessageBubble;
