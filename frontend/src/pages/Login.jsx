import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await login(email, password);

      // Get user data from localStorage with error handling
      let user = null;
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          user = JSON.parse(userData);
        }
      } catch (parseError) {
        console.error("Error parsing user data:", parseError);
        setError("Error loading user data. Please try again.");
        setLoading(false);
        return;
      }

      // Role-based navigation with better error handling
      if (user?.role === "student") {
        navigate("/student/dashboard", { replace: true });
      } else if (user?.role === "admin") {
        navigate("/admin/hostels", { replace: true });
      } else {
        setError("Access denied. Invalid role or user data.");
        // Optional: Clear invalid user data
        localStorage.removeItem("user");
      }
    } catch (err) {
      // Enhanced error handling
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAdminClick = () => {
    navigate("/admin-login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="auth-container">
      {/* Admin Icon – Top Right */}
      <div
        className="admin-icon"
        onClick={handleAdminClick}
        title="Admin Panel"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleAdminClick()}
      >
        <i className="fas fa-user-shield"></i>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to book your hostel</p>
        </div>

        <form onSubmit={handleSubmit} className="form" noValidate>
          {error && (
            <div className="error-alert" role="alert">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Login
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <span 
              className="link" 
              onClick={handleRegisterClick}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleRegisterClick()}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;