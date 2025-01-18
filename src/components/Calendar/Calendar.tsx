import styles from './Calendar.module.scss';
import { TodoSummaryType } from '../../types/common.ts';
import { formatDate } from '../../utils/common.ts';

export default function Calendar({
  handleDateSelection,
  currentDate,
  isPercentage,
  cntData,
}: {
  handleDateSelection: (date: Date) => void;
  currentDate: Date;
  isPercentage: boolean;
  cntData?: TodoSummaryType;
}) {
  const days: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  const firstDay = new Date(
    new Date(currentDate).getFullYear(),
    new Date(currentDate).getMonth(),
    1,
  );
  const lastDay = new Date(
    new Date(currentDate).getFullYear(),
    new Date(currentDate).getMonth() + 1,
    0,
  );

  const getCurrentData = () => {
    const dateArr: {
      date: Date;
      total_todos?: number;
      done_todos?: number;
      percentage?: number;
    }[] = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      dateArr.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
      });
    }
    if (isPercentage && cntData) {
      return dateArr.map(item => {
        const matched = cntData.find(
          match => match.date === formatDate(item.date),
        );
        if (matched) {
          return {
            ...item,
            total_todos: matched.total_todos,
            done_todos: matched.done_todos,
            percentage: Math.trunc(
              (matched.done_todos / matched.total_todos) * 100,
            ),
          };
        }
        return item;
      });
    }
    return dateArr;
  };

  return (
    <div
      className={`${styles.calendar_wrap} ${isPercentage ? styles.percent_calendar : styles.default_calendar}`}
    >
      <ul className={`${styles.calendar_header} ${styles.calendar_content}`}>
        {days.map((day, idx) => {
          const dateClass = `${styles.days} ${idx === 0 ? styles.holiday : ''} ${idx === 6 ? styles.saturday : ''} `;
          return (
            <li key={day} className={dateClass}>
              {day}
            </li>
          );
        })}
      </ul>
      <ul className={`${styles.calendar_body} ${styles.calendar_content}`}>
        {/*빈 날짜*/}
        {Array(firstDay.getDay())
          .fill(null)
          .map((_, idx) => (
            <li key={`empty-${idx}`} className={styles.date}></li>
          ))}

        {/*해당 월의 날짜*/}
        {getCurrentData().map(date => {
          const dateClass = `${styles.date} ${date.date.getDay() === 0 ? styles.holiday : ''} ${date.date.getDay() === 6 ? styles.saturday : ''} ${
            date.date.getFullYear() === new Date().getFullYear() &&
            date.date.getMonth() === new Date().getMonth() &&
            date.date.getDate() === new Date().getDate()
              ? styles.today
              : ''
          }`;
          return (
            <li
              key={date.date.toDateString()}
              className={dateClass}
              onClick={() => handleDateSelection(date.date)}
            >
              <span className={styles.date_num}>{date.date.getDate()}</span>
              {date.total_todos && date.total_todos > 0 && (
                <div className={styles.goal_figure}>
                  <span className={styles.percent}>
                    {date.percentage}% 달성
                  </span>
                  <span>
                    {date.done_todos}개 /{date.total_todos}개
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
