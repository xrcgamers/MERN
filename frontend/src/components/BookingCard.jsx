import React from "react";
import "./BookingCard.css";
import { format } from "date-fns";

const BookingCard = ({ booking }) => {
  const hostelName = booking.hostel?.name || "Unknown Hostel";
  const hostelLocation = booking.hostel?.location || "Unknown Location";
  const bookingDate = booking.date ? format(new Date(booking.date), "MMMM dd, yyyy") : "N/A";
  const bookedOn = booking.createdAt ? format(new Date(booking.createdAt), "MMMM dd, yyyy") : "N/A";

  return (
    <div className="booking-card">
      {booking.hostel?.image && (
        <img
          src={`http://localhost:5000/uploads/${booking.hostel.image}`}
          alt={hostelName}
          className="booking-hostel-image"
        />
      )}
      <div className="booking-info">
        <h3 className="hostel-name">{hostelName}</h3>
        <p className="hostel-location">{hostelLocation}</p>
        <p className="booking-date">
          <strong>Booking Date:</strong> {bookingDate}
        </p>
        <p className="booking-created">
          <strong>Booked On:</strong> {bookedOn}
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
