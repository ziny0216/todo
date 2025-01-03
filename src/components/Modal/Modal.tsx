import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useRef } from 'react';
import Button from '../Button/Button.tsx';

export default function Modal({
  isOpen,
  children,
  onClose,
}: {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog ref={dialogRef} className={styles.modal_wrap}>
      <div className={styles.modal_header}>
        <Button className={['close_btn']} handleButton={onClose} />
      </div>
      <div className={styles.modal_content}>{children}</div>
    </dialog>,
    document.getElementById('modal') as HTMLElement,
  );
}
