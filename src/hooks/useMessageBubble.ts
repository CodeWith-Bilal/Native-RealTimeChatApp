import {Message} from '../types/firestoreService';

export const useMessageBubble = (
  isUserMessage: boolean,
  nextMessage?: {
    senderId: string;
  } | null,
  previousMessage?: Message | null,
  timestamp?: string | null,
) => {
  const time = timestamp?.split(',')[1];
  const validTime = time
    ? time.split(':').slice(0, 2).join(':') + time.slice(-3)
    : '';

  const isFirstMessageInSequence =
    !previousMessage ||
    previousMessage.senderId !== (isUserMessage ? 'user' : 'participant');

  const isLastMessageInSequence =
    !nextMessage ||
    nextMessage.senderId !== (isUserMessage ? 'user' : 'participant');
  !nextMessage || nextMessage.senderId !== previousMessage?.senderId;

  return {
    isFirstMessageInSequence,
    isLastMessageInSequence,
    validTime,
  };
};
