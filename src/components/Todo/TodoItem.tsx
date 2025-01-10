import styles from './TodoItem.module.scss';
import Button from '../Button/Button.tsx';
import { TodoItemProps } from '../../types/common.ts';
import CheckBox from '../Input/CheckBox.tsx';
import useClickOutside from '../../hooks/useClickOutside.tsx';
import { ChangeEvent, useRef, useState } from 'react';

export default function TodoItem({
  id,
  content,
  memo,
  is_done,
  handleTodoDelete,
  handleTodoEdit,
}: TodoItemProps) {
  const [editTodo, setEditTodo] = useState({
    content: content,
    memo: memo,
    is_done: is_done,
  });
  const contentRef = useRef<HTMLInputElement>(null);
  const memoRef = useRef<HTMLInputElement>(null);
  useClickOutside(contentRef, () => contentRef.current?.blur());
  useClickOutside(memoRef, () => contentRef.current?.blur());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTodo({
      ...editTodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (editTodo.content !== content || editTodo.memo !== memo) {
      handleTodoEdit(id, editTodo);
    }
  };

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTodo(prevEdit => {
      const updatedTodo = {
        ...prevEdit,
        is_done: e.target.checked ? 'Y' : 'N',
      };
      handleTodoEdit(id, updatedTodo);
      return updatedTodo;
    });
  };
  return (
    <div
      className={`${styles.todo_item} ${is_done === 'Y' ? styles.is_done : ''}`}
    >
      <div className={styles.todo_info}>
        <CheckBox
          id={`todo-${id}`}
          isChecked={is_done === 'Y'}
          handleCheckBox={handleCheckBox}
        />
        <input
          value={editTodo.content}
          ref={contentRef}
          name="content"
          type="input"
          placeholder="입력"
          className={styles.todo_content}
          onChange={handleChange}
          onBlur={handleSave}
        />
        <div className="btn_group ml_auto">
          <Button
            handleButton={handleTodoDelete}
            className={['delete_btn', 'btn_red']}
          />
        </div>
      </div>
      <div className={styles.todo_memo}>
        <input
          value={editTodo.memo}
          ref={memoRef}
          name="memo"
          type="input"
          placeholder="입력"
          className={styles.todo_content}
          onChange={handleChange}
          onBlur={handleSave}
        />
      </div>
    </div>
  );
}
