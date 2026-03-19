import asyncHandler from "express-async-handler";
import VendorStock from "../models/VendorStock.js";
import Product from "../models/Product.js";
import Vendor from "../models/Vendor.js";


// ✅ CREATE / UPDATE STOCK (Vendor)
export const createVendorStock = asyncHandler(async (req, res) => {
  const { productId, sku, stockQuantity, vendorPrice } = req.body;

  // 1️⃣ Validation
  if (!productId || !sku) {
    res.status(400);
    throw new Error("ProductId and SKU are required");
  }

  if (stockQuantity < 0 || vendorPrice < 0) {
    res.status(400);
    throw new Error("Stock and price must be positive");
  }

  // 2️⃣ Vendor check
  const vendor = await Vendor.findOne({ owner: req.user._id });

  if (!vendor) {
    res.status(404);
    throw new Error("Vendor not found");
  }

  if (vendor.approvalStatus !== "approved") {
    res.status(403);
    throw new Error("Vendor not approved");
  }

  // 3️⃣ Product + SKU check
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const variantExists = product.variants.some(v => v.sku === sku);

  if (!variantExists) {
    res.status(400);
    throw new Error("Invalid SKU for this product");
  }

  // 4️⃣ Existing stock check
  const existingStock = await VendorStock.findOne({
    vendor: vendor._id,
    product: productId,
    sku,
  });

  if (existingStock) {
    existingStock.stockQuantity = stockQuantity;
    existingStock.vendorPrice = vendorPrice;
    await existingStock.save();
    return res.json(existingStock);
  }

  // 5️⃣ Create stock
  const vendorStock = await VendorStock.create({
    vendor: vendor._id,
    product: productId,
    sku,
    stockQuantity,
    vendorPrice,
    isApproved: false, // admin must approve
  });

  res.status(201).json(vendorStock);
});


// ✅ ADMIN: APPROVE STOCK
export const approveVendorStock = asyncHandler(async (req, res) => {
  const { stockId } = req.params;

  const stock = await VendorStock.findById(stockId);

  if (!stock) {
    res.status(404);
    throw new Error("Stock not found");
  }

  stock.isApproved = true;
  await stock.save();

  res.json({ message: "Stock approved successfully", stock });
});


// ✅ ADMIN: SELECT VENDOR FOR VARIANT
export const selectVendorForVariant = asyncHandler(async (req, res) => {
  const { productId, sku, vendorId } = req.body;

  const vendorStock = await VendorStock.findOne({
    vendor: vendorId,
    product: productId,
    sku,
    isActive: true,
    isApproved: true, // only approved vendors
  });

  if (!vendorStock) {
    res.status(404);
    throw new Error("Vendor stock not found or not approved");
  }

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const variantIndex = product.variants.findIndex(v => v.sku === sku);

  if (variantIndex === -1) {
    res.status(404);
    throw new Error("Variant not found");
  }

  product.variants[variantIndex].currentVendor = vendorId;
  product.variants[variantIndex].currentStock = vendorStock.stockQuantity;
  product.variants[variantIndex].currentVendorPrice = vendorStock.vendorPrice;

  await product.save();

  res.json({ message: "Vendor selected successfully", product });
});


// ✅ ADMIN: GET ALL VENDOR STOCKS FOR A VARIANT
export const getVendorStocksForVariant = asyncHandler(async (req, res) => {
  const { productId, sku } = req.params;

  const stocks = await VendorStock.find({
    product: productId,
    sku,
    isActive: true,
  }).populate("vendor", "storeName email");

  res.json(stocks);
});