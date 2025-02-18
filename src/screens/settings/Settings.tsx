import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import ContentViewer from '../../components/ContentViewer';
import SettingsItem from '../../components/SettingListItem';
import useSettings from './useSettings';
import {settingItems} from '../../constants/settingsListOptions';
import Images from '../../constants/imgs';
import { styles } from './SettingStyle';

const Settings = () => {
  const {user, navigation} = useSettings();

  return (
    <ContentViewer title="Settings">
      <View style={{flex: 2, padding: 10}}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Profile')}
          style={styles.userContainer}>
          <Image
            source={
              user.photoURL
                ? {uri: user.photoURL}
                : Images.PlaceholderImg
            }
            style={styles.userImage}
          />
          <View>
            <Text style={styles.userName}>{user.displayName}</Text>
            {user.status && (
              <Text style={styles.userStatus}>{user.status}</Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={{flex: 6, paddingTop: 20}}>
          {settingItems?.map((item, index) => (
            <SettingsItem
              key={index}
              icon={item.icon}
              title={item.title}
              link={item.link}
              subtext={item.subtitle}
            />
          ))}
        </View>
      </View>
    </ContentViewer>
  );
};

export default Settings;


