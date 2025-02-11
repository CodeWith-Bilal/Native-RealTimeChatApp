// import { useEffect, useState } from 'react';
// import appNavigate from '../hooks/useNavigationHook';
// import useAuth from '../hooks/useAuth';
// import { signInWithGoogle } from '../hooks/useAuthService';
// import { ToastAndroid } from 'react-native';

// // Initial state for sign-in data
// const initialSignInState = {
//   email: '',
//   password: '',
// };

// // Initial state for sign-up data
// const initialSignUpState = {
//   name: '',
//   email: '',
//   password: '',
//   confirmPassword: '',
// };

// // Helper function for showing toast messages
// const showToast = (message: string) => {
//   ToastAndroid.show(message, ToastAndroid.LONG);
// };

// // Main hook for authentication functionality
// const useAuthFunctionality = () => {
//   const { navigation } = appNavigate();
//   const [signInData, setSignInData] = useState(initialSignInState);
//   const [userData, setUserData] = useState(initialSignUpState);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const { handleLogin, handleSignUp } = useAuth();

//   // useEffect(() => {
//   //   const unsubscribe = observeAuth();
//   //   return unsubscribe;
//   // }, [observeAuth]);

//   // Handle input change for sign-in
//   const handleSignInInputChange = (field: string, value: string) => {
//     setSignInData(prevState => ({
//       ...prevState,
//       [field]: value,
//     }));
//   };

//   // Handle input change for sign-up
//   const handleSignUpInputChange = (field: string, value: string) => {
//     setUserData(prevState => ({
//       ...prevState,
//       [field]: value,
//     }));
//   };

//   // Sign-in handler
//   const handleSignIn = async () => {
//     setLoading(true);
//     try {
//       if (!signInData.email || !signInData.password) {
//         showToast('Please fill in all fields');
//         return;
//       }
//       const userCredential = await handleLogin(signInData.email, signInData.password);
//       if (userCredential) {
//         showToast('You are successfully logged in!');
//         setSignInData(initialSignInState);
//       }
//     } catch {
//       showToast(error || 'An unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Sign-up handler
//   const signUpHandler = async () => {
//     setLoading(true);
//     try {
//       if (!userData.email || !userData.password || !userData.name) {
//         showToast('Please fill in all fields');
//         return;
//       }
//       const userCredential = await handleSignUp(userData.email, userData.password, userData.name);
//       if (userCredential) {
//         showToast('You are successfully signed up!');
//         setUserData(initialSignUpState);
//         navigation.navigate('MainTabs');
//       }
//     } catch {
//       showToast(error || 'An unknown error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     handleSignInInputChange,
//     handleSignIn,
//     handleSignUpInputChange,
//     signUpHandler,
//     loading,
//     signInData,
//     userData,
//     navigation,
//     signInWithGoogle,
//     error,
//     setError,
//   };
// };

// export default useAuthFunctionality;
import {  useState } from 'react';
import appNavigate from '../hooks/useNavigationHook';
import useAuth from '../hooks/useAuth';
import { signInWithGoogle } from '../hooks/useAuthService';
import { ToastAndroid } from 'react-native';

// Initial state for sign-in data
const initialSignInState = {
  email: '',
  password: '',
};

// Initial state for sign-up data
const initialSignUpState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

// Helper function for showing toast messages
const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.LONG);
};

// Main hook for authentication functionality
const useAuthFunctionality = () => {
  const { navigation } = appNavigate();
  const [signInData, setSignInData] = useState(initialSignInState);
  const [userData, setUserData] = useState(initialSignUpState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { handleLogin, handleSignUp } = useAuth();

  // Sign-in handler
  const handleSignIn = async () => {
    setLoading(true);
    try {
      if (!signInData.email || !signInData.password) {
        showToast('Please fill in all fields');
        return;
      }
      const userCredential = await handleLogin(signInData.email, signInData.password);
      if (userCredential) {
        showToast('You are successfully logged in!');
        setSignInData(initialSignInState);
      }
    } catch (err) {
      showToast(error || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Sign-up handler
  const signUpHandler = async () => {
    setLoading(true);
    try {
      if (!userData.email || !userData.password || !userData.name) {
        showToast('Please fill in all fields');
        return;
      }
      const userCredential = await handleSignUp(userData.email, userData.password, userData.name);
      if (userCredential) {
        showToast('You are successfully signed up!');
        setUserData(initialSignUpState);
        navigation.navigate('MainTabs');
      }
    } catch (err) {
      showToast(error || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSignInInputChange: (field: string, value: string) => {
      setSignInData(prevState => ({
        ...prevState,
        [field]: value,
      }));
    },
    handleSignUpInputChange: (field: string, value: string) => {
      setUserData(prevState => ({
        ...prevState,
        [field]: value,
      }));
    },
    handleSignIn,
    signUpHandler,
    loading,
    signInData,
    userData,
    navigation,
    signInWithGoogle,
    error,
    setError,
  };
};

export default useAuthFunctionality;
