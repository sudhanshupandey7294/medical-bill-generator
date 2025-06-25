const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
});

module.exports = mongoose.model("Service", serviceSchema);
