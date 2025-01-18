import styles from './Home.module.scss';
import { useCallback, useEffect, useState } from 'react';
import useHeaderDate from '../../hooks/useHeaderDate.tsx';
import { Outlet, useNavigate } from 'react-router';
import { formatDate } from '../../utils/common.ts';
import { Tables } from '../../types/database.types.ts';
import { TodoForm, TodoSummaryType } from '../../types/common.ts';
import Toolbar from '../../components/Toolbar/Toolbar.tsx';
import {
  createTodo,
  deleteTodo,
  fetchTodoMonthly,
  readTodo,
  updateTodo,
} from '../../services/todoApi.ts';
import Header from '../../components/Header/Header.tsx';
import TodoFormModal from '../../components/Modal/TodoFormModal.tsx';

export default function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Tables<'todos'>[]>([]);
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
        // 월간일 경우 ctn 불러오기
        if (path === 'monthly') {
          const data = await fetchTodoMonthly(startDate, endDate);
          setTodoCnt(data || []);
        } else {
          const data = await readTodo(currentDate, startDate, endDate);
          setTodos(data || []);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [path],
  );

  //todo 등록
  const onSubmit = useCallback(async (form: TodoForm) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) return;
      const data = await createTodo({
        user_id: userId,
        todo_date: form.todo_date,
        content: form.content,
        memo: form.memo,
      });

      setTodos(prevTodo => [...prevTodo, ...data]);
      setCurrentDate(new Date(form.todo_date));
    } catch (e) {
      console.error(e);
    }
  }, []);

  //todo 수정
  const handleTodoEdit = useCallback(
    async (
      id: number,
      form: { content: string; memo: string; is_done: 'Y' | 'N' },
    ) => {
      try {
        const data = await updateTodo(id, {
          content: form.content,
          memo: form.memo,
          is_done: form.is_done,
        });
        setTodos(prevTodos =>
          prevTodos.map(item =>
            item.id === id ? { ...item, ...data[0] } : item,
          ),
        );
      } catch (e) {
        console.error(e);
      }
    },
    [],
  );

  // todo 삭제
  const handleTodoDelete = useCallback(async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (e) {
      console.error(e);
    }
  }, []);

  //todo 툴바
  const handleToolbarAction = useCallback(
    (action: string) => {
      if (action === 'add') {
        setIsOpenModal(true);
        setIsShowToolbar(false);
        return;
      }
      navigate(`/${action}`);
      setIsShowToolbar(false);
    },
    [navigate],
  );

  const handleToolbar = useCallback(() => {
    setIsShowToolbar(!isShowToolbar);
  }, [isShowToolbar]);

  const closeToolbar = useCallback(() => {
    setIsShowToolbar(false);
  }, []);

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

        <Toolbar
          handleToolbar={handleToolbar}
          handleButtonClick={handleToolbarAction}
          isShowToolbar={isShowToolbar}
          closeToolbar={closeToolbar}
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
