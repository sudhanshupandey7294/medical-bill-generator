const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  taxRate: { type: Number, required: true, default: 5 },
  defaultDiscount: { type: Number, required: true, default: 0 },
  logoUrl: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Setting", settingSchema);
