import styles from './Modal.module.scss';
import { ReactNode } from 'react';

export default function BottomModal({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {isOpen && <div className={styles.dimmed} onClick={onClose} />}
      <div className={`${styles.bottom_modal} ${isOpen ? styles.open : ''}`}>
        <div className={styles.modal_content}>{children}</div>
      </div>
    </>
  );
}
