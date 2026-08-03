
const eventService = require("../Services/eventService");

// GET ALL
async function getAllEvents(req, res) {

    try {

        const events = await eventService.getAllEvents();

        res.status(200).json({
            success: true,
            data: events
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// GET BY ID
async function getEventById(req, res) {

    try {

        const event = await eventService.getEventById(
            req.params.id
        );

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.status(200).json({
            success: true,
            data: event
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// POST
async function createEvent(req, res) {

    try {

        const event = await eventService.createEvent(
            req.body,
            req.user.user_id
        );

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: event
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// PUT
async function updateEvent(req, res) {

    try {

        const event = await eventService.updateEvent(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: event
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// PATCH
async function patchEvent(req, res) {

    try {

        const event = await eventService.patchEvent(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Event patched successfully",
            data: event
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// DELETE
async function deleteEvent(req, res) {

    try {

        const event = await eventService.deleteEvent(
            req.params.id
        );

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    patchEvent,
    deleteEvent
};
