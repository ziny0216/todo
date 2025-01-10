import styles from './Home.module.scss';
import Button from '../../components/Button/Button.tsx';
import { useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header/Header.tsx';
import useHeaderDate from '../../hooks/useHeaderDate.tsx';
import { Outlet, useNavigate } from 'react-router';
import { supabase } from '../../utils/SupabaseClient.ts';
import { formatDate } from '../../utils/common.ts';
import { Tables } from '../../types/database.types.ts';
import { TodoForm, TodoSummaryType } from '../../types/common.ts';
import TodoFormModal from '../../components/Modal/TodoFormModal.tsx';
import Toolbar from '../../components/Toolbar/Toolbar.tsx';

export default function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Tables<'TODO'>[]>([]);
  const [todoCnt, setTodoCnt] = useState<TodoSummaryType>([]);
  const [isShowToolbar, setIsShowToolbar] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const path = location.pathname.replace('/', '') as
    | 'daily'
    | 'weekly'
    | 'monthly';
  const {
    currentDate,
    setCurrentDate,
    dateTitle,
    handlePrev,
    handleNext,
    startDate,
    endDate,
  } = useHeaderDate(path);

  useEffect(() => {
    fetchTodos(
      formatDate(currentDate),
      formatDate(startDate),
      formatDate(endDate),
    );
  }, [currentDate, startDate, endDate]);

  // todo 리스트 호출
  const fetchTodos = useCallback(
    async (
      currentDate: string = '',
      startDate: string = '',
      endDate: string = '',
    ) => {
      try {
        let data, error;
        console.log(path, 'path');
        // 월간일 경우 ctn 불러오기
        if (path === 'monthly') {
          ({ data, error } = await supabase.rpc('get_todo_summary', {
            start_date: startDate,
            end_date: endDate,
          }));

          if (error) {
            console.error('Error fetching todos:', error.message);
          } else {
            setTodoCnt(data || []);
          }
        } else {
          // 그 외 리스트 불러오기
          let query = supabase.from('TODO').select('*');
          console.log('일간!!!!!');
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
    [path],
  );

  //todo 등록
  const onSubmit = async (form: TodoForm) => {
    try {
      const { data, error } = await supabase
        .from('TODO')
        .insert([
          {
            todo_date: form.todo_date,
            content: form.content,
            memo: form.memo,
          },
        ])
        .select();
      if (error) {
        console.error('Error fetching todos:', error.message);
      } else {
        setTodos([...todos, ...(data || [])]);
        setCurrentDate(new Date(form.todo_date));
      }
    } catch (e) {
      console.error(e);
    }
  };

  //todo 수정
  const handleTodoEdit = async (
    id: number,
    form: { content: string; memo: string; is_done: 'Y' | 'N' },
  ) => {
    try {
      const { data, error } = await supabase
        .from('TODO')
        .update({
          content: form.content,
          memo: form.memo,
          is_done: form.is_done,
        })
        .eq('id', id)
        .select();
      console.log(data, 'data');
      if (error) {
        console.error('Error fetching todos:', error.message);
      } else {
        setTodos(prevTodos =>
          prevTodos.map(item =>
            item.id === id ? { ...item, ...data[0] } : item,
          ),
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // todo 삭제
  const handleTodoDelete = async (id: number) => {
    try {
      const { error } = await supabase.from('TODO').delete().eq('id', id);
      if (error) {
        console.error('Error fetching todos:', error.message);
      } else {
        const newTodos: Tables<'TODO'>[] = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
      }
    } catch (e) {
      console.error(e);
    }
  };

  //todo 툴바
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
              todoCnt,
              handleTodoDelete,
              currentDate,
              setCurrentDate,
              startDate,
              endDate,
              handleTodoEdit,
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
          onSubmit={onSubmit}
          onClose={() => setIsOpenModal(false)}
          isOpen={isOpenModal}
        />
      </section>
    </>
  );
}
