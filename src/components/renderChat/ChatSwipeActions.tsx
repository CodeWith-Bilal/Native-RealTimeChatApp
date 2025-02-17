import React, {useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch} from '../../store/store';
import {deleteChatFromFirebase} from '../../store/slices/chatSlice';
import {COLOR} from '../../constants/colors';
import Images from '../../constants/imgs';
import {ChatItem} from '../../types/chat';

interface ChatSwipeActionsProps {
  item: ChatItem;
  dragAnimatedValue: Animated.AnimatedInterpolation<string | number>;
}

const ChatSwipeActions: React.FC<ChatSwipeActionsProps> = ({
  item,
  dragAnimatedValue,
}) => {
  const dispatch = useAppDispatch();
  const [deleteClicked, setDeleteClicked] = useState(false);

  const scale = (dragAnimatedValue as Animated.Value).interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handleDeleteChat = async () => {
    setDeleteClicked(true);

    try {
      await dispatch(deleteChatFromFirebase(item.id, item.participants));
      ToastAndroid.show('Chat deleted successfully.', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Failed to delete chat.', ToastAndroid.SHORT);
    } finally {
      setDeleteClicked(false);
    }
  };

  const handleNotiClick = () => {
    ToastAndroid.show('Chat notification clicked.', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.rightActions}>
      <TouchableOpacity
        style={[styles.actionButton, styles.notificationButton]}
        onPress={handleNotiClick}>
        <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
          <Image
            source={Images.NotificationWhiteIcon}
            style={{width: 20, height: 20}}
          />
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={handleDeleteChat}>
        <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
          {deleteClicked ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Image source={Images.DeleteIcon} style={{width: 17, height: 17}} />
          )}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    columnGap: 10,
    paddingHorizontal: 10,
    backgroundColor: COLOR.bluish_white,
  },
  actionButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: COLOR.light_red,
  },
  notificationButton: {
    backgroundColor: COLOR.black,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  swipedChatItem: {
    backgroundColor: COLOR.bluish_white,
  },
});

export default ChatSwipeActions;
