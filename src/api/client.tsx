import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
/* @ts-ignore */
const supabase = createClient(supabaseUrl, supabaseKey);

export interface ReturnApiType<T> {
  data: T;
  count: number;
}

export default supabase;
