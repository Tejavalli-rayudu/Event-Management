import React, { useEffect, useState } from "react";
import api from "../Services/api";
//import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);

  // keep registrations after refresh
  const [myRegistrations, setMyRegistrations] = useState(() => {
    const saved = localStorage.getItem("myRegistrations");
    return saved ? JSON.parse(saved) : [];
  });

  // keep registered badge after refresh
  const [registeredEventTitles, setRegisteredEventTitles] = useState(() => {
    const saved = localStorage.getItem("registeredEventTitles");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [registeringId, setRegisteringId] = useState(null);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("events");

  // load admin events
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

  // save registrations in localStorage
  useEffect(() => {
    localStorage.setItem(
      "myRegistrations",
      JSON.stringify(myRegistrations)
    );

    localStorage.setItem(
      "registeredEventTitles",
      JSON.stringify([...registeredEventTitles])
    );
  }, [myRegistrations, registeredEventTitles]);

  // REGISTER
  async function handleRegister(event) {
    try {
      setRegisteringId(event.event_id);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setRegisteredEventTitles((prev) => {
        const updated = new Set(prev);
        updated.add(event.event_name);
        return updated;
      });

      setMyRegistrations((prev) => [
        ...prev,
        {
          ...event,
          registered_on: new Date().toLocaleDateString()
        }
      ]);

      setMessage("Registration successful!");
    } catch (error) {
      setMessage("Registration failed.");
    } finally {
      setRegisteringId(null);
    }
  }

  // CANCEL
  function handleCancel(id) {
    if (!window.confirm("Cancel this registration?")) return;

    const cancelledEvent = myRegistrations.find(
      (r) => r.event_id === id
    );

    setMyRegistrations((prev) =>
      prev.filter((r) => r.event_id !== id)
    );

    setRegisteredEventTitles((prev) => {
      const updated = new Set(prev);

      if (cancelledEvent) {
        updated.delete(cancelledEvent.event_name);
      }

      return updated;
    });

    setMessage("Registration cancelled successfully!");
  }

  return (
    <div className="student-container">
      <h2>Student Dashboard</h2>

      {message && <p className="success-msg">{message}</p>}

      <div className="tabs">
        <button
          className={activeTab === "events" ? "active" : ""}
          onClick={() => setActiveTab("events")}
        >
          Available Events
        </button>

        <button
          className={activeTab === "registrations" ? "active" : ""}
          onClick={() => setActiveTab("registrations")}
        >
          My Registrations
        </button>
      </div>

      {/* AVAILABLE EVENTS */}
      {activeTab === "events" && (
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Fee</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {events.map((ev) => (
              <tr key={ev.event_id}>
                <td>{ev.event_name}</td>
                <td>{ev.event_date?.split("T")[0] || ev.event_date}</td>
                <td>{ev.venue}</td>
                <td>₹{ev.fee}</td>
                <td>
                  {registeredEventTitles.has(ev.event_name) ? (
                    <span className="badge">Registered</span>
                  ) : (
                    <button
                      className="btn btn-small"
                      disabled={registeringId === ev.event_id}
                      onClick={() => handleRegister(ev)}
                    >
                      {registeringId === ev.event_id
                        ? "Registering..."
                        : "Register"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MY REGISTRATIONS */}
      {activeTab === "registrations" && (
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Registered On</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {myRegistrations.length === 0 ? (
              <tr>
                <td colSpan="3">No registrations yet</td>
              </tr>
            ) : (
              myRegistrations.map((ev) => (
                <tr key={ev.event_id}>
                  <td>{ev.event_name}</td>
                  <td>{ev.registered_on}</td>
                  <td>
                    <button
                      className="btn btn-small btn-danger"
                      onClick={() => handleCancel(ev.event_id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentDashboard;
