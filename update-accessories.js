import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const equipmentWithAccessories = [
  { asset_tag: 'LP001', accessories: [{ type: 'charger' }, { type: 'mouse' }, { type: 'bag' }] },
  { asset_tag: 'LP002', accessories: [{ type: 'charger' }, { type: 'dongle' }] },
  { asset_tag: 'LP003', accessories: [{ type: 'charger' }, { type: 'mouse' }, { type: 'keyboard' }, { type: 'webcam' }] },
  { asset_tag: 'LP004', accessories: [{ type: 'charger' }] },
  { asset_tag: 'LP005', accessories: [{ type: 'charger' }, { type: 'stylus' }, { type: 'dock' }] },
  { asset_tag: 'LP006', accessories: [{ type: 'charger' }, { type: 'mouse' }] },
  { asset_tag: 'LP007', accessories: [{ type: 'charger' }, { type: 'case' }] },
  { asset_tag: 'LP008', accessories: [{ type: 'charger' }, { type: 'mouse' }, { type: 'headset' }, { type: 'stand' }] },
  { asset_tag: 'LP009', accessories: [{ type: 'charger' }] },
  { asset_tag: 'LP010', accessories: [{ type: 'charger' }, { type: 'mouse' }, { type: 'keyboard' }, { type: 'headset' }, { type: 'webcam' }] },
];

async function updateAccessories() {
  console.log('Updating accessories...');
  
  for (const item of equipmentWithAccessories) {
    const { data, error } = await supabase
      .from('equipment')
      .update({ accessories: item.accessories })
      .eq('asset_tag', item.asset_tag);
    
    if (error) {
      console.error(`Error updating ${item.asset_tag}:`, error.message);
    } else {
      console.log(`Updated ${item.asset_tag}: ${item.accessories.map(a => a.type).join(', ')}`);
    }
  }
  
  console.log('Accessories updated!');
}

updateAccessories().catch(console.error);
