// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// ---- Pages ----
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import AdminBookings from "./pages/AdminBookings";

// Student pages
import Dashboard from "./pages/Dashboard";

// Admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminHostels from "./pages/AdminHostels";

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Student routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="hostels" replace />} />
            <Route path="hostels" element={<AdminHostels />} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                <h2>404 - Page Not Found</h2>
                <p>
                  <a
                    href="/login"
                    style={{ color: "#007bff", textDecoration: "none" }}
                  >
                    ← Back to Login
                  </a>
                </p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
