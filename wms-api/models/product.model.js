const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
  })
);

module.exports = Product;
