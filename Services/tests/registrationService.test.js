jest.mock("../../config/db");

const db = require("../../config/db");
const registrationService = require("../registrationService");

describe("registrationService.registerForEvent", () => {
  beforeEach(() => jest.clearAllMocks());

  test("throws error when event not found", async () => {
    db.query.mockResolvedValueOnce([[]]);

    await expect(
      registrationService.registerForEvent(1, 999)
    ).rejects.toThrow("Event not found");
  });

  test("registers successfully", async () => {
    db.query
      .mockResolvedValueOnce([[{ event_id: 1 }]])
      .mockResolvedValueOnce([[]])
      .mockResolvedValueOnce([{ insertId: 88 }]);

    const result = await registrationService.registerForEvent(2, 1);

    expect(result).toEqual({
      registration_id: 88,
      user_id: 2,
      event_id: 1,
      status: "Registered"
    });
  });

  test("cancelRegistration returns cancelled status", async () => {
    db.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const result = await registrationService.cancelRegistration(1);

    expect(result).toEqual({
      registration_id: 1,
      status: "Cancelled"
    });
  });
});