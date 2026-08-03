const registrationService =
    require("../Services/registrationService");

// REGISTER FOR EVENT
async function registerForEvent(req, res) {

    try {

        const registration =
            await registrationService.registerForEvent(
                req.user.user_id,
                req.body.event_id
            );

        res.status(201).json({
            success: true,
            message: "Registered successfully",
            data: registration
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

// GET ALL REGISTRATIONS
async function getAllRegistrations(req, res) {

    try {

        const registrations =
            await registrationService.getAllRegistrations();

        res.status(200).json({
            success: true,
            data: registrations
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// GET REGISTRATION BY ID
async function getRegistrationById(req, res) {

    try {

        const registration =
            await registrationService.getRegistrationById(
                req.params.id
            );

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            });
        }

        res.status(200).json({
            success: true,
            data: registration
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// CANCEL REGISTRATION
async function cancelRegistration(req, res) {

    try {

        const registration =
            await registrationService.cancelRegistration(
                req.params.id
            );

        res.status(200).json({
            success: true,
            message: "Registration cancelled successfully",
            data: registration
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    registerForEvent,
    getAllRegistrations,
    getRegistrationById,
    cancelRegistration
};
