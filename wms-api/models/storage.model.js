const mongoose = require("mongoose");

const Storage = mongoose.model(
  "Storage",
  new mongoose.Schema({
    name: String,
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
    },
  })
);

module.exports = Storage;
