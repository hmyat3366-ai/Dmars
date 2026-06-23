import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sbpfeonkcnbbzcdjsfom.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNicGZlb25rY25iYnpjZGpzZm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMTkwNjgsImV4cCI6MjA5Nzc5NTA2OH0.BA8NrTgQIFHv-Q0PuBXyz5yl3oUXc6MNUOeqexA_NsM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
