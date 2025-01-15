import { supabase } from '../utils/SupabaseClient.ts';
import { AuthFormType } from '../types/common.ts';

// authApi 리스트
export const login = async (form: AuthFormType) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      ...form,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (e) {
    console.error('Error Login:', e);
    throw e;
  }
};
// authApi 리스트
export const registerUser = async (form: AuthFormType) => {
  try {
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          nickname: form.nickname,
        },
        emailRedirectTo: 'http://localhost:5173/login',
      },
    });
    if (error) {
      throw new Error(error.message);
    }
  } catch (e) {
    console.error('Error Register User:', e);
    throw e;
  }
};
