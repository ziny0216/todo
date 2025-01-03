import Modal from './Modal';
import Calendar from '../Calendar/Calendar.tsx';

export default function CalendarModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <Calendar />
    </Modal>
  );
}
