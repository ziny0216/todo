/* todo item */
import { ChangeEvent } from 'react';

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
}
