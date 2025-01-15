import AuthForm from '../../components/Auth/AuthForm.tsx';
import { supabase } from '../../utils/SupabaseClient.ts';
import { useAuthInput } from '../../hooks/useAuthInput.tsx';
import { useNavigate } from 'react-router';

export default function SignUp() {
  const navigate = useNavigate();
  const { form, error, getAuthForm, isValid } = useAuthInput('signup');
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
        alert('이메일을 확인해주세요.');
        navigate('/login');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthForm
      disabled={!isValid}
      type={'signup'}
      getAuthForm={e => getAuthForm(e)}
      handleButton={signUpNewUser}
      error={error}
    />
  );
}
