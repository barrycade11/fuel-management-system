const express = require('express');
const router = express.Router();
const pool = require("../Config/Connection");

router.get('/roles', async (_, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(`
      SELECT 
            id,
            name
      FROM  roles
    `)

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: "Successfully fetched roles",
      body: result.rows
    })

  } catch (error) {
    await client.query("ROLLBACK");

    return res.status(501).json({
      success: false,
      message: error,
      body: null
    })
  }
  finally {
    client.release();
  }
})


/**
 * Handle delete of role and it's related permissions of each module
 *
 * @param {int} roleid
 * @returns {Object} express json response
 */
router.delete('/roles/:roleid', async (req, res) => {
  const client = await pool.connect();

  try {
    const { roleid } = req.params;

    await client.query("BEGIN");

    await client.query(`
        DELETE 
        FROM    roles
        WHERE   id = $1
    `, [roleid])

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: "Successfully deleted role and it's permissions",
    })

  } catch (error) {
    await client.query("ROLLBACK");

    return res.status(501).json({
      success: false,
      message: error.message,
    })
  }
  finally {
    client.release();
  }
});

module.exports = router;



