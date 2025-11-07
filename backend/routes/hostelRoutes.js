const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createHostel,
  updateHostel,
  deleteHostel,
  getHostels,
  getHostel,
} = require("../controllers/hostelController");

const router = express.Router();

// Admin-only routes
router.post("/add", protect, allowRoles("admin"), upload.single("image"), createHostel);
router.put("/update/:id", protect, allowRoles("admin"), upload.single("image"), updateHostel);
router.delete("/delete/:id", protect, allowRoles("admin"), deleteHostel);

// Routes accessible by all logged-in users
router.get("/", protect, allowRoles("admin", "student"), getHostels);
router.get("/:id", protect, allowRoles("admin", "student"), getHostel);

module.exports = router;