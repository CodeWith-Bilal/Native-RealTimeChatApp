import Toast from 'react-native-toast-message';

export const showToast = (
  head: string,
  body: string,
  type?: 'success' | 'error' | 'info',
) => {
  Toast.show({
    type: type || 'info',
    text1: head,
    text2: body,
    visibilityTime: 3000,
    autoHide: true,
    onPress: () => Toast.hide(),
  });
};
