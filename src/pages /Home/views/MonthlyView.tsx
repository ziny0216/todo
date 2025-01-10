import styles from '../Home.module.scss';
import { useNavigate, useOutletContext } from 'react-router';
import Calendar from '../../../components/Calendar/Calendar.tsx';
import { TodoSummaryType } from '../../../types/common.ts';
import { Dispatch, SetStateAction } from 'react';

export default function MonthlyView() {
  const { currentDate, setCurrentDate, todoCnt } = useOutletContext<{
    currentDate: Date;
    todoCnt: TodoSummaryType;
    setCurrentDate: Dispatch<SetStateAction<Date>>;
  }>();
  const navigate = useNavigate();
  const handleDateSelection = (date: Date) => {
    setCurrentDate(date);
    navigate('/daily');
  };
  return (
    <div className={styles.todo_list}>
      <Calendar
        cntData={todoCnt}
        isPercentage={true}
        currentDate={currentDate}
        handleDateSelection={handleDateSelection}
      />
    </div>
  );
}
