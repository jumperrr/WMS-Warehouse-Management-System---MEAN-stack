const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
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

module.exports = Order;
