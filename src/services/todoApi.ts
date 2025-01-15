import { TodoForm } from '../types/common.ts';
import { supabase } from '../utils/SupabaseClient.ts';

// todoApi 리스트
export const fetchTodoMonthly = async (startDate: string, endDate: string) => {
  try {
    const { data, error } = await supabase.rpc('get_todo_summary', {
      start_date: startDate,
      end_date: endDate,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (e) {
    console.error('Error todo:', e);
    throw e;
  }
};

// todoApi 리스트
export const readTodo = async (
  currentDate: string,
  startDate: string,
  endDate: string,
) => {
  try {
    let query = supabase.from('todos').select('*');
    if (startDate && endDate) {
      query = query.gte('todo_date', startDate).lte('todo_date', endDate);
    } else if (currentDate) {
      query = query.eq('todo_date', currentDate);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (e) {
    console.error('Error creating todo:', e);
    throw e;
  }
};

// todoApi 등록
export const createTodo = async (todo: TodoForm) => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .insert([todo])
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (e) {
    console.error('Error creating todo:', e);
    throw e;
  }
};

// todoApi 수정
export const updateTodo = async (
  id: number,
  form: { content: string; memo: string; is_done: 'Y' | 'N' },
) => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .update(form)
      .eq('id', id)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (e) {
    console.error('Error creating todo:', e);
    throw e;
  }
};

// todoApi 삭제
export const deleteTodo = async (id: number) => {
  try {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) {
      throw new Error(error.message);
    }
  } catch (e) {
    console.error('Error creating todo:', e);
    throw e;
  }
};
