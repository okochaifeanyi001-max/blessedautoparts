const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: [String], // Changed to array of strings for multiple images
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    condition: {
      type: String,
      enum: ["NEW", "USED"],
      default: "NEW",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);
