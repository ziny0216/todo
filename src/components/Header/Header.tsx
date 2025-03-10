import styles from './Header.module.scss';
import Button from '../Button/Button.tsx';

export default function Header({
  className,
  title,
  handlePrev,
  handleNext,
}: {
  className?: string;
  title?: string;
  handlePrev: () => void;
  handleNext: () => void;
}) {
  return (
    <header
      className={`${styles.default_header} ${className && styles[className]}`}
    >
      <div className={styles.header_inner}>
        <Button className={['sm_btn', 'prev_btn']} handleButton={handlePrev} />
        <h1 className={styles.header_title}>{title}</h1>
        <Button className={['sm_btn', 'next_btn']} handleButton={handleNext} />
      </div>
    </header>
  );
}
