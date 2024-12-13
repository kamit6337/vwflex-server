import { createClient } from "@supabase/supabase-js";
import { environment } from "../utils/environment.js";

const supabaseUrl = "https://piufzmwvnfwqianvahlk.supabase.co";
const supabaseKey = environment.SUPABASE_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
