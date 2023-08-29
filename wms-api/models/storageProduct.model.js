const mongoose = require("mongoose");

const StorageProduct = mongoose.model(
  "StorageProduct",
  new mongoose.Schema(
    {
      quantity: Number,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      storage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Storage",
      },
    },
    { timestamps: true }
  )
);

module.exports = StorageProduct;
