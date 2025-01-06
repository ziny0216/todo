import styles from '../Home.module.scss';
import { useNavigate, useOutletContext } from 'react-router';
import Calendar from '../../../components/Calendar/Calendar.tsx';

export default function MonthlyView() {
  const { currentDate } = useOutletContext<{
    currentDate: Date;
  }>();
  const navigate = useNavigate();
  const handleDateSelection = (date: Date) => {
    navigate(`/daily?date=${date.toLocaleDateString()}`);
  };
  return (
    <div className={styles.todo_list}>
      <Calendar
        isPercentage={true}
        currentDate={currentDate}
        handleDateSelection={handleDateSelection}
      />
    </div>
  );
}
