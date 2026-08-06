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

      
      const eventRes = await api.get("/reports/summary");
      setEventSummary(eventRes.data.data);

  
      const studentRes = await api.get("/reports/students");
      setStudentSummary(studentRes.data.data);

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
    <div>
      <h2>Faculty Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={() => setActiveTab("summary")}>
        Event Summary
      </button>

      <button onClick={() => setActiveTab("students")}>
        Students in Events
      </button>

      <button onClick={() => setActiveTab("studentSummary")}>
        Student Summary
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* EVENT SUMMARY */}
          {activeTab === "summary" && (
            <table border="1" cellPadding="8">
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
  <div>
    <h3>Students Registered in Events</h3>

    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Email</th>
          <th>Registration Date</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {eventStudents.length === 0 ? (
          <tr>
            <td colSpan="4">
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
              <td>{student.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
)}

          {/* STUDENT SUMMARY */}
          {activeTab === "studentSummary" && (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Total Events Registered</th>
                </tr>
              </thead>

              <tbody>
                {studentSummary.map((student) => (
                  <tr key={student.user_id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.total_events_registered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default FacultyDashboard;