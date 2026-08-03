const reportService =
    require("../Services/reportService");

// EVENT SUMMARY
async function getEventSummary(req, res) {

    try {

        const report =
            await reportService.getEventSummary();

        res.status(200).json({
            success: true,
            message: "Event summary fetched successfully",
            data: report
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// STUDENTS BY EVENT
async function getStudentByEvent(req, res) {

    try {

        const students =
            await reportService.getStudentByEvent(
                req.params.eventId
            );

        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            data: students
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// STUDENT SUMMARY
async function getStudentSummary(req, res) {

    try {

        const students =
            await reportService.getStudentSummary();

        res.status(200).json({
            success: true,
            message: "Student summary fetched successfully",
            data: students
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


module.exports = {
    getEventSummary,
    getStudentByEvent,
    getStudentSummary
};