// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import HostelCard from "../components/HostelCard";
import BookingForm from "../components/BookingForm";
import UserBookings from "../components/UserBookings";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, accessToken } = useAuth();
  const [hostels, setHostels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingHostel, setBookingHostel] = useState(null);

  // Fetch hostels only (UserBookings fetches bookings itself)
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        setLoading(true);
        const res = await api.get("/hostels", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setHostels(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Failed to load hostels:", err);
        setHostels([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHostels();
  }, [accessToken]);

  const filteredHostels = Array.isArray(hostels)
    ? hostels.filter(
        (h) =>
          h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const openBookingForm = (hostel) => setBookingHostel(hostel);

  const handleBookingSubmit = async (selectedDate) => {
    if (!selectedDate) return alert("Please select a date");

    try {
      await api.post(
        "/bookings/create",
        {
          hostel: bookingHostel._id,
          date: selectedDate.toISOString(),
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setBookingHostel(null);
      alert("Booking successful!");
      // UserBookings will fetch fresh bookings automatically if it implements useEffect
    } catch (err) {
      console.error("Booking failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <h1 className="dashboard-title">
            Welcome back, <span className="user-highlight">{user?.name}</span>
          </h1>
          <p className="dashboard-subtitle">
            {user?.role === "admin"
              ? "Manage hostels and view all bookings"
              : "Find your perfect hostel in Kampala"}
          </p>
        </header>

        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search hostels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Booking Modal */}
        {bookingHostel && (
          <div className="booking-modal-overlay" onClick={() => setBookingHostel(null)}>
            <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
              <BookingForm
                hostel={bookingHostel}
                onSubmit={handleBookingSubmit}
                onCancel={() => setBookingHostel(null)}
              />
            </div>
          </div>
        )}

        {/* Available Hostels */}
        <section className="section">
          <h2>Available Hostels</h2>
          {loading ? (
            <p>Loading hostels...</p>
          ) : filteredHostels.length > 0 ? (
            <div className="hostels-grid">
              {filteredHostels.map((hostel) => (
                <HostelCard
                  key={hostel._id}
                  hostel={hostel}
                  onSelect={() => openBookingForm(hostel)}
                />
              ))}
            </div>
          ) : (
            <p>No hostels found.</p>
          )}
        </section>

        {/* User Bookings */}
        <section className="section">
          <h2>My Bookings</h2>
          <UserBookings userId={user?._id} accessToken={accessToken} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;