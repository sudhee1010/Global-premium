import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Vendor from "../models/Vendor.js";
import Review from "../models/Review.js";
import Referral from "../models/Referral.js";
import Coupon from "../models/Coupon.js";

// @desc    Get admin dashboard stats
// @route   GET /api/dashboard/admin
// @access  Private/Admin
export const getAdminStats = asyncHandler(async (req, res) => {
  const [orderCount, productCount, userCount, vendorCount, totalRevenue, referralCount, activeCoupons] = await Promise.all([
    Order.countDocuments(),
    Product.countDocuments(),
    User.countDocuments({ role: "user" }),
    Vendor.countDocuments({ approvalStatus: "approved" }),
    Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
    Referral.countDocuments(),
    Coupon.countDocuments({ isActive: true }),
  ]);

  const recentOrders = await Order.find().sort("-createdAt").limit(5).populate("user", "name");

  res.json({
    stats: {
      orders: orderCount,
      products: productCount,
      customers: userCount,
      vendors: vendorCount,
      revenue: totalRevenue[0]?.total || 0,
      referrals: referralCount,
      activeCoupons,
    },
    recentOrders,
  });
});

// @desc    Get vendor dashboard stats
// @route   GET /api/dashboard/vendor
// @access  Private/Vendor
export const getVendorStats = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findOne({ owner: req.user._id });
  if (!vendor) {
    res.status(404);
    throw new Error("Vendor not found");
  }

  const [productCount, pendingOrders] = await Promise.all([
    Product.countDocuments({ "variants.currentVendor": vendor._id }),
    Order.countDocuments({ "items.vendorId": vendor._id, orderStatus: "pending" }),
  ]);

  res.json({
    stats: {
      myProducts: productCount,
      pendingOrders,
      revenue: vendor.totalRevenue,
    },
  });
});
