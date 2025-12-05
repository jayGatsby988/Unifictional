# Finance Tracker Setup Guide

## Database Setup

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard

2. **Navigate to SQL Editor** in your project

3. **Run the SQL schema** from `database-schema.sql`:
   - Copy the entire contents of `database-schema.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute

4. **Verify the table was created**:
   - Go to "Table Editor" in Supabase
   - You should see a `finance_items` table

## Environment Variables

Add these to your `.env.local` file (or your deployment environment):

```env
NEXT_PUBLIC_SUPABASE_URL=https://mnlszgnuoshtncmqjpyy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubHN6Z251b3NodG5jbXFqcHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODM1MjAsImV4cCI6MjA4MDQ1OTUyMH0.78O8WBohoU7xeCNr8-A2Roa6RAsac9nt7Za7xXKkvfQ
```

## Features

### ✅ What's Included

- **Add Purchases**: Track one-time, monthly, or yearly expenses
- **Edit & Delete**: Manage your finance items
- **Automatic Renewals**: Monthly and yearly subscriptions automatically calculate next renewal date
- **Statistics Dashboard**: View totals for all purchases, monthly, yearly, and one-time expenses
- **Beautiful UI**: Modern, responsive design matching your brand colors

### 🔄 How Renewals Work

- **Monthly subscriptions**: Automatically renew 1 month from the purchase date
- **Yearly subscriptions**: Automatically renew 1 year from the purchase date
- **One-time purchases**: No renewal date

When you visit the page, the system checks if any renewal dates have passed and updates them automatically.

## Access the Finance Tracker

Navigate to: `/AIisthebest@143`

## Database Schema

The `finance_items` table includes:
- `id`: Unique identifier (UUID)
- `purchase`: Name of the purchase
- `cost`: Cost amount (decimal)
- `description`: Optional description
- `frequency`: 'one-time', 'monthly', or 'yearly'
- `next_renewal_date`: Next renewal date (for monthly/yearly)
- `is_active`: Whether the subscription is active
- `created_at`: When the item was created
- `updated_at`: When the item was last updated

## Security

The current setup uses a public policy that allows all operations. For production, you should:
1. Enable authentication
2. Update the RLS policies to restrict access to authenticated users
3. Add user_id column to track ownership

