const express = require('express');
const router = express.Router();
const pool = require("../Config/Connection");

router.get('/roles', async (_, res) => {
  try {
    const result = await pool.query(`
      SELECT 
            id,
            name
      FROM  roles
    `)

    return res.status(200).json({
      success: true,
      message: "Successfully fetched roles",
      body: result.rows
    })

  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error,
      body: null
    })
  }
})


/**
 * Handle delete of role and it's related permissions of each module
 *
 * @param {int} roleid
 * @returns {Object} express json response
 */
router.delete('/roles/:roleid', async (req, res) => {
  try {
    const { roleid } = req.params;

    await pool.query(`
        DELETE 
        FROM    roles
        WHERE   id = $1
    `, [roleid])

    return res.status(200).json({
      success: true,
      message: "Successfully deleted role and it's permissions",
    })

  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    })
  }


});

module.exports = router;



