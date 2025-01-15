import { ChangeEvent, useEffect, useState } from 'react';
import { AuthFormType, FormErrors } from '../types/common.ts';
import { emailRegex, validateInput } from '../utils/RegEx.ts';
import { supabase } from '../utils/SupabaseClient.ts';

export const useAuthInput = (type: 'login' | 'signup') => {
  const [form, setForm] = useState<AuthFormType>({
    email: '',
    nickname: '',
    password: '',
  });
  const [error, setError] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);

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

  const checkUserDuplication = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('email, nickname')
        .or(`email.eq.${form.email},nickname.eq.${form.nickname}`);

      if (error) {
        console.error('Error fetching todos:', error.message);
      } else {
        const isEmailCheck = data?.some(user => user.email === form.email);
        const isNicknameCheck = data?.some(
          user => user.nickname === form.nickname,
        );

        if (isEmailCheck || isNicknameCheck) {
          setError(prevErrors => {
            const checkType = isEmailCheck ? 'email' : 'nickname';
            const checkMsg = isEmailCheck
              ? '중복된 이메일입니다.'
              : '중복된 닉네임입니다.';
            const updatedError = { ...prevErrors };
            if (updatedError) {
              updatedError[checkType] = checkMsg;
            } else {
              delete updatedError[checkType];
            }
            return updatedError;
          });
        } else {
          return true;
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getAuthForm = (e: ChangeEvent<HTMLInputElement>) => {
    validateField(e.target.name, e.target.value);

    setForm(prevForm => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    const isFormNowValid =
      Object.entries(form).every(([key, value]) => {
        if (key === 'nickname' && type === 'login') return true;
        return value !== '';
      }) && Object.keys(error).length === 0;
    setIsValid(isFormNowValid);
  }, [error, form]);

  return { form, error, getAuthForm, isValid, setError, checkUserDuplication };
};
