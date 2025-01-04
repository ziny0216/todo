import { RefObject, useEffect } from 'react';

export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void,
) {
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && ref.current.contains(e.target as Node)) {
      return;
    }
    callback();
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
}
