// --- FILE: routes/bills.js ---
const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");

// Create new bill
router.post("/", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    const saved = await newBill.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find().populate("patientId");
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific bill
router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate("patientId");
    res.json(bill);
  } catch (err) {
    res.status(404).json({ error: "Bill not found" });
  }
});

// DELETE bill by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Bill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Bill not found" });
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
