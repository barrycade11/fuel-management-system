const express = require('express');
const router = express.Router();
const pool = require("../Config/Connection");
const SavePermissionSchema = require('./Params/SavePermissionSchema');
const AddNewRoleSchema = require("./Params/AddNewRoleSchema");

/**
 * Get 
 * Handles list of permissions each role
 * @async
 * @function
 * @param {int} roleid
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or failure.
 */
router.get('/:roleid', async (req, res) => {
  const client = await pool.connect();

  try {
    const { roleid } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
        SELECT 			rlp.id,
                    rlp.roleid,
                    rl.name as rolename,
                    rlp.moduleid,
                    mdl.name,
                    rlp.create as Add,
                    rlp.read as View,
                    rlp.update as Edit,
                    rlp.delete as Delete
        FROM 			  rolepermissions rlp
        INNER JOIN	roles	rl
                ON	rlp.roleid = rl.id
        INNER JOIN	modules mdl
                ON	rlp.moduleid = mdl.id
        WHERE 			roleid = $1
    `, [roleid]);

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: "Successfully fetch permissions",
      body: result.rows,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    return res.status(500).json({
      success: false,
      message: error
    })
  }
  finally {
    client.release();
  }
});

router.post('/generate', async (req, res) => {
  const client = await pool.connect();

  try {
    const { error, value } = AddNewRoleSchema.validate(req.body);

    if (error) {
      return res.status(401).json({
        success: false,
        message: error.details.map((err) => err.message), // Returns an array of error messages
      })
    }

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO roles (name, details, created_by)
      VALUES ($1, $2, $3)
      RETURNING id
    `, [value.role, value.role_detail, req.user.username])

    await client.query("COMMIT");

    const id = result.rows[0].id; // Retrieve the newly inserted ID

    await pool.query(`
      CALL settings_permissions_generate_role_based_permission($1, $2) 
    `, [id, req.user.username])

    return res.status(201).json({
      success: true,
      message: 'Successfully generated role based permission',
      body: null
    })

  } catch (error) {
    await client.query("ROLLBACK");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  finally {
    client.release();
  }
});

/**
 * PUT 
 * Handles saving of each permission 
 * @async
 * @function
 * @param {List} items- Express response object.
 * @param {Object} {} - Express response object.
 * @param {id} rolepermissions.id 
 * @param {boolean} create 
 * @param {boolean} read 
 * @param {boolean} update 
 * @param {boolean} delete 
 * @returns {Object} JSON response indicating success or failure.
 */
router.put('/save', async (req, res) => {
  try {
    const { error, value } = SavePermissionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message), // Returns an array of error messages
      });
    }

    const now = new Date();
    const username = req.user.username;

    // Prepare batch update queries
    const updatePromises = value.items.map((item) => {
      const query = `
        UPDATE rolepermissions
        SET 
          "create" = $1,
          "read" = $2,
          "update" = $3,
          "delete" = $4,
          "updatedat" = $6, 
          "updatedby" = $7 
        WHERE id = $5; 
      `;
      const values = [item.create, item.read, item.update, item.delete,item.id, now, username];

      return pool.query(query, values); // Ensure proper parameterized queries
    });

    await Promise.all(updatePromises);

    return res.status(200).json({
      success: true,
      message: 'Successfully updated permissions',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
