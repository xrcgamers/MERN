// src/pages/AdminHostels.jsx
import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import "./AdminHostels.css";

const AdminHostels = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    description: "",
    imageFile: null,
  });

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    try {
      setLoading(true);
      const res = await api.get("/hostels");
      // Extract data array safely
      setHostels(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      alert("Failed to load hostels");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", location: "", capacity: "", description: "", imageFile: null });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("location", formData.location);
      data.append("capacity", formData.capacity);
      data.append("availableRooms", formData.capacity);
      data.append("description", formData.description);
      if (formData.imageFile) data.append("image", formData.imageFile);

      if (editingId) {
        await api.put(`/hostels/update/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/hostels/add", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      fetchHostels();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (hostel) => {
    setFormData({
      name: hostel.name || "",
      location: hostel.location || "",
      capacity: hostel.capacity || "",
      description: hostel.description || "",
      imageFile: null,
    });
    setEditingId(hostel._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hostel?")) return;
    try {
      await api.delete(`/hostels/delete/${id}`);
      fetchHostels();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="admin-dashboard">
      <Navbar />

      <div className="admin-container">
        <header className="admin-header">
          <h1>Hostel Management</h1>
          <button onClick={() => setShowForm(true)} className="btn-add">
            Add New Hostel
          </button>
        </header>

        {/* Modal Form */}
        {showForm && (
          <div className="modal-overlay" onClick={resetForm}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{editingId ? "Edit Hostel" : "Add New Hostel"}</h2>


              <form onSubmit={handleSubmit} className="hostel-form">
                <input
                  placeholder="Hostel Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  placeholder="Location (e.g. Wandegeya)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Total Capacity"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Description (optional)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
                />
                <div className="form-actions">
                  <button type="submit" className="btn-save">
                    {editingId ? "Update" : "Create"}
                  </button>
                  <button type="button" onClick={resetForm} className="btn-cancel">
                    Cancel
                  </button>
                </div>
              </form>

              
            </div>
          </div>
        )}

        {/* Hostels Grid */}
        <div className="hostels-grid">
          {loading && [...Array(4)].map((_, i) => <div key={i} className="skeleton-card" />)}

          {!loading && (!Array.isArray(hostels) || hostels.length === 0) && (
            <p className="empty">No hostels yet. Add one!</p>
           )}

          {!loading && Array.isArray(hostels) && hostels.length > 0 && (
            hostels.map((hostel) => (
                <div key={hostel._id} className="hostel-card">
                  
                <div className="card-header">
                  <h3>{hostel.name || "Unknown Hostel"}</h3>
                  <span className="location">Location: {hostel.location || "Unknown"}</span>
                </div>
                <div className="card-body">
                  {hostel.image && (
                    <img
                      src={`${process.env.REACT_APP_UPLOAD_URL}/${hostel.image}`}
                      alt={hostel.name}
                      className="hostel-image"
                    />
                  )}
                  <p>
                    <strong>Capacity:</strong> {hostel.capacity || "N/A"}
                  </p>
                  <p>
                    <strong>Available:</strong> {hostel.availableRooms || "N/A"}
                  </p>
                  {hostel.description && <p className="desc">{hostel.description}</p>}
                </div>
                <div className="card-actions">
                  <button onClick={() => handleEdit(hostel)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(hostel._id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHostels;
