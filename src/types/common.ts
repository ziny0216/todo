/* todo item */
import { ChangeEvent, Dispatch, RefObject, SetStateAction } from 'react';
import { Database } from './database.types.ts';

export interface TodoForm {
  todo_date: string;
  content: string;
  memo: string;
}
export interface TodoItemType extends TodoForm {
  id: number;
  is_done: string;
}

export interface TodoItemProps extends TodoItemType {
  handleCheckBox: () => void;
  handleTodoDelete: () => void;
  handleTodoEdit: (id: number, form: { content: string; memo: string }) => void;
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
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  handlePrev: () => void;
  handleNext: () => void;
  dateTitle: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface useEditableInputHookType {
  inputValue: string;
  isEditing: boolean;
  inputEditRef: RefObject<HTMLInputElement>;
  handleEdit: () => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface todoCtnType {
  date: Date;
  total_todos: number;
  done_todos: number;
}

export type TodoSummaryType =
  Database['public']['Functions']['get_todo_summary']['Returns'];
