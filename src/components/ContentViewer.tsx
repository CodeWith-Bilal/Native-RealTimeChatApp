import React from 'react';
import {View, Text, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useContentViewer from '../hooks/useContentViewer';
import {ContnetViewerStyles} from '../styles/contentViewer';
import Images from '../constants/imgs';

const Header: React.FC<ContentViewerProps> = ({children, title}) => {
  const {handlePressLeft, isFullNav, navigation, user, route} =
    useContentViewer();

  return (
    <SafeAreaView style={ContnetViewerStyles.Maincontainer}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={{
          flex: 1,
          width: '100%',
        }}
        colors={['#010102', '#192f6a', '#3b5998']}>
        <View style={ContnetViewerStyles.Maincontainer}>
          <View style={ContnetViewerStyles.header}>
            <View style={ContnetViewerStyles.childView}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={ContnetViewerStyles.iconContainer}
                onPress={handlePressLeft}>
                <Image
                  source={!isFullNav ? Images.BackIcon : Images.SearchIcon}
                  style={{
                    ...ContnetViewerStyles.iconText,
                    width: !isFullNav ? 30 : 20,
                    height: !isFullNav ? 30 : 20,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={ContnetViewerStyles.tabTitle}>
              <Text style={ContnetViewerStyles.title}>{title}</Text>
            </View>
            <View
              style={{
                ...ContnetViewerStyles.childView,
                alignItems: 'flex-end',
              }}>
              {isFullNav && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={
                    route.name === 'Contacts' && [
                      ContnetViewerStyles.profileImage,
                      {justifyContent: 'center', alignItems: 'center'},
                    ]
                  }
                  onPress={
                    route.name !== 'Contacts'
                      ? () => navigation.navigate('Profile')
                      : () => navigation.navigate('Search')
                  }>
                  <Image
                    source={
                      route.name !== 'Contacts'
                        ? user?.photoURL
                          ? {uri: user.photoURL}
                          : Images.PlaceholderImg
                        : Images.AddUserIcon
                    }
                    style={
                      route.name !== 'Contacts' &&
                      ContnetViewerStyles.profileImage
                    }
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={ContnetViewerStyles.content}>{children}</View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Header;
