
const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");
const loginSchema = require("./Params/LoginSchema");
const { createToken, saveToken } = require("./AuthService");

/**
 * POST /login
 * Handles user login by validating credentials, generating a token, and saving it.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Incoming request body containing login credentials.
 * @param {string} req.body.username - User's username.
 * @param {string} req.body.password - User's password.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or failure.
 */
router.post("/login", async (req, res) => {
    try {
        // Validate request body
        const { error, value } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details.map((err) => err.message), // Returns an array of error messages
            });
        }

        // Extract body parameters
        const { username, password } = value;

        // Query the database for user credentials
        const result = await pool.query(`
            SELECT  id,
                    username,
                    role_id
            FROM    users
            WHERE   username = $1
            AND     password = $2
        `, [username, password]);

        if (result.rowCount === 0) {
            return res.status(401).json({ success: false, message: "Login failed" });
        }

        // Token creation
        const token = await createToken(value);

        // Prepare response data with token
        const data = {
            ...result.rows[0],
            token: token,
        };

        // Save the token (e.g., to the database or another service)
        await saveToken(data);

        return res.status(201).json({
            success: true,
            message: "Login successful",
            body: data
        });
    } catch (err) {
        console.error("Error in /login route:", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
