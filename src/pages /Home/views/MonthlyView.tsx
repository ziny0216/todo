import styles from '../Home.module.scss';
import { useNavigate, useOutletContext } from 'react-router';
import Calendar from '../../../components/Calendar/Calendar.tsx';
import { TodoSummaryType } from '../../../types/common.ts';

export default function MonthlyView() {
  const { currentDate, todoCnt } = useOutletContext<{
    currentDate: Date;
    todoCnt: TodoSummaryType;
  }>();
  const navigate = useNavigate();
  const handleDateSelection = (date: Date) => {
    navigate(`/daily?date=${date.toLocaleDateString()}`);
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
