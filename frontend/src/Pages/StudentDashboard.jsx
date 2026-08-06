import { useEffect, useState } from "react";
import api from "../service/axios";
import { useAuth } from "../context/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [registeringId, setRegisteringId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const eventsRes = await api.get("/events");
      setEvents(eventsRes.data.data || []);

      const regRes = await api.get("/registrations");
      setRegistrations(regRes.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load data"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(eventId) {
    try {
      setRegisteringId(eventId);
      setError("");
      setSuccess("");

      await api.post("/registrations", {
        event_id: eventId,
      });

      setSuccess("Registered successfully!");

      await loadData();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setRegisteringId(null);
    }
  }

  async function handleCancel(registrationId) {
    if (!window.confirm("Cancel this registration?")) return;

    try {
      await api.delete(
        `/registrations/${registrationId}`
      );

      setSuccess("Registration cancelled!");

      await loadData();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Cancel failed"
      );
    }
  }

  // ONLY CURRENT STUDENT REGISTRATIONS
  const myRegistrations = registrations.filter(
    (r) =>
      r.student_name === user?.name ||
      r.email === user?.email
  );

  // EVENTS ALREADY REGISTERED
  const registeredEventIds = new Set(
    myRegistrations
      .filter((r) => r.status === "Registered")
      .map((r) => Number(r.event_id))
  );

  return (
    <div className="container">
      <h2>Student Dashboard</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="tabs">
        <button
          className={
            activeTab === "events"
              ? "active-tab"
              : ""
          }
          onClick={() => setActiveTab("events")}
        >
          Available Events
        </button>

        <button
          className={
            activeTab === "registrations"
              ? "active-tab"
              : ""
          }
          onClick={() =>
            setActiveTab("registrations")
          }
        >
          My Registrations
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : activeTab === "events" ? (
        <table className="dashboard-table">
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

                <td>
                  {new Date(
                    ev.event_date
                  ).toLocaleDateString()}
                </td>

                <td>{ev.venue}</td>

                <td>₹{ev.fee || 0}</td>

                <td>
                  {registeredEventIds.has(
                    Number(ev.event_id)
                  ) ? (
                    <button disabled>
                      Registered
                    </button>
                  ) : (
                    <button
                      disabled={
                        registeringId ===
                        ev.event_id
                      }
                      onClick={() =>
                        handleRegister(ev.event_id)
                      }
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
      ) : myRegistrations.length === 0 ? (
        <p>
          You have not registered for any
          events yet.
        </p>
      ) : (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Registered On</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {myRegistrations.map((r) => (
              <tr key={r.registration_id}>
                <td>{r.event_name}</td>

                <td>
                  {new Date(
                    r.registration_date
                  ).toLocaleDateString()}
                </td>

                <td>{r.status}</td>

                <td>
                  {r.status === "Registered" && (
                    <button
                      className="cancel-btn"
                      onClick={() =>
                        handleCancel(
                          r.registration_id
                        )
                      }
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}