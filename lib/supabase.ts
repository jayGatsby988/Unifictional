import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mnlszgnuoshtncmqjpyy.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubHN6Z251b3NodG5jbXFqcHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODM1MjAsImV4cCI6MjA4MDQ1OTUyMH0.78O8WBohoU7xeCNr8-A2Roa6RAsac9nt7Za7xXKkvfQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

