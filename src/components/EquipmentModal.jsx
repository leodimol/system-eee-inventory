import React, { useState, useEffect, useRef } from 'react';
import { Modal, Input, Button } from './ui/Base';
import { 
  Laptop, 
  MousePointer2, 
  Tablet, 
  Monitor, 
  Printer, 
  Scan, 
  Nfc, 
  Battery, 
  Network, 
  Phone, 
  Zap, 
  Mouse, 
  Square, 
  Save, 
  X, 
  Plus,
  ChevronDown
} from 'lucide-react';

const equipmentTypes = [
  { id: 'computer', label: 'Laptop/Computer', icon: <Laptop size={18} /> },
  { id: 'tablet', label: 'Tablet/Mobile Device', icon: <Tablet size={18} /> },
  { id: 'monitor', label: 'Monitor/Display', icon: <Monitor size={18} /> },
  { id: 'printer', label: 'Printer', icon: <Printer size={18} /> },
  { id: 'scanner', label: 'Barcode Scanner', icon: <Scan size={18} /> },
  { id: 'rfid', label: 'RFID Reader', icon: <Nfc size={18} /> },
  { id: 'parcel-printer', label: 'Parcel Printer', icon: <Printer size={18} /> },
  { id: 'ups', label: 'UPS/Backup Power', icon: <Battery size={18} /> },
  { id: 'network', label: 'Network Equipment', icon: <Network size={18} /> },
  { id: 'communication', label: 'Communication Device', icon: <Phone size={18} /> },
];

const equipmentSpecificAccessories = {
  computer: [
    { id: 'charger', label: 'Charger' },
    { id: 'mouse', label: 'Mouse' },
    { id: 'mousepad', label: 'Mousepad' },
    { id: 'keyboard', label: 'Keyboard' },
    { id: 'webcam', label: 'Webcam' },
    { id: 'headset', label: 'Headset' },
    { id: 'dongle', label: 'USB Dongle/Receiver' },
    { id: 'bag', label: 'Laptop Bag' },
    { id: 'dock', label: 'Docking Station' },
    { id: 'other', label: 'Other' },
  ],
  tablet: [
    { id: 'charger', label: 'Charger' },
    { id: 'case', label: 'Protective Case' },
    { id: 'stylus', label: 'Stylus/Apple Pencil' },
    { id: 'screen-protector', label: 'Screen Protector' },
    { id: 'keyboard', label: 'Keyboard Cover' },
    { id: 'stand', label: 'Stand/Cradle' },
    { id: 'other', label: 'Other' },
  ],
  printer: [
    { id: 'power-cable', label: 'Power Cable' },
    { id: 'usb-cable', label: 'USB Cable' },
    { id: 'ink-toner', label: 'Ink/Toner Cartridge' },
    { id: 'paper-tray', label: 'Paper Tray' },
    { id: 'manual', label: 'User Manual' },
    { id: 'driver-cd', label: 'Driver CD/USB' },
    { id: 'other', label: 'Other' },
  ],
  monitor: [
    { id: 'power-cable', label: 'Power Cable' },
    { id: 'hdmi-cable', label: 'HDMI Cable' },
    { id: 'displayport-cable', label: 'DisplayPort Cable' },
    { id: 'vga-cable', label: 'VGA Cable' },
    { id: 'stand', label: 'Monitor Stand' },
    { id: 'mount', label: 'Wall Mount' },
    { id: 'other', label: 'Other' },
  ],
  scanner: [
    { id: 'power-cable', label: 'Power Cable' },
    { id: 'usb-cable', label: 'USB Cable' },
    { id: 'document-covers', label: 'Document Covers' },
    { id: 'manual', label: 'User Manual' },
    { id: 'driver-cd', label: 'Driver CD/USB' },
    { id: 'other', label: 'Other' },
  ],
  rfid: [
    { id: 'power-cable', label: 'Power Cable' },
    { id: 'usb-cable', label: 'USB Cable' },
    { id: 'antenna', label: 'Antenna' },
    { id: 'sample-cards', label: 'Sample RFID Cards' },
    { id: 'manual', label: 'User Manual' },
    { id: 'other', label: 'Other' },
  ],
  'parcel-printer': [
    { id: 'power-cable', label: 'Power Cable' },
    { id: 'usb-cable', label: 'USB Cable' },
    { id: 'label-roll', label: 'Label Roll' },
    { id: 'ribbon', label: 'Thermal Ribbon' },
    { id: 'manual', label: 'User Manual' },
    { id: 'other', label: 'Other' },
  ],
  ups: [
    { id: 'power-cable', label: 'Power Cable' },
    { id: 'battery', label: 'Battery Pack' },
    { id: 'manual', label: 'User Manual' },
    { id: 'surge-protector', label: 'Surge Protector' },
    { id: 'other', label: 'Other' },
  ],
  network: [
    { id: 'power-cable', label: 'Power Cable' },
    { id: 'ethernet-cable', label: 'Ethernet Cable' },
    { id: 'mount-brackets', label: 'Mount Brackets' },
    { id: 'antenna', label: 'Antenna' },
    { id: 'manual', label: 'User Manual' },
    { id: 'other', label: 'Other' },
  ],
  communication: [
    { id: 'power-cable', label: 'Power Cable' },
    { id: 'charger', label: 'Charger' },
    { id: 'headset', label: 'Headset' },
    { id: 'mount', label: 'Mount/Cradle' },
    { id: 'battery', label: 'Battery' },
    { id: 'manual', label: 'User Manual' },
    { id: 'other', label: 'Other' },
  ],
};

const defaultAccessoryTypes = [
  { id: 'power-cable', label: 'Power Cable' },
  { id: 'usb-cable', label: 'USB Cable' },
  { id: 'manual', label: 'User Manual' },
  { id: 'other', label: 'Other' },
];

const EquipmentModal = ({ isOpen, onClose, onSave, equipment = null }) => {
  const addingRef = useRef(false);
  const [formData, setFormData] = useState({
    model: '',
    brand: '',
    equipment_type: 'computer',
    asset_tag: '',
    serial: '',
    location: '',
    assigned_to: '',
    status: 'available',
    condition: 'new',
    last_service: '',
    accessories: [],
  });
  const [accessoryErrors, setAccessoryErrors] = useState({});
  const [showStatusWarning, setShowStatusWarning] = useState(false);

  // Check if user filled assigned_to but status is still available
  useEffect(() => {
    const isAvailable = formData.status && formData.status.toLowerCase() === 'available';
    if (formData.assigned_to && formData.assigned_to.trim() && isAvailable) {
      setShowStatusWarning(true);
    } else {
      setShowStatusWarning(false);
    }
  }, [formData.assigned_to, formData.status]);

  // Initialize available accessories based on equipment type
  const getAvailableAccessories = () => {
    return equipmentSpecificAccessories[formData.equipment_type] || defaultAccessoryTypes;
  };

  useEffect(() => {
    if (equipment) {
      // Convert existing accessories to checked format
      const availableAccs = getAvailableAccessories();
      const checkedAccessories = availableAccs.map(acc => {
        const existing = equipment.accessories?.find(a => a.type === acc.id);
        return existing ? { ...existing, checked: true } : { type: acc.id, checked: false, brand: '', model: '', serial: '', asset_tag: '' };
      });
      const updatedFormData = {
        ...equipment,
        accessories: checkedAccessories,
        last_service: equipment.last_service ? equipment.last_service.split('T')[0] : '',
        purchase_date: equipment.purchase_date ? equipment.purchase_date.split('T')[0] : '',
        warranty_date: equipment.warranty_date ? equipment.warranty_date.split('T')[0] : '',
      };
      setFormData(updatedFormData);
      // Check for inconsistent data on load (case-insensitive)
      const hasAssignment = equipment.assigned_to && equipment.assigned_to.trim();
      const isAvailableStatus = equipment.status && equipment.status.toLowerCase() === 'available';
      console.log('Edit equipment check:', { assigned_to: equipment.assigned_to, status: equipment.status, hasAssignment, isAvailableStatus });
      if (hasAssignment && isAvailableStatus) {
        console.log('Setting warning to true');
        setShowStatusWarning(true);
      }
    } else {
      // Initialize with unchecked accessories
      const availableAccs = getAvailableAccessories();
      setFormData({
        model: '',
        brand: '',
        equipment_type: 'computer',
        asset_tag: '',
        serial: '',
        location: '',
        assigned_to: '',
        status: 'available',
        condition: 'new',
        last_service: new Date().toISOString().split('T')[0],
        purchase_date: '',
        warranty_date: '',
        accessories: availableAccs.map(acc => ({ type: acc.id, checked: false, brand: '', model: '', serial: '', asset_tag: '' })),
      });
      setShowStatusWarning(false);
    }
    setAccessoryErrors({});
  }, [equipment, isOpen]);

  // Update accessories when equipment type changes
  useEffect(() => {
    if (!isOpen) return;
    const availableAccs = getAvailableAccessories();
    setFormData(prev => ({
      ...prev,
      accessories: availableAccs.map(acc => ({ type: acc.id, checked: false, brand: '', model: '', serial: '', asset_tag: '' }))
    }));
    setAccessoryErrors({});
  }, [formData.equipment_type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAccessory = (index) => {
    setFormData(prev => ({
      ...prev,
      accessories: prev.accessories.map((acc, i) => i === index ? { ...acc, checked: !acc.checked } : acc)
    }));
    // Clear error for this accessory when toggled
    setAccessoryErrors(prev => ({ ...prev, [index]: null }));
  };

  const updateAccessoryField = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      accessories: prev.accessories.map((acc, i) => i === index ? { ...acc, [field]: value } : acc)
    }));
    // Clear error when user types
    if (accessoryErrors[index]) {
      setAccessoryErrors(prev => ({ ...prev, [index]: null }));
    }
  };

  const getAccessoryTypes = () => {
    return equipmentSpecificAccessories[formData.equipment_type] || defaultAccessoryTypes;
  };

  const hasAccessories = ['computer', 'tablet', 'monitor', 'printer', 'scanner', 'rfid', 'parcel-printer', 'ups', 'network', 'communication'].includes(formData.equipment_type);

  const getAccessoryLabel = (typeId) => {
    const available = getAccessoryTypes();
    const found = available.find(a => a.id === typeId);
    return found ? found.label : typeId;
  };

  const validateAccessories = () => {
    console.log('Validating accessories...', formData.accessories);
    // Skip validation if this equipment type doesn't have accessories
    if (!hasAccessories) {
      console.log('No accessories for this type, skipping validation');
      return true;
    }
    
    const errors = {};
    let hasError = false;
    
    // Only validate if there are accessories in the form data
    if (formData.accessories && formData.accessories.length > 0) {
      formData.accessories.forEach((acc, index) => {
        if (acc.checked) {
          // At least one detail required: brand, serial, or asset_tag
          const hasBrand = acc.brand && acc.brand.trim();
          const hasSerial = acc.serial && acc.serial.trim();
          const hasAssetTag = acc.asset_tag && acc.asset_tag.trim();
          
          if (!hasBrand && !hasSerial && !hasAssetTag) {
            errors[index] = 'At least one detail required (Brand, Serial, or Asset Tag)';
            hasError = true;
            console.log(`Accessory ${index} (${acc.type}) failed validation`);
          }
        }
      });
    }
    
    console.log('Validation errors:', errors, 'hasError:', hasError);
    setAccessoryErrors(errors);
    return !hasError;
  };

  const handleSave = () => {
    console.log('Save clicked, validating...');
    
    // Validate: assigned_to is required when status is active
    if (formData.status === 'active' && (!formData.assigned_to || !formData.assigned_to.trim())) {
      alert('Assigned To is required when status is Active/In Use');
      return;
    }
    
    if (!validateAccessories()) {
      console.log('Validation failed, not saving');
      return; // Stop if validation fails
    }
    
    console.log('Validation passed, saving...');
    // Filter only checked accessories and remove the 'checked' property before saving
    const checkedAccessories = formData.accessories
      .filter(acc => acc.checked)
      .map(({ checked, ...rest }) => rest);
    
    console.log('Saving with accessories:', checkedAccessories);
    onSave({ ...formData, accessories: checkedAccessories });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={equipment ? 'Edit Equipment' : 'Add New Equipment'}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave} className="gap-2">
            <Save size={18} />
            {equipment ? 'Save Changes' : 'Add Equipment'}
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-tertiary)' }}>Type</label>
          <div className="relative">
            <select
              name="equipment_type"
              value={formData.equipment_type}
              onChange={handleChange}
              className="w-full rounded-xl py-2.5 px-4 pr-10 text-sm focus:outline-none transition-all appearance-none cursor-pointer"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            >
              {equipmentTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <p className="text-[9px] ml-1" style={{ color: 'var(--text-tertiary)' }}>Select the equipment category</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-tertiary)' }}>Brand <span style={{ color: 'var(--accent-red)' }}>*</span></label>
          <Input name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Dell, HP, Lenovo, Apple" />
          <p className="text-[9px] ml-1" style={{ color: 'var(--text-tertiary)' }}>Enter the manufacturer name</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-tertiary)' }}>Model <span style={{ color: 'var(--accent-red)' }}>*</span></label>
          <Input name="model" value={formData.model} onChange={handleChange} placeholder="e.g. Latitude 5420, MacBook Pro M2, ThinkPad X1" />
          <p className="text-[9px] ml-1" style={{ color: 'var(--text-tertiary)' }}>Enter the product model name</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-tertiary)' }}>Asset Number <span style={{ color: 'var(--accent-red)' }}>*</span></label>
          <Input name="asset_tag" value={formData.asset_tag} onChange={handleChange} placeholder="e.g. IT-2024-001, ASSET-12345" />
          <p className="text-[9px] ml-1" style={{ color: 'var(--text-tertiary)' }}>Unique internal asset tracking ID</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-tertiary)' }}>Serial Number <span style={{ color: 'var(--accent-red)' }}>*</span></label>
          <Input name="serial" value={formData.serial} onChange={handleChange} placeholder="e.g. ABC123456789, found on device label/sticker" />
          <p className="text-[9px] ml-1" style={{ color: 'var(--text-tertiary)' }}>Manufacturer's unique serial number (usually on back/bottom)</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-tertiary)' }}>Status</label>
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl py-2.5 px-4 pr-10 text-sm focus:outline-none transition-all appearance-none cursor-pointer"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            >
              <option value="available">Available</option>
              <option value="active">Active/In Use</option>
              <option value="maintenance">Maintenance</option>
              <option value="retired">Retired</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <p className="text-[9px] ml-1" style={{ color: 'var(--text-tertiary)' }}>Current status of the equipment in inventory</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-tertiary)' }}>Condition</label>
          <div className="relative">
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full rounded-xl py-2.5 px-4 pr-10 text-sm focus:outline-none transition-all appearance-none cursor-pointer"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            >
              <option value="new">New - Unused, in original packaging</option>
              <option value="excellent">Excellent - Like new, minimal wear</option>
              <option value="good">Good - Light wear, fully functional</option>
              <option value="fair">Fair - Visible wear, minor issues</option>
              <option value="poor">Poor - Significant damage, needs repair</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <p className="text-[9px] ml-1" style={{ color: 'var(--text-tertiary)' }}>Select the physical condition of the equipment</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-tertiary)' }}>
            Assigned To {formData.status === 'active' && <span style={{ color: 'var(--accent-red)' }}>*</span>}
          </label>
          <Input 
            name="assigned_to" 
            value={formData.assigned_to} 
            onChange={handleChange} 
            placeholder={formData.status === 'active' ? 'Required - Employee Name' : 'Leave blank if not assigned'} 
            style={formData.status === 'active' && !formData.assigned_to ? { borderColor: 'var(--accent-red)' } : {}}
          />
          <p className="text-[9px] ml-1" style={{ color: 'var(--text-tertiary)' }}>Employee using this equipment. Leave blank if not assigned yet.</p>
          {formData.status === 'active' && (
            <p className="text-[10px]" style={{ color: 'var(--accent-orange)' }}>Required for Active/In Use status</p>
          )}
          {showStatusWarning && (
            <div className="mt-2 p-2 rounded-lg text-xs flex items-center gap-2" style={{ background: 'var(--accent-orange)20', color: 'var(--accent-orange)', border: '1px solid var(--accent-orange)' }}>
              <span>⚠️ Equipment is assigned but status is "Available"</span>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, status: 'active' }))}
                className="px-2 py-1 rounded text-[10px] font-bold"
                style={{ background: 'var(--accent-orange)', color: 'white' }}
              >
                Set to Active
              </button>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-tertiary)' }}>Location/Storage</label>
          <Input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Shelf A-12, Storage Room B, Warehouse Zone 3" />
          <p className="text-[9px] ml-1" style={{ color: 'var(--text-tertiary)' }}>Where the item is physically stored</p>
        </div>

        {/* Date Fields Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-tertiary)' }}>Purchase Date</label>
            <Input 
              type="date" 
              name="purchase_date" 
              value={formData.purchase_date || ''} 
              onChange={handleChange}
              style={{ paddingRight: '12px' }}
            />
            <p className="text-[9px] ml-1" style={{ color: 'var(--text-tertiary)' }}>Date equipment was acquired</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest ml-1" style={{ color: 'var(--text-tertiary)' }}>Warranty Expiry</label>
            <Input 
              type="date" 
              name="warranty_date" 
              value={formData.warranty_date || ''} 
              onChange={handleChange}
              style={{ paddingRight: '12px' }}
            />
            <p className="text-[9px] ml-1" style={{ color: 'var(--text-tertiary)' }}>Warranty expiration date</p>
          </div>
        </div>
      </div>

      {/* Accessories Section - Table Checklist */}
      {hasAccessories && (
        <div 
          className="mt-6 pt-6 px-4 py-4 rounded-xl"
          style={{ 
            background: 'var(--bg-glass-light)', 
            border: '2px solid var(--accent-primary)',
            boxShadow: '0 0 20px rgba(10, 132, 255, 0.15)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 
              className="text-sm font-black uppercase tracking-wider flex items-center gap-2"
              style={{ color: 'var(--accent-primary)' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)' }}></span>
              Included Accessories
              {formData.accessories?.filter(a => a.checked).length > 0 && (
                <span 
                  className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                  style={{ background: 'var(--accent-primary)', color: 'white' }}
                >
                  {formData.accessories.filter(a => a.checked).length}
                </span>
              )}
            </h4>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th className="py-2 px-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)', width: '40px' }}></th>
                  <th className="py-2 px-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Accessory Type</th>
                  <th className="py-2 px-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Brand</th>
                  <th className="py-2 px-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Model</th>
                  <th className="py-2 px-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Asset Tag</th>
                  <th className="py-2 px-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Serial Number</th>
                </tr>
              </thead>
              <tbody>
                {formData.accessories?.map((accessory, index) => (
                  <tr 
                    key={index}
                    style={{ 
                      borderBottom: '1px solid var(--border-glass)',
                      background: accessory.checked ? 'var(--bg-secondary)' : 'transparent'
                    }}
                  >
                    <td className="py-2 px-2 text-center">
                      <input
                        type="checkbox"
                        checked={accessory.checked}
                        onChange={() => toggleAccessory(index)}
                        className="w-4 h-4 cursor-pointer"
                        style={{ accentColor: 'var(--accent-primary)' }}
                      />
                    </td>
                    <td className="py-2 px-2 text-sm" style={{ color: accessory.checked ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                      {getAccessoryLabel(accessory.type)}
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={accessory.brand}
                        onChange={(e) => updateAccessoryField(index, 'brand', e.target.value)}
                        disabled={!accessory.checked}
                        placeholder={accessory.checked ? "Brand" : "—"}
                        className="w-full px-2 py-1 text-sm rounded focus:outline-none"
                        style={{ 
                          background: accessory.checked ? 'var(--bg-glass-light)' : 'transparent',
                          border: accessoryErrors[index] ? '1px solid var(--accent-red)' : '1px solid var(--border-glass)',
                          color: accessory.checked ? 'var(--text-primary)' : 'var(--text-tertiary)'
                        }}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={accessory.model}
                        onChange={(e) => updateAccessoryField(index, 'model', e.target.value)}
                        disabled={!accessory.checked}
                        placeholder={accessory.checked ? "Model" : "—"}
                        className="w-full px-2 py-1 text-sm rounded focus:outline-none"
                        style={{ 
                          background: accessory.checked ? 'var(--bg-glass-light)' : 'transparent',
                          border: '1px solid var(--border-glass)',
                          color: accessory.checked ? 'var(--text-primary)' : 'var(--text-tertiary)'
                        }}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={accessory.asset_tag}
                        onChange={(e) => updateAccessoryField(index, 'asset_tag', e.target.value)}
                        disabled={!accessory.checked}
                        placeholder={accessory.checked ? "Tag" : "—"}
                        className="w-full px-2 py-1 text-sm rounded focus:outline-none"
                        style={{ 
                          background: accessory.checked ? 'var(--bg-glass-light)' : 'transparent',
                          border: accessoryErrors[index] ? '1px solid var(--accent-red)' : '1px solid var(--border-glass)',
                          color: accessory.checked ? 'var(--text-primary)' : 'var(--text-tertiary)'
                        }}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={accessory.serial}
                        onChange={(e) => updateAccessoryField(index, 'serial', e.target.value)}
                        disabled={!accessory.checked}
                        placeholder={accessory.checked ? "Serial" : "—"}
                        className="w-full px-2 py-1 text-sm rounded focus:outline-none"
                        style={{ 
                          background: accessory.checked ? 'var(--bg-glass-light)' : 'transparent',
                          border: accessoryErrors[index] ? '1px solid var(--accent-red)' : '1px solid var(--border-glass)',
                          color: accessory.checked ? 'var(--text-primary)' : 'var(--text-tertiary)'
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Error message */}
          {Object.keys(accessoryErrors).length > 0 && (
            <div className="mt-3 p-2 rounded-lg text-xs" style={{ background: 'var(--accent-red)20', color: 'var(--accent-red)', border: '1px solid var(--accent-red)' }}>
              ⚠️ Checked accessories must have at least one detail (Brand, Serial, or Asset Tag)
            </div>
          )}
          
          <p className="mt-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Check the accessories that come with this equipment. At least one detail (Brand, Serial, or Asset Tag) is required for each checked accessory.
          </p>
        </div>
      )}
    </Modal>
  );
};

export default EquipmentModal;
