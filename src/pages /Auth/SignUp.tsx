import AuthForm from '../../components/Auth/AuthForm.tsx';
import { ChangeEvent, useState } from 'react';
import { AuthFormType, FormErrors } from '../../types/common.ts';
import { emailRegex, validateInput } from '../../utils/RegEx.ts';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function SignUp() {
  const [form, setForm] = useState<AuthFormType>({
    email: '',
    nickname: '',
    password: '',
  });
  const [error, setError] = useState<FormErrors>({});
  const getAuthForm = (e: ChangeEvent<HTMLInputElement>) => {
    // 이메일 유효성 검사
    if (e.target.name === 'email' && !emailRegex(e.target.value)) {
      setError(prev => ({
        ...prev,
        email: '이메일을 확인해주세요',
      }));
    } else if (e.target.name === 'email') {
      setError(prev => {
        const restErrors = { ...prev };
        delete restErrors.email;
        setError(restErrors);
        return restErrors;
      });
    }

    // 비밀번호 유효성 검사
    if (e.target.name === 'password' && !validateInput(e.target.value, true)) {
      setError(prev => ({
        ...prev,
        password: '특수문자, 숫자, 영문자 조합으로 입력해주세요.',
      }));
    } else if (e.target.name === 'password') {
      setError(prev => {
        const restErrors = { ...prev };
        delete restErrors.password;
        setError(restErrors);
        return restErrors;
      });
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const signUpNewUser = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            nickname: form.nickname,
          },
          emailRedirectTo: 'http://localhost:5173/login',
        },
      });
      if (error) {
        console.error('Error fetching todos:', error.message);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <AuthForm
      type={'signup'}
      getAuthForm={e => getAuthForm(e)}
      handleButton={signUpNewUser}
      error={error}
    />
  );
}
