require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/model/product');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

const productsWithImages = [
    // Electronics - Smartphones
    { name: "Apple iPhone 15 Pro Max 256GB", gemProductId: "PROD001", gemPrice: 134900, description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system", category: "Electronics", brand: "Apple", images: [{ public_id: "iphone15pro", url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500" }], specs: new Map([["Display", "6.7-inch Super Retina XDR"], ["Processor", "A17 Pro"], ["Storage", "256GB"], ["Camera", "48MP Main"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CHX8SZQS", price: 139900, discount: 4, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/apple-iphone-15-pro-max", price: 137900, discount: 2, isAvailable: true }] },
    
    { name: "Samsung Galaxy S24 Ultra 512GB", gemProductId: "PROD002", gemPrice: 129999, description: "Premium flagship with S Pen, 200MP camera, and AI features", category: "Electronics", brand: "Samsung", images: [{ public_id: "s24ultra", url: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500" }], specs: new Map([["Display", "6.8-inch Dynamic AMOLED"], ["Processor", "Snapdragon 8 Gen 3"], ["Storage", "512GB"], ["Camera", "200MP Quad"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CMDRCZBZ", price: 134999, discount: 4, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/samsung-galaxy-s24-ultra", price: 132999, discount: 2, isAvailable: true }] },
    
    { name: "OnePlus 12 5G 256GB", gemProductId: "PROD003", gemPrice: 64999, description: "Flagship killer with Snapdragon 8 Gen 3 and 100W charging", category: "Electronics", brand: "OnePlus", images: [{ public_id: "oneplus12", url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" }], specs: new Map([["Display", "6.82-inch AMOLED"], ["Processor", "Snapdragon 8 Gen 3"], ["Storage", "256GB"], ["Camera", "50MP Triple"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CXYZ123", price: 68999, discount: 6, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/oneplus-12", price: 67499, discount: 4, isAvailable: true }] },
    
    // Electronics - Laptops
    { name: "MacBook Pro 14-inch M3 Pro", gemProductId: "PROD004", gemPrice: 199900, description: "Professional laptop with M3 Pro chip, 18GB RAM, 512GB SSD", category: "Electronics", brand: "Apple", images: [{ public_id: "macbookpro", url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" }], specs: new Map([["Processor", "Apple M3 Pro"], ["RAM", "18GB"], ["Storage", "512GB SSD"], ["Display", "14.2-inch Liquid Retina XDR"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CM5JV268", price: 204900, discount: 2, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/macbook-pro-14", price: 202900, discount: 1, isAvailable: true }] },
    
    { name: "Dell XPS 15 Intel i7 16GB", gemProductId: "PROD005", gemPrice: 149990, description: "Premium Windows laptop with InfinityEdge display", category: "Electronics", brand: "Dell", images: [{ public_id: "dellxps", url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500" }], specs: new Map([["Processor", "Intel Core i7-13700H"], ["RAM", "16GB DDR5"], ["Storage", "512GB SSD"], ["Display", "15.6-inch FHD+"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0BXYZ456", price: 154990, discount: 3, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/dell-xps-15", price: 152990, discount: 2, isAvailable: true }] },
    
    { name: "HP Pavilion Gaming Laptop", gemProductId: "PROD006", gemPrice: 74990, description: "Gaming laptop with RTX 3050, 16GB RAM, 512GB SSD", category: "Electronics", brand: "HP", images: [{ public_id: "hpgaming", url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500" }], specs: new Map([["Processor", "Intel Core i5-12450H"], ["GPU", "NVIDIA RTX 3050"], ["RAM", "16GB"], ["Storage", "512GB SSD"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CXYZ789", price: 79990, discount: 6, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/hp-pavilion-gaming", price: 77990, discount: 4, isAvailable: true }] },
    
    // Electronics - Tablets
    { name: "iPad Pro 11-inch M2 128GB", gemProductId: "PROD007", gemPrice: 81900, description: "Powerful tablet with M2 chip and Apple Pencil support", category: "Electronics", brand: "Apple", images: [{ public_id: "ipadpro", url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500" }], specs: new Map([["Display", "11-inch Liquid Retina"], ["Processor", "Apple M2"], ["Storage", "128GB"], ["Connectivity", "Wi-Fi 6E"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0BJLF2BRM", price: 84900, discount: 4, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/ipad-pro-11", price: 83900, discount: 2, isAvailable: true }] },
    
    { name: "Samsung Galaxy Tab S9 256GB", gemProductId: "PROD008", gemPrice: 76999, description: "Premium Android tablet with S Pen included", category: "Electronics", brand: "Samsung", images: [{ public_id: "galaxytab", url: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500" }], specs: new Map([["Display", "11-inch Dynamic AMOLED"], ["Processor", "Snapdragon 8 Gen 2"], ["Storage", "256GB"], ["S Pen", "Included"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CXYZ012", price: 79999, discount: 4, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/galaxy-tab-s9", price: 78499, discount: 2, isAvailable: true }] },
    
    // Appliances - Washing Machines
    { name: "LG 8 Kg Front Load Washing Machine", gemProductId: "PROD009", gemPrice: 38990, description: "AI DD technology with steam wash and 6 motion DD", category: "Appliances", brand: "LG", images: [{ public_id: "lgwashing", url: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500" }], specs: new Map([["Capacity", "8 Kg"], ["Type", "Front Load"], ["Energy Rating", "5 Star"], ["Technology", "AI DD"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B08XYQZQZQ", price: 42990, discount: 9, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/lg-washing-machine", price: 41490, discount: 6, isAvailable: true }] },
    
    { name: "Samsung 7.5 Kg Top Load Washing Machine", gemProductId: "PROD010", gemPrice: 24990, description: "Digital Inverter technology with Eco Bubble", category: "Appliances", brand: "Samsung", images: [{ public_id: "samsungwashing", url: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=500" }], specs: new Map([["Capacity", "7.5 Kg"], ["Type", "Top Load"], ["Energy Rating", "5 Star"], ["Technology", "Eco Bubble"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CXYZ345", price: 27990, discount: 10, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/samsung-washing", price: 26490, discount: 6, isAvailable: true }] },
    
    // Appliances - Refrigerators
    { name: "Whirlpool 292L Double Door Refrigerator", gemProductId: "PROD011", gemPrice: 29990, description: "Frost-free with Intellifresh technology", category: "Appliances", brand: "Whirlpool", images: [{ public_id: "whirlpoolfridge", url: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500" }], specs: new Map([["Capacity", "292 Liters"], ["Type", "Double Door"], ["Energy Rating", "3 Star"], ["Technology", "Frost Free"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CXYZ678", price: 33990, discount: 11, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/whirlpool-fridge", price: 32490, discount: 8, isAvailable: true }] },
    
    { name: "Samsung 345L Side by Side Refrigerator", gemProductId: "PROD012", gemPrice: 54990, description: "Digital Inverter with Twin Cooling Plus", category: "Appliances", brand: "Samsung", images: [{ public_id: "samsungfridge", url: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500" }], specs: new Map([["Capacity", "345 Liters"], ["Type", "Side by Side"], ["Energy Rating", "3 Star"], ["Technology", "Twin Cooling"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CXYZ901", price: 59990, discount: 8, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/samsung-sbs-fridge", price: 57990, discount: 5, isAvailable: true }] },
    
    // Appliances - Air Conditioners
    { name: "Daikin 1.5 Ton 5 Star Split AC", gemProductId: "PROD013", gemPrice: 42990, description: "Inverter AC with PM 2.5 filter and stabilizer-free operation", category: "Appliances", brand: "Daikin", images: [{ public_id: "daikinac", url: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=500" }], specs: new Map([["Capacity", "1.5 Ton"], ["Type", "Split AC"], ["Energy Rating", "5 Star"], ["Technology", "Inverter"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CXYZ234", price: 47990, discount: 10, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/daikin-ac", price: 45990, discount: 7, isAvailable: true }] },
    
    // Clothing - Men
    { name: "Levi's Men's 511 Slim Fit Jeans", gemProductId: "PROD014", gemPrice: 2999, description: "Classic slim fit jeans in dark blue wash", category: "Clothing", brand: "Levi's", images: [{ public_id: "levisjeans", url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500" }], specs: new Map([["Fit", "Slim"], ["Material", "98% Cotton, 2% Elastane"], ["Wash", "Dark Blue"], ["Sizes", "28-38"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B07XYQZQZS", price: 3499, discount: 14, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/levis-jeans", price: 3299, discount: 9, isAvailable: true }] },
    
    { name: "Nike Dri-FIT Training T-Shirt", gemProductId: "PROD015", gemPrice: 1495, description: "Moisture-wicking sports t-shirt", category: "Clothing", brand: "Nike", images: [{ public_id: "niketshirt", url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" }], specs: new Map([["Material", "100% Polyester"], ["Technology", "Dri-FIT"], ["Fit", "Regular"], ["Sizes", "S-XXL"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CXYZ567", price: 1695, discount: 12, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/nike-tshirt", price: 1595, discount: 6, isAvailable: true }] },
    
    { name: "Adidas Originals Hoodie", gemProductId: "PROD016", gemPrice: 3999, description: "Classic trefoil hoodie with kangaroo pocket", category: "Clothing", brand: "Adidas", images: [{ public_id: "adidashoodie", url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" }], specs: new Map([["Material", "70% Cotton, 30% Polyester"], ["Fit", "Regular"], ["Color", "Black"], ["Sizes", "S-XXL"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CXYZ890", price: 4499, discount: 11, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/adidas-hoodie", price: 4299, discount: 7, isAvailable: true }] },
    
    // Clothing - Women
    { name: "Zara Women's Formal Blazer", gemProductId: "PROD017", gemPrice: 4999, description: "Professional blazer in navy blue", category: "Clothing", brand: "Zara", images: [{ public_id: "zarablaze", url: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500" }], specs: new Map([["Material", "Polyester Blend"], ["Fit", "Slim"], ["Color", "Navy Blue"], ["Sizes", "XS-XL"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CXYZ123", price: 5799, discount: 13, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/zara-blazer", price: 5499, discount: 9, isAvailable: true }] },
    
    // Furniture
    { name: "IKEA POÄNG Armchair", gemProductId: "PROD018", gemPrice: 8999, description: "Comfortable armchair with birch veneer frame", category: "Furniture", brand: "IKEA", images: [{ public_id: "ikeachair", url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500" }], specs: new Map([["Material", "Birch Veneer"], ["Color", "Brown"], ["Dimensions", "68x82x100 cm"], ["Weight Capacity", "120 kg"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CXYZ456", price: 10499, discount: 14, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/ikea-chair", price: 9999, discount: 10, isAvailable: true }] },
    
    { name: "Urban Ladder Study Table", gemProductId: "PROD019", gemPrice: 12999, description: "Wooden study table with drawer storage", category: "Furniture", brand: "Urban Ladder", images: [{ public_id: "studytable", url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500" }], specs: new Map([["Material", "Engineered Wood"], ["Color", "Walnut"], ["Dimensions", "120x60x75 cm"], ["Storage", "1 Drawer"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0CXYZ789", price: 14999, discount: 13, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/study-table", price: 13999, discount: 7, isAvailable: true }] },
    
    // Sports
    { name: "Nike Air Zoom Pegasus 40", gemProductId: "PROD020", gemPrice: 9995, description: "Premium running shoes with responsive cushioning", category: "Sports", brand: "Nike", images: [{ public_id: "nikeshoes", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" }], specs: new Map([["Type", "Running Shoes"], ["Technology", "Air Zoom"], ["Upper", "Mesh"], ["Sizes", "UK 6-12"]]), marketplacePrices: [{ marketplace: "Amazon", productUrl: "https://www.amazon.in/dp/B0BXYQZQZT", price: 11495, discount: 13, isAvailable: true }, { marketplace: "Flipkart", productUrl: "https://www.flipkart.com/nike-pegasus", price: 10995, discount: 9, isAvailable: true }] }
];

const seedWithImages = async () => {
    try {
        await connectDB();
        await Product.deleteMany({});
        console.log('Cleared existing products');
        
        const products = await Product.insertMany(productsWithImages);
        console.log(`✅ ${products.length} products with images added!`);
        
        console.log('\n📦 Products by Category:');
        const categories = [...new Set(productsWithImages.map(p => p.category))];
        categories.forEach(cat => {
            const count = productsWithImages.filter(p => p.category === cat).length;
            console.log(`  ${cat}: ${count} products`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedWithImages();