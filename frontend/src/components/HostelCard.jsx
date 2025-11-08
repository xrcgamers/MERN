// src/components/HostelCard.jsx
import React from "react";
import "./HostelCard.css";

const HostelCard = ({ hostel, onSelect }) => {
  return (
    <div className="hostel-card" onClick={onSelect}>
      {/* Display uploaded image or default */}
      <div className="hostel-image">
        <img
          src={
    hostel.image
      ? `${process.env.REACT_APP_UPLOAD_URL}/${hostel.image}`
      : "/default-hostel.jpg"
          }
          alt={hostel.name}
        />
      </div>
      <div className="hostel-info">
        <h3>{hostel.name}</h3>
        <p className="location">{hostel.location}</p>
        <p>
          <strong>Capacity:</strong> {hostel.capacity}
        </p>
        <p>
          <strong>Available:</strong> {hostel.availableRooms}
        </p>
        {hostel.description && <p className="desc">{hostel.description}</p>}
      </div>
    </div>
  );
};

export default HostelCard;
