import express from "express";
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getOffers,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/offers", getOffers);
router.get("/:id", getProductById);

// Admin only routes
router.post("/", protect, authorize("admin"), createProduct);
router.put("/:id", protect, authorize("admin"), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);

export default router;
