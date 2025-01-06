import styles from '../Home.module.scss';
import { useOutletContext } from 'react-router';
import { TodoItemType } from '../../../types/common.ts';
import TodoItem from '../../../components/Todo/TodoItem.tsx';

export default function WeeklyView() {
  const { todos, handleTodoDelete, handleCheckBox } = useOutletContext<{
    todos: TodoItemType[];
    handleTodoDelete: (id: number) => void;
    handleCheckBox: (id: number) => void;
  }>();
  return (
    <div className={styles.todo_list}>
      {todos
        .sort((a, b) => {
          if (a.isDone === b.isDone) return 0;
          return a.isDone === 'Y' ? 1 : -1;
        })
        .map((todo: TodoItemType) => (
          <TodoItem
            key={todo.id}
            {...todo}
            handleTodoDelete={() => handleTodoDelete(todo.id)}
            handleCheckBox={() => handleCheckBox(todo.id)}
          />
        ))}
    </div>
  );
}
