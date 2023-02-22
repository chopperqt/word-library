import { createClient } from "@supabase/supabase-js";

console.log(process.env.REACT_APP_SUPABASE_URL);

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
/* @ts-ignore */
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;