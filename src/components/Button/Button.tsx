import styles from './Button.module.scss';

export default function Button({
  className = ['btn'],
  text,
  disabled = false,
  handleButton,
}: {
  className?: Array<string>;
  text?: string;
  disabled?: boolean;
  handleButton?: () => void;
}) {
  const handleButtonAction = () => {
    if (handleButton) {
      handleButton();
    }
  };
  return (
    <button
      disabled={disabled}
      className={className.map(name => styles[name]).join(' ')}
      type="button"
      onClick={handleButtonAction}
    >
      {text}
    </button>
  );
}
