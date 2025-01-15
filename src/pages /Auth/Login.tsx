import AuthForm from '../../components/Auth/AuthForm.tsx';
import { useNavigate } from 'react-router';
import { useAuthInput } from '../../hooks/useAuthInput.tsx';
import { login } from '../../services/authApi.ts';

export default function Login() {
  const navigate = useNavigate();
  const { form, error, getAuthForm, isValid } = useAuthInput('login');

  const handleLogin = async () => {
    try {
      const data = await login(form);
      navigate('/daily');
      localStorage.setItem('user_id', data.user.id);
    } catch (e) {
      const error = e as Error;
      alert(error.message);
    }
  };
  return (
    <AuthForm
      disabled={!isValid}
      type={'login'}
      getAuthForm={e => getAuthForm(e)}
      handleButton={handleLogin}
      error={error}
    />
  );
}
