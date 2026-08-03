const express = require("express");
const router = express.Router();

const registrationController =
    require("../Controllers/registrationController");

const verifyToken =
    require("../middleware/authMiddleware");

const authorizeRoles =
    require("../middleware/roleMiddleware");

// ADMIN - View all registrations
router.get("/",verifyToken,registrationController.getAllRegistrations);

// STUDENT- Register for event
router.post( "/", verifyToken, authorizeRoles("Student"), registrationController.registerForEvent);

// Get registration by id
router.get("/:id",verifyToken,registrationController.getRegistrationById);

// Cancel registration
router.delete("/:id",verifyToken,authorizeRoles("Student"),registrationController.cancelRegistration);

module.exports = router;
