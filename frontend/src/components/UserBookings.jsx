// src/components/UserBookings.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import BookingCard from "./BookingCard";

const UserBookings = ({ userId, accessToken }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setBookings(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchBookings();
  }, [userId, accessToken]);

  if (loading) return <p>Loading bookings...</p>;
  if (!bookings.length) return <p>No bookings yet.</p>;

  return (
    <div className="bookings-grid">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
};

export default UserBookings;
