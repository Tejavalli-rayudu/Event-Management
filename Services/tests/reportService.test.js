jest.mock("../../config/db");

const db = require("../../config/db");
const reportService = require("../reportService");

describe("reportService", () => {
  beforeEach(() => jest.clearAllMocks());

  test("getEventSummary returns rows", async () => {
    const rows = [
      { event_id: 1, event_name: "Web Workshop", total_registrations: 3 }
    ];

    db.query.mockResolvedValueOnce([rows]);

    const result = await reportService.getEventSummary();

    expect(result).toEqual(rows);
  });

  test("getStudentByEvent returns rows", async () => {
    const rows = [
      { user_id: 2, name: "Teja", email: "teja@test.com" }
    ];

    db.query.mockResolvedValueOnce([rows]);

    const result = await reportService.getStudentByEvent(1);

    expect(result).toEqual(rows);
  });

  test("getStudentSummary returns rows", async () => {
    const rows = [
      { user_id: 2, name: "Teja", email: "teja@test.com" }
    ];

    db.query.mockResolvedValueOnce([rows]);

    const result = await reportService.getStudentSummary();

    expect(result).toEqual(rows);
  });
});