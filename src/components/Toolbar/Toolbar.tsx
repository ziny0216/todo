import styles from './Toolbar.module.scss';
import Button from '../Button/Button.tsx';
import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside.tsx';

export default function Toolbar({
  isShowToolbar,
  closeToolbar,
  handleButtonClick,
}: {
  isShowToolbar: boolean;
  closeToolbar: () => void;
  handleButtonClick: (action: string) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside(contentRef, () => {
    closeToolbar();
  });

  return (
    <div
      ref={contentRef}
      className={`${styles.tool_bar} ${isShowToolbar ? styles.show : ''}`}
    >
      <Button
        handleButton={() => handleButtonClick('add')}
        className={['btn_sm', 'btn_text']}
        text={'Add'}
      />
      <Button
        className={['btn_sm', 'btn_text']}
        text={'daily'}
        handleButton={() => handleButtonClick('daily')}
      />
      <Button
        className={['btn_sm', 'btn_text']}
        text={'weekly'}
        handleButton={() => handleButtonClick('weekly')}
      />
      <Button
        className={['btn_sm', 'btn_text']}
        text={'monthly'}
        handleButton={() => handleButtonClick('monthly')}
      />
    </div>
  );
}
