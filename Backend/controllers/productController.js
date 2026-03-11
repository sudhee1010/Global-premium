import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

export const getProducts = asyncHandler(async (req, res) => {
  const { search, category, brand, minPrice, maxPrice, sort = "-createdAt", page = 1, limit = 20 } = req.query;
  const filter = { isActive: true };

  if (search && search.trim()) {
    const s = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [{ title: new RegExp(s, "i") }, { description: new RegExp(s, "i") }, { brand: new RegExp(s, "i") }];
  }
  if (category) filter.category = category;
  if (brand) filter.brand = brand;

  if (minPrice != null && !isNaN(Number(minPrice))) {
    filter["variants.sellingPrice"] = { ...(filter["variants.sellingPrice"] || {}), $gte: Number(minPrice) };
  }
  if (maxPrice != null && !isNaN(Number(maxPrice))) {
    filter["variants.sellingPrice"] = { ...(filter["variants.sellingPrice"] || {}), $lte: Number(maxPrice) };
  }

  const skip = (Math.max(1, parseInt(page, 10)) - 1) * Math.min(50, Math.max(1, parseInt(limit, 10)));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("category", "name parentCategory")
      .populate("variants.currentVendor", "storeName")
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Product.countDocuments(filter),
  ]);
  res.json({ products, total, page: parseInt(page, 10), limit: limitNum });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name parentCategory")
    .populate("variants.currentVendor", "storeName");
  if (!product || !product.isActive) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 12, 50);
  const products = await Product.find({ isActive: true, featured: true })
    .populate("category", "name")
    .limit(limit)
    .lean();
  res.json(products);
});

export const getOffers = asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 12, 50);
  const products = await Product.find({ isActive: true, offerPrice: { $exists: true, $ne: null, $gt: 0 } })
    .populate("category", "name")
    .limit(limit)
    .lean();
  res.json(products);
});

// @desc    Create a product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    brand,
    category,
    images,
    specifications,
    variants,
    seo,
    featured,
    offerPrice,
  } = req.body;

  const product = new Product({
    vendor: req.user.role === "admin" ? req.body.vendor || req.user._id : req.user._id,
    title,
    description,
    brand,
    category,
    images,
    specifications,
    variants,
    seo,
    featured,
    offerPrice,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product (Admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.images = req.body.images || product.images;
    product.specifications = req.body.specifications || product.specifications;
    product.variants = req.body.variants || product.variants;
    product.seo = req.body.seo || product.seo;
    product.isActive = req.body.isActive !== undefined ? req.body.isActive : product.isActive;
    product.featured = req.body.featured !== undefined ? req.body.featured : product.featured;
    product.offerPrice = req.body.offerPrice !== undefined ? req.body.offerPrice : product.offerPrice;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product (Admin only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // Instead of deleting, we can just set isActive to false
    product.isActive = false;
    await product.save();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
