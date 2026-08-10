import React, { useEffect, useState } from "react";
import api from "../service/axios";

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState("summary");

  const [eventSummary, setEventSummary] = useState([]);
  const [studentSummary, setStudentSummary] = useState([]);
  const [eventStudents, setEventStudents] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      setLoading(true);
      setError("");

      // EVENT SUMMARY
      const eventRes = await api.get("/reports/summary");
      setEventSummary(eventRes.data.data || []);

      // STUDENT SUMMARY
      const studentRes = await api.get("/reports/students");
      setStudentSummary(studentRes.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load reports");
    } finally {
      setLoading(false);
    }
  }

  async function viewStudents(eventId) {
    try {
      console.log("Clicked Event ID:", eventId);

      const res = await api.get(`/reports/event/${eventId}`);

      console.log("Students API Response:", res.data);

      setEventStudents(res.data.data || []);
      setActiveTab("students");
    } catch (err) {
      console.error(err);
      setError("Failed to load students");
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Faculty Dashboard</h2>

        {error && <div className="error-box">{error}</div>}

        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "summary" ? "active" : ""}`}
            onClick={() => setActiveTab("summary")}
          >
            Event Summary
          </button>

          <button
            className={`tab-btn ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            Students in Events
          </button>

          <button
            className={`tab-btn ${activeTab === "studentSummary" ? "active" : ""}`}
            onClick={() => setActiveTab("studentSummary")}
          >
            Student Summary
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* EVENT SUMMARY */}
            {activeTab === "summary" && (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>Total Registrations</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {eventSummary.map((event) => (
                    <tr key={event.event_id}>
                      <td>{event.event_name}</td>
                      <td>
                        {event.event_date?.split("T")[0] ||
                          event.event_date}
                      </td>
                      <td>{event.venue}</td>
                      <td>{event.total_registrations}</td>
                      <td>
                        <button
                          className="btn btn-small"
                          onClick={() => viewStudents(event.event_id)}
                        >
                          View Students
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* STUDENTS IN EVENTS */}
            {activeTab === "students" && (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                  </tr>
                </thead>

                <tbody>
                  {eventStudents.length === 0 ? (
                    <tr>
                      <td colSpan="3">
                        No students registered for this event
                      </td>
                    </tr>
                  ) : (
                    eventStudents.map((student) => (
                      <tr key={student.user_id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>
                          {student.registration_date?.split("T")[0] ||
                            student.registration_date}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* STUDENT SUMMARY */}
            {activeTab === "studentSummary" && (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Total Events Registered</th>
                  </tr>
                </thead>

                <tbody>
                  {studentSummary.map((row) => (
                    <tr key={row.user_id}>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.total_events_registered}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;