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

const sampleProducts = [
    // Mobile Phones
    {
        name: "iPhone 15 128GB",
        gemProductId: "GEM001",
        gemPrice: 79900,
        description: "Apple iPhone 15 with 128GB storage, A17 Pro chip, and advanced camera system",
        category: "Electronics",
        brand: "Apple",
        images: [{
            public_id: "iphone15",
            url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop"
        }],
        specs: new Map([
            ["Display", "6.1-inch Super Retina XDR"],
            ["Processor", "A17 Pro chip"],
            ["Storage", "128GB"],
            ["Camera", "48MP Main + 12MP Ultra Wide"],
            ["OS", "iOS 17"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://amazon.in/iphone15",
                price: 82900,
                discount: 3,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://flipkart.com/iphone15",
                price: 81500,
                discount: 5,
                isAvailable: true
            }
        ]
    },
    {
        name: "Samsung Galaxy S24 256GB",
        gemProductId: "GEM002",
        gemPrice: 74999,
        description: "Samsung Galaxy S24 with 256GB storage, Snapdragon 8 Gen 3, and AI features",
        category: "Electronics",
        brand: "Samsung",
        images: [{
            public_id: "galaxys24",
            url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop"
        }],
        specs: new Map([
            ["Display", "6.2-inch Dynamic AMOLED 2X"],
            ["Processor", "Snapdragon 8 Gen 3"],
            ["Storage", "256GB"],
            ["Camera", "50MP Triple Camera"],
            ["OS", "Android 14"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://amazon.in/galaxys24",
                price: 77999,
                discount: 4,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://flipkart.com/galaxys24",
                price: 76499,
                discount: 6,
                isAvailable: true
            }
        ]
    },
    // Laptops
    {
        name: "MacBook Air M3 13-inch",
        gemProductId: "GEM003",
        gemPrice: 114900,
        description: "Apple MacBook Air with M3 chip, 13-inch Liquid Retina display, 8GB RAM, 256GB SSD",
        category: "Electronics",
        brand: "Apple",
        images: [{
            public_id: "macbookair",
            url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop"
        }],
        specs: new Map([
            ["Processor", "Apple M3 chip"],
            ["RAM", "8GB Unified Memory"],
            ["Storage", "256GB SSD"],
            ["Display", "13.6-inch Liquid Retina"],
            ["OS", "macOS Sonoma"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://amazon.in/macbookair",
                price: 118900,
                discount: 3,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://flipkart.com/macbookair",
                price: 117500,
                discount: 5,
                isAvailable: true
            }
        ]
    },
    {
        name: "Dell XPS 13 Plus",
        gemProductId: "GEM004",
        gemPrice: 89990,
        description: "Dell XPS 13 Plus with Intel Core i7, 16GB RAM, 512GB SSD, and InfinityEdge display",
        category: "Electronics",
        brand: "Dell",
        images: [{
            public_id: "dellxps13",
            url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop"
        }],
        specs: new Map([
            ["Processor", "Intel Core i7-1360P"],
            ["RAM", "16GB LPDDR5"],
            ["Storage", "512GB SSD"],
            ["Display", "13.4-inch FHD+"],
            ["OS", "Windows 11"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://amazon.in/dellxps13",
                price: 94990,
                discount: 5,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://flipkart.com/dellxps13",
                price: 92990,
                discount: 7,
                isAvailable: true
            }
        ]
    },
    // Washing Machines
    {
        name: "LG 7 Kg Front Load Washing Machine",
        gemProductId: "GEM005",
        gemPrice: 32990,
        description: "LG 7 Kg Front Load Washing Machine with AI DD Technology and Steam Wash",
        category: "Appliances",
        brand: "LG",
        images: [{
            public_id: "lgwashing",
            url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"
        }],
        specs: new Map([
            ["Capacity", "7 Kg"],
            ["Type", "Front Load"],
            ["Technology", "AI DD Technology"],
            ["Programs", "14 Wash Programs"],
            ["Energy Rating", "5 Star"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://amazon.in/lgwashing",
                price: 35990,
                discount: 8,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://flipkart.com/lgwashing",
                price: 34990,
                discount: 6,
                isAvailable: true
            }
        ]
    },
    {
        name: "Samsung 8 Kg Top Load Washing Machine",
        gemProductId: "GEM006",
        gemPrice: 28990,
        description: "Samsung 8 Kg Top Load Washing Machine with Digital Inverter Technology",
        category: "Appliances",
        brand: "Samsung",
        images: [{
            public_id: "samsungwashing",
            url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop"
        }],
        specs: new Map([
            ["Capacity", "8 Kg"],
            ["Type", "Top Load"],
            ["Technology", "Digital Inverter"],
            ["Programs", "12 Wash Programs"],
            ["Energy Rating", "5 Star"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://amazon.in/samsungwashing",
                price: 31990,
                discount: 9,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://flipkart.com/samsungwashing",
                price: 30490,
                discount: 7,
                isAvailable: true
            }
        ]
    },
    // Clothing
    {
        name: "Levi's 511 Slim Fit Jeans",
        gemProductId: "GEM007",
        gemPrice: 2999,
        description: "Levi's 511 Slim Fit Jeans in Dark Blue Wash - Premium Denim",
        category: "Clothing",
        brand: "Levi's",
        images: [{
            public_id: "levisjeans",
            url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop"
        }],
        specs: new Map([
            ["Fit", "Slim Fit"],
            ["Material", "98% Cotton, 2% Elastane"],
            ["Wash", "Dark Blue"],
            ["Sizes", "28-38 Waist"],
            ["Care", "Machine Wash"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://amazon.in/levisjeans",
                price: 3499,
                discount: 14,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://flipkart.com/levisjeans",
                price: 3299,
                discount: 9,
                isAvailable: true
            }
        ]
    },
    {
        name: "Nike Dri-FIT T-Shirt",
        gemProductId: "GEM008",
        gemPrice: 1495,
        description: "Nike Dri-FIT Men's Training T-Shirt with Moisture-Wicking Technology",
        category: "Clothing",
        brand: "Nike",
        images: [{
            public_id: "niketshirt",
            url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop"
        }],
        specs: new Map([
            ["Material", "100% Polyester"],
            ["Technology", "Dri-FIT"],
            ["Fit", "Regular Fit"],
            ["Sizes", "S, M, L, XL, XXL"],
            ["Care", "Machine Wash"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://amazon.in/niketshirt",
                price: 1695,
                discount: 12,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://flipkart.com/niketshirt",
                price: 1595,
                discount: 6,
                isAvailable: true
            }
        ]
    },
    // Watches
    {
        name: "Apple Watch Series 9 GPS 45mm",
        gemProductId: "GEM009",
        gemPrice: 42900,
        description: "Apple Watch Series 9 GPS 45mm with Midnight Aluminum Case and Sport Band",
        category: "Electronics",
        brand: "Apple",
        images: [{
            public_id: "applewatch",
            url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop"
        }],
        specs: new Map([
            ["Display", "45mm Retina LTPO OLED"],
            ["Processor", "S9 SiP"],
            ["Connectivity", "GPS, Bluetooth, Wi-Fi"],
            ["Battery", "Up to 18 hours"],
            ["Features", "Health Monitoring, Fitness Tracking"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://amazon.in/applewatch",
                price: 45900,
                discount: 6,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://flipkart.com/applewatch",
                price: 44400,
                discount: 8,
                isAvailable: true
            }
        ]
    },
    {
        name: "Samsung Galaxy Watch6 Classic",
        gemProductId: "GEM010",
        gemPrice: 34999,
        description: "Samsung Galaxy Watch6 Classic 47mm with Rotating Bezel and Advanced Health Monitoring",
        category: "Electronics",
        brand: "Samsung",
        images: [{
            public_id: "galaxywatch",
            url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
        }],
        specs: new Map([
            ["Display", "1.5-inch Super AMOLED"],
            ["Processor", "Exynos W930"],
            ["Connectivity", "Bluetooth, Wi-Fi, GPS"],
            ["Battery", "Up to 40 hours"],
            ["Features", "Body Composition, Sleep Tracking"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://amazon.in/galaxywatch",
                price: 37999,
                discount: 8,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://flipkart.com/galaxywatch",
                price: 36499,
                discount: 5,
                isAvailable: true
            }
        ]
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();
        
        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');
        
        // Insert sample products
        const products = await Product.insertMany(sampleProducts);
        console.log(`${products.length} products seeded successfully`);
        
        // Check if admin user exists, if not create one
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            const adminUser = await User.create({
                name: 'Admin User',
                email: 'admin@gem.com',
                password: 'admin123',
                role: 'admin'
            });
            console.log('Admin user created:', adminUser.email);
            console.log('Admin password: admin123');
        } else {
            console.log('Admin user already exists');
        }
        
        // Create a test regular user
        const userExists = await User.findOne({ email: 'user@test.com' });
        if (!userExists) {
            const testUser = await User.create({
                name: 'Test User',
                email: 'user@test.com',
                password: 'user123',
                role: 'user'
            });
            console.log('Test user created:', testUser.email);
            console.log('Test user password: user123');
        }
        
        console.log('Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();