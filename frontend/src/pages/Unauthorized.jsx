// src/pages/Unauthorized.jsx
import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

const Unauthorized = () => {
  return (
    <div className="auth-container">
        <BackButton />
      <div className="auth-card" style={{ textAlign: "center" }}>
        <i
          className="fas fa-exclamation-triangle"
          style={{ fontSize: "4rem", color: "var(--danger)", marginBottom: "1rem" }}
        ></i>
        <h1 className="auth-title">Access Denied</h1>
        <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>
          You don't have permission to view this page.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;