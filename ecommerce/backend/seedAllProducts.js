require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/model/product');
const User = require('./src/model/user');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

const allProducts = [
    // Electronics - Mobile Phones
    {
        name: "iPhone 15 128GB",
        gemProductId: "GEM001",
        gemPrice: 79900,
        description: "Apple iPhone 15 with 128GB storage, A17 Pro chip, and advanced camera system",
        category: "Electronics",
        brand: "Apple",
        images: [{ public_id: "iphone15", url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop" }],
        specs: new Map([["Display", "6.1-inch Super Retina XDR"], ["Processor", "A17 Pro chip"], ["Storage", "128GB"], ["Camera", "48MP Main + 12MP Ultra Wide"], ["OS", "iOS 17"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/iphone15", price: 82900, discount: 3, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/iphone15", price: 81500, discount: 5, isAvailable: true }
        ]
    },
    {
        name: "Samsung Galaxy S24 256GB",
        gemProductId: "GEM002",
        gemPrice: 74999,
        description: "Samsung Galaxy S24 with 256GB storage, Snapdragon 8 Gen 3, and AI features",
        category: "Electronics",
        brand: "Samsung",
        images: [{ public_id: "galaxys24", url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop" }],
        specs: new Map([["Display", "6.2-inch Dynamic AMOLED 2X"], ["Processor", "Snapdragon 8 Gen 3"], ["Storage", "256GB"], ["Camera", "50MP Triple Camera"], ["OS", "Android 14"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/galaxys24", price: 77999, discount: 4, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/galaxys24", price: 76499, discount: 6, isAvailable: true }
        ]
    },
    // Electronics - Laptops
    {
        name: "MacBook Air M3 13-inch",
        gemProductId: "GEM003",
        gemPrice: 114900,
        description: "Apple MacBook Air with M3 chip, 13-inch Liquid Retina display, 8GB RAM, 256GB SSD",
        category: "Electronics",
        brand: "Apple",
        images: [{ public_id: "macbookair", url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop" }],
        specs: new Map([["Processor", "Apple M3 chip"], ["RAM", "8GB Unified Memory"], ["Storage", "256GB SSD"], ["Display", "13.6-inch Liquid Retina"], ["OS", "macOS Sonoma"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/macbookair", price: 118900, discount: 3, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/macbookair", price: 117500, discount: 5, isAvailable: true }
        ]
    },
    {
        name: "Dell XPS 13 Plus",
        gemProductId: "GEM004",
        gemPrice: 89990,
        description: "Dell XPS 13 Plus with Intel Core i7, 16GB RAM, 512GB SSD",
        category: "Electronics",
        brand: "Dell",
        images: [{ public_id: "dellxps13", url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop" }],
        specs: new Map([["Processor", "Intel Core i7-1360P"], ["RAM", "16GB LPDDR5"], ["Storage", "512GB SSD"], ["Display", "13.4-inch FHD+"], ["OS", "Windows 11"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/dellxps13", price: 94990, discount: 5, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/dellxps13", price: 92990, discount: 7, isAvailable: true }
        ]
    },
    // Appliances - Washing Machines
    {
        name: "LG 7 Kg Front Load Washing Machine",
        gemProductId: "GEM005",
        gemPrice: 32990,
        description: "LG 7 Kg Front Load Washing Machine with AI DD Technology and Steam Wash",
        category: "Appliances",
        brand: "LG",
        images: [{ public_id: "lgwashing", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop" }],
        specs: new Map([["Capacity", "7 Kg"], ["Type", "Front Load"], ["Technology", "AI DD Technology"], ["Programs", "14 Wash Programs"], ["Energy Rating", "5 Star"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/lgwashing", price: 35990, discount: 8, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/lgwashing", price: 34990, discount: 6, isAvailable: true }
        ]
    },
    {
        name: "Samsung 8 Kg Top Load Washing Machine",
        gemProductId: "GEM006",
        gemPrice: 28990,
        description: "Samsung 8 Kg Top Load Washing Machine with Digital Inverter Technology",
        category: "Appliances",
        brand: "Samsung",
        images: [{ public_id: "samsungwashing", url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop" }],
        specs: new Map([["Capacity", "8 Kg"], ["Type", "Top Load"], ["Technology", "Digital Inverter"], ["Programs", "12 Wash Programs"], ["Energy Rating", "5 Star"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/samsungwashing", price: 31990, discount: 9, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/samsungwashing", price: 30490, discount: 7, isAvailable: true }
        ]
    },
    // Appliances - Refrigerators
    {
        name: "Whirlpool 265L Double Door Refrigerator",
        gemProductId: "GEM007",
        gemPrice: 24990,
        description: "Whirlpool 265L 3 Star Frost-Free Double Door Refrigerator",
        category: "Appliances",
        brand: "Whirlpool",
        images: [{ public_id: "whirlpoolfridge", url: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=300&fit=crop" }],
        specs: new Map([["Capacity", "265 Liters"], ["Type", "Double Door"], ["Technology", "Frost-Free"], ["Energy Rating", "3 Star"], ["Warranty", "1 Year"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/whirlpoolfridge", price: 27990, discount: 10, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/whirlpoolfridge", price: 26490, discount: 8, isAvailable: true }
        ]
    },
    // Clothing - Jeans
    {
        name: "Levi's 511 Slim Fit Jeans",
        gemProductId: "GEM008",
        gemPrice: 2999,
        description: "Levi's 511 Slim Fit Jeans in Dark Blue Wash - Premium Denim",
        category: "Clothing",
        brand: "Levi's",
        images: [{ public_id: "levisjeans", url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop" }],
        specs: new Map([["Fit", "Slim Fit"], ["Material", "98% Cotton, 2% Elastane"], ["Wash", "Dark Blue"], ["Sizes", "28-38 Waist"], ["Care", "Machine Wash"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/levisjeans", price: 3499, discount: 14, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/levisjeans", price: 3299, discount: 9, isAvailable: true }
        ]
    },
    // Clothing - T-Shirts
    {
        name: "Nike Dri-FIT T-Shirt",
        gemProductId: "GEM009",
        gemPrice: 1495,
        description: "Nike Dri-FIT Men's Training T-Shirt with Moisture-Wicking Technology",
        category: "Clothing",
        brand: "Nike",
        images: [{ public_id: "niketshirt", url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop" }],
        specs: new Map([["Material", "100% Polyester"], ["Technology", "Dri-FIT"], ["Fit", "Regular Fit"], ["Sizes", "S, M, L, XL, XXL"], ["Care", "Machine Wash"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/niketshirt", price: 1695, discount: 12, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/niketshirt", price: 1595, discount: 6, isAvailable: true }
        ]
    },
    // Electronics - Watches
    {
        name: "Apple Watch Series 9 GPS 45mm",
        gemProductId: "GEM010",
        gemPrice: 42900,
        description: "Apple Watch Series 9 GPS 45mm with Midnight Aluminum Case and Sport Band",
        category: "Electronics",
        brand: "Apple",
        images: [{ public_id: "applewatch", url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop" }],
        specs: new Map([["Display", "45mm Retina LTPO OLED"], ["Processor", "S9 SiP"], ["Connectivity", "GPS, Bluetooth, Wi-Fi"], ["Battery", "Up to 18 hours"], ["Features", "Health Monitoring, Fitness Tracking"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/applewatch", price: 45900, discount: 6, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/applewatch", price: 44400, discount: 8, isAvailable: true }
        ]
    },
    {
        name: "Samsung Galaxy Watch6 Classic",
        gemProductId: "GEM011",
        gemPrice: 34999,
        description: "Samsung Galaxy Watch6 Classic 47mm with Rotating Bezel",
        category: "Electronics",
        brand: "Samsung",
        images: [{ public_id: "galaxywatch", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" }],
        specs: new Map([["Display", "1.5-inch Super AMOLED"], ["Processor", "Exynos W930"], ["Connectivity", "Bluetooth, Wi-Fi, GPS"], ["Battery", "Up to 40 hours"], ["Features", "Body Composition, Sleep Tracking"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/galaxywatch", price: 37999, discount: 8, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/galaxywatch", price: 36499, discount: 5, isAvailable: true }
        ]
    },
    // Furniture
    {
        name: "IKEA POÄNG Armchair",
        gemProductId: "GEM012",
        gemPrice: 8999,
        description: "IKEA POÄNG Armchair with Birch Veneer and Cushion",
        category: "Furniture",
        brand: "IKEA",
        images: [{ public_id: "ikeachair", url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=300&fit=crop" }],
        specs: new Map([["Material", "Birch Veneer"], ["Color", "Brown"], ["Dimensions", "68x82x100 cm"], ["Weight Capacity", "120 kg"], ["Assembly", "Required"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/ikeachair", price: 10499, discount: 14, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/ikeachair", price: 9999, discount: 10, isAvailable: true }
        ]
    },
    // Office Supplies
    {
        name: "HP LaserJet Pro M404n Printer",
        gemProductId: "GEM013",
        gemPrice: 15000,
        description: "HP LaserJet Pro M404n monochrome laser printer with network connectivity",
        category: "Office Supplies",
        brand: "HP",
        images: [{ public_id: "hpprinter", url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=300&h=300&fit=crop" }],
        specs: new Map([["Type", "Monochrome Laser"], ["Print Speed", "38 ppm"], ["Connectivity", "Ethernet, USB"], ["Paper Capacity", "250 sheets"], ["Monthly Duty Cycle", "80,000 pages"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/hpprinter", price: 16500, discount: 8, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/hpprinter", price: 16200, discount: 5, isAvailable: true }
        ]
    },
    // IT Peripherals
    {
        name: "Logitech MX Master 3 Mouse",
        gemProductId: "GEM014",
        gemPrice: 7500,
        description: "Logitech MX Master 3 advanced wireless mouse with ultra-fast scrolling",
        category: "IT Peripherals",
        brand: "Logitech",
        images: [{ public_id: "logitechmouse", url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop" }],
        specs: new Map([["Connectivity", "Bluetooth, USB Receiver"], ["Battery", "70 days on full charge"], ["DPI", "4000 DPI"], ["Buttons", "7 buttons"], ["Compatibility", "Windows, Mac, Linux"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/logitechmouse", price: 8200, discount: 12, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/logitechmouse", price: 8000, discount: 8, isAvailable: true }
        ]
    },
    // Sports
    {
        name: "Nike Air Zoom Pegasus 40 Running Shoes",
        gemProductId: "GEM015",
        gemPrice: 9995,
        description: "Nike Air Zoom Pegasus 40 Men's Running Shoes with Responsive Cushioning",
        category: "Sports",
        brand: "Nike",
        images: [{ public_id: "nikeshoes", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop" }],
        specs: new Map([["Type", "Running Shoes"], ["Technology", "Air Zoom"], ["Upper", "Engineered Mesh"], ["Sizes", "UK 6-12"], ["Weight", "280g"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/nikeshoes", price: 11495, discount: 13, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/nikeshoes", price: 10995, discount: 9, isAvailable: true }
        ]
    },
    // Toys
    {
        name: "LEGO Star Wars Millennium Falcon",
        gemProductId: "GEM016",
        gemPrice: 12999,
        description: "LEGO Star Wars Millennium Falcon Building Kit with 1351 Pieces",
        category: "Toys",
        brand: "LEGO",
        images: [{ public_id: "legomillennium", url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&h=300&fit=crop" }],
        specs: new Map([["Pieces", "1351"], ["Age", "9+"], ["Theme", "Star Wars"], ["Dimensions", "44 x 32 x 14 cm"], ["Minifigures", "7 included"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/legomillennium", price: 14999, discount: 13, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/legomillennium", price: 13999, discount: 7, isAvailable: true }
        ]
    },
    // Automotive
    {
        name: "Bosch Car Battery 12V 65Ah",
        gemProductId: "GEM017",
        gemPrice: 6500,
        description: "Bosch S4 Car Battery 12V 65Ah with 3 Year Warranty",
        category: "Automotive",
        brand: "Bosch",
        images: [{ public_id: "boschbattery", url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=300&h=300&fit=crop" }],
        specs: new Map([["Voltage", "12V"], ["Capacity", "65Ah"], ["Type", "Maintenance Free"], ["Warranty", "3 Years"], ["Cold Cranking Amps", "540 CCA"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/boschbattery", price: 7200, discount: 10, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/boschbattery", price: 6990, discount: 7, isAvailable: true }
        ]
    },
    // Baby
    {
        name: "Pampers Baby Dry Diapers Size 4",
        gemProductId: "GEM018",
        gemPrice: 1299,
        description: "Pampers Baby Dry Diapers Size 4 (9-14 kg) - 74 Count",
        category: "Baby",
        brand: "Pampers",
        images: [{ public_id: "pampersdiapers", url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop" }],
        specs: new Map([["Size", "4 (9-14 kg)"], ["Count", "74 Diapers"], ["Features", "12-hour protection"], ["Material", "Soft Cotton"], ["Wetness Indicator", "Yes"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/pampersdiapers", price: 1499, discount: 13, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/pampersdiapers", price: 1399, discount: 7, isAvailable: true }
        ]
    },
    // Grocery
    {
        name: "Fortune Sunflower Oil 5L",
        gemProductId: "GEM019",
        gemPrice: 650,
        description: "Fortune Sunflower Refined Oil 5 Liter Jar",
        category: "Grocery",
        brand: "Fortune",
        images: [{ public_id: "fortuneoil", url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop" }],
        specs: new Map([["Volume", "5 Liters"], ["Type", "Refined Sunflower Oil"], ["Packaging", "Jar"], ["Shelf Life", "12 Months"], ["Brand", "Fortune"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/fortuneoil", price: 720, discount: 10, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/fortuneoil", price: 690, discount: 6, isAvailable: true }
        ]
    },
    // Health & Beauty
    {
        name: "Lakme Absolute Skin Natural Mousse Foundation",
        gemProductId: "GEM020",
        gemPrice: 599,
        description: "Lakme Absolute Skin Natural Mousse Foundation - Golden Medium",
        category: "Health & Beauty",
        brand: "Lakme",
        images: [{ public_id: "lakmefoundation", url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop" }],
        specs: new Map([["Shade", "Golden Medium"], ["Volume", "25g"], ["Finish", "Natural Matte"], ["Coverage", "Medium to Full"], ["SPF", "8"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/lakmefoundation", price: 699, discount: 14, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/lakmefoundation", price: 649, discount: 8, isAvailable: true }
        ]
    },
    // Home
    {
        name: "Philips LED Bulb 9W Pack of 4",
        gemProductId: "GEM021",
        gemPrice: 399,
        description: "Philips 9W B22 LED Cool Day Light Bulbs - Pack of 4",
        category: "Home",
        brand: "Philips",
        images: [{ public_id: "philipsbulb", url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop" }],
        specs: new Map([["Wattage", "9W"], ["Base", "B22"], ["Color", "Cool Day Light"], ["Pack", "4 Bulbs"], ["Lifespan", "15000 hours"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/philipsbulb", price: 479, discount: 16, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/philipsbulb", price: 449, discount: 11, isAvailable: true }
        ]
    },
    // Jewellery
    {
        name: "Tanishq 22K Gold Chain",
        gemProductId: "GEM022",
        gemPrice: 45000,
        description: "Tanishq 22K Yellow Gold Chain for Men - 20 inches",
        category: "Jewellery",
        brand: "Tanishq",
        images: [{ public_id: "tanishqchain", url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop" }],
        specs: new Map([["Purity", "22K Gold"], ["Weight", "10 grams"], ["Length", "20 inches"], ["Type", "Chain"], ["Gender", "Men"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/tanishqchain", price: 48000, discount: 6, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/tanishqchain", price: 47000, discount: 4, isAvailable: true }
        ]
    },
    // Office
    {
        name: "Godrej Interio Office Chair",
        gemProductId: "GEM023",
        gemPrice: 8500,
        description: "Godrej Interio Ergonomic Office Chair with Lumbar Support",
        category: "Office",
        brand: "Godrej",
        images: [{ public_id: "godrejchair", url: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300&h=300&fit=crop" }],
        specs: new Map([["Type", "Ergonomic Office Chair"], ["Material", "Mesh Back"], ["Features", "Lumbar Support, Adjustable Height"], ["Weight Capacity", "120 kg"], ["Warranty", "1 Year"]]),
        marketplacePrices: [
            { marketplace: "Amazon", productUrl: "https://amazon.in/godrejchair", price: 9500, discount: 10, isAvailable: true },
            { marketplace: "Flipkart", productUrl: "https://flipkart.com/godrejchair", price: 9000, discount: 6, isAvailable: true }
        ]
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();
        
        await Product.deleteMany({});
        console.log('Cleared existing products');
        
        const products = await Product.insertMany(allProducts);
        console.log(`${products.length} products seeded successfully across all departments`);
        
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            await User.create({
                name: 'Admin User',
                email: 'admin@gem.com',
                password: 'admin123',
                role: 'admin'
            });
            console.log('Admin user created: admin@gem.com / admin123');
        }
        
        const userExists = await User.findOne({ email: 'user@test.com' });
        if (!userExists) {
            await User.create({
                name: 'Test User',
                email: 'user@test.com',
                password: 'user123',
                role: 'user'
            });
            console.log('Test user created: user@test.com / user123');
        }
        
        console.log('\n✅ Database seeding completed successfully!');
        console.log('Products added to categories:');
        const categories = [...new Set(allProducts.map(p => p.category))];
        categories.forEach(cat => {
            const count = allProducts.filter(p => p.category === cat).length;
            console.log(`  - ${cat}: ${count} products`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();
