export interface TodoItemType {
  id: number;
  regDate: string;
  content: string;
  memo: string;
  isDone: string;
}

export interface TodoItemProps extends TodoItemType {
  handleCheckBox: () => void;
  handleTodoDelete: () => void;
}
