import styles from './Auth.module.scss';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import { Link } from 'react-router';
import { ChangeEvent } from 'react';
import { FormErrors } from '../../types/common.ts';

export default function AuthForm({
  type,
  getAuthForm,
  handleButton,
  error,
  disabled,
}: {
  type: 'login' | 'signup';
  getAuthForm: (e: ChangeEvent<HTMLInputElement>) => void;
  handleButton: () => void;
  error?: FormErrors;
  disabled: boolean;
}) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    getAuthForm(e);
  };
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
            onChange={onChange}
          >
            <p className="guide_text">{error?.email}</p>
          </Input>
          {type === 'signup' && (
            <Input
              maxLength={8}
              label={'nickname'}
              id={'nickname'}
              name={'nickname'}
              placeholder={'최대 8자 닉네임을 입력해주세요'}
              onChange={onChange}
            >
              <p className="guide_text">{error?.nickname}</p>
            </Input>
          )}
          <Input
            type={'password'}
            label={'password'}
            id={'password'}
            name={'password'}
            placeholder={
              '특수문자 + 숫자 + 영문자 포함 비밀번호를 입력해주세요'
            }
            onChange={onChange}
          >
            <p className="guide_text">{error?.password}</p>
          </Input>
          <Button
            disabled={disabled}
            handleButton={handleButton}
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
