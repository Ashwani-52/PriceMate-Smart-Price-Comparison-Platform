# 🎯 ADMIN QUICK REFERENCE CARD

## 🔐 Login Credentials
```
Email: admin@gem.com
Password: admin123
```

## 🌐 URLs
- **Website**: http://localhost:5174
- **Admin Dashboard**: http://localhost:5174/admin/dashboard
- **Product Management**: http://localhost:5174/admin/products
- **Order Management**: http://localhost:5174/admin/orders
- **Backend API**: http://localhost:3001

## ➕ Add Product (Quick Form)

### Required Fields
```
Product Name: [Your product name]
GeM Product ID: [Unique ID like GEM-001]
GeM Price: [Price in rupees]
Brand: [Brand name]
Category: [Select from dropdown]
Description: [Product description]
```

### Optional Fields
```
Image URL: https://images.unsplash.com/photo-[ID]
Specifications: Click "Add Specification" button
Marketplace Prices: Pre-filled Amazon & Flipkart
```

## 🎨 Available Categories
- Electronics
- Appliances
- Clothing
- Furniture
- Sports
- Office Supplies
- IT Peripherals
- Automotive
- Baby
- Grocery
- Health & Beauty
- Home
- Jewellery
- Office
- Toys

## 🛒 Marketplace Options
- Amazon
- Flipkart
- Meesho
- Other

## ⚡ Quick Actions

### Add Product
1. Click "Add Product" button
2. Fill required fields
3. Click "Save Product"
4. See success message ✅

### Edit Product
1. Click pencil icon on product row
2. Modify fields
3. Click "Save Product"
4. See success message ✅

### Delete Product
1. Click trash icon on product row
2. Confirm deletion
3. Product removed ✅

## 📸 Image URLs (Free Sources)
- **Unsplash**: https://images.unsplash.com/photo-[ID]
- **Placeholder**: https://via.placeholder.com/300
- **Direct Links**: Any HTTPS image URL

## 🔧 Troubleshooting Commands

### Check Backend Status
```bash
cd backend
tail -f server.log
```

### Restart Backend
```bash
cd backend
pkill -f "node.*app.js"
node app.js
```

### Check Frontend Status
```bash
cd frontend
npm run dev
```

## ✅ What's Fixed
- ✅ Port configuration (3001)
- ✅ Marketplace validation
- ✅ Empty data handling
- ✅ Success/error messages
- ✅ Default values
- ✅ Smooth UI

## 🎉 Current Status
- **Backend**: ✅ Running on port 3001
- **Frontend**: ✅ Running on port 5174
- **Database**: ✅ MongoDB Atlas connected
- **Products**: ✅ 20 products loaded
- **Admin Panel**: ✅ Fully functional

## 📞 Support
All issues fixed! Admin product management is 100% working.

**Ready to add products!** 🚀
