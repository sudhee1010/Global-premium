import asyncHandler from "express-async-handler";
import VendorStock from "../models/VendorStock.js";
import Product from "../models/Product.js";
import Vendor from "../models/Vendor.js";

// @desc    Vendor provides stock for a variant
// @route   POST /api/vendor-stock
// @access  Private/Vendor
export const createVendorStock = asyncHandler(async (req, res) => {
  const { productId, sku, stockQuantity, vendorPrice } = req.body;
  const vendor = await Vendor.findOne({ owner: req.user._id });

  if (!vendor || vendor.approvalStatus !== "approved") {
    res.status(403);
    throw new Error("Vendor account not approved or not found");
  }

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

  const vendorStock = await VendorStock.create({
    vendor: vendor._id,
    product: productId,
    sku,
    stockQuantity,
    vendorPrice,
  });

  res.status(201).json(vendorStock);
});

// @desc    Admin selects a vendor for a product variant
// @route   PUT /api/vendor-stock/select
// @access  Private/Admin
export const selectVendorForVariant = asyncHandler(async (req, res) => {
  const { productId, sku, vendorId } = req.body;

  const vendorStock = await VendorStock.findOne({
    vendor: vendorId,
    product: productId,
    sku,
    isActive: true,
  });

  if (!vendorStock) {
    res.status(404);
    throw new Error("Vendor stock entry not found for this variant");
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const variantIndex = product.variants.findIndex((v) => v.sku === sku);
  if (variantIndex === -1) {
    res.status(404);
    throw new Error("Variant SKU not found in product");
  }

  product.variants[variantIndex].currentVendor = vendorId;
  product.variants[variantIndex].currentStock = vendorStock.stockQuantity;
  product.variants[variantIndex].currentVendorPrice = vendorStock.vendorPrice;

  await product.save();

  res.json({ message: "Vendor selected for variant", product });
});

// @desc    Get all stock entries for a product variant (Admin only)
// @route   GET /api/vendor-stock/:productId/:sku
// @access  Private/Admin
export const getVendorStocksForVariant = asyncHandler(async (req, res) => {
  const { productId, sku } = req.params;

  const stocks = await VendorStock.find({
    product: productId,
    sku,
    isActive: true,
  }).populate("vendor", "storeName");

  res.json(stocks);
});
