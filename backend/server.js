const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// Routes
const authRoutes = require("./routes/authRoutes");
const hostelRoutes = require("./routes/hostelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// DB connection
const connectDB = require("./config/database");
connectDB();

const app = express();

// ---------------------
// Middleware
// ---------------------
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------------
// Routes
// ---------------------
app.use("/api/auth", authRoutes);
app.use("/api/hostels", hostelRoutes);
app.use("/api/bookings", bookingRoutes);

// ---------------------
// Test Route
// ---------------------
app.get("/", (req, res) => {
  res.send("Hostel Booking Backend Running");
});

// ---------------------
// Start server
// ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));