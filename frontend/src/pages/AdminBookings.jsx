import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import BookingCard from "../components/BookingCard"; // reuse card from dashboard/adminhostels
import "./AdminHostels.css"; // reuse same CSS

const AdminBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await api.get("/bookings/all"); // all bookings for admin
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="admin-page">
      <Navbar />

      <div className="admin-container">
        <header className="admin-header">
          <h1 className="admin-title">All Bookings</h1>
          <p className="admin-subtitle">
            Welcome, {user?.name}. You can view all hostel bookings here.
          </p>
        </header>

        {loading ? (
          <div className="skeleton-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton skeleton-card" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-inbox"></i>
            <p>No bookings yet.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
