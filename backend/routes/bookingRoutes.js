const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const router = express.Router();

// Student routes
router.post("/create", protect, allowRoles("student"), createBooking);
router.get("/my-bookings", protect, allowRoles("student"), getMyBookings);

// Admin routes
router.get("/all", protect, allowRoles("admin"), getAllBookings);
router.put("/update/:id", protect, allowRoles("admin"), updateBooking);
router.delete("/delete/:id", protect, allowRoles("admin"), deleteBooking);

module.exports = router;
