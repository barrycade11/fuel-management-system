const jwt = require("jsonwebtoken");

/**
 * Middleware to validate a JSON Web Token (JWT).
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const ValidateToken = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        // Verify the token
        const secretKey = process.env.TOKEN_KEY; // Ensure TOKEN_KEY is set in your environment variables
        const decoded = jwt.verify(token, secretKey);

        // Attach decoded token payload to request object (optional)
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired. Please log in again." });
        }

        res.status(401).json({ success: false, message: "Invalid token. Access denied." });
    }
};

module.exports = ValidateToken;