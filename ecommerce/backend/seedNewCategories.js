require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/model/product');

const products = [
    // Health & Beauty (5 products)
    {
        name: "Philips Hair Dryer BHD006/00",
        gemProductId: "GEM-HB-001",
        gemPrice: 1299,
        description: "1600W hair dryer with 3 heat settings and cool shot button",
        category: "Health & Beauty",
        brand: "Philips",
        comparisonType: "Direct Match",
        images: [{ public_id: "hb1", url: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da" }],
        specs: { Power: "1600W", Settings: "3 Heat + Cool", Weight: "450g" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 1499, productUrl: "https://amazon.in/philips-hair-dryer", isAvailable: true },
            { marketplace: "Flipkart", price: 1450, productUrl: "https://flipkart.com/philips-hair-dryer", isAvailable: true }
        ]
    },
    {
        name: "Nivea Men Face Wash Deep Clean 100g",
        gemProductId: "GEM-HB-002",
        gemPrice: 149,
        description: "Deep cleansing face wash for men with menthol",
        category: "Health & Beauty",
        brand: "Nivea",
        comparisonType: "Direct Match",
        images: [{ public_id: "hb2", url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883" }],
        specs: { Volume: "100g", Type: "Face Wash", Gender: "Men" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 175, productUrl: "https://amazon.in/nivea-face-wash", isAvailable: true },
            { marketplace: "Flipkart", price: 169, productUrl: "https://flipkart.com/nivea-face-wash", isAvailable: true }
        ]
    },
    {
        name: "Omron Digital BP Monitor HEM-7120",
        gemProductId: "GEM-HB-003",
        gemPrice: 1850,
        description: "Automatic blood pressure monitor with large display",
        category: "Health & Beauty",
        brand: "Omron",
        comparisonType: "Direct Match",
        images: [{ public_id: "hb3", url: "https://images.unsplash.com/photo-1584362917165-526a968579e8" }],
        specs: { Type: "Digital BP Monitor", Display: "Large LCD", Memory: "30 readings" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 2099, productUrl: "https://amazon.in/omron-bp-monitor", isAvailable: true },
            { marketplace: "Flipkart", price: 2050, productUrl: "https://flipkart.com/omron-bp-monitor", isAvailable: true }
        ]
    },
    {
        name: "Lakme Absolute Lipstick",
        gemProductId: "GEM-HB-004",
        gemPrice: 599,
        description: "Long-lasting matte lipstick with rich color",
        category: "Health & Beauty",
        brand: "Lakme",
        comparisonType: "Direct Match",
        images: [{ public_id: "hb4", url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa" }],
        specs: { Type: "Matte Lipstick", Finish: "Long-lasting", Weight: "3.6g" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 650, productUrl: "https://amazon.in/lakme-lipstick", isAvailable: true },
            { marketplace: "Flipkart", price: 625, productUrl: "https://flipkart.com/lakme-lipstick", isAvailable: true }
        ]
    },
    {
        name: "Gillette Fusion Razor + 4 Cartridges",
        gemProductId: "GEM-HB-005",
        gemPrice: 799,
        description: "5-blade razor with precision trimmer",
        category: "Health & Beauty",
        brand: "Gillette",
        comparisonType: "Direct Match",
        images: [{ public_id: "hb5", url: "https://images.unsplash.com/photo-1621607512214-68297480165e" }],
        specs: { Blades: "5", Cartridges: "4 included", Type: "Manual Razor" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 899, productUrl: "https://amazon.in/gillette-fusion", isAvailable: true },
            { marketplace: "Flipkart", price: 850, productUrl: "https://flipkart.com/gillette-fusion", isAvailable: true }
        ]
    },

    // Jewellery (3 products)
    {
        name: "Tanishq 22K Gold Chain",
        gemProductId: "GEM-JW-001",
        gemPrice: 45000,
        description: "22 karat gold chain, 10 grams",
        category: "Jewellery",
        brand: "Tanishq",
        comparisonType: "Similar Specs",
        images: [{ public_id: "jw1", url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" }],
        specs: { Purity: "22K", Weight: "10g", Type: "Chain" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 48000, productUrl: "https://amazon.in/tanishq-gold-chain", isAvailable: true },
            { marketplace: "Other", price: 47500, productUrl: "https://tanishq.co.in", isAvailable: true }
        ]
    },
    {
        name: "Swarovski Crystal Pendant",
        gemProductId: "GEM-JW-002",
        gemPrice: 3499,
        description: "Austrian crystal pendant with silver chain",
        category: "Jewellery",
        brand: "Swarovski",
        comparisonType: "Direct Match",
        images: [{ public_id: "jw2", url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f" }],
        specs: { Material: "Crystal + Silver", Chain: "18 inch", Type: "Pendant" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 3999, productUrl: "https://amazon.in/swarovski-pendant", isAvailable: true },
            { marketplace: "Flipkart", price: 3850, productUrl: "https://flipkart.com/swarovski-pendant", isAvailable: true }
        ]
    },
    {
        name: "Titan Raga Watch for Women",
        gemProductId: "GEM-JW-003",
        gemPrice: 8500,
        description: "Elegant analog watch with leather strap",
        category: "Jewellery",
        brand: "Titan",
        comparisonType: "Direct Match",
        images: [{ public_id: "jw3", url: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49" }],
        specs: { Type: "Analog", Strap: "Leather", Warranty: "2 years" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 9200, productUrl: "https://amazon.in/titan-raga", isAvailable: true },
            { marketplace: "Flipkart", price: 9000, productUrl: "https://flipkart.com/titan-raga", isAvailable: true }
        ]
    },

    // Office (4 products)
    {
        name: "Godrej Office Table 4ft",
        gemProductId: "GEM-OFF-001",
        gemPrice: 8999,
        description: "Wooden office table with drawer",
        category: "Office",
        brand: "Godrej",
        comparisonType: "Similar Specs",
        images: [{ public_id: "off1", url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd" }],
        specs: { Size: "4ft x 2ft", Material: "Wood", Drawer: "1" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 10500, productUrl: "https://amazon.in/godrej-table", isAvailable: true },
            { marketplace: "Flipkart", price: 10200, productUrl: "https://flipkart.com/godrej-table", isAvailable: true }
        ]
    },
    {
        name: "Nilkamal Executive Chair",
        gemProductId: "GEM-OFF-002",
        gemPrice: 5499,
        description: "Ergonomic office chair with lumbar support",
        category: "Office",
        brand: "Nilkamal",
        comparisonType: "Direct Match",
        images: [{ public_id: "off2", url: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8" }],
        specs: { Type: "Executive", Support: "Lumbar", Adjustable: "Yes" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 6299, productUrl: "https://amazon.in/nilkamal-chair", isAvailable: true },
            { marketplace: "Flipkart", price: 6100, productUrl: "https://flipkart.com/nilkamal-chair", isAvailable: true }
        ]
    },
    {
        name: "Wipro LED Panel Light 18W",
        gemProductId: "GEM-OFF-003",
        gemPrice: 599,
        description: "Square LED panel light for office ceiling",
        category: "Office",
        brand: "Wipro",
        comparisonType: "Direct Match",
        images: [{ public_id: "off3", url: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c" }],
        specs: { Power: "18W", Shape: "Square", Color: "Cool White" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 699, productUrl: "https://amazon.in/wipro-led", isAvailable: true },
            { marketplace: "Flipkart", price: 675, productUrl: "https://flipkart.com/wipro-led", isAvailable: true }
        ]
    },
    {
        name: "Godrej File Cabinet 4 Drawer",
        gemProductId: "GEM-OFF-004",
        gemPrice: 12500,
        description: "Steel file cabinet with lock",
        category: "Office",
        brand: "Godrej",
        comparisonType: "Direct Match",
        images: [{ public_id: "off4", url: "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d" }],
        specs: { Drawers: "4", Material: "Steel", Lock: "Yes" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 14000, productUrl: "https://amazon.in/godrej-cabinet", isAvailable: true },
            { marketplace: "Flipkart", price: 13500, productUrl: "https://flipkart.com/godrej-cabinet", isAvailable: true }
        ]
    },

    // Office Supplies (5 products)
    {
        name: "HP LaserJet Toner 88A",
        gemProductId: "GEM-OS-001",
        gemPrice: 3999,
        description: "Original HP toner cartridge, 1500 pages",
        category: "Office Supplies",
        brand: "HP",
        comparisonType: "Direct Match",
        images: [{ public_id: "os1", url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6" }],
        specs: { Pages: "1500", Type: "Toner", Compatible: "HP LaserJet" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 4500, productUrl: "https://amazon.in/hp-toner", isAvailable: true },
            { marketplace: "Flipkart", price: 4350, productUrl: "https://flipkart.com/hp-toner", isAvailable: true }
        ]
    },
    {
        name: "Classmate Notebook Pack of 6",
        gemProductId: "GEM-OS-002",
        gemPrice: 180,
        description: "Single line notebooks, 172 pages each",
        category: "Office Supplies",
        brand: "Classmate",
        comparisonType: "Direct Match",
        images: [{ public_id: "os2", url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c" }],
        specs: { Pages: "172 each", Quantity: "6", Type: "Single Line" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 210, productUrl: "https://amazon.in/classmate-notebook", isAvailable: true },
            { marketplace: "Flipkart", price: 200, productUrl: "https://flipkart.com/classmate-notebook", isAvailable: true }
        ]
    },
    {
        name: "Cello Butterflow Pen Blue (50 pcs)",
        gemProductId: "GEM-OS-003",
        gemPrice: 250,
        description: "Smooth writing ballpoint pens, pack of 50",
        category: "Office Supplies",
        brand: "Cello",
        comparisonType: "Direct Match",
        images: [{ public_id: "os3", url: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338" }],
        specs: { Quantity: "50", Color: "Blue", Type: "Ballpoint" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 299, productUrl: "https://amazon.in/cello-pen", isAvailable: true },
            { marketplace: "Flipkart", price: 280, productUrl: "https://flipkart.com/cello-pen", isAvailable: true }
        ]
    },
    {
        name: "Kangaro Stapler HD-10D",
        gemProductId: "GEM-OS-004",
        gemPrice: 120,
        description: "Heavy duty stapler with staples",
        category: "Office Supplies",
        brand: "Kangaro",
        comparisonType: "Direct Match",
        images: [{ public_id: "os4", url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3" }],
        specs: { Capacity: "20 sheets", Type: "Heavy Duty", Staples: "Included" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 150, productUrl: "https://amazon.in/kangaro-stapler", isAvailable: true },
            { marketplace: "Flipkart", price: 140, productUrl: "https://flipkart.com/kangaro-stapler", isAvailable: true }
        ]
    },
    {
        name: "JK Copier Paper A4 500 Sheets",
        gemProductId: "GEM-OS-005",
        gemPrice: 299,
        description: "Premium quality copier paper, 75 GSM",
        category: "Office Supplies",
        brand: "JK",
        comparisonType: "Direct Match",
        images: [{ public_id: "os5", url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04" }],
        specs: { Sheets: "500", Size: "A4", GSM: "75" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 350, productUrl: "https://amazon.in/jk-paper", isAvailable: true },
            { marketplace: "Flipkart", price: 330, productUrl: "https://flipkart.com/jk-paper", isAvailable: true }
        ]
    },

    // Sports (4 products)
    {
        name: "Nivia Storm Football Size 5",
        gemProductId: "GEM-SP-002",
        gemPrice: 599,
        description: "Professional football with rubber bladder",
        category: "Sports",
        brand: "Nivia",
        comparisonType: "Direct Match",
        images: [{ public_id: "sp2", url: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab" }],
        specs: { Size: "5", Material: "Rubber", Type: "Football" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 699, productUrl: "https://amazon.in/nivia-football", isAvailable: true },
            { marketplace: "Flipkart", price: 650, productUrl: "https://flipkart.com/nivia-football", isAvailable: true }
        ]
    },
    {
        name: "Yonex Badminton Racket GR 303",
        gemProductId: "GEM-SP-003",
        gemPrice: 1299,
        description: "Aluminum badminton racket with cover",
        category: "Sports",
        brand: "Yonex",
        comparisonType: "Direct Match",
        images: [{ public_id: "sp3", url: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea" }],
        specs: { Material: "Aluminum", Weight: "95g", Cover: "Included" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 1499, productUrl: "https://amazon.in/yonex-racket", isAvailable: true },
            { marketplace: "Flipkart", price: 1450, productUrl: "https://flipkart.com/yonex-racket", isAvailable: true }
        ]
    },
    {
        name: "Cosco Cricket Bat Kashmir Willow",
        gemProductId: "GEM-SP-004",
        gemPrice: 899,
        description: "Kashmir willow cricket bat, full size",
        category: "Sports",
        brand: "Cosco",
        comparisonType: "Direct Match",
        images: [{ public_id: "sp4", url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da" }],
        specs: { Wood: "Kashmir Willow", Size: "Full", Weight: "1.2kg" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 1099, productUrl: "https://amazon.in/cosco-bat", isAvailable: true },
            { marketplace: "Flipkart", price: 1050, productUrl: "https://flipkart.com/cosco-bat", isAvailable: true }
        ]
    },
    {
        name: "Nivia Yoga Mat 6mm",
        gemProductId: "GEM-SP-005",
        gemPrice: 499,
        description: "Anti-slip yoga mat with carry bag",
        category: "Sports",
        brand: "Nivia",
        comparisonType: "Direct Match",
        images: [{ public_id: "sp5", url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f" }],
        specs: { Thickness: "6mm", Material: "PVC", Bag: "Included" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 599, productUrl: "https://amazon.in/nivia-yoga-mat", isAvailable: true },
            { marketplace: "Flipkart", price: 550, productUrl: "https://flipkart.com/nivia-yoga-mat", isAvailable: true }
        ]
    },

    // Toys (4 products)
    {
        name: "Lego Classic Creative Bricks 900 pcs",
        gemProductId: "GEM-TOY-001",
        gemPrice: 3999,
        description: "Building blocks set with 900 pieces",
        category: "Toys",
        brand: "Lego",
        comparisonType: "Direct Match",
        images: [{ public_id: "toy1", url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b" }],
        specs: { Pieces: "900", Age: "4+", Type: "Building Blocks" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 4500, productUrl: "https://amazon.in/lego-classic", isAvailable: true },
            { marketplace: "Flipkart", price: 4350, productUrl: "https://flipkart.com/lego-classic", isAvailable: true }
        ]
    },
    {
        name: "Funskool Monopoly Board Game",
        gemProductId: "GEM-TOY-002",
        gemPrice: 899,
        description: "Classic monopoly board game for family",
        category: "Toys",
        brand: "Funskool",
        comparisonType: "Direct Match",
        images: [{ public_id: "toy2", url: "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba" }],
        specs: { Players: "2-6", Age: "8+", Type: "Board Game" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 1099, productUrl: "https://amazon.in/monopoly", isAvailable: true },
            { marketplace: "Flipkart", price: 1050, productUrl: "https://flipkart.com/monopoly", isAvailable: true }
        ]
    },
    {
        name: "Hot Wheels 5 Car Gift Pack",
        gemProductId: "GEM-TOY-003",
        gemPrice: 599,
        description: "Die-cast toy cars pack of 5",
        category: "Toys",
        brand: "Hot Wheels",
        comparisonType: "Direct Match",
        images: [{ public_id: "toy3", url: "https://images.unsplash.com/photo-1558060370-d644479cb6f7" }],
        specs: { Quantity: "5", Scale: "1:64", Material: "Die-cast" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 699, productUrl: "https://amazon.in/hot-wheels", isAvailable: true },
            { marketplace: "Flipkart", price: 650, productUrl: "https://flipkart.com/hot-wheels", isAvailable: true }
        ]
    },
    {
        name: "Barbie Dreamhouse Doll",
        gemProductId: "GEM-TOY-004",
        gemPrice: 1299,
        description: "Fashion doll with accessories",
        category: "Toys",
        brand: "Barbie",
        comparisonType: "Direct Match",
        images: [{ public_id: "toy4", url: "https://images.unsplash.com/photo-1607083206968-13611e3d76db" }],
        specs: { Height: "12 inch", Accessories: "Included", Age: "3+" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 1499, productUrl: "https://amazon.in/barbie-doll", isAvailable: true },
            { marketplace: "Flipkart", price: 1450, productUrl: "https://flipkart.com/barbie-doll", isAvailable: true }
        ]
    },

    // IT Peripherals (5 products)
    {
        name: "Logitech MK270 Wireless Keyboard Mouse",
        gemProductId: "GEM-IT-001",
        gemPrice: 1599,
        description: "Wireless keyboard and mouse combo",
        category: "IT Peripherals",
        brand: "Logitech",
        comparisonType: "Direct Match",
        images: [{ public_id: "it1", url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3" }],
        specs: { Type: "Wireless", Battery: "2 years", Range: "10m" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 1899, productUrl: "https://amazon.in/logitech-mk270", isAvailable: true },
            { marketplace: "Flipkart", price: 1850, productUrl: "https://flipkart.com/logitech-mk270", isAvailable: true }
        ]
    },
    {
        name: "Seagate 1TB External HDD",
        gemProductId: "GEM-IT-002",
        gemPrice: 3499,
        description: "Portable external hard drive USB 3.0",
        category: "IT Peripherals",
        brand: "Seagate",
        comparisonType: "Direct Match",
        images: [{ public_id: "it2", url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b" }],
        specs: { Capacity: "1TB", Interface: "USB 3.0", Speed: "5400 RPM" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 3999, productUrl: "https://amazon.in/seagate-hdd", isAvailable: true },
            { marketplace: "Flipkart", price: 3850, productUrl: "https://flipkart.com/seagate-hdd", isAvailable: true }
        ]
    },
    {
        name: "TP-Link WiFi Router AC1200",
        gemProductId: "GEM-IT-003",
        gemPrice: 1299,
        description: "Dual band wireless router 1200Mbps",
        category: "IT Peripherals",
        brand: "TP-Link",
        comparisonType: "Direct Match",
        images: [{ public_id: "it3", url: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2" }],
        specs: { Speed: "1200Mbps", Band: "Dual", Antennas: "4" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 1499, productUrl: "https://amazon.in/tplink-router", isAvailable: true },
            { marketplace: "Flipkart", price: 1450, productUrl: "https://flipkart.com/tplink-router", isAvailable: true }
        ]
    },
    {
        name: "Zebronics USB Webcam 720p",
        gemProductId: "GEM-IT-004",
        gemPrice: 699,
        description: "HD webcam with built-in microphone",
        category: "IT Peripherals",
        brand: "Zebronics",
        comparisonType: "Direct Match",
        images: [{ public_id: "it4", url: "https://images.unsplash.com/photo-1593642532400-2682810df593" }],
        specs: { Resolution: "720p", Mic: "Built-in", Connection: "USB" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 799, productUrl: "https://amazon.in/zebronics-webcam", isAvailable: true },
            { marketplace: "Flipkart", price: 750, productUrl: "https://flipkart.com/zebronics-webcam", isAvailable: true }
        ]
    },
    {
        name: "SanDisk 64GB Pendrive USB 3.0",
        gemProductId: "GEM-IT-005",
        gemPrice: 599,
        description: "High speed USB flash drive 64GB",
        category: "IT Peripherals",
        brand: "SanDisk",
        comparisonType: "Direct Match",
        images: [{ public_id: "it5", url: "https://images.unsplash.com/photo-1624823183493-ed5832f48f18" }],
        specs: { Capacity: "64GB", Interface: "USB 3.0", Speed: "100MB/s" },
        marketplacePrices: [
            { marketplace: "Amazon", price: 699, productUrl: "https://amazon.in/sandisk-pendrive", isAvailable: true },
            { marketplace: "Flipkart", price: 650, productUrl: "https://flipkart.com/sandisk-pendrive", isAvailable: true }
        ]
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');
        await Product.insertMany(products);
        console.log(`✅ Added ${products.length} products across new categories`);
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
