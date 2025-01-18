import styles from '../Home.module.scss';
import { useOutletContext } from 'react-router';
import { TodoItemType } from '../../../types/common.ts';
import TodoItem from '../../../components/Todo/TodoItem.tsx';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function WeeklyView() {
  const { todos, handleTodoDelete, handleTodoEdit } = useOutletContext<{
    todos: TodoItemType[];
    handleTodoDelete: (id: number) => void;
    handleTodoEdit: (
      id: number,
      form: { content: string; memo: string },
    ) => void;
  }>();

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [activeTodo, setActiveTodo] = useState<string>();

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [activeTodo]);

  const dateGroupTodo = useMemo(() => {
    // 날짜별 그룹
    const dateGroup = todos.reduce(
      (acc: Record<string, TodoItemType[]>, current) => {
        const dateKey = new Date(current.todo_date).toLocaleDateString();
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(current);
        return acc;
      },
      {},
    );

    // 그룹 날짜별 정렬
    const sortGroupDate = Object.keys(dateGroup).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    );

    // 완료된 TODO 후순위정렬
    return sortGroupDate.reduce(
      (acc: Record<string, TodoItemType[]>, current) => {
        acc[current] = dateGroup[current].sort((a, b) => {
          if (a.is_done === b.is_done) return 0;
          return a.is_done === 'Y' ? 1 : -1;
        });
        return acc;
      },
      {},
    );
  }, [todos]);

  return (
    <div>
      {Object.entries(dateGroupTodo).map(
        ([date, todos]: [string, TodoItemType[]]) => (
          <div className={styles.todo_group} key={date}>
            <h6
              className={styles.date}
              onClick={() => {
                setActiveTodo(activeTodo === date ? '' : date);
              }}
            >
              {date}
            </h6>
            <div
              className={styles.todo_list}
              ref={contentRef}
              style={{
                maxHeight:
                  activeTodo === date
                    ? `${contentHeight * todos.length}px`
                    : '0',
              }}
            >
              {todos.map((todo: TodoItemType) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  handleTodoDelete={handleTodoDelete}
                  handleTodoEdit={handleTodoEdit}
                />
              ))}
            </div>
          </div>
        ),
      )}
    </div>
  );
}
