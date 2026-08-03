const db = require("../config/db");

// CREATE EVENT
async function createEvent(eventData, createdBy) {

    const {
        event_name,
        description,
        event_date,
        venue,
        fee
    } = eventData;

    const [result] = await db.query(
        `INSERT INTO Events
        (event_name, description, event_date, venue, fee, created_by)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            event_name,
            description,
            event_date,
            venue,
            fee,
            createdBy
        ]
    );

    return {
        event_id: result.insertId,
        event_name,
        description,
        event_date,
        venue,
        fee,
        created_by: createdBy
    };
}

// GET ALL EVENTS
async function getAllEvents() {

    const [rows] = await db.query(
        "SELECT * FROM Events"
    );

    return rows;
}

// GET EVENT BY ID
async function getEventById(id) {

    const [rows] = await db.query(
        "SELECT * FROM Events WHERE event_id = ?",
        [id]
    );

    return rows[0];
}

// UPDATE EVENT (PUT)
async function updateEvent(id, eventData) {

    const {
        event_name,
        description,
        event_date,
        venue,
        fee
    } = eventData;

    await db.query(
        `UPDATE Events
         SET event_name = ?,
             description = ?,
             event_date = ?,
             venue = ?,
             fee = ?
         WHERE event_id = ?`,
        [
            event_name,
            description,
            event_date,
            venue,
            fee,
            id
        ]
    );

    return getEventById(id);
}

// PATCH EVENT
async function patchEvent(id, eventData) {

    const fields = [];
    const values = [];

    for (const key in eventData) {
        fields.push(`${key} = ?`);
        values.push(eventData[key]);
    }

    values.push(id);

    await db.query(
        `UPDATE Events
         SET ${fields.join(", ")}
         WHERE event_id = ?`,
        values
    );

    return getEventById(id);
}

// DELETE EVENT
async function deleteEvent(id) {

    const event = await getEventById(id);

    if (!event) {
        return null;
    }

    await db.query(
        "DELETE FROM Events WHERE event_id = ?",
        [id]
    );

    return event;
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    patchEvent,
    deleteEvent
};
