const mongoose = require("mongoose");

const Unit = mongoose.model(
  "Unit",
  new mongoose.Schema({
    name: String,
    shortcut: String,
  })
);

module.exports = Unit;
