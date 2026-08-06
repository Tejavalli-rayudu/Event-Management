import React, { useEffect, useState } from "react";
import api from "../service/axios";


const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    event_name: "",
    description: "",
    event_date: "",
    venue: "",
    fee: ""
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const response = await api.get("/events");
      setEvents(response.data.data || response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingId) {
        await api.put(`/events/${editingId}`, formData);
      } else {
        await api.post("/events", formData);
      }

      await fetchEvents();

      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(event) {
    setEditingId(event.event_id);

    setFormData({
      event_name: event.event_name,
      description: event.description,
      event_date: event.event_date?.split("T")[0] || event.event_date,
      venue: event.venue,
      fee: event.fee
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  }

  function resetForm() {
    setEditingId(null);

    setFormData({
      event_name: "",
      description: "",
      event_date: "",
      venue: "",
      fee: ""
    });
  }

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>{editingId ? "Edit Event" : "Create Event"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="event_name"
            placeholder="Enter event name"
            value={formData.event_name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Enter short description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="venue"
            placeholder="Enter venue"
            value={formData.venue}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="fee"
            placeholder="Enter fee"
            value={formData.fee}
            onChange={handleChange}
          />

          <div className="btn-group">
            <button type="submit" disabled={submitting}>
              {submitting
                ? editingId
                  ? "Updating..."
                  : "Submitting..."
                : editingId
                ? "Update Event"
                : "Create Event"}
            </button>

            {editingId && (
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <h3>All Events</h3>

        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event.event_id}>
                <td>{event.event_name}</td>
                <td>{event.event_date?.split("T")[0] || event.event_date}</td>
                <td>{event.venue}</td>
                <td>₹{event.fee}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(event)}>
                    Edit
                  </button>

                  <button className="delete-btn" onClick={() => handleDelete(event.event_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;