const db = require("../config/db");

// GET ALL USERS
async function getAllUsers() {
    const [rows] = await db.query("SELECT * FROM Users");
    return rows;
}

// GET USER BY ID
async function getUserById(id) {
    const [rows] = await db.query(
        "SELECT * FROM Users WHERE user_id = ?",
        [id]
    );

    return rows[0];
}

// CREATE USER
async function createUser(userData) {
    const { name, email, password, role } = userData;

    const [result] = await db.query(
        `INSERT INTO Users (name, email, password, role)
         VALUES (?, ?, ?, ?)`,
        [name, email, password, role]
    );

    return {
        user_id: result.insertId,
        name,
        email,
        role
    };
}

// UPDATE USER (PUT)
async function updateUser(id, userData) {
    const { name, email, password, role } = userData;

    const [result] = await db.query(
        `UPDATE Users
         SET name = ?, email = ?, password = ?, role = ?
         WHERE user_id = ?`,
        [name, email, password, role, id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return await getUserById(id);
}

// PATCH USER
async function patchUser(id, userData) {

    let fields = [];
    let values = [];

    if (userData.name) {
        fields.push("name = ?");
        values.push(userData.name);
    }

    if (userData.email) {
        fields.push("email = ?");
        values.push(userData.email);
    }

    if (userData.password) {
        fields.push("password = ?");
        values.push(userData.password);
    }

    if (userData.role) {
        fields.push("role = ?");
        values.push(userData.role);
    }

    values.push(id);

    const query = `
        UPDATE Users
        SET ${fields.join(", ")}
        WHERE user_id = ?
    `;

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
        return null;
    }

    return await getUserById(id);
}

// DELETE USER
async function deleteUser(id) {

    const user = await getUserById(id);

    if (!user) {
        return null;
    }

    await db.query(
        "DELETE FROM Users WHERE user_id = ?",
        [id]
    );

    return user;
}

// GET USERS BY ROLE (QUERY)
async function getUsersByQuery(role) {

    const [rows] = await db.query(
        "SELECT * FROM Users WHERE role = ?",
        [role]
    );

    return rows;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
    getUsersByQuery
};