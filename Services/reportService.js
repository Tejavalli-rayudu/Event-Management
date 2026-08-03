const db = require("../config/db");

// EVENT SUMMARY REPORT
async function getEventSummary() {

    const [rows] = await db.query(
        `SELECT
            e.event_id,
            e.event_name,
            e.event_date,
            e.venue,
            COUNT(r.registration_id) AS total_registrations
         FROM Events e
         LEFT JOIN Registrations r
            ON e.event_id = r.event_id
            AND r.status = 'Registered'
         GROUP BY
            e.event_id,
            e.event_name,
            e.event_date,
            e.venue
         ORDER BY e.event_date`
    );

    return rows;
}

// STUDENTS REGISTERED FOR A PARTICULAR EVENT
async function getStudentByEvent(eventId) {

    const [rows] = await db.query(
        `SELECT
            u.user_id,
            u.name,
            u.email,
            r.registration_date,
            r.status
         FROM Registrations r
         JOIN Users u
            ON r.user_id = u.user_id
         WHERE r.event_id = ?
         AND r.status = 'Registered'`,
        [eventId]
    );

    return rows;
}

// STUDENT SUMMARY REPORT
async function getStudentSummary() {

    const [rows] = await db.query(
        `SELECT
            u.user_id,
            u.name,
            u.email,
            COUNT(r.registration_id) AS total_events_registered
         FROM Users u
         LEFT JOIN Registrations r
            ON u.user_id = r.user_id
            AND r.status = 'Registered'
         WHERE u.role = 'Student'
         GROUP BY
            u.user_id,
            u.name,
            u.email
         ORDER BY total_events_registered DESC`
    );

    return rows;
}



module.exports = {
    getEventSummary,
    getStudentByEvent,
    getStudentSummary,
   
};
