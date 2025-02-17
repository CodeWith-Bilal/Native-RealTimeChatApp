import React from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import {chatScreenStyles} from '../../styles/chatComponents/screen';
import useChatInput from '../../hooks/useChatInput';
import Images from '../../constants/imgs';

const ChatInput: React.FC<{
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  recvId: string;
  senderId: string;
}> = ({value, onChangeText, onSend, recvId: chatId, senderId}) => {
  const {handleSelectImages, handleCamera} = useChatInput();

  return (
    <View style={chatScreenStyles.inputContainer}>
      <TouchableOpacity
        onPress={() => handleSelectImages(chatId, senderId)}
        style={chatScreenStyles.attachmentButton}>
        <Image
          source={Images.PaperClipIcon}
          style={chatScreenStyles.cameraIcon}
        />
      </TouchableOpacity>
      <View style={chatScreenStyles.inputWrapper}>
        <TextInput
          style={chatScreenStyles.input}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#888"
          numberOfLines={2}
          placeholder="Write your message"
        />
        <TouchableOpacity
          onPress={onSend}
          style={chatScreenStyles.attachmentButton}>
          <View
            style={{
              width: 27,
              height: 27,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={Images.SendIcon} style={{width: 25, height: 25}} />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => handleCamera(chatId, senderId)}
        style={chatScreenStyles.cameraButton}>
        <View style={chatScreenStyles.cameraIcon}>
          <Image
            source={Images.CameraIcon}
            style={chatScreenStyles.cameraIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
