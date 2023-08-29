const mongoose = require("mongoose");

const Warehouse = mongoose.model(
  "Warehouse",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = Warehouse;
