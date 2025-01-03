import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

export default function Modal({ children }: { children: ReactNode }) {
  return createPortal(
    <dialog>
      <div className={styles.modal_content}>{children}</div>
    </dialog>,
    document.getElementById('modal') as HTMLElement,
  );
}
