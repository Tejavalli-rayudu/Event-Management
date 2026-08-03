import React, { useState } from "react";
import api from "../Services/api";

const AdminDashboard = () => {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    location: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    });
  }

  function resetForm() {
    setEvent({
      title: "",
      date: "",
      location: ""
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/events", event);

      console.log(response.data);

      setSuccess("Event created successfully");
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Failed to create event");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Create Event</h2>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={event.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
        />

        <br /><br />

        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="location"
          value={event.location}
          onChange={handleChange}
          placeholder="Event Location"
          required
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;