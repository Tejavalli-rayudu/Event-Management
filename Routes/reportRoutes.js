const express = require("express");
const router = express.Router();

const reportController =
    require("../Controllers/reportController");

const verifyToken =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/roleMiddleware");

// EVENT SUMMARY
router.get(
    "/summary",
    verifyToken,
    authorizeRoles("Faculty", "Admin"),
    reportController.getEventSummary
);

// STUDENTS REGISTERED FOR AN EVENT
router.get(
    "/event/:eventId",
    verifyToken,
    authorizeRoles("Faculty", "Admin"),
    reportController.getStudentByEvent
);

// STUDENT SUMMARY
router.get(
    "/students",
    verifyToken,
    authorizeRoles("Faculty", "Admin"),
    reportController.getStudentSummary
);


module.exports = router;
