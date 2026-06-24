-- Add reason column to audit_logs table
-- Run this in Supabase SQL Editor to update your database

ALTER TABLE audit_logs 
ADD COLUMN IF NOT EXISTS reason TEXT;
