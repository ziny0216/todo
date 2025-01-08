import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types.ts';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
