/* todo item */
import { ChangeEvent, Dispatch, RefObject, SetStateAction } from 'react';

export interface TodoForm {
  regDate: string;
  content: string;
  memo: string;
}
export interface TodoItemType extends TodoForm {
  id: number;
  isDone: string;
}

export interface TodoItemProps extends TodoItemType {
  handleCheckBox: () => void;
  handleTodoDelete: () => void;
}

/* input */
type InputValue = string | number;
export interface InputProps {
  id?: string;
  label?: string;
  name?: string;
  value?: InputValue;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export interface useDateHookType {
  currentDate: Date;
  handlePrev: () => void;
  handleNext: () => void;
  dateTitle: string;
  getDateRange: () => { startDate: Date; endDate: Date };
}

export interface useEditableInputHookType {
  inputValue: string;
  isEditing: boolean;
  inputEditRef: RefObject<HTMLInputElement>;
  handleEdit: () => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
