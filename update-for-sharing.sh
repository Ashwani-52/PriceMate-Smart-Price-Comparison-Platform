#!/bin/bash

# Script to update API URLs for network sharing
# Your IP: 192.168.142.12

echo "🔧 Updating API URLs for network sharing..."

# Update authSlice.js
sed -i '' 's|http://localhost:3001|http://192.168.142.12:3001|g' "/Users/ashwanikumar/Desktop/GEM Project/ecommerce/frontend/src/redux/authSlice.js"

# Update productSlice.js
sed -i '' 's|http://localhost:3001|http://192.168.142.12:3001|g' "/Users/ashwanikumar/Desktop/GEM Project/ecommerce/frontend/src/redux/productSlice.js"

# Update Checkout.jsx
sed -i '' 's|http://localhost:3001|http://192.168.142.12:3001|g' "/Users/ashwanikumar/Desktop/GEM Project/ecommerce/frontend/src/pages/Checkout.jsx"

# Update MyOrders.jsx
sed -i '' 's|http://localhost:3001|http://192.168.142.12:3001|g' "/Users/ashwanikumar/Desktop/GEM Project/ecommerce/frontend/src/pages/MyOrders.jsx"

# Update AdminOrders.jsx
sed -i '' 's|http://localhost:3001|http://192.168.142.12:3001|g' "/Users/ashwanikumar/Desktop/GEM Project/ecommerce/frontend/src/pages/AdminOrders.jsx"

# Update AdminDashboard.jsx
sed -i '' 's|http://localhost:3001|http://192.168.142.12:3001|g' "/Users/ashwanikumar/Desktop/GEM Project/ecommerce/frontend/src/pages/AdminDashboard.jsx"

# Update ProductListing.jsx
sed -i '' 's|http://localhost:3001|http://192.168.142.12:3001|g' "/Users/ashwanikumar/Desktop/GEM Project/ecommerce/frontend/src/pages/ProductListing.jsx"

# Update ProductDetails.jsx
sed -i '' 's|http://localhost:3001|http://192.168.142.12:3001|g' "/Users/ashwanikumar/Desktop/GEM Project/ecommerce/frontend/src/pages/ProductDetails.jsx"

# Update Profile.jsx
sed -i '' 's|http://localhost:3001|http://192.168.142.12:3001|g' "/Users/ashwanikumar/Desktop/GEM Project/ecommerce/frontend/src/pages/Profile.jsx"

echo "✅ All API URLs updated to: http://192.168.142.12:3001"
echo ""
echo "🌐 Share this link with friends: http://192.168.142.12:5174"
echo ""
echo "⚠️  Make sure both servers are running:"
echo "   Backend: cd backend && node app.js"
echo "   Frontend: cd frontend && npm run dev"