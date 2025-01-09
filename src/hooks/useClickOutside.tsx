import { RefObject, useCallback, useEffect } from 'react';

export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void,
) {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && ref.current.contains(e.target as Node)) {
        return;
      }
      callback();
    },
    [ref, callback],
  );
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
}
