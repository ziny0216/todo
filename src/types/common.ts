export interface ProtectedRouteProps {
  element: ReactElement;
  redirectTo?: string;
}

/* todo item */
import {
  ChangeEvent,
  Dispatch,
  ReactElement,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react';
import { Database } from './database.types.ts';

export interface TodoForm {
  user_id?: string;
  todo_date: string;
  content: string;
  memo: string;
}
export interface TodoItemType extends TodoForm {
  id: number;
  is_done: string;
}

export interface TodoItemProps extends TodoItemType {
  handleTodoDelete: (id: number) => void;
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
  children?: ReactNode;
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

export type TodoSummaryType =
  Database['public']['Functions']['get_todo_summary']['Returns'];

export interface AuthFormType {
  email: string;
  nickname?: string;
  password: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}
