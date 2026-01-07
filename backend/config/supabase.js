const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key. Check your Environment Variables.');
    // Do NOT throw error here, or Vercel will crash on boot.
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
