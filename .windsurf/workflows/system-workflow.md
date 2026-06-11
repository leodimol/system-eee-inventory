 # Multi-Hub Laptop & IT Equipment Inventory System Workflow

## System Overview
An inventory tracking system focused on **comprehensive IT equipment** across multiple warehouse/office locations (hubs). The system manages all IT devices essential for logistics operations.

**IT Equipment Categories:**
- **Computing:** Laptops, Desktops, Tablets, Monitors
- **Peripherals:** Laptop Accessories, Docking Stations
- **Printing:** Printers, Parcel Printers, Label Printers
- **Scanning:** Barcode Scanners, RFID Readers
- **Infrastructure:** UPS/Backup Power, Network Equipment
- **Communication:** Phones, Two-Way Radios, Mobile Devices

---

## Core Workflows

### 1. **Adding New Equipment**

```
Dashboard → Add Equipment Button → Fill Form → Save
```

**Steps:**
1. Click "Add Equipment" button (top-right of inventory page)
2. Select Equipment Type:
   - **Computing:**
     - Laptop/Computer (laptops, desktops, workstations)
     - Tablet/Mobile Device (iPads, Android tablets, rugged handhelds)
     - Monitor/Display (monitors, TVs, digital signage)
   - **Peripherals:**
     - Laptop Accessories (chargers, mice, mousepads, bags, docking stations)
   - **Printing & Scanning:**
     - Printer (office printers, label printers, document printers)
     - Barcode Scanner (handheld scanners, cordless scanners)
     - RFID Reader (RFID scanners, fixed readers)
     - Parcel Printer (thermal printers, shipping label printers)
   - **Infrastructure:**
     - UPS/Backup Power (uninterruptible power supplies, surge protectors)
     - Network Equipment (routers, switches, WiFi access points, cables)
   - **Communication:**
     - Communication Device (desk phones, two-way radios, mobile phones)
3. Enter required fields:
   - Brand
   - Model/Name
   - Asset Tag (unique identifier)
4. Enter optional fields:
   - Serial Number
   - Location (e.g., "Warehouse A", "Office 101", "Packing Station 2")
   - Assigned To (employee name)
   - Department (Warehouse/Logistics/Operations/IT/Admin)
   - Condition (New/Excellent/Good/Fair/Poor)
   - Status (Available/In Use/Maintenance/Retired)
5. Click "Add Equipment" to save

---

### 2. **Tracking Equipment Status**

```
Inventory Page → View Table → Update Status Dropdown → Auto-save
```

**Status Options:**
- **Available** - Ready for assignment (green badge)
- **In Use** - Currently assigned to employee (blue badge)
- **Maintenance** - Under repair/service (orange badge)
- **Retired** - No longer in service (red badge)

**Workflow:**
1. Navigate to Equipment Inventory page
2. Find equipment in the table
3. Click Status dropdown in the row
4. Select new status
5. Status updates automatically

---

### 3. **IT Equipment Categories**

```
Equipment Inventory → View All Categories → Filter by Type
```

**Complete IT Equipment Categories Tracked:**

| Category | Equipment Types | Purpose |
|----------|-----------------|---------|
| **Laptops/Computers** | Laptops, Desktops, Workstations | Staff workstations, office work |
| **Laptop Accessories** | Chargers, Mice, Mousepads, Bags, Docking Stations | Laptop peripherals and protection |
| **Printers** | Office printers, Label printers, Document printers | Document printing, label generation |
| **Scanners** | Barcode scanners, Document scanners | Inventory scanning, document digitization |
| **Parcel Printers** | Thermal printers, Shipping label printers | Shipping labels, parcel documentation |

**Key Principle:** Every IT device used in logistics operations has a unique asset tag and is tracked in the system.

---

### 4. **Searching & Filtering**

```
Inventory Page → Search Box / Filters → Results Update
```

**Search Options:**
- **Global Search** - Searches across: Model, Brand, Serial, Asset Tag, Assigned To
- **Status Filter** - Show only: All, Active, Maintenance, Retired, Available
- **Hub Filter** - Current Hub Only / All Hubs

**Workflow:**
1. Type in search box (real-time filtering)
2. Or select Status from dropdown
3. Or select Hub scope from dropdown
4. Table updates automatically

---

### 6. **Switching Between Hubs**

```
Sidebar Hub Menu → Click Hub Name → Dashboard & Inventory Update
```

**Available Hubs:**
- Main Hub (Headquarters)
- North Hub
- South Hub
- East Hub
- West Hub

**Workflow:**
1. Click hub name in left sidebar
2. Dashboard shows that hub's statistics
3. Inventory page shows that hub's equipment
4. Toast notification confirms switch

---

### 7. **Editing Equipment (Inline)**

```
Inventory Table → Click Cell → Edit → Save Button
```

**Editable Fields:**
- Equipment Name (Model)
- Brand
- Asset Tag
- Type
- Brand/Model
- Location
- Assigned To
- Condition
- Last Service Date

**Workflow:**
1. Click on any cell with blue highlight on hover
2. Field becomes editable
3. Make changes
4. Click "Save" button in Actions column
5. Changes persist to that hub's data

---

### 8. **Viewing Dashboard Analytics**

```
Dashboard Page → Equipment Overview Cards → Charts
```

**Equipment Overview Cards:**
- Computers (laptops/desktops)
- Vehicles (trucks, vans)
- Forklifts
- Barcode Scanners
- Printers
- Pallets & Containers

**Charts:**
- **Trend Chart** - Equipment count over time
- **Hub Chart** - Equipment distribution by location
- **Department Chart** - Equipment by department

**Workflow:**
1. Click on any equipment card to view that category
2. Hover over chart segments for details
3. Data updates when switching hubs

---

### 9. **Adding New Hub (Location)**

```
Hubs Page → Add Hub Button → Fill Details → Save
```

**Required:**
- Hub Name (e.g., "Central Warehouse")
- Hub Code (e.g., "CTR")

**Optional:**
- Location (e.g., "Manila, Philippines")
- Description

**Workflow:**
1. Go to "All Hubs" page
2. Click "Add Hub" button
3. Fill in hub details
4. New hub appears in sidebar and dashboard

---

### 10. **Data Import/Export**

```
Settings → Import/Export → Select Format → Process
```

**Import Sources:**
- Google Sheets (CSV)
- JSON File (system export)
- Excel (.xlsx, .xls)

**Export Options:**
- Export to JSON (full backup)
- Export to CSV (spreadsheet)

**Workflow:**
1. Go to Settings page
2. Click Import or Export
3. For Import: Drop file or browse
4. Map columns if needed
5. Preview before confirming
6. Execute import/export

---

### 11. **Maintenance Workflow**

```
Identify Issue → Change Status to Maintenance → Schedule Service → Update Last Service
```

**Steps:**
1. Find equipment needing service
2. Change status to "Maintenance"
3. Add notes in location field (e.g., "Sent to vendor - Dell Service Center")
4. After service, update "Last Service" date
5. Change status back to "Available" or "In Use"

---

### 12. **Equipment Assignment Workflow**

```
Available Equipment → Update "Assigned To" → Change Status to "In Use" → Record Department
```

**Steps:**
1. Filter by "Available" status
2. Find equipment to assign
3. Click "Assigned To" cell, enter employee name
4. Change Status to "In Use"
5. Update Department if needed
6. Update Location to employee's work area

---

## Data Structure

### Equipment Object:
```javascript
{
  id: "HQ001",
  assetTag: "AST-HQ-001",
  brand: "Dell",
  model: "Latitude 5440",
  serial: "DL001",
  equipmentType: "computer",
  location: "Warehouse A",
  assignedTo: "John Smith",
  department: "Warehouse",
  condition: "Good",
  status: "active",
  lastService: "2024-03-15",
  specs: { storage, ram, processor, os },  // For computers
  accessories: { charger, mouse, mousepad }  // Optional
}
```

---

## User Roles (Typical Logistics Company)

### Warehouse Manager:
- View all equipment
- Add/edit equipment
- Update equipment status
- Generate reports

### Logistics Coordinator:
- View scanners and parcel printers
- Update assignments
- Track maintenance schedules

### IT Administrator:
- Full system access
- Manage hubs
- Import/export data
- System settings

### Operations Staff:
- View-only access
- Check equipment availability
- Report issues

---

## Key Features Summary

| Feature | Purpose |
|---------|---------|
| Multi-Hub Support | Track equipment across warehouses |
| Asset Tagging | Unique identification system |
| Status Tracking | Know if equipment is available/in use/maintenance |
| Department Assignment | Organize by functional area |
| Inline Editing | Quick updates without modal |
| Column Reordering | Customize table view |
| Search/Filter | Find equipment quickly |
| Charts/Analytics | Visualize equipment distribution |
| Import/Export | Bulk data management |
| Responsive Design | Works on desktop and tablet |

---

## Tips for Logistics Companies

1. **Asset Tag Convention**: Use format like `EQ-[HUB]-[NUMBER]` (e.g., EQ-MN-001)
2. **Location Detail**: Be specific - "Warehouse A, Rack 3, Shelf B"
3. **Maintenance Scheduling**: Update "Last Service" regularly for laptops and printers
4. **Barcode Integration**: Asset tags can be printed as barcodes for scanning
5. **Hub per Warehouse**: Create separate hubs for each physical location
6. **Department Categories**: Use: Warehouse, Logistics, Operations, Maintenance, IT, Admin
