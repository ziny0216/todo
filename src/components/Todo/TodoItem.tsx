import styles from './TodoItem.module.scss';
import Button from '../Button/Button.tsx';
import { TodoItemProps } from '../../types/common.ts';
import { useEffect, useRef, useState } from 'react';
import CheckBox from '../Input/CheckBox.tsx';

export default function TodoItem({
  id,
  content,
  memo,
  isDone,
  handleCheckBox,
  handleTodoDelete,
}: TodoItemProps) {
  const contentRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleTodoEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (contentRef.current && contentRef.current.contains(e.target as Node)) {
      return;
    }
    setIsEditing(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isEditing) {
      contentRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      className={`${styles.todo_item} ${isDone === 'Y' ? styles.is_done : ''}`}
    >
      <div className={styles.todo_info}>
        <CheckBox
          id={`todo-${id}`}
          isChecked={isDone === 'Y'}
          handleCheckBox={handleCheckBox}
        />
        {isEditing ? (
          <input
            ref={contentRef}
            type="input"
            placeholder="입력"
            className={styles.todo_content}
          />
        ) : (
          <span className={styles.todo_content} onClick={handleTodoEdit}>
            {content}
          </span>
        )}

        <div className="btn_group ml_auto">
          <Button
            handleButton={handleTodoDelete}
            className={['delete_btn', 'btn_red']}
          />
        </div>
      </div>
      <div className={styles.todo_memo}>
        <span>{memo}</span>
      </div>
    </div>
  );
}
