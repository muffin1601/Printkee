# New Year 2027 Page - Admin Management Guide

## Overview

The New Year 2027 landing page (`/new-year-2027`) now features a complete admin panel for managing:
- **Hero Banner** - Upload custom banner images or use defaults
- **Product Organization** - Arrange products into 3 rows with drag-reorder functionality
- **Product Selection** - Add/remove products from the page
- **Row Assignment** - Assign products to specific rows (Gifts, Diaries, Calendars)

---

## Admin Panel Access

**URL:** `https://printkee.com/admin/new-year-2027`

**Requirements:**
- Admin authentication required
- Roles that can access: `super_admin`, `admin`, `catalog_manager`, `content_editor`, `viewer` (read-only)
- Only write roles can save changes

---

## Page Structure

The public-facing page displays 3 product sections in this order:

### Row 1: New Year 2027 Gift Sets
- Display: Gift sets and collection kits
- Filter: Products with "set" or "kit" in the name
- Product count: Varies based on admin selection
- Default: 24 Gifta Guru Sets + 2 Diwali Gift Kits

### Row 2: Corporate Diaries 2027
- Display: Standalone diaries only
- Filter: Products with "diary" in the name (excludes sets/kits)
- Product count: Varies based on admin selection
- Current products:
  - 2027 Diary & Pen Sets (4 styles)
  - Executive Leather Diary 2027
  - Executive A5 PU Leather Diary
  - Cork Fabric Diary

### Row 3: Corporate Calendars 2027
- Display: Calendar products only
- Filter: Products with "calendar" in the name
- Product count: Varies based on admin selection
- Current products:
  - Cork Desktop Calendar
  - Table Calendar 2027
  - Wall Calendar 2027
  - Desk Pad Calendar 2027

---

## Admin Panel Features

### 1. Banner Management

**Display Modes:**
1. **Default** - Uses `/public/printkee-new-yea-banner.webp`
2. **Custom** - Upload your own banner image
3. **None** - Shows a text fallback (white section with "Welcome New Year 2027")

**To Upload a Custom Banner:**
1. Click "Upload replacement banner"
2. Select a JPEG, PNG, or WebP image (max 5 MB)
3. Add descriptive alternative text (max 500 characters)
4. The image dimensions are automatically captured
5. Changes take effect after clicking "Save changes"

**Requirements:**
- Format: JPEG, PNG, or WebP
- Size: Maximum 5 MB
- Aspect ratio: Any (auto-scales without cropping)
- Alternative text: Required for accessibility

### 2. Product Row Management

**For Each Row (Gifts, Diaries, Calendars):**

#### View Selected Products
- Displays all products currently assigned to the row
- Shows product image (64×64 thumbnail)
- Shows product name
- Shows SKU (if available)
- Displays availability status (unavailable products marked)

#### Reorder Products
- Use up/down arrow buttons to change display order
- Arrows are disabled at top and bottom
- Order changes apply to the public page immediately after saving

#### Move to Different Row
- Select a dropdown menu next to each product
- Choose the target row (validation ensures diaries/calendars fit in correct rows)
- Product automatically moves to new row

#### Remove Products
- Click "Remove" button to remove from the page
- Product remains in the database, hidden from this page only
- Can be re-added anytime

### 3. Add Products to a Row

**Product Sources:**
1. **Existing New Year Collection** - Products pre-loaded from the system (Gifta Guru Sets, Diaries, etc.)
2. **Product Catalogue** - Search the full product database (useful for adding specific items)

**To Add Products:**
1. Select the target row in the "Add to" dropdown
2. Choose product source (Collection or Catalogue)
3. Use search bar to find products
4. Click "Add to row" button
5. Product appears in the selected row

**Validation Rules:**
- **Row 2 (Diaries):** Only products with "diary" in name, excluding sets/kits
- **Row 3 (Calendars):** Only products with "calendar" in name
- **Row 1 (Gifts):** Any product not restricted to other rows
- Catalogue products must be: published, active, and have an image

**Search:**
- Searches by product name
- Filters to show only unselected products
- When searching catalogue, results paginate (25 per page)

---

## Data Structure

### Storage
- **Database:** MongoDB
- **Model:** `NewYearPage` collection
- **Key:** Always "new-year-2027"
- **Backend:** Node.js/Express API

### Product References
Products are stored as IDs with prefixes:
- `legacy:{productId}` - Products from the built-in New Year 2027 collection
- `product:{mongoId}` - Products from the product catalogue database

### Configuration Saved
```javascript
{
  key: "new-year-2027",
  bannerMode: "default|custom|none",
  banner: {
    url: "https://...",
    alt: "...",
    width: 2048,
    height: 768
  },
  rows: {
    gifts: ["legacy:...", "product:...", ...],
    diaries: ["legacy:...", ...],
    calendars: ["product:...", ...]
  }
}
```

---

## Default Data

### Product Collections

**New Year 2027 Products:**
- File: `/frontend-next/data/new-year-2027-products.js`
- Includes: Gifta Guru Sets (24), Diary-Pen Sets (4), Diwali Kits (2)

**Stationery Products:**
- File: `/frontend-next/data/new-year-2027-stationery.json`
- Includes: Notebooks, Pens, Diaries, Calendars

### Default Settings
If no settings exist in the database, the system uses defaults:
- Banner Mode: "default"
- Row 1 (Gifts): All gift sets and kits
- Row 2 (Diaries): All diary products (non-sets)
- Row 3 (Calendars): All calendar products

---

## API Endpoints

### For Frontend
- **GET `/api/new-year-page`** - Fetch page settings and products (public)

### For Admin Panel
- **GET `/api/new-year-page/admin`** - Fetch settings with availability info
- **PUT `/api/new-year-page/admin`** - Save page configuration
- **POST `/api/new-year-page/upload`** - Upload banner image

---

## Technical Implementation

### Frontend Files
- **Page:** `/frontend-next/app/(main)/new-year-2027/page.jsx` (SSR)
- **Admin:** `/frontend-next/app/admin/new-year-2027/page.jsx` (Client)
- **Components:** 
  - `DiwaliHero` - Displays banner
  - `DiwaliCatalogueGrid` - Product grid layout
- **Layout Data:** `/frontend-next/data/new-year-page-layout.js`
- **Library:** `/frontend-next/lib/newYearPage.js` (Fetches page data)
- **Styles:** `/frontend-next/styles/NewYear2027.module.css`

### Backend Files
- **Routes:** `/backend-next/routes/newYearPageRoutes.js`
- **Model:** `/backend-next/models/NewYearPage.js`
- **Upload Handler:** `/backend-next/middleware/upload.js`

### Configuration
- **Data:** `/frontend-next/data/new-year-2027-products.js`
- **Data:** `/frontend-next/data/new-year-2027-stationery.json`
- **Layout Rules:** `/frontend-next/data/new-year-page-layout.js`

---

## Workflow: Managing the Page

### Scenario 1: Change the Hero Banner
1. Go to `/admin/new-year-2027`
2. Under "Hero banner" section:
   - Select "Use an uploaded banner"
   - Click "Upload replacement banner"
   - Choose your image and add alt text
3. Click "Save changes"
4. Visit `/new-year-2027` to verify

### Scenario 2: Add a New Gift Set
1. Admin adds new product to database
2. Go to `/admin/new-year-2027`
3. Under "Add products to a row":
   - Select target row: "New Year 2027 Gift Sets"
   - Choose source: "Product catalogue"
   - Search for the product
4. Click "Add to row"
5. Use up/down arrows to position it
6. Click "Save changes"

### Scenario 3: Promote a Diary from Row 1 to Row 2
1. Go to `/admin/new-year-2027`
2. Find the product in Row 1 (Gifts)
3. Click the row dropdown next to it
4. Select "Corporate Diaries 2027"
5. Product moves to Row 2
6. Click "Save changes"

### Scenario 4: Hide an Unavailable Product
1. Go to `/admin/new-year-2027`
2. Find the product in any row
3. Click "Remove"
4. Product disappears from row (not deleted, just hidden)
5. Click "Save changes"

---

## Responsive Design

**Desktop (1000px+):**
- 4 products per row

**Tablet (680px - 1000px):**
- 3 products per row

**Mobile (<680px):**
- 2 products per row

**Small Mobile (<380px):**
- 1 product per row (if needed)

All images maintain aspect ratio and scale responsively.

---

## Validation & Error Handling

### Admin Panel Validation
- Max 200 products per row
- Products can appear in only one row
- Catalogue products must be published, active, and have images
- Diaries cannot have "set" or "kit" in the name
- Calendars must have "calendar" in the name
- Banner alt text is required (1-500 characters)
- Banner image size limited to 20000×20000 pixels

### Error Messages
- "Provide all three product rows" - Fix: Ensure all 3 rows exist
- "Invalid product reference" - Fix: Check product IDs format
- "A product can appear in only one row" - Fix: Don't duplicate products
- "Upload a banner first" - Fix: Choose custom banner mode and upload
- "Selected catalogue products must be published, active and have an image" - Fix: Check product status

### Success Indicators
- Green success message: "Saved. The New Year page will use these settings on its next load."
- Unsaved changes warning on page exit
- "Save changes" button disabled when no changes made

---

## Best Practices

### For Content Managers
1. ✅ Always add product images before adding to page
2. ✅ Use clear, descriptive alternative text for banners
3. ✅ Keep product names consistent with database
4. ✅ Test on mobile devices after making changes
5. ✅ Remove unavailable products promptly

### For Developers
1. ✅ Never hardcode product lists
2. ✅ Always validate product IDs on backend
3. ✅ Preserve SEO metadata and canonical URL
4. ✅ Cache-bust banner images when uploading
5. ✅ Monitor upload folder disk space

---

## Troubleshooting

### Banner Not Showing
- Check if file exists in `/uploads/new-year/`
- Verify banner mode is not set to "none"
- Try refreshing the public page (no-cache)
- Check browser console for image load errors

### Products Not Appearing
- Verify products are added to a row in admin panel
- Check product database for active/published status
- Ensure images exist in public folder
- Verify product names match the row filters

### Admin Panel Won't Load
- Check database connectivity
- Verify authentication token is valid
- Check browser console for API errors
- Try clearing browser cache

### Page Layout Issues
- Verify CSS module is loaded correctly
- Check responsive breakpoints in NewYear2027.module.css
- Test on different devices
- Clear Next.js build cache: `npm run build`

---

## SEO & Metadata

**Current SEO Setup:**
- Title: "New Year 2027 Gift Kits, Diaries, Pens & Calendars"
- Canonical URL: `https://printkee.com/new-year-2027`
- Schema.org: ItemList + Product types
- Breadcrumb: Home > New Year 2027 Gifts

**Maintains:**
- Existing meta tags
- OpenGraph and Twitter cards
- JSON-LD structured data
- Mobile viewport settings

---

## Testing Checklist

After making changes, verify:

- [ ] Banner loads without broken images
- [ ] All 3 rows display correctly
- [ ] Products appear in correct rows
- [ ] "Enquire Now" buttons work
- [ ] Mobile layout is responsive
- [ ] No console errors
- [ ] No layout shifts
- [ ] Image quality is good
- [ ] Alternative text is set
- [ ] Page loads quickly (< 3s)

---

## Support & Documentation

**For Content Updates:**
- Access admin panel: `/admin/new-year-2027`
- Detailed UI guidance in the panel

**For Technical Changes:**
- Backend routes: See `newYearPageRoutes.js`
- Frontend components: See `DiwaliHero.jsx` and `DiwaliCatalogueGrid.jsx`
- Data structure: See `NewYearPage.js` model

**For Questions:**
- Code comments explain validation logic
- Error messages guide you to solutions
- Schema comments document data flow
