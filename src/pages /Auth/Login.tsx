import AuthForm from '../../components/Auth/AuthForm.tsx';
import { supabase } from '../../utils/SupabaseClient.ts';
import { useNavigate } from 'react-router';
import { useAuthInput } from '../../hooks/useAuthInput.tsx';

export default function Login() {
  const navigate = useNavigate();
  const { form, error, getAuthForm } = useAuthInput();

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
