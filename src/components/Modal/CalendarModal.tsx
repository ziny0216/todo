import Calendar from '../Calendar/Calendar.tsx';
import Header from '../Header/Header.tsx';
import useHeaderDate from '../../hooks/useHeaderDate.tsx';
import BottomModal from './BottomModal.tsx';

export default function CalendarModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { dateTitle, handlePrev, handleNext } = useHeaderDate();
  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <Header
        handlePrev={handlePrev}
        handleNext={handleNext}
        title={dateTitle}
      />
      <Calendar />
    </BottomModal>
  );
}
