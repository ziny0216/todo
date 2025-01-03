import styles from './Header.module.scss';
import Button from '../Button/Button.tsx';
import { useNavigate } from 'react-router';

export default function Header({ title }: { title?: string }) {
  const navigate = useNavigate();
  return (
    <header className={styles.default_header}>
      <div className={styles.header_inner}>
        <Button
          className={['sm_btn', 'prev_btn']}
          handleButton={() => navigate(-1)}
        />
        <h1 className={styles.header_title}>{title}</h1>
        <Button
          className={['sm_btn', 'next_btn']}
          handleButton={() => navigate(-1)}
        />
      </div>
    </header>
  );
}
