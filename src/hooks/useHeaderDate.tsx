import { useState } from 'react';
import { useDateHookType } from '../types/common.ts';

export default function useHeaderDate(
  type: 'day' | 'month' | 'week',
): useDateHookType {
  const [currentDate, setCurrentDate] = useState(new Date());
  const getWeek = () => {
    const targetDate = currentDate.getDate();
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();

    return Math.ceil((targetDate + firstDay) / 7);
  };
  const handlePrev = () => {
    setCurrentDate(prevDate => {
      switch (type) {
        case 'day':
          return new Date(
            prevDate.getFullYear(),
            prevDate.getMonth(),
            prevDate.getDate() - 1,
          );
        case 'week': {
          const newDate = new Date(prevDate);
          newDate.setDate(prevDate.getDate() - 7);
          return newDate;
        }
        case 'month':
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
        case 'day':
          return new Date(
            prevDate.getFullYear(),
            prevDate.getMonth(),
            prevDate.getDate() + 1,
          );
        case 'week': {
          const newDate = new Date(prevDate);
          newDate.setDate(prevDate.getDate() + 7);
          return newDate;
        }
        case 'month':
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

  let dateTitle = '';
  switch (type) {
    case 'day':
      dateTitle = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;
      break;
    case 'week':
      dateTitle = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${getWeek()}주차`;
      break;
    case 'month':
      dateTitle = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 `;
      break;
    default:
      dateTitle = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 `;
  }

  return { currentDate, dateTitle, handlePrev, handleNext };
}
