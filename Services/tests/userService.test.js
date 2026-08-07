jest.mock("../../config/db");

const db = require("../../config/db");
const userService = require("../userService");

describe("userService", () => {
  beforeEach(() => jest.clearAllMocks());

  test("getAllUsers returns rows", async () => {
    const rows = [
      { user_id: 1, name: "Teja" },
      { user_id: 2, name: "Krish" }
    ];

    db.query.mockResolvedValueOnce([rows]);

    const result = await userService.getAllUsers();

    expect(result).toEqual(rows);
  });

  test("getUserById returns user", async () => {
    const row = {
      user_id: 3,
      name: "Teja",
      email: "teja@test.com",
      role: "Student"
    };

    db.query.mockResolvedValueOnce([[row]]);

    const result = await userService.getUserById(3);

    expect(result).toEqual(row);
  });

  test("updateUser returns updated user", async () => {
    db.query
      .mockResolvedValueOnce([{ affectedRows: 1 }])
      .mockResolvedValueOnce([[{
        user_id: 4,
        name: "Teja Updated",
        email: "teja1@test.com",
        password: "newhashedpassword",
        role: "Faculty"
      }]]);

    const result = await userService.updateUser(4, {
      name: "Teja Updated",
      email: "teja1@test.com",
      password: "newhashedpassword",
      role: "Faculty"
    });

    expect(result.user_id).toBe(4);
  });
});