const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/target/:targetId/weekly", async (req, res) => {
  const client = await pool.connect();

  try {
    const { targetId } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      id,
                  dayOfWeek,
                  fullDayPerc,
                  targetValue
      FROM        targets_weekly
      WHERE       targetId = $1
    `, [targetId]);

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

router.get("/target/:targetId/weekly/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { targetId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      id,
                  dayOfWeek,
                  fullDayPerc,
                  targetValue
      FROM        targets_weekly
      WHERE       targetId = $1
                  AND id = $2
    `, [targetId, id]);

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

router.post("/target/:targetId/weekly", async (req, res) => {
  const client = await pool.connect();
  const { targetId } = req.params;
  const { dayOfWeek, fullDayPerc, targetValue } = req.body;

  console.log("target id: ", targetId)
  console.log("Req body: ", req.body)
  try {
    

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO targets_weekly
                  (
                    dayOfWeek,
                    fullDayPerc,
                    targetValue,
                    targetId
                  )
      VALUES      ($1, $2, $3, $4)
      RETURNING   id
    `, [dayOfWeek, fullDayPerc, targetValue, targetId]);
    
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

router.put("/target/:targetId/weekly/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { targetId, id } = req.params;
    const { dayOfWeek, fullDayPerc, targetValue } = req.body;

    await client.query("BEGIN");
    
    const result = await client.query(`
      UPDATE      targets_weekly
      SET         dayOfWeek = $1,
                  fullDayPerc = $2,
                  targetValue = $3
      WHERE       id = $4
    `, [dayOfWeek, fullDayPerc, targetValue, id]);

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

router.delete("/target/:targetId/weekly/delete", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        targets_weekly
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