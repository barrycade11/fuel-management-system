
const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");
const loginSchema = require("./Params/LoginSchema");
const { createToken, saveToken, userToJson } = require("./AuthService");
const bcrypt = require('bcryptjs');

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

    // First, retrieve the user by username only
    const userResult = await pool.query(`
            SELECT id, username, password, role_id
            FROM users
            WHERE username = $1
        `, [username]);

    // Check if user exists
    if (userResult.rowCount === 0) {
      return res.status(401).json({ success: false, message: "Login failed" });
    }

    // Compare the provided password with the stored hash
    const storedHash = userResult.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, storedHash);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Login failed" });
    }

    // If password matches, fetch the complete user data with permissions
    const result = await pool.query(`
            Select 
                usr.id,
                usr.username,
                usr.role_id,
                rl.name as rolename,
                mdl.id AS moduleid,
                mdl.name as modulename,
                COALESCE(rlp.create, false) "add",
                COALESCE(rlp.read, false) "view",
                COALESCE(rlp.update, false) "edit",
                COALESCE(rlp.delete, false) "delete"
            from users usr
            LEFT JOIN roles rl
            ON usr.role_id = rl.id
            CROSS JOIN modules mdl
            LEFT JOIN rolepermissions rlp
            ON usr.role_id = rlp.roleid
            AND mdl.id = rlp.moduleid
            where usr.id = $1
            AND mdl.parentmoduleid IS NOT NULL
        `, [userResult.rows[0].id]);

    // Token creation
    const token = await createToken(value);
    const json = userToJson(result.rows);
    json[0].token = token

    // Prepare response data with token
    const data = json[0];

    // Save the token
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
