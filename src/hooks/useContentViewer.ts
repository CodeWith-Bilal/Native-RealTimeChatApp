import {useRoute} from '@react-navigation/native';
import appAuth from './useAuth';
import useNavigate from './useNavigationHook';

const useContentViewer = () => {
  const route = useRoute();
  const {user} = appAuth();
  const isFullNav = route.name === 'Home' || route.name === 'Contacts';
  const {navigation} = useNavigate();

  const handlePressLeft = async () => {
    if (isFullNav) {
      navigation.navigate('Search');
    } else if (route.name === 'Contacts') {
      try {
      } catch (error) {
      }
    } else {
      navigation.goBack();
    }
  };
  return {handlePressLeft, user, isFullNav, navigation, route};
};
export default useContentViewer;
