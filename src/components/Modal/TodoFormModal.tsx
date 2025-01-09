import Modal from './Modal';
import styles from './Modal.module.scss';
import Button from '../Button/Button.tsx';
import Input from '../Input/Input.tsx';
import { ChangeEvent, useState } from 'react';
import { TodoForm } from '../../types/common.ts';
import CalendarModal from './CalendarModal.tsx';
import { formatDate } from '../../utils/common.ts';

export default function TodoFormModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: TodoForm) => void;
}) {
  const [todoForm, setTodoForm] = useState<TodoForm>({
    todo_date: '',
    content: '',
    memo: '',
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleTodoInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoForm({
      ...todoForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateSelection = (date: Date) => {
    setTodoForm({
      ...todoForm,
      todo_date: formatDate(date),
    });
  };

  const handleTodoSubmit = () => {
    if (!todoForm.todo_date) {
      alert('날짜를 선택해주세요');
    }
    if (!todoForm.content) {
      alert('내용을 입력해주세요');
    }
    onSubmit(todoForm);
    setTodoForm({
      todo_date: '',
      content: '',
      memo: '',
    });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className={styles.todo_form}>
        <Input
          value={todoForm.todo_date}
          readonly={true}
          label={'DATE'}
          id={'date'}
          name={'todo_date'}
          placeholder={'날짜를 선택해주세요.'}
          onClick={() => setIsCalendarOpen(true)}
        />
        <Input
          label={'TODO'}
          value={todoForm.content}
          id={'content'}
          name={'content'}
          placeholder={'할 일을 작성해주세요.'}
          onChange={handleTodoInput}
        />
        <Input
          label={'MEMO'}
          value={todoForm.memo}
          id={'memo'}
          name={'memo'}
          placeholder={'메모를 작성해주세요.'}
          onChange={handleTodoInput}
        />
      </div>

      <div className={`${styles.modal_footer} btn_group_full`}>
        <Button
          className={['btn_xl', 'btn_gray']}
          text={'등록'}
          handleButton={() => {
            handleTodoSubmit();
            onClose();
          }}
        ></Button>

        <Button
          className={['btn_xl', 'btn_red']}
          text={'취소'}
          handleButton={onClose}
        ></Button>
      </div>
      <CalendarModal
        handleDateSelection={handleDateSelection}
        onClose={() => setIsCalendarOpen(false)}
        isOpen={isCalendarOpen}
      />
    </Modal>
  );
}
