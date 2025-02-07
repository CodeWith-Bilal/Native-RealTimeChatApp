import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ContentViewer from '../../components/ContentViewer';
import SettingsItem from '../../components/SettingListItem';
import useSettings from './useSettings';
import {settingItems} from '../../constants/settingsListOptions';
import { COLOR } from '../../constants/colors';
import Images from '../../constants/imgs';

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

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 20,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.light_grey,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '500',
  },
  userStatus: {
    fontSize: 14,
    color: COLOR.light_grey,
    fontWeight: '400',
    marginLeft: 10,
  },
});
