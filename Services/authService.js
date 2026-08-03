const db = require("../config/db");
const bcrypt = require("bcryptjs");

async function register(userData) {

    const { name, email, password, role } = userData;

    // Check if email already exists
    const [existing] = await db.query(
        "SELECT * FROM Users WHERE email = ?",
        [email]
    );

    if (existing.length > 0) {
        throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);//salt rounds,If no increases it is difficult to guess

    // Insert user
    const [result] = await db.query(
        `INSERT INTO Users (name, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [name, email, hashedPassword, role]
    );

    return {
        user_id: result.insertId,
        name,
        email,
        role
    };
}

const jwt = require("jsonwebtoken");

// Login
async function login(userData) {

    const { email, password } = userData;

    const [rows] = await db.query(
        "SELECT * FROM Users WHERE email = ?",
        [email]
    );

    if (rows.length === 0) {
        throw new Error("Invalid Email");
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid Password");
    }

    const token = jwt.sign(
        {
            user_id: user.user_id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return {
        token,
        user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
}

module.exports = {
    register,
    login
};

