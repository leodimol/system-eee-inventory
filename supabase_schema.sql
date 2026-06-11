-- Create hubs table
CREATE TABLE IF NOT EXISTS hubs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT,
    hub_code TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create equipment table
CREATE TABLE IF NOT EXISTS equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hub_id UUID REFERENCES hubs(id) ON DELETE CASCADE,
    model TE XT NOT NULL,
    brand TEXT,
    equipment_type TEXT NOT NULL,
    asset_tag TEXT UNIQUE,
    serial TEXT,  
    location TEXT,
    assigned_to TEXT,
    status TEXT DEFAULT 'available',
    condition TEXT DEFAULT 'new',
    last_service DATE DEFAULT CURRENT_DATE,
    purchase_date DATE,
    warranty_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE hubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust for production)
CREATE POLICY "Public Hubs Access" ON hubs FOR ALL USING (true);
CREATE POLICY "Public Equipment Access" ON equipment FOR ALL USING (true);

-- Insert sample hubs if they don't exist
INSERT INTO hubs (name, location, hub_code) 
VALUES 
    ('Main Hub', 'Central Distribution Center', 'MAIN-01'),
    ('North Hub', 'Northern Logistics Wing', 'NRT-02'),
    ('South Hub', 'Southern Warehouse', 'STH-03')
ON CONFLICT (hub_code) DO NOTHING;
