const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema(
    {
      name: String,
      address: String,
      nip: String,
      duns: String,
      email: String,
      phoneNumber: String,
    },
    { timestamps: true }
  )
);

module.exports = Customer;
