const Product = require('../model/product');

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private (Admin)
exports.createProduct = async (req, res) => {
    try {
        // Clean up empty specs
        if (req.body.specs) {
            const cleanSpecs = {};
            Object.entries(req.body.specs).forEach(([key, value]) => {
                if (key && key.trim() !== '') {
                    cleanSpecs[key] = value;
                }
            });
            req.body.specs = cleanSpecs;
        }

        // Filter out empty marketplace prices
        if (req.body.marketplacePrices) {
            req.body.marketplacePrices = req.body.marketplacePrices.filter(
                mp => mp.marketplace && mp.marketplace.trim() !== ''
            );
        }

        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        console.error('Create product error:', err);
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        console.log('Getting products with query:', req.query);
        
        let query;
        const reqQuery = { ...req.query };

        // Fields to exclude from filtering
        const removeFields = ['select', 'sort', 'page', 'limit', 'keyword'];
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string for filtering (gt, gte, etc)
        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        // Finding resource
        let queryObj = JSON.parse(queryStr);

        // Handle gemPrice range filtering
        if (req.query['gemPrice[gte]']) {
            if (!queryObj.gemPrice) queryObj.gemPrice = {};
            queryObj.gemPrice.$gte = parseInt(req.query['gemPrice[gte]']);
            delete queryObj['gemPrice[gte]'];
            delete queryObj['gemPrice[$gte]'];
        }
        if (req.query['gemPrice[lte]']) {
            if (!queryObj.gemPrice) queryObj.gemPrice = {};
            queryObj.gemPrice.$lte = parseInt(req.query['gemPrice[lte]']);
            delete queryObj['gemPrice[lte]'];
            delete queryObj['gemPrice[$lte]'];
        }

        // Only include active products
        queryObj.status = 'active';

        let mongooseQuery = Product.find(queryObj);

        // Search by keyword (Name, Brand, Category)
        if (req.query.keyword) {
            const keyword = req.query.keyword;
            const keywordRegex = { $regex: keyword, $options: 'i' };
            mongooseQuery = mongooseQuery.find({
                $or: [
                    { name: keywordRegex },
                    { brand: keywordRegex },
                    { category: keywordRegex },
                    { 'specs.Model': keywordRegex }
                ]
            });
        }

        query = mongooseQuery;

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Get total count for pagination
        const total = await Product.countDocuments(queryObj);
        console.log('Total products found:', total);

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const products = await query;
        console.log('Products returned:', products.length);

        // Pagination result
        const pagination = {};
        if (endIndex < total) {
            pagination.next = { page: page + 1, limit };
        }
        if (startIndex > 0) {
            pagination.prev = { page: page - 1, limit };
        }

        res.status(200).json({ 
            success: true, 
            count: products.length, 
            total,
            pagination, 
            data: products 
        });
    } catch (err) {
        console.error('Get products error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private (Admin)
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Clean up empty specs
        if (req.body.specs) {
            const cleanSpecs = {};
            Object.entries(req.body.specs).forEach(([key, value]) => {
                if (key && key.trim() !== '') {
                    cleanSpecs[key] = value;
                }
            });
            req.body.specs = cleanSpecs;
        }

        // Filter out empty marketplace prices
        if (req.body.marketplacePrices) {
            req.body.marketplacePrices = req.body.marketplacePrices.filter(
                mp => mp.marketplace && mp.marketplace.trim() !== ''
            );
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        console.error('Update product error:', err);
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private (Admin)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        await product.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
