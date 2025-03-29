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

module.exports = router;



