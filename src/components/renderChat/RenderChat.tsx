import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from '../../store/store';
import {User} from '../../types/firestoreService';
import {ChatNavigatorStyles} from '../../styles/chatComponents/navigator';
import appNavigate from '../../hooks/useNavigationHook';
import {ChatItem} from '../../types/chat';

export const useRenderChatItem = () => {
  const user = useAppSelector(state => state.user);
  const {navigation} = appNavigate();

  return ({item}: {item: ChatItem}) => {
    const participants = item.participantsDetails?.filter(
      (participant: User) => participant.uid !== user.uid,
    );
    const participant = participants?.[0];
    const participantImage = participant?.photoURL;
    const participantName = participant?.displayName || 'Unknown';

    return (
      <TouchableOpacity
        style={ChatNavigatorStyles.chatItem}
        onPress={() =>
          navigation.navigate('Chat', {
            chatId: item.id as string,
            participant: {
              uid: participant?.uid || ('' as string),
              displayName: participantName as string,
              photoURL: participantImage as string,
              status: participant?.status ? participant?.status : '',
            },
          })
        }>
        <View style={ChatNavigatorStyles.chatRow}>
          {participantImage ? (
            <Image
              source={{uri: participantImage}}
              style={ChatNavigatorStyles.chatImage}
            />
          ) : (
            <View style={ChatNavigatorStyles.defaultImage}>
              <Text style={ChatNavigatorStyles.defaultImageText}>
                {participantName[0]?.toUpperCase() || '?'}
              </Text>
            </View>
          )}
          <View style={ChatNavigatorStyles.chatDetails}>
            <Text style={ChatNavigatorStyles.chatText}>{participantName}</Text>
            <Text style={ChatNavigatorStyles.lastMessage}>
              {item.lastMessage || 'No messages yet.'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
};
