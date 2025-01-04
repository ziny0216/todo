import styles from './Calendar.module.scss';

export default function Calendar({
  handleDateSelection,
  currentDate,
  isPercentage,
}: {
  handleDateSelection: (date: Date) => void;
  currentDate: Date;
  isPercentage: boolean;
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
    const date = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      date.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }
    return date;
  };

  return (
    <div
      className={`${styles.calendar_wrap} ${isPercentage ? styles.percent_calendar : styles.default_calendar}`}
    >
      <ul className={`${styles.calendar_header} ${styles.calendar_content}`}>
        {days.map((day, idx) => {
          const dateClass = `${styles.days} ${idx === 0 ? styles.holiday : ''} ${idx === 6 ? styles.saturday : ''} }`;
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
          const dateClass = `${styles.date} ${date.getDay() === 0 ? styles.holiday : ''} ${date.getDay() === 6 ? styles.saturday : ''} ${date.getDate() === new Date().getDate() ? styles.today : ''}`;
          return (
            <li
              key={date.toDateString()}
              className={dateClass}
              onClick={() => handleDateSelection(date)}
            >
              <span className={styles.date_num}>{date.getDate()}</span>
              {isPercentage && (
                <div className={styles.goal_figure}>
                  <span className={styles.percent}>50% 달성</span>
                  <span>1001개 /10110개</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
