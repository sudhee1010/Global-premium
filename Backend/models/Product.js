import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      index: true,
    },

    brand: {
      type: String,
      required: true,
      index: true,
    },

    description: String,

    specifications: [
      {
        key: String,
        value: String,
      },
    ],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    images: [String],

    variants: [
      {
        sku: { type: String, required: true, unique: true },
        attributes: [
          {
            name: String, // e.g., "Color"
            value: String, // e.g., "Black"
          },
        ],
        sellingPrice: { type: Number, required: true },
        currentVendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
        currentStock: { type: Number, default: 0 },
        currentVendorPrice: { type: Number },
        weight: { type: Number },
        image: { type: String },
        barcode: { type: String },
        isActive: { type: Boolean, default: true },
      },
    ],

    seo: {
      title: String,
      description: String,
      slug: { type: String, unique: true, sparse: true },
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    featured: { type: Boolean, default: false, index: true },
    offerPrice: { type: Number, default: null },
  },
  { timestamps: true }
);

// 🔎 Enable text search
productSchema.index({ title: "text", description: "text" });

export default mongoose.model("Product", productSchema);