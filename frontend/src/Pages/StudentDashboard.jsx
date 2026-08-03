import React from "react";

const StudentDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Dashboard</h1>

      <p>Welcome Student 👨‍🎓</p>

      <h3>Available Events</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Tech Fest</td>
            <td>2026-08-15</td>
            <td>Auditorium</td>
            <td>
              <button>Register</button>
            </td>
          </tr>

          <tr>
            <td>Coding Contest</td>
            <td>2026-08-20</td>
            <td>Lab Block</td>
            <td>
              <button>Register</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;