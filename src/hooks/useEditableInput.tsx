import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useEditableInputHookType } from '../types/common.ts';

export default function useEditableInput(
  initialValue: string,
): useEditableInputHookType {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const inputEditRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => setIsEditing(!isEditing);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);
  useEffect(() => {
    if (isEditing) {
      inputEditRef.current?.focus();
    }
  }, [isEditing]);

  return {
    inputValue,
    isEditing,
    inputEditRef,
    handleEdit,
    handleChange,
    setIsEditing,
  };
}
