const express = require('express');
const router = express.Router();
const pool = require("../Config/Connection");
const AccountDetailSchema = require('./Params/AccountDetailSchema');
const bcrypt = require('bcryptjs');
const { accountToJson } = require('./SettingService');
const AccountDetailUpdateSchema = require('./Params/AccountDetailUpdateSchema');

router.get("/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    // Correctly format query parameters using positional placeholders
    await client.query("BEGIN");

    const result = await client.query(
      `
        SELECT 
          usr.id,
          usr.username,
          usr.firstname,
          usr.lastname,
          usr.role_id,
          rl.name AS rolename,
          usrst.stationid,
          st.name AS stationname,
          usr.status
        FROM users usr
        LEFT JOIN userstationassignments usrst ON usr.id = usrst.userid
        JOIN station st ON usrst.stationid = st.id
        LEFT JOIN roles rl ON usr.role_id = rl.id
        WHERE usr.ID = $1 
      `,
      [req.params.id] // Directly pass the array as a parameter
    );

    await client.query("COMMIT");

    const json = await accountToJson(result.rows);

    return res.status(200).json({
      success: true,
      message: "Successfully fetched accounts",
      body: json,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
  finally {
    client.release();
  }
})

router.post("/", async (req, res) => {
  const client = await pool.connect();
  const { stations = [] } = req.body;

  try {
    if (!Array.isArray(stations) || stations.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Stations list is required and must be a non-empty array.",
      });
    }

    await client.query("BEGIN");

    // Correctly format query parameters using positional placeholders
    const result = await client.query(
      `
        SELECT 
          usr.id,
          usr.username,
          usr.firstname,
          usr.lastname,
          usr.role_id,
          rl.name AS rolename,
          usrst.stationid,
          st.name AS stationname,
          usr.status
        FROM users usr
        LEFT JOIN userstationassignments usrst ON usr.id = usrst.userid
        JOIN station st ON usrst.stationid = st.id
        LEFT JOIN roles rl ON usr.role_id = rl.id
        WHERE st.name = ANY($1)
      `,
      [stations] // Directly pass the array as a parameter
    );

    await client.query("COMMIT");

    const json = await accountToJson(result.rows);

    return res.status(200).json({
      success: true,
      message: "Successfully fetched accounts",
      body: json,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
  finally {
    client.release();
  }
});

/**
 * @description Handles the creation of a new user account and its associated station assignments.
 * @route POST /create
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request payload containing user details.
 * @param {string} req.body.username - The username of the new account.
 * @param {string} req.body.password - The plain text password of the new account.
 * @param {string} req.body.lastname - The last name of the user.
 * @param {string} req.body.firstname - The first name of the user.
 * @param {Array<number>} req.body.stationAssignments - List of station IDs assigned to the user.
 * @param {number} req.body.userRole - Role ID assigned to the user.
 * @param {boolean} req.body.status - Status of the user (active/inactive).
 * @param {Object} res - The HTTP response object.
 * @returns {Object} JSON response indicating success or failure of the operation.
 */
router.post('/create', async (req, res) => {
  const client = await pool.connect();
  const { error, value } = AccountDetailSchema.validate(req.body);

  // Validation error handling
  if (error) {
    return res.status(422).json({
      success: false,
      message: error.details.map((err) => err.message),
    });
  }

  try {
    const saltRounds = 8; // Cost factor for hashing (higher is more secure but slower)

    // Destructuring validated user data
    const {
      username,
      password,
      lastname,
      firstname,
      stationAssignments,
      userRole,
      status,
    } = value;

    // Hashing the user's password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    await client.query('BEGIN');

    // Inserting user details into the database
    const result = await client.query(
      `
        INSERT INTO users (
          username,
          password,
          role_id,
          created_by,
          lastname,
          firstname,
          status
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7
        )
        RETURNING id 
      `,
      [username, hashPassword, userRole, req.user.username, lastname, firstname, status]
    );

    const userId = result.rows[0].id;

    // Mapping station assignments and inserting them into the database
    const stationAssignmentsPromise = stationAssignments.map((station) => {
      return client.query(
        `
        INSERT INTO userstationassignments (userid, stationid, createdby)
        VALUES ($1, $2, $3)
      `,
        [userId, station, req.user.username]
      );
    });

    await Promise.all(stationAssignmentsPromise);

    await client.query('COMMIT');

    // Success response
    return res.status(200).json({
      success: true,
      message: "Successfully created account.",
    });
  } catch (error) {

    // Rollback in case of error
    await client.query('ROLLBACK');
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    // Releasing the database client
    client.release();
  }
});


/**
 * @description Updates user account details and station assignments.
 * @route PUT /update
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request payload containing updated user details.
 * @param {string} req.body.username - The username of the account to update.
 * @param {string} req.body.lastname - The updated last name of the user.
 * @param {string} req.body.firstname - The updated first name of the user.
 * @param {Array<number>} req.body.stationAssignments - Updated list of station IDs assigned to the user.
 * @param {number} req.body.userRole - The updated role ID for the user.
 * @param {boolean} req.body.status - The updated status of the user (active/inactive).
 * @param {Object} res - The HTTP response object.
 * @returns {Object} JSON response indicating success or failure.
 */
router.put('/update', async (req, res) => {
  const client = await pool.connect();
  const { error, value } = AccountDetailUpdateSchema.validate(req.body);

  if (error) {
    return res.status(422).json({
      success: false,
      message: error.details.map((err) => err.message),
    });
  }

  try {

    const {
      username,
      lastname,
      firstname,
      stationAssignments,
      userRole,
      status,
    } = value;

    await client.query('BEGIN');

    // Update user details in the "users" table
    await client.query(
      `
        UPDATE users
        SET 
          role_id = $1,
          updated_by = $2,
          lastname = $3,
          firstname = $4,
          status = $5,
          updated_at = CURRENT_TIMESTAMP
        WHERE username = $6
      `,
      [userRole, req.user.username, lastname, firstname, status, username]
    );

    // Delete existing station assignments for the user
    await client.query(
      `DELETE FROM userstationassignments WHERE userid = (
        SELECT id FROM users WHERE username = $1
      )`,
      [username]
    );

    // Get the user's ID for re-inserting station assignments
    const result = await client.query(
      `SELECT id FROM users WHERE username = $1`,
      [username]
    );
    const userId = result.rows[0].id;

    // Insert updated station assignments
    const stationAssignmentsPromise = stationAssignments.map((station) => {
      return client.query(
        `
        INSERT INTO userstationassignments (userid, stationid, createdby)
        VALUES ($1, $2, $3)
      `,
        [userId, station, req.user.username]
      );
    });

    await Promise.all(stationAssignmentsPromise);

    await client.query('COMMIT');

    return res.status(200).json({
      success: true,
      message: "Successfully updated account.",
    });
  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    client.release();
  }
});

/**
 * @description delete user account details and station assignments.
 * @route delete /delete
 * @async
 * @param {number} userid - The HTTP response object.
 */
router.delete('/delete/:userid', async (req, res) => {
  const client = await pool.connect();

  try {

    const { userid } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
        DELETE FROM users WHERE id = $1
    `, [userid])

    await client.query("COMMIT");

    return res.status(204).json({
      success: true,
      message: "Successfully deleted an account.",
    })

  } catch (error) {
    await client.query("ROLLBACK");

    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
  finally {
    client.release();
  }
})

module.exports = router;


