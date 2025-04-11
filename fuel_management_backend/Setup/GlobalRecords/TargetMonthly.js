const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/target/:targetId/monthly", async (req, res) => {
  try {
    const { targetId } = req.params;

    const result = await pool.query(`
      SELECT      id,
                  month01,
                  month02,
                  month03,
                  month04,
                  month05,
                  month06,
                  month07,
                  month08,
                  month09,
                  month10,
                  month11,
                  month12
      FROM        targets_monthly
      WHERE       targetId = $1
    `, [targetId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/target/:targetId/monthly/:id", async (req, res) => {
  try {
    const { targetId, id } = req.params;

    const result = await pool.query(`
      SELECT      id,
                  month01,
                  month02,
                  month03,
                  month04,
                  month05,
                  month06,
                  month07,
                  month08,
                  month09,
                  month10,
                  month11,
                  month12
      FROM        targets_monthly
      WHERE       targetId = $1
                  AND id = $2
    `, [targetId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/target/:targetId/monthly", async (req, res) => {
  const client = await pool.connect();

  try {
    const { targetId } = req.params;
    const { month01, month02, month03, month04, month05, month06, month07, month08, month09, month10, month11, month12 } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO targets_monthly
                  (
                    month01,
                    month02,
                    month03,
                    month04,
                    month05,
                    month06,
                    month07,
                    month08,
                    month09,
                    month10,
                    month11,
                    month12,
                    targetId
                  )
      VALUES      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING   id
    `, [month01, month02, month03, month04, month05, month06, month07, month08, month09, month10, month11, month12, targetId]);
    
    await client.query("COMMIT");

    res.status(201).json(result.rows);
  }
  catch (err) {
    await client.query("ROLLBACK");

    res.status(500).json({ error: "Database query error" });
  }
  finally {
    client.release();
  }
});

router.put("/target/:targetId/monthly/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { targetId, id } = req.params;
    const { month01, month02, month03, month04, month05, month06, month07, month08, month09, month10, month11, month12 } = req.body;

    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      targets
      SET         month01 = $1,
                  month02 = $2,
                  month03 = $3,
                  month04 = $4,
                  month05 = $5,
                  month06 = $6,
                  month07 = $7,
                  month08 = $8,
                  month09 = $9,
                  month10 = $10,
                  month11 = $11,
                  month12 = $12
      WHERE       id = $13
    `, [month01, month02, month03, month04, month05, month06, month07, month08, month09, month10, month11, month12, id]);

    await client.query("COMMIT");

    res.status(201).json(result.rows);
  }
  catch (err) {
    await client.query("ROLLBACK");

    res.status(500).json({ error: "Database query error" });
  }
  finally {
    client.release();
  }
});

router.delete("/target/:targetId/monthly/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        targets_monthly
      WHERE       id = $1
    `, [id]);

    await client.query("COMMIT");

    res.status(201).json(result.rows);
  }
  catch (err) {
    await client.query("ROLLBACK");

    res.status(500).json({ error: "Database query error" });
  }
  finally {
    client.release();
  }
});

module.exports = router;