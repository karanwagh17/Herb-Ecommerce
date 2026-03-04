const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String },
  image: [{ type: String }],
  reviews: { type: Number },
  price: { type: Number },
  typeofproduct: { type: String },
  description: { type: String },
  highlights: [{ type: String }],
  category: {
    type: String,
  },
});

const Product = mongoose.model("Catalog", productSchema);

module.exports = Product;
