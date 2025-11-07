const Hostel = require("../models/Hostel");
const fs = require("fs");
const path = require("path");

// ----------------- Create Hostel (Admin Only) -----------------
exports.createHostel = async (req, res) => {
  try {
    const { name, location, capacity, availableRooms, description } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validate required fields
    if (!name || !location || !capacity || !availableRooms) {
      return res.status(400).json({ success: false, message: "Required fields are missing" });
    }

    // Ensure capacity and availableRooms are numbers
    const capacityNum = Number(capacity);
    const availableNum = Number(availableRooms);

    const hostel = await Hostel.create({
      name,
      location,
      capacity: capacityNum,
      availableRooms: availableNum,
      description: description || "",
      image,
    });

    res.status(201).json({ success: true, message: "Hostel created successfully", data: hostel });
  } catch (err) {
    console.error("Create hostel error:", err.message);
    res.status(500).json({ success: false, message: "Server error, please try again" });
  }
};

// ----------------- Get All Hostels -----------------
exports.getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: hostels });
  } catch (err) {
    console.error("Get hostels error:", err);
    res.status(500).json({ success: false, message: "Server error, please try again" });
  }
};

// ----------------- Get Single Hostel -----------------
exports.getHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({ success: false, message: "Hostel not found" });

    res.status(200).json({ success: true, data: hostel });
  } catch (err) {
    console.error("Get hostel error:", err);
    res.status(500).json({ success: false, message: "Server error, please try again" });
  }
};

// ----------------- Update Hostel (Admin Only) -----------------
exports.updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({ success: false, message: "Hostel not found" });

    const { name, location, capacity, availableRooms, description } = req.body;

    // Handle new image upload
    if (req.file) {
      if (hostel.image) {
        const oldPath = path.join(__dirname, "../uploads", hostel.image);
        try {
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        } catch (err) {
          console.warn("Failed to delete old image:", err.message);
        }
      }
      hostel.image = req.file.filename;
    }

    // Update fields if provided
    hostel.name = name || hostel.name;
    hostel.location = location || hostel.location;
    hostel.capacity = capacity ? Number(capacity) : hostel.capacity;
    hostel.availableRooms = availableRooms ? Number(availableRooms) : hostel.availableRooms;
    hostel.description = description || hostel.description;

    await hostel.save();
    res.status(200).json({ success: true, message: "Hostel updated successfully", data: hostel });
  } catch (err) {
    console.error("Update hostel error:", err);
    res.status(500).json({ success: false, message: "Server error, please try again" });
  }
};

// ----------------- Delete Hostel (Admin Only) -----------------
exports.deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) return res.status(404).json({ success: false, message: "Hostel not found" });

    // Remove image file if exists
    if (hostel.image) {
      const imgPath = path.join(__dirname, "../uploads", hostel.image);
      try {
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      } catch (err) {
        console.warn("Failed to delete hostel image:", err.message);
      }
    }

    await hostel.deleteOne();
    res.status(200).json({ success: true, message: "Hostel deleted successfully" });
  } catch (err) {
    console.error("Delete hostel error:", err);
    res.status(500).json({ success: false, message: "Server error, please try again" });
  }
};
