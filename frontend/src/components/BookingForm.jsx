// src/components/BookingForm.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingForm.css"; // create this CSS file for custom styles

const BookingForm = ({ hostel, onSubmit, onCancel }) => {
  const [date, setDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) return alert("Please select a date");
    onSubmit(date);
  };

  return (
    <div className="booking-form-container">
      <h3 className="booking-form-title">Book <span className="hostel-name">{hostel.name}</span></h3>
      {hostel.image && (
        <img
          src={`/uploads/${hostel.image}`}
          alt={hostel.name}
          className="booking-form-image"
        />
      )}
      <p className="hostel-location">{hostel.location}</p>

      <form onSubmit={handleSubmit} className="booking-form-fields">
        <label htmlFor="booking-date" className="booking-label">
          Select Booking Date:
        </label>
        <DatePicker
          id="booking-date"
          selected={date}
          onChange={(d) => setDate(d)}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy"
          placeholderText="Click to select a date"
          className="booking-datepicker"
        />

        <div className="booking-buttons">
          <button type="submit" className="btn-confirm">Confirm Booking</button>
          <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
