
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yayrzeprzqupcdbimxor.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlheXJ6ZXByenF1cGNkYmlteG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwNDA4MjIsImV4cCI6MjAzODYxNjgyMn0.fXOxmg_mwed1XR6uyYFo3ua2_81tsQ42UcdT5b-ZhDw';

export const supabase = createClient(supabaseUrl, supabaseKey);


