const Booking = require("../models/Booking");
const Hostel = require("../models/Hostel");

// ----------------- Create Booking (Student Only) -----------------
exports.createBooking = async (req, res) => {
  const { hostel, date } = req.body;

  if (!hostel || !date) {
    return res.status(400).json({ message: "Hostel ID and date are required" });
  }

  try {
    // Check if hostel exists
    const selectedHostel = await Hostel.findById(hostel);
    if (!selectedHostel) return res.status(404).json({ message: "Hostel not found" });

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      hostel,
      date,
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// ----------------- Get Student's Bookings -----------------
// Get Student's Bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("hostel") // <-- important
      .sort({ createdAt: -1 });

    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ----------------- Get All Bookings (Admin Only) -----------------
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email role")
      .populate("hostel", "name location image");
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Get all bookings error:", err);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// ----------------- Update Booking (Admin Only) -----------------
exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // e.g., { hostel, date }

  try {
    if (updates.hostel) {
      const hostelExists = await Hostel.findById(updates.hostel);
      if (!hostelExists) return res.status(404).json({ message: "Hostel not found" });
    }

    const booking = await Booking.findByIdAndUpdate(id, updates, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (err) {
    console.error("Update booking error:", err);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// ----------------- Delete Booking (Admin Only) -----------------
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Delete booking error:", err);
    res.status(500).json({ message: "Server error, please try again" });
  }
};