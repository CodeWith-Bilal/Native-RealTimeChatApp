import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import useHome from '../../hooks/useHome';
import HomeStyles from '../../styles/home';
import ContentViewer from '../../components/ContentViewer';
import RenderChatItem from '../../components/renderChat/RenderChatItem';


const HomeScreen = () => {
  const { chats, chatLoader } = useHome();
  return (
    <ContentViewer title="Home">
      <View style={HomeStyles.content}>
        {chatLoader ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={Object.values(chats)}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <RenderChatItem item={item} />
            )}
            ListEmptyComponent={
              <Text style={HomeStyles.emptyText}>No chats yet.</Text>
            }
          />
        )}
      </View>
    </ContentViewer>
  );
};

export default HomeScreen;
