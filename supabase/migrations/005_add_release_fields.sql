-- Add release tracking fields to equipment table
ALTER TABLE equipment 
ADD COLUMN IF NOT EXISTS released_by TEXT;

ALTER TABLE equipment 
ADD COLUMN IF NOT EXISTS release_datetime TIMESTAMP WITH TIME ZONE;
