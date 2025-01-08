import styles from './Home.module.scss';
import Button from '../../components/Button/Button.tsx';
import { useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header/Header.tsx';
import useHeaderDate from '../../hooks/useHeaderDate.tsx';
import { Outlet, useNavigate } from 'react-router';
import { supabase } from '../../utils/SupabaseClient.ts';
import { formatDate } from '../../utils/common.ts';
import Toolbar from '../../components/Toolbar/Toolbar.tsx';
import TodoFormModal from '../../components/Modal/TodoFormModal.tsx';
import { Tables } from '../../types/database.types.ts';

export default function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Tables<'TODO'>[]>([]);
  const [isShowToolbar, setIsShowToolbar] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const path = location.pathname.replace('/', '') as
    | 'daily'
    | 'weekly'
    | 'monthly';
  const { currentDate, dateTitle, handlePrev, handleNext, startDate, endDate } =
    useHeaderDate(path);

  useEffect(() => {
    fetchTodos(
      formatDate(currentDate),
      formatDate(startDate),
      formatDate(endDate),
    );
  }, [currentDate, startDate, endDate]);

  const fetchTodos = useCallback(
    async (
      currentDate: string = '',
      startDate: string = '',
      endDate: string = '',
    ) => {
      try {
        let data, error;

        if (path === 'monthly') {
          ({ data, error } = await supabase.rpc('get_todo_summary', {
            start_date: startDate,
            end_date: endDate,
          }));

          if (error) {
            console.error('Error fetching todos:', error.message);
          } else {
            console.log(data);
          }
        } else {
          let query = supabase.from('TODO').select('*');

          if (startDate && endDate) {
            query = query.gte('todo_date', startDate).lte('todo_date', endDate);
          } else if (currentDate) {
            query = query.eq('todo_date', currentDate);
          }

          ({ data, error } = await query);
          if (error) {
            console.error('Error fetching todos:', error.message);
          } else {
            setTodos(data || []);
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    [],
  );

  const handleCheckBox = (id: number) => {
    const newTodos: Tables<'TODO'>[] = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, is_done: todo.is_done === 'Y' ? 'N' : 'Y' };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleTodoDelete = (id: number) => {
    const newTodos: Tables<'TODO'>[] = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };
  const handleToolbarAction = (action: string) => {
    if (action === 'add') {
      setIsOpenModal(true);
      setIsShowToolbar(false);
      return;
    }
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
              startDate,
              endDate,
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
