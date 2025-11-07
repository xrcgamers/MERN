import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link
          to={user?.role === "admin" ? "/admin/hostels" : "/student/dashboard"}
          className="logo"
        >
          <i className="fas fa-home"></i> HostelHub
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          {user ? (
            <>
              {/* Student Links */}
              {user.role === "student" && (
                <>
                  <Link to="/student/dashboard" className="nav-link">
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                  </Link>
                </>
              )}

              {/* Admin Links */}
              {user.role === "admin" && (
                <>
                  <Link to="/admin/hostels" className="nav-link">
                    <i className="fas fa-cogs"></i> Manage Hostels
                  </Link>
                  <Link to="/admin/bookings" className="nav-link">
                    <i className="fas fa-calendar-check"></i> All Bookings
                  </Link>
                </>
              )}

              {/* User Info & Logout */}
              <div className="user-menu">
                <span className="user-name">
                  <i className="fas fa-user"></i> {user.name}
                </span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
