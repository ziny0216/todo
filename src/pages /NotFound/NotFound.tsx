import styles from './NotFound.module.scss';
import Button from '../../components/Button/Button.tsx';

export default function NotFound() {
  return (
    <section className={styles.not_found_section}>
      <p className={styles.desc}>페이지를 찾을 수 없습니다.</p>
      <Button
        className={['btn_xxl', 'btn_gray', 'btn_radius0']}
        text={'메인으로 가기'}
      />
    </section>
  );
}
