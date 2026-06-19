-- Fix model column typo and make it nullable
ALTER TABLE equipment 
ALTER COLUMN model TYPE TEXT;

ALTER TABLE equipment 
ALTER COLUMN model DROP NOT NULL;

-- Update any existing NULL model values to a default
UPDATE equipment 
SET model = 'N/A' 
WHERE model IS NULL OR model = '';

-- Make added_by column NOT NULL
-- First, update any existing NULL values to a default
UPDATE equipment 
SET added_by = 'Unknown' 
WHERE added_by IS NULL OR added_by = '';

-- Then alter the column to be NOT NULL
ALTER TABLE equipment 
ALTER COLUMN added_by SET NOT NULL;
