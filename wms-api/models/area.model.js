const mongoose = require("mongoose");

const Area = mongoose.model(
  "Area",
  new mongoose.Schema({
    name: String,
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
  })
);

module.exports = Area;
