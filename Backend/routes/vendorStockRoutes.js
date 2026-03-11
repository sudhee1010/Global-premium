import express from "express";
import {
  createVendorStock,
  selectVendorForVariant,
  getVendorStocksForVariant,
} from "../controllers/vendorStockController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Vendor only
router.post("/", protect, authorize("vendor"), createVendorStock);

// Admin only
router.put("/select", protect, authorize("admin"), selectVendorForVariant);
router.get("/:productId/:sku", protect, authorize("admin"), getVendorStocksForVariant);

export default router;
