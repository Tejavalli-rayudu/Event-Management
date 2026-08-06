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
  authorizeRoles("Faculty"),
  reportController.getEventSummary
);

// STUDENTS BY EVENT
router.get(
  "/event/:eventId",
  verifyToken,
  authorizeRoles("Faculty"),
  reportController.getStudentByEvent
);

// STUDENT SUMMARY
router.get(
  "/students",
  verifyToken,
  authorizeRoles("Faculty"),
  reportController.getStudentSummary
);

module.exports = router;