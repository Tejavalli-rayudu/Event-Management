const db = require("../config/db");

// REGISTER FOR EVENT
async function registerForEvent(userId, eventId) {
  console.log("SERVICE =", userId, eventId);

  // PREVENT NULL USER ID
  if (!userId) {
    throw new Error("User ID is missing. Please login again.");
  }

  // CHECK EVENT EXISTS
  const [events] = await db.query(
    "SELECT * FROM Events WHERE event_id = ?",
    [eventId]
  );

  if (events.length === 0) {
    throw new Error("Event not found");
  }

  // CHECK ALREADY REGISTERED
  const [existing] = await db.query(
    `SELECT * FROM Registrations
     WHERE user_id = ?
       AND event_id = ?
       AND status = 'Registered'`,
    [userId, eventId]
  );

  if (existing.length > 0) {
    throw new Error("Already registered for this event");
  }

  // INSERT REGISTRATION
  const [result] = await db.query(
    `INSERT INTO Registrations (user_id, event_id, status)
     VALUES (?, ?, ?)`,
    [userId, eventId, "Registered"]
  );

  return {
    registration_id: result.insertId,
    user_id: userId,
    event_id: eventId,
    status: "Registered",
  };
}

// GET ALL REGISTRATIONS
async function getAllRegistrations() {
  const [rows] = await db.query(
    `SELECT
        r.registration_id,
        r.user_id,
        u.name AS student_name,
        u.email,
        e.event_id,
        e.event_name,
        e.event_date,
        e.venue,
        r.registration_date,
        r.status
     FROM Registrations r
     JOIN Users u
       ON r.user_id = u.user_id
     JOIN Events e
       ON r.event_id = e.event_id
     ORDER BY r.registration_id DESC`
  );

  return rows;
}

// CANCEL REGISTRATION
async function cancelRegistration(id) {
  await db.query(
    `UPDATE Registrations
     SET status = 'Cancelled'
     WHERE registration_id = ?`,
    [id]
  );

  return {
    registration_id: id,
    status: "Cancelled",
  };
}

module.exports = {
  registerForEvent,
  getAllRegistrations,
  cancelRegistration,
};
