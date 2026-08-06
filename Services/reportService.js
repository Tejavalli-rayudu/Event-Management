const db = require("../config/db");

// EVENT SUMMARY
async function getEventSummary() {
  const [rows] = await db.query(`
    SELECT
      e.event_id,
      e.event_name,
      e.event_date,
      e.venue,
      COUNT(r.registration_id) AS total_registrations
    FROM Events e
    LEFT JOIN Registrations r
      ON e.event_id = r.event_id
      AND r.status = 'Registered'
    GROUP BY e.event_id
    ORDER BY e.event_date DESC
  `);

  return rows;
}

// STUDENTS BY EVENT
async function getStudentsByEvent(eventId) {
  const [rows] = await db.query(`
    SELECT
      u.user_id,
      u.name,
      u.email,
      r.registration_id,
      r.registration_date,
      r.status
    FROM Registrations r
    INNER JOIN Users u
      ON r.user_id = u.user_id
    WHERE r.event_id = ?
      AND r.status = 'Registered'
    ORDER BY r.registration_id DESC
  `, [eventId]);

  return rows;
}

// STUDENT SUMMARY
// STUDENT SUMMARY
async function getStudentSummary() {

  const [rows] = await db.query(`
    SELECT
      u.user_id,
      u.name,
      u.email,
      COUNT(r.registration_id) AS total_events_registered
    FROM Users u
    LEFT JOIN Registrations r
      ON u.user_id = r.user_id
      AND r.status = 'Registered'
    WHERE u.role = 'Student'
    GROUP BY u.user_id, u.name, u.email
    ORDER BY total_events_registered DESC
  `);

  return rows;
}
module.exports = {
  getEventSummary,
  getStudentsByEvent,
  getStudentSummary,
};