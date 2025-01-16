import styles from '../Input/Input.module.scss';
import { InputProps } from '../../types/common.ts';

export default function Input({
  id,
  label,
  name,
  value,
  type = 'text',
  placeholder,
  maxLength,
  disabled,
  readonly,
  onChange,
  onClick,
  children,
}: InputProps) {
  return (
    <div className={styles.default_input}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readonly}
        onChange={onChange}
        onClick={onClick}
        autoComplete="off"
      ></input>
      {children}
    </div>
  );
}
