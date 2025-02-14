import { useEffect } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { listenToUsers } from './useUser';
import { useAppDispatch, useAppSelector } from '../store/store';

const useNavigationHook = () => {
  const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  const user = useAppSelector(state => state.user);
  const { contacts: usersInStore } = useAppSelector(state => state.contacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user?.uid) {return;}

    if (user.uid && usersInStore.length === 0) {
      const unsubscribe = listenToUsers(user.uid, users => {
        dispatch({ type: 'users/setAllUsers', payload: users });
      });

      return () => unsubscribe();
    }
  }, [user?.uid, usersInStore.length, dispatch]);

  return { navigation, user };
};

export default useNavigationHook;


