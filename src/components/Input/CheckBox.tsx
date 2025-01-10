import styles from '../Input/Input.module.scss';
import { ChangeEvent } from 'react';

export default function CheckBox({
  id,
  isChecked,
  handleCheckBox,
}: {
  id: string;
  isChecked: boolean;
  handleCheckBox: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const onChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    handleCheckBox(e);
  };
  return (
    <div className={styles.default_chk_box}>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={onChangeCheckBox}
      />
      <label htmlFor={id}></label>
    </div>
  );
}
