import Calendar from '../Calendar/Calendar.tsx';
import Header from '../Header/Header.tsx';
import useHeaderDate from '../../hooks/useHeaderDate.tsx';
import BottomModal from './BottomModal.tsx';

export default function CalendarModal({
  isOpen,
  onClose,
  handleDateSelection,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleDateSelection: (date: Date) => void;
}) {
  const { currentDate, dateTitle, handlePrev, handleNext } =
    useHeaderDate('month');
  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <Header
        handlePrev={handlePrev}
        handleNext={handleNext}
        title={dateTitle}
      />
      <Calendar
        isPercentage={false}
        currentDate={currentDate}
        handleDateSelection={date => {
          handleDateSelection(date);
          onClose();
        }}
      />
    </BottomModal>
  );
}
