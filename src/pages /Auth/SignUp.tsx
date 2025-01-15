import AuthForm from '../../components/Auth/AuthForm.tsx';
import { useAuthInput } from '../../hooks/useAuthInput.tsx';
import { useNavigate } from 'react-router';
import { registerUser } from '../../services/authApi.ts';

export default function SignUp() {
  const navigate = useNavigate();
  const { form, error, getAuthForm, isValid, checkUserDuplication } =
    useAuthInput('signup');

  const signUpNewUser = async () => {
    try {
      //닉네임, 이메일 중복체크
      const result = await checkUserDuplication();
      if (!result) {
        return;
      }
      //회원가입
      await registerUser(form);
      alert('이메일을 확인해주세요.');
      navigate('/login');
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
