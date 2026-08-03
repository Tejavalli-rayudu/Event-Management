const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
//user
const userRoutes = require("./Routes/userRoutes");
app.use("/users", userRoutes);
//event
const eventRoutes = require("./Routes/eventRoutes");

app.use("/events", eventRoutes);
//register
const registrationRoutes = require("./Routes/registrationRoutes");

app.use("/registrations", registrationRoutes);
//report
const reportRoutes = require("./Routes/reportRoutes");

app.use("/reports",reportRoutes);
//auth
const authRoutes = require("./Routes/authRoutes");

app.use("/auth", authRoutes);

app.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS message");

        res.json({
            success: true,
            message: "Database Connected Successfully",
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database Connection Failed"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});