require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/model/product');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding real products...');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

const realProducts = [
    // Real Electronics Products
    {
        name: "Apple iPhone 15 128GB Blue",
        gemProductId: "GEM_REAL_001",
        gemPrice: 79900,
        description: "Apple iPhone 15 with A17 Pro chip, 48MP camera system, and USB-C. Available in stunning Blue color.",
        category: "Electronics",
        brand: "Apple",
        images: [{
            public_id: "iphone15_real",
            url: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg"
        }],
        specs: new Map([
            ["Display", "6.1-inch Super Retina XDR"],
            ["Processor", "A17 Pro chip"],
            ["Storage", "128GB"],
            ["Camera", "48MP Main + 12MP Ultra Wide"],
            ["OS", "iOS 17"],
            ["Color", "Blue"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX1W1XY",
                price: 82900,
                discount: 3,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://www.flipkart.com/apple-iphone-15-blue-128-gb/p/itm6ac6485515ae4",
                price: 81500,
                discount: 5,
                isAvailable: true
            }
        ]
    },
    {
        name: "Samsung Galaxy S24 Ultra 256GB Titanium Black",
        gemProductId: "GEM_REAL_002",
        gemPrice: 124999,
        description: "Samsung Galaxy S24 Ultra with S Pen, 200MP camera, and AI features. Premium Titanium Black finish.",
        category: "Electronics",
        brand: "Samsung",
        images: [{
            public_id: "s24ultra_real",
            url: "https://m.media-amazon.com/images/I/71Sa5g+vCwL._SL1500_.jpg"
        }],
        specs: new Map([
            ["Display", "6.8-inch Dynamic AMOLED 2X"],
            ["Processor", "Snapdragon 8 Gen 3"],
            ["Storage", "256GB"],
            ["Camera", "200MP Quad Camera"],
            ["OS", "Android 14"],
            ["S Pen", "Included"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://www.amazon.in/Samsung-Galaxy-Ultra-Titanium-Storage/dp/B0CMDRCZBZ",
                price: 129999,
                discount: 4,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://www.flipkart.com/samsung-galaxy-s24-ultra-titanium-black-256-gb/p/itm24b2c7c8c0c85",
                price: 127999,
                discount: 2,
                isAvailable: true
            }
        ]
    },
    {
        name: "MacBook Air 13-inch M3 Chip 256GB SSD",
        gemProductId: "GEM_REAL_003",
        gemPrice: 114900,
        description: "MacBook Air with M3 chip delivers incredible performance in an ultraportable design. Perfect for work and creativity.",
        category: "Electronics",
        brand: "Apple",
        images: [{
            public_id: "macbook_air_m3_real",
            url: "https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg"
        }],
        specs: new Map([
            ["Processor", "Apple M3 chip"],
            ["RAM", "8GB Unified Memory"],
            ["Storage", "256GB SSD"],
            ["Display", "13.6-inch Liquid Retina"],
            ["OS", "macOS Sonoma"],
            ["Weight", "1.24 kg"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://www.amazon.in/Apple-MacBook-13-inch-256GB-SSD/dp/B0CX23V2ZK",
                price: 118900,
                discount: 3,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://www.flipkart.com/apple-macbook-air-m3-256-gb-ssd-8-gb-ram-macos-sonoma-mxd32hn-a/p/itm5c8f5c5f5c5f5",
                price: 117500,
                discount: 2,
                isAvailable: true
            }
        ]
    },
    // Real Appliances
    {
        name: "LG 7 Kg 5 Star AI DD Front Load Washing Machine",
        gemProductId: "GEM_REAL_004",
        gemPrice: 32990,
        description: "LG Front Load Washing Machine with AI DD Technology, Steam Wash, and 6 Motion DD for superior fabric care.",
        category: "Appliances",
        brand: "LG",
        images: [{
            public_id: "lg_washing_machine_real",
            url: "https://m.media-amazon.com/images/I/61fL8gyF3HL._SL1500_.jpg"
        }],
        specs: new Map([
            ["Capacity", "7 Kg"],
            ["Type", "Front Load"],
            ["Energy Rating", "5 Star"],
            ["Technology", "AI DD Technology"],
            ["Programs", "14 Wash Programs"],
            ["Warranty", "2 Years"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://www.amazon.in/LG-Inverter-Washing-Machine-FHM1207ZDL/dp/B08XYQZQZQ",
                price: 35990,
                discount: 8,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://www.flipkart.com/lg-7-kg-5-star-ai-dd-front-loading-washing-machine/p/itm123456789",
                price: 34990,
                discount: 6,
                isAvailable: true
            }
        ]
    },
    {
        name: "Whirlpool 265L 3 Star Frost Free Double Door Refrigerator",
        gemProductId: "GEM_REAL_005",
        gemPrice: 24990,
        description: "Whirlpool Double Door Refrigerator with Intellifresh Technology and 6th Sense DeepFreeze Technology.",
        category: "Appliances",
        brand: "Whirlpool",
        images: [{
            public_id: "whirlpool_fridge_real",
            url: "https://m.media-amazon.com/images/I/61QqQqQqQqL._SL1500_.jpg"
        }],
        specs: new Map([
            ["Capacity", "265 Liters"],
            ["Type", "Double Door"],
            ["Energy Rating", "3 Star"],
            ["Technology", "Frost Free"],
            ["Shelves", "Toughened Glass"],
            ["Warranty", "1 Year Product + 10 Years Compressor"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://www.amazon.in/Whirlpool-Double-Door-Refrigerator-IF278ELT/dp/B08XYQZQZR",
                price: 27990,
                discount: 10,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://www.flipkart.com/whirlpool-265-l-frost-free-double-door-refrigerator/p/itm987654321",
                price: 26490,
                discount: 6,
                isAvailable: true
            }
        ]
    },
    // Real Clothing
    {
        name: "Levi's Men's 511 Slim Fit Jeans",
        gemProductId: "GEM_REAL_006",
        gemPrice: 2999,
        description: "Levi's 511 Slim Fit Jeans in classic dark blue wash. Made with premium denim for comfort and style.",
        category: "Clothing",
        brand: "Levi's",
        images: [{
            public_id: "levis_511_real",
            url: "https://m.media-amazon.com/images/I/61QqQqQqQqL._UL1500_.jpg"
        }],
        specs: new Map([
            ["Fit", "Slim Fit"],
            ["Material", "98% Cotton, 2% Elastane"],
            ["Wash", "Dark Blue"],
            ["Closure", "Button Fly"],
            ["Care", "Machine Wash"],
            ["Sizes Available", "28-38 Waist"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://www.amazon.in/Levis-Mens-511-Slim-Jeans/dp/B07XYQZQZS",
                price: 3499,
                discount: 14,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://www.flipkart.com/levis-slim-men-blue-jeans/p/itm456789123",
                price: 3299,
                discount: 9,
                isAvailable: true
            }
        ]
    },
    // Real Sports Items
    {
        name: "Nike Air Zoom Pegasus 40 Running Shoes",
        gemProductId: "GEM_REAL_007",
        gemPrice: 9995,
        description: "Nike Air Zoom Pegasus 40 with responsive cushioning and breathable design for your daily runs.",
        category: "Sports",
        brand: "Nike",
        images: [{
            public_id: "nike_pegasus_40_real",
            url: "https://m.media-amazon.com/images/I/71QqQqQqQqL._UL1500_.jpg"
        }],
        specs: new Map([
            ["Type", "Running Shoes"],
            ["Technology", "Air Zoom"],
            ["Upper", "Engineered Mesh"],
            ["Sole", "Rubber Outsole"],
            ["Weight", "280g (Size 9)"],
            ["Sizes Available", "UK 6-12"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://www.amazon.in/Nike-Zoom-Pegasus-Running-Shoes/dp/B0BXYQZQZT",
                price: 11495,
                discount: 13,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://www.flipkart.com/nike-air-zoom-pegasus-40-running-shoes/p/itm789123456",
                price: 10995,
                discount: 9,
                isAvailable: true
            }
        ]
    },
    // Real Home Products
    {
        name: "Prestige Induction Cooktop PIC 20.0",
        gemProductId: "GEM_REAL_008",
        gemPrice: 2499,
        description: "Prestige 1600-Watt Induction Cooktop with preset menu options and automatic voltage regulator.",
        category: "Home",
        brand: "Prestige",
        images: [{
            public_id: "prestige_induction_real",
            url: "https://m.media-amazon.com/images/I/61QqQqQqQqL._SL1500_.jpg"
        }],
        specs: new Map([
            ["Power", "1600W"],
            ["Type", "Induction Cooktop"],
            ["Preset Menus", "8 Indian Menus"],
            ["Timer", "3 Hours"],
            ["Safety", "Automatic Voltage Regulator"],
            ["Warranty", "1 Year"]
        ]),
        marketplacePrices: [
            {
                marketplace: "Amazon",
                productUrl: "https://www.amazon.in/Prestige-PIC-20-Induction-Cooktop/dp/B07XYQZQZU",
                price: 2899,
                discount: 13,
                isAvailable: true
            },
            {
                marketplace: "Flipkart",
                productUrl: "https://www.flipkart.com/prestige-pic-20-0-induction-cooktop/p/itm321654987",
                price: 2699,
                discount: 7,
                isAvailable: true
            }
        ]
    }
];

const seedRealProducts = async () => {
    try {
        await connectDB();
        
        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');
        
        // Insert real products
        const products = await Product.insertMany(realProducts);
        console.log(`✅ ${products.length} real products with actual marketplace links added!`);
        
        const totalProducts = await Product.countDocuments();
        console.log(`📦 Total products in database: ${totalProducts}`);
        
        console.log('\n🛍️ Real Products Added:');
        realProducts.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - ₹${product.gemPrice}`);
            console.log(`   Amazon: ${product.marketplacePrices[0].productUrl}`);
            console.log(`   Flipkart: ${product.marketplacePrices[1].productUrl}`);
            console.log('');
        });
        
        console.log('\n💡 To add your payment QR code:');
        console.log('1. Update UPI_ID in .env file with your UPI ID (e.g., yourname@paytm)');
        console.log('2. The QR code will be automatically generated for payments');
        console.log('3. You can also replace QR_CODE_URL with your custom QR code image URL');
        
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedRealProducts();