const mongoose = require("mongoose");

const PurchaseOrder = mongoose.model(
  "PurchaseOrder",
  new mongoose.Schema(
    {
      supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
      },
      deliveryDate: Date,
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: Number,
        },
      ],
      status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
      },
    },
    { timestamps: true }
  )
);

module.exports = PurchaseOrder;
