const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname: String,
    surname: String,
    email: String,
    password: String,
    phoneNumber: Number,
    address: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    }
  })
);

module.exports = User;
