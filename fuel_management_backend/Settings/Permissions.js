const express = require('express');
const router = express.Router();
const pool = require("../Config/Connection");

/**
 * Get 
 * Handles list of permissions each role
 * @async
 * @function
 * @param {int} roleid
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or failure.
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT 			rlp.id,
                    rlp.roleid,
                    rl.name as rolename,
                    rlp.moduleid,
                    mdl.name,
                    rlp.create,
                    rlp.read,
                    rlp.update,
                    rlp.delete
        FROM 			  rolepermissions rlp
        INNER JOIN	roles	rl
                ON	rlp.roleid = rl.id
        INNER JOIN	modules mdl
                ON	rlp.moduleid = mdl.id
        WHERE 			roleid = $1
    `, [1]); //temporary id to fetch

    return res.status(200).json({
      success: true,
      message: "Successfully fetch permissions",
      body: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    })
  }

});


module.exports = router;
