import React, { useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    event_name: "",
    description: "",
    event_date: "",
    venue: "",
    fee: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      setEvents(
        events.map((ev) =>
          ev.event_id === editingId
            ? { ...ev, ...formData }
            : ev
        )
      );

      setEditingId(null);
    } else {
      // CREATE
      const newEvent = {
        event_id: Date.now(),
        ...formData
      };

      setEvents([...events, newEvent]);
    }

    resetForm();
  }

  function handleEdit(event) {
    setEditingId(event.event_id);
    setFormData(event);
  }

  function handleDelete(id) {
    if (window.confirm("Delete this event?")) {
      setEvents(events.filter((ev) => ev.event_id !== id));
    }
  }

  function resetForm() {
    setFormData({
      event_name: "",
      description: "",
      event_date: "",
      venue: "",
      fee: ""
    });

    setEditingId(null);
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
            <button type="submit">
              {editingId ? "Update Event" : "Create Event"}
            </button>

            {editingId && (
              <button type="button" onClick={resetForm}>
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
                <td>{event.event_date}</td>
                <td>{event.venue}</td>
                <td>₹{event.fee}</td>
                <td>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.event_id)}>Delete</button>
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