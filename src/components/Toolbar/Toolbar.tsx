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
        text={'day'}
        handleButton={() => handleButtonClick('day')}
      />
      <Button
        className={['btn_sm', 'btn_text']}
        text={'week'}
        handleButton={() => handleButtonClick('week')}
      />
      <Button
        className={['btn_sm', 'btn_text']}
        text={'month'}
        handleButton={() => handleButtonClick('month')}
      />
    </div>
  );
}
