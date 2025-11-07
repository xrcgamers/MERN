const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  availableRooms: { type: Number, required: true },
  description: { type: String },
  image: { type: String }, // <-- Add this for image filename or URL
}, { timestamps: true });

module.exports = mongoose.model("Hostel", hostelSchema);
