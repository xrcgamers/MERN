import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import HostelCard from "../components/HostelCard";

const Bookings = ({ accessToken }) => {
  const [hostels, setHostels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        setLoading(true);
        const res = await api.get("/hostels", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        // Make sure we assign the data array
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

  // Safe filtering
  const filteredHostels = Array.isArray(hostels)
    ? hostels.filter(
        (h) =>
          h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div>
      <input
        type="text"
        placeholder="Search hostels..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading hostels...</p>
      ) : filteredHostels.length > 0 ? (
        <div className="hostels-grid">
          {filteredHostels.map((hostel) => (
            <HostelCard key={hostel._id} hostel={hostel} />
          ))}
        </div>
      ) : (
        <p>No hostels found.</p>
      )}
    </div>
  );
};

export default Bookings;