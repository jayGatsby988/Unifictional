-- Update existing finance_items table to add type column
-- Run this SQL in your Supabase SQL Editor if you already have the table

-- Add type column if it doesn't exist
ALTER TABLE finance_items 
ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'expense' 
CHECK (type IN ('expense', 'income'));

-- Create an index on type for filtering income/expenses
CREATE INDEX IF NOT EXISTS idx_finance_items_type ON finance_items(type);

