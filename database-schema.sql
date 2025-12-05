-- Finance Tracker Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Create the finance_items table
CREATE TABLE IF NOT EXISTS finance_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  purchase TEXT NOT NULL,
  cost DECIMAL(10, 2) NOT NULL,
  description TEXT,
  frequency TEXT NOT NULL CHECK (frequency IN ('one-time', 'monthly', 'yearly')),
  next_renewal_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on frequency for faster queries
CREATE INDEX IF NOT EXISTS idx_finance_items_frequency ON finance_items(frequency);

-- Create an index on next_renewal_date for renewal queries
CREATE INDEX IF NOT EXISTS idx_finance_items_renewal_date ON finance_items(next_renewal_date);

-- Create an index on is_active for filtering active items
CREATE INDEX IF NOT EXISTS idx_finance_items_is_active ON finance_items(is_active);

-- Enable Row Level Security (RLS)
ALTER TABLE finance_items ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (you can restrict this later)
-- For now, we'll allow all operations for authenticated users
-- If you want public access, use: CREATE POLICY "Allow all operations" ON finance_items FOR ALL USING (true);

-- For public access (no authentication required):
CREATE POLICY "Allow all operations" ON finance_items FOR ALL USING (true) WITH CHECK (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_finance_items_updated_at 
    BEFORE UPDATE ON finance_items 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a function to automatically handle renewals
-- This can be called via a cron job or edge function
CREATE OR REPLACE FUNCTION process_renewals()
RETURNS void AS $$
BEGIN
    -- Update next_renewal_date for items that have passed their renewal date
    UPDATE finance_items
    SET next_renewal_date = CASE
        WHEN frequency = 'monthly' THEN next_renewal_date + INTERVAL '1 month'
        WHEN frequency = 'yearly' THEN next_renewal_date + INTERVAL '1 year'
        ELSE next_renewal_date
    END
    WHERE frequency IN ('monthly', 'yearly')
    AND is_active = true
    AND next_renewal_date IS NOT NULL
    AND next_renewal_date < NOW();
END;
$$ LANGUAGE plpgsql;

