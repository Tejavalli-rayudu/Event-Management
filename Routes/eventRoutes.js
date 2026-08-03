const express = require("express");
const router = express.Router();

const eventController = require("../Controllers/eventController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// PUBLIC
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);

// ADMIN ONLY
router.post(
    "/",
    verifyToken,
    authorizeRoles("Admin"),
    eventController.createEvent);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("Admin"),
    eventController.updateEvent
);

router.patch(
    "/:id",
    verifyToken,
    authorizeRoles("Admin"),
    eventController.patchEvent
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("Admin"),
    eventController.deleteEvent
);

module.exports = router;