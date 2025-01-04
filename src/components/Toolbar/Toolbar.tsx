import styles from './Toolbar.module.scss';
import Button from '../Button/Button.tsx';
import { useEffect, useRef } from 'react';

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
  const handleClickOutside = (e: MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      closeToolbar();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
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
