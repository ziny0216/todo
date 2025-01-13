import { ChangeEvent, useState } from 'react';
import { AuthFormType, FormErrors } from '../types/common.ts';
import { emailRegex, validateInput } from '../utils/RegEx.ts';

export const useAuthInput = () => {
  const [form, setForm] = useState<AuthFormType>({
    email: '',
    nickname: '',
    password: '',
  });
  const [error, setError] = useState<FormErrors>({});
  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    // 이메일 유효성 검사
    if (name === 'email' && !emailRegex(value)) {
      errorMsg = '이메일을 확인해주세요';
    }

    // 비밀번호 유효성 검사
    if (name === 'password' && !validateInput(value, true)) {
      errorMsg = '특수문자, 숫자, 영문자 조합으로 입력해주세요.';
    }

    setError(prevErrors => {
      const updatedError = { ...prevErrors };
      if (errorMsg && updatedError) {
        updatedError[name] = errorMsg;
      } else {
        delete updatedError[name];
      }
      return updatedError;
    });
  };

  const getAuthForm = (e: ChangeEvent<HTMLInputElement>) => {
    validateField(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return { form, error, getAuthForm };
};
