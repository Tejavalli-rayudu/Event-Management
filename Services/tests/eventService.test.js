jest.mock("../../config/db");

const db = require("../../config/db");
const eventService = require("../eventService");

describe("eventService", () => {
  beforeEach(() => jest.clearAllMocks());

  test("getAllEvents returns all events", async () => {
    const rows = [
      { event_id: 1, event_name: "Tech Fest" },
      { event_id: 2, event_name: "Web Workshop" }
    ];

    db.query.mockResolvedValueOnce([rows]);

    const result = await eventService.getAllEvents();

    expect(result).toEqual(rows);
  });

  test("getEventById returns event", async () => {
    const rows = [
      { event_id: 1, event_name: "Tech Fest" }
    ];

    db.query.mockResolvedValueOnce([rows]);

    const result = await eventService.getEventById(1);

    expect(result).toEqual(rows[0]);
  });

  test("updateEvent returns updated event", async () => {
    db.query
      .mockResolvedValueOnce([{ affectedRows: 1 }])
      .mockResolvedValueOnce([[{
        event_id: 7,
        event_name: "Updated Tech Fest",
        description: "Updated event",
        event_date: "2026-08-25",
        venue: "Seminar Hall",
        fee: 150
      }]]);

    const result = await eventService.updateEvent(7, {
      event_name: "Updated Tech Fest",
      description: "Updated event",
      event_date: "2026-08-25",
      venue: "Seminar Hall",
      fee: 150
    });

    expect(result.event_id).toBe(7);
  });

  test("deleteEvent returns deleted event id", async () => {
    db.query
      .mockResolvedValueOnce([[{ event_id: 1 }]])
      .mockResolvedValueOnce([{ affectedRows: 1 }]);

    const result = await eventService.deleteEvent(1);

    expect(result).toEqual({
      event_id: 1
    });
  });
});