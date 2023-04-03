import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_HISHOP_URL;
const key = import.meta.env.VITE_SUPABASE_HISHOP_KEY;
const hiShopSupabase = createClient(url, key);

export default hiShopSupabase;
