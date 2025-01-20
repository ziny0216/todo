import styles from './Toolbar.module.scss';
import Button from '../Button/Button.tsx';
import { memo, useEffect, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside.tsx';
import { CSSTransition } from 'react-transition-group';

function Toolbar({
  isShowToolbar,
  handleToolbar,
  closeToolbar,
  handleButtonClick,
}: {
  isShowToolbar?: boolean;
  handleToolbar: () => void;
  closeToolbar: () => void;
  handleButtonClick: (action: string) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useClickOutside(contentRef, () => {
    closeToolbar();
  });

  const toolbarPosition = () => {
    const parentsHeight = window.innerHeight + window.scrollY;

    if (contentRef.current) {
      const floatingBtn = contentRef.current
        .firstElementChild as HTMLButtonElement;
      const bottomTop = floatingBtn.offsetHeight;
      floatingBtn.style.top = `${parentsHeight - bottomTop - 16}px`;
    }
  };

  useEffect(() => {
    toolbarPosition();
    window.addEventListener('resize', toolbarPosition);
    window.addEventListener('scroll', toolbarPosition);
    return () => {
      window.removeEventListener('resize', toolbarPosition);
      window.removeEventListener('scroll', toolbarPosition);
    };
  }, []);
  return (
    <div ref={contentRef}>
      <Button
        className={['btn_gray', 'floating_btn']}
        handleButton={handleToolbar}
      />
      <CSSTransition
        nodeRef={toolbarRef}
        in={isShowToolbar}
        timeout={300}
        classNames="show"
        unmountOnExit
      >
        <div className={styles.tool_bar} ref={toolbarRef}>
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
      </CSSTransition>
    </div>
  );
}
export default memo(Toolbar);
