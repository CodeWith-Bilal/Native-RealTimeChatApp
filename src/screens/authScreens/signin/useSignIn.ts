import {useEffect, useState} from 'react';
import appNavigate from '../../../hooks/useNavigationHook';
import appAuth from '../../../hooks/useAuth';
import {signInWithGoogle} from '../../../services/auth';
import {showToast} from '../../../components/Toast';

const initialState = {
  email: '',
  password: '',
};

const appSign = () => {
  const [signInData, setSignInData] = useState(initialState);
  const {handleLogin, observeAuth} = appAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {navigation} = appNavigate();

  useEffect(() => {
    const unsubscribe = observeAuth();
    return unsubscribe;
  }, [observeAuth]);

  const handleInputChange = (field: string, value: string) => {
    setSignInData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      if (!signInData.email || !signInData.password) {
        return showToast('Error', 'Please fill in all fields', 'error');
      }
      const userCredential = await handleLogin(
        signInData.email,
        signInData.password,
      );
      if (userCredential) {
        showToast('Success', 'You are successfully logged in!', 'success');
        setSignInData(initialState);
      }
    } catch {
      showToast('Error', error || 'An unknown error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleInputChange,
    handleSignIn,
    loading,
    signInData,
    navigation,
    signInWithGoogle,
    error,
    setError,
  };
};

export default appSign;
