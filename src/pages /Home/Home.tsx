import styles from './Home.module.scss';
import Button from '../../components/Button/Button.tsx';
import { TodoItemType } from '../../types/common.ts';
import { useEffect, useState } from 'react';
import Toolbar from '../../components/Toolbar/Toolbar.tsx';
import Header from '../../components/Header/Header.tsx';
import useHeaderDate from '../../hooks/useHeaderDate.tsx';
import TodoFormModal from '../../components/Modal/TodoFormModal.tsx';
import { Outlet, useNavigate } from 'react-router';
import { supabase } from '../../utils/SupabaseClient.ts';

export default function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [isShowToolbar, setIsShowToolbar] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [todoListType, setTodoListType] = useState<
    'daily' | 'weekly' | 'monthly'
  >('daily');
  const { currentDate, dateTitle, handlePrev, handleNext, getDateRange } =
    useHeaderDate(todoListType);

  useEffect(() => {
    const path = location.pathname.replace('/', '') as
      | 'daily'
      | 'weekly'
      | 'monthly';
    setTodoListType(path);
  }, [location.pathname]);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase.from('TODO').select('*');
      if (error) {
        console.error('Error fetching todos:', error.message);
      } else {
        setTodos(data || []);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCheckBox = (id: number) => {
    const newTodos: TodoItemType[] = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, is_done: todo.is_done === 'Y' ? 'N' : 'Y' };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleTodoDelete = (id: number) => {
    const newTodos: TodoItemType[] = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };
  const handleToolbarAction = (action: string) => {
    if (action === 'add') {
      setIsOpenModal(true);
      setIsShowToolbar(false);
      return;
    }
    setTodoListType(action as 'daily' | 'weekly' | 'monthly');
    navigate(`/${action}`);
    setIsShowToolbar(false);
  };
  return (
    <>
      <Header
        handlePrev={handlePrev}
        handleNext={handleNext}
        title={dateTitle}
      />

      <section className={styles.main_section}>
        <div className="inner">
          <Outlet
            context={{
              todos,
              handleTodoDelete,
              handleCheckBox,
              currentDate,
              getDateRange,
            }}
          />
        </div>

        <Button
          className={['btn_gray', 'floating_btn']}
          handleButton={() => setIsShowToolbar(!isShowToolbar)}
        />
        <Toolbar
          handleButtonClick={handleToolbarAction}
          isShowToolbar={isShowToolbar}
          closeToolbar={() => setIsShowToolbar(false)}
        />

        <TodoFormModal
          onClose={() => setIsOpenModal(false)}
          isOpen={isOpenModal}
        />
      </section>
    </>
  );
}
