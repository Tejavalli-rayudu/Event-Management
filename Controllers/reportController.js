const reportService = require("../Services/reportService");

// EVENT SUMMARY
async function getEventSummary(req, res) {
  try {
    const data = await reportService.getEventSummary();

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// STUDENTS BY EVENT
async function getStudentByEvent(req, res) {
  try {
    // use eventId because route is /event/:eventId
    const data = await reportService.getStudentsByEvent(
      req.params.eventId
    );

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// STUDENT SUMMARY
async function getStudentSummary(req, res) {
  try {
    const data = await reportService.getStudentSummary();

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error(error);

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