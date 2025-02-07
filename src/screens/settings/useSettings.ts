import {useAppSelector} from '../../store/store';
import appNavigate from '../../hooks/useNavigationHook';

const appSettings = () => {
  const user = useAppSelector(state => state.user);

  const {navigation} = appNavigate();
  return {
    user,
    navigation,
  };
};

export default appSettings;

