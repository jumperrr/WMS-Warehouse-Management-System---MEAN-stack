const mongoose = require("mongoose");

const Supplier = mongoose.model(
  "Supplier",
  new mongoose.Schema({
    name: String,
    address: String,
    nip: String,
    email: String,
    phoneNumber: String,
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  })
);

module.exports = Supplier;
