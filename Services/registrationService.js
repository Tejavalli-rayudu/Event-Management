const db = require("../config/db");

// REGISTER FOR EVENT
async function registerForEvent(userId, eventId) {

    // Check event exists
    const [events] = await db.query(
        "SELECT * FROM Events WHERE event_id = ?",
        [eventId]
    );

    if (events.length === 0) {
        throw new Error("Event not found");
    }

    // Check already registered
    const [existing] = await db.query(
        `SELECT * FROM Registrations
         WHERE user_id = ? AND event_id = ?`,
        [userId, eventId]
    );

    if (existing.length > 0) {
        throw new Error("Already registered for this event");
    }

    

    // Insert registration
    const [result] = await db.query(
        `INSERT INTO Registrations
         (user_id, event_id)
         VALUES (?, ?)`,
        [userId, eventId]
    );

    return {
        registration_id: result.insertId,
        user_id: userId,
        event_id: eventId,
        status: "Registered"
    };
}

// GET ALL REGISTRATIONS USING JOINS
async function getAllRegistrations() {

    const [rows] = await db.query(
        `SELECT
            r.registration_id,
            u.user_id,
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
            ON r.event_id = e.event_id`
    );

    return rows;
}

// GET REGISTRATION BY ID
async function getRegistrationById(id) {

    const [rows] = await db.query(
        `SELECT
            r.registration_id,
            u.name AS student_name,
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
         WHERE r.registration_id = ?`,
        [id]
    );

    return rows[0];
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
        status: "Cancelled"
    };
}

module.exports = {
    registerForEvent,
    getAllRegistrations,
    getRegistrationById,
    cancelRegistration
};
