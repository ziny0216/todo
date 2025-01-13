import styles from './Auth.module.scss';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import { Link } from 'react-router';

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
  return (
    <section className={styles.auth_section}>
      <div className={`inner ${styles.inner}`}>
        <h6 className={styles.title}>
          {type === 'login' ? '로그인' : '회원가입'}
        </h6>
        <div className={styles.form_group}>
          <Input
            label={'email'}
            id={'email'}
            name={'email'}
            placeholder={'이메일을 입력해주세요'}
          />
          {type === 'signup' && (
            <Input
              label={'nickname'}
              id={'nickname'}
              name={'nickname'}
              placeholder={'닉네임을 입력해주세요'}
            />
          )}
          <Input
            label={'password'}
            id={'password'}
            name={'password'}
            placeholder={'비밀번호를 입력해주세요'}
          />
          <Button
            className={['btn_xxl', 'btn_purple']}
            text={type === 'login' ? '로그인' : '회원가입'}
          />
          {type === 'login' && (
            <Link to="/sign-up" className={styles.link}>
              회원가입
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
