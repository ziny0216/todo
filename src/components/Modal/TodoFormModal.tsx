import Modal from './Modal';
import styles from './Modal.module.scss';
import Button from '../Button/Button.tsx';
import Input from '../Input/Input.tsx';
import { ChangeEvent, useState } from 'react';
import { TodoForm } from '../../types/common.ts';
import CalendarModal from './CalendarModal.tsx';

export default function TodoFormModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [todoForm, setTodoForm] = useState<TodoForm>({
    regDate: '',
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
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className={styles.todo_form}>
        <Input
          readonly={true}
          label={'DATE'}
          id={'date'}
          name={'regDate'}
          placeholder={'날짜를 선택해주세요.'}
          onClick={() => setIsCalendarOpen(true)}
        />
        <Input
          label={'TODO'}
          id={'content'}
          name={'content'}
          placeholder={'할 일을 작성해주세요.'}
          onChange={handleTodoInput}
        />
        <p>{isCalendarOpen}</p>
        <Input
          label={'MEMO'}
          id={'memo'}
          name={'memo'}
          placeholder={'메모를 작성해주세요.'}
          onChange={handleTodoInput}
        />
      </div>

      <div className={`${styles.modal_footer} btn_group_full`}>
        <Button className={['btn_xl', 'btn_gray']} text={'등록'}></Button>
        <Button
          className={['btn_xl', 'btn_red']}
          text={'취소'}
          handleButton={onClose}
        ></Button>
      </div>
      <CalendarModal
        onClose={() => setIsCalendarOpen(false)}
        isOpen={isCalendarOpen}
      />
    </Modal>
  );
}
