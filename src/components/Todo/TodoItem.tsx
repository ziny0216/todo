import styles from './TodoItem.module.scss';
import Button from '../Button/Button.tsx';
import { TodoItemProps } from '../../types/common.ts';
import CheckBox from '../Input/CheckBox.tsx';
import useEditableInput from '../../hooks/useEditableInput.tsx';
import useClickOutside from '../../hooks/useClickOutside.tsx';

export default function TodoItem({
  id,
  content,
  memo,
  isDone,
  handleCheckBox,
  handleTodoDelete,
}: TodoItemProps) {
  const todoContent = useEditableInput(content);
  const todoMemo = useEditableInput(memo);
  useClickOutside(todoContent.inputEditRef, () =>
    todoContent.setIsEditing(false),
  );
  useClickOutside(todoMemo.inputEditRef, () => todoMemo.setIsEditing(false));
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
        {todoContent.isEditing ? (
          <input
            value={todoContent.inputValue}
            ref={todoContent.inputEditRef}
            name="content"
            type="input"
            placeholder="입력"
            className={styles.todo_content}
            onChange={todoContent.handleChange}
          />
        ) : (
          <span
            className={styles.todo_content}
            onClick={todoContent.handleEdit}
          >
            {todoContent.inputValue}
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
        {todoMemo.isEditing ? (
          <input
            value={todoMemo.inputValue}
            ref={todoMemo.inputEditRef}
            type="input"
            name="memo"
            placeholder="입력"
            className={styles.todo_content}
            onChange={todoMemo.handleChange}
          />
        ) : (
          <span className={styles.todo_content} onClick={todoMemo.handleEdit}>
            {todoMemo.inputValue}
          </span>
        )}
      </div>
    </div>
  );
}
