import {useState} from 'react';

const useInputValidation = (
  title: string,
  type: string,
  setVal: (val: string) => void,
  setError?: (error: string) => void | undefined,
) => {
  const [isError, setIsError] = useState<string>('');
  const [touched, setTouched] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const hasNumber = /[0-9]/;
    const hasAlphabet = /[a-zA-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_-]/;

    return {
      hasNumber: hasNumber.test(password),
      hasAlphabet: hasAlphabet.test(password),
      hasSpecialChar: hasSpecialChar.test(password),
    };
  };

  const handleChange = (text: string) => {
    setVal(text);
    setTouched(true);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      validateField(text);
    }, 500);
    setTypingTimeout(newTimeout);
  };

  const validateField = (text: string) => {
    let error = '';
    if (text.length === 0 && touched) {
      let text = title;
      if (title.split(' ')[0] === 'Enter') {
        text = title.split(' ')[1];
      }
      error = `${text} is important.`;
    } else if (type === 'email-address') {
      if (!validateEmail(text)) {
        error = 'Please enter a valid email address.';
      }
    } else {
      if (title.toLowerCase().includes('password')) {
        const {hasNumber, hasAlphabet, hasSpecialChar} = validatePassword(text);

        if (!hasNumber) {
          error = 'Your password must contain at least one number.';
        } else if (!hasAlphabet) {
          error = 'Your password must contain at least one letter.';
        } else if (!hasSpecialChar) {
          error = 'Your password must contain at least one special character.';
        }
      }
    }
    setIsError(error);
    if (setError) {
      setError(error);
    }
  };

  return {
    isError,
    handleChange,
  };
};

export default useInputValidation;
