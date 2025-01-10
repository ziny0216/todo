import styles from '../Home.module.scss';
import { useOutletContext } from 'react-router';
import { TodoItemType } from '../../../types/common.ts';
import TodoItem from '../../../components/Todo/TodoItem.tsx';

export default function DailyView() {
  const { todos, handleTodoDelete, handleTodoEdit } = useOutletContext<{
    todos: TodoItemType[];
    handleTodoDelete: (id: number) => void;
    handleTodoEdit: (
      id: number,
      form: { content: string; memo: string },
    ) => void;
  }>();
  return (
    <div className={styles.todo_list}>
      {todos
        .sort((a, b) => {
          if (a.is_done === b.is_done) return 0;
          return a.is_done === 'Y' ? 1 : -1;
        })
        .map((todo: TodoItemType) => (
          <TodoItem
            key={todo.id}
            {...todo}
            handleTodoDelete={() => handleTodoDelete(todo.id)}
            handleTodoEdit={handleTodoEdit}
          />
        ))}
    </div>
  );
}
