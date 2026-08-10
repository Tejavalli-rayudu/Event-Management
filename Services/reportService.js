const db = require("../config/db");

// EVENT SUMMARY
// EVENT SUMMARY
async function getEventSummary() {
  const [rows] = await db.query(`
    SELECT
      e.event_id,
      e.event_name,
      e.event_date,
      e.venue,
      COUNT(DISTINCT r.registration_id) AS total_registrations
    FROM Events e
    LEFT JOIN Registrations r
      ON e.event_id = r.event_id
      AND r.status = 'Registered'
    GROUP BY
      e.event_id,
      e.event_name,
      e.event_date,
      e.venue
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
      r.registration_date
    FROM Registrations r
    JOIN Users u
      ON r.user_id = u.user_id
    WHERE r.event_id = ?
      AND r.status = 'Registered'
  `, [eventId]);

  return rows;
}

// STUDENT SUMMARY
async function getStudentSummary() {
  const [rows] = await db.query(`
    SELECT
      u.user_id,
      u.name,
      u.email,
      e.event_name,
      e.event_date,
      r.registration_date
    FROM Registrations r
    JOIN Users u
      ON r.user_id = u.user_id
    JOIN Events e
      ON r.event_id = e.event_id
    WHERE r.status = 'Registered'
  `);

  return rows;
}

module.exports = {
  getEventSummary,
  getStudentsByEvent,
  getStudentSummary
};