import AuthForm from '../../components/Auth/AuthForm.tsx';
import { supabase } from '../../utils/SupabaseClient.ts';
import { useNavigate } from 'react-router';
import { useAuthInput } from '../../hooks/useAuthInput.tsx';

export default function Login() {
  const navigate = useNavigate();
  const { form, error, getAuthForm, isValid } = useAuthInput('login');

  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        ...form,
      });
      if (error) {
        alert(error.message);
      } else {
        navigate('/daily');
        localStorage.setItem('user_id', data.user.id);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <AuthForm
      disabled={!isValid}
      type={'login'}
      getAuthForm={e => getAuthForm(e)}
      handleButton={login}
      error={error}
    />
  );
}
