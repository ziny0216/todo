import styles from './Home.module.scss';
import Button from '../../components/Button/Button.tsx';
import todoData from '../../mock/todoData.json';
import { TodoItemType } from '../../types/common.ts';
import TodoItem from '../../components/Todo/TodoItem.tsx';
import { useState } from 'react';
import Toolbar from '../../components/Toolbar/Toolbar.tsx';

export default function Home() {
  const [todos, setTodos] = useState<TodoItemType[]>(todoData);
  const [isShowToolbar, setIsShowToolbar] = useState(false);
  const handleFloatingBar = () => {
    setIsShowToolbar(!isShowToolbar);
  };

  const handleCheckBox = (id: number) => {
    const newTodos: TodoItemType[] = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isDone: todo.isDone === 'Y' ? 'N' : 'Y' };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleTodoDelete = (id: number) => {
    console.log(id);
    const newTodos: TodoItemType[] = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };
  return (
    <section className={styles.main_section}>
      <div className="inner">
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
      </div>
      <Button
        className={['btn_gray', 'floating_btn']}
        handleButton={handleFloatingBar}
      />
      <Toolbar
        isShowToolbar={isShowToolbar}
        closeToolbar={() => setIsShowToolbar(false)}
      />
    </section>
  );
}