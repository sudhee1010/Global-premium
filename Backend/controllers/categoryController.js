import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true })
    .populate("parentCategory", "name")
    .sort({ name: 1 });

  // Recursive function to build hierarchy
  const buildHierarchy = (parentId = null) => {
    return categories
      .filter((c) => 
        (parentId === null && !c.parentCategory) || 
        (c.parentCategory && c.parentCategory._id.toString() === parentId?.toString())
      )
      .map((cat) => ({
        ...cat.toObject(),
        subCategories: buildHierarchy(cat._id),
      }));
  };

  const hierarchy = buildHierarchy();
  res.json(hierarchy);
});
