import styles from './Toolbar.module.scss';
import Button from '../Button/Button.tsx';
import { memo, useRef } from 'react';
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
