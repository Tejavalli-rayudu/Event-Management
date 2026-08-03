const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

    try {

        // Read Authorization header
        const authHeader = req.headers.authorization;

        // Check header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        // Extract token from: Bearer <token>
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store user info in request
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}

module.exports = verifyToken;