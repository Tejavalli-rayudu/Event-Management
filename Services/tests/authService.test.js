jest.mock("../../config/db");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authService = require("../authService");

describe("authService.register", () => {
  beforeEach(() => jest.clearAllMocks());

  test("throws error if email already exists", async () => {
    db.query.mockResolvedValueOnce([[{ user_id: 2 }]]);

    await expect(
      authService.register({
        name: "Teja",
        email: "teja@test.com",
        password: "123456",
        role: "Student"
      })
    ).rejects.toThrow("Email already exists");
  });

  test("hashes password and inserts user", async () => {
    db.query
      .mockResolvedValueOnce([[]])
      .mockResolvedValueOnce([{ insertId: 21 }]);

    bcrypt.hash.mockResolvedValueOnce("hashed_password");

    const result = await authService.register({
      name: "Teja",
      email: "teja@test.com",
      password: "123456",
      role: "Student"
    });

    expect(result).toEqual({
      user_id: 21,
      name: "Teja",
      email: "teja@test.com",
      role: "Student"
    });
  });
});

describe("authService.login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test_secret";
  });

  test("returns token for valid login", async () => {
    db.query.mockResolvedValueOnce([[{
      user_id: 2,
      name: "Teja",
      email: "teja@test.com",
      password: "hashed_password",
      role: "Student"
    }]]);

    bcrypt.compare.mockResolvedValueOnce(true);
    jwt.sign.mockReturnValueOnce("jwt.token");

    const result = await authService.login({
      email: "teja@test.com",
      password: "123456"
    });

    expect(result.token).toBe("jwt.token");
  });
});