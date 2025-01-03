import styles from '../Input/Input.module.scss';

export default function CheckBox({
  id,
  isChecked,
  handleCheckBox,
}: {
  id: string;
  isChecked: boolean;
  handleCheckBox: () => void;
}) {
  const onChangeCheckBox = () => {
    handleCheckBox();
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
