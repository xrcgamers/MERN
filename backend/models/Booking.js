const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hostel: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel", required: true },
  date: { type: Date, required: true },  // <-- Add this
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);