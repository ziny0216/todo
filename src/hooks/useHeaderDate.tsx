import { useState } from 'react';
import { useDateHookType } from '../types/common.ts';

export default function useHeaderDate(
  type: 'daily' | 'weekly' | 'monthly',
): useDateHookType {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDateRange = () => {
    const day = currentDate.getDay();
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - day);
    endDate.setDate(startDate.getDate() + 6);

    return { startDate, endDate };
  };

  const getWeekly = (date: Date): string => {
    const { startDate, endDate } = getDateRange();
    const today = date.getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1); // 해당 월의 1일
    const firstWeeks = firstDayOfMonth.getDay(); // 1일의 요일 (0 = 일요일)

    if (endDate.getMonth() !== startDate.getMonth()) {
      return `${currentDate.getFullYear()}년 ${endDate.getMonth() + 1}월 1주차`;
    }

    return `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${Math.ceil((today + firstWeeks) / 7)}주차`;
  };

  const handlePrev = () => {
    setCurrentDate(prevDate => {
      switch (type) {
        case 'daily':
          return new Date(
            prevDate.getFullYear(),
            prevDate.getMonth(),
            prevDate.getDate() - 1,
          );
        case 'weekly': {
          const { startDate } = getDateRange();
          const newDate = new Date(startDate);
          newDate.setDate(startDate.getDate() - 7);
          return newDate;
        }
        case 'monthly':
          return new Date(
            prevDate.getFullYear(),
            prevDate.getMonth() - 1,
            prevDate.getDate(),
          );
        default:
          return prevDate;
      }
    });
  };

  const handleNext = () => {
    setCurrentDate(prevDate => {
      switch (type) {
        case 'daily':
          return new Date(
            prevDate.getFullYear(),
            prevDate.getMonth(),
            prevDate.getDate() + 1,
          );
        case 'weekly': {
          const { startDate } = getDateRange();
          const newDate = new Date(startDate);
          newDate.setDate(startDate.getDate() + 7);
          return newDate;
        }
        case 'monthly':
          return new Date(
            prevDate.getFullYear(),
            prevDate.getMonth() + 1,
            prevDate.getDate(),
          );

        default:
          return prevDate;
      }
    });
  };

  let dateTitle: string;
  switch (type) {
    case 'daily':
      dateTitle = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;
      break;
    case 'weekly':
      dateTitle = getWeekly(currentDate);
      break;
    case 'monthly':
      dateTitle = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 `;
      break;
    default:
      dateTitle = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 `;
  }

  return { currentDate, dateTitle, handlePrev, handleNext, getDateRange };
}
