const express = require("express");
const router = express.Router();
const { loginUser, registerUser, refreshToken, logoutUser, loginAdmin } = require("../controllers/authController");

// === USER AUTH ROUTES ===
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);

// === ADMIN AUTH ROUTE ===
router.post("/admin-login", loginAdmin);

module.exports = router;
