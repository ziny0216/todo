import { useState } from 'react';
import { useDateHookType } from '../types/common.ts';

export default function useHeaderDate(): useDateHookType {
  const [currentDate, setCurrentDate] = useState(new Date());
  const handlePrev = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };
  const handleNext = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const dateTitle = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;
  return { currentDate, dateTitle, handlePrev, handleNext };
}
