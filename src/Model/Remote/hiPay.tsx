import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_HIPAY_URL;
const key = import.meta.env.VITE_SUPABASE_HIPAY_KEY;
const hiPaySupabase = createClient(url, key)

export default hiPaySupabase