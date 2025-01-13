import AuthForm from '../../components/Auth/AuthForm.tsx';
import { ChangeEvent, useState } from 'react';
import { AuthFormType } from '../../types/common.ts';
import { emailRegex, validateInput } from '../../utils/RegEx.ts';
import { supabase } from '../../utils/SupabaseClient.ts';
import { useNavigate } from 'react-router';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<AuthFormType>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<{ [key: string]: string }>();
  const getAuthForm = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email' && !emailRegex(e.target.value)) {
      setError({ ...error, email: '이메일을 확인해주세요' });
    } else {
      const { email, ...restErrors } = error;
      setError(restErrors);
    }
    if (e.target.name === 'password' && !validateInput(e.target.value, true)) {
      setError({
        ...error,
        password: '특수문자, 숫자, 영문자 조합으로 입력해주세요.',
      });
    } else {
      const { password, ...restErrors } = error;
      setError(restErrors);
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        ...form,
      });
      if (error) {
        alert(error.message);
      } else {
        navigate('/');
        localStorage.setItem('user_id', data.user.id);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <AuthForm
      type={'login'}
      getAuthForm={e => getAuthForm(e)}
      handleButton={login}
      error={error}
    />
  );
}
