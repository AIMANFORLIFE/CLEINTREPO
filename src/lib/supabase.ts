import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          message: string;
          created_at: string;
          status: 'new' | 'read' | 'replied';
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          message: string;
          created_at?: string;
          status?: 'new' | 'read' | 'replied';
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string | null;
          message?: string;
          created_at?: string;
          status?: 'new' | 'read' | 'replied';
        };
      };
    };
  };
};