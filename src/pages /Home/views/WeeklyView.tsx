import styles from '../Home.module.scss';
import { useOutletContext } from 'react-router';
import { TodoItemType } from '../../../types/common.ts';
import TodoItem from '../../../components/Todo/TodoItem.tsx';
import { useEffect, useRef, useState } from 'react';

export default function WeeklyView() {
  const { todos, handleTodoDelete, handleCheckBox, getDateRange } =
    useOutletContext<{
      todos: TodoItemType[];
      handleTodoDelete: (id: number) => void;
      handleCheckBox: (id: number) => void;
      getDateRange: () => { startDate: Date; endDate: Date };
    }>();
  const { startDate, endDate } = getDateRange();
  console.log(startDate, endDate, 'startDate, endDate');
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [activeTodo, setActiveTodo] = useState<string>();

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [activeTodo]);

  const dateGroupTodo = todos.reduce(
    (acc: Record<string, TodoItemType[]>, todo) => {
      const dateKey = new Date(todo.todo_date).toLocaleDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(todo);
      return acc;
    },
    {},
  );
  return (
    <div>
      {Object.entries(dateGroupTodo).map(
        ([date, todos]: [string, TodoItemType[]]) => (
          <div className={styles.todo_group} key={date}>
            <h6
              className={styles.date}
              onClick={() => {
                setActiveTodo(activeTodo ? '' : date);
              }}
            >
              {date}
            </h6>
            <div
              className={styles.todo_list}
              ref={contentRef}
              style={{
                maxHeight: activeTodo === date ? `${contentHeight}px` : '0',
              }}
            >
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
                    handleCheckBox={() => handleCheckBox(todo.id)}
                  />
                ))}
            </div>
          </div>
        ),
      )}
    </div>
  );
}
