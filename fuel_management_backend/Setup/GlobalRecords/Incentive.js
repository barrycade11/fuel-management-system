const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/incentives", async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      a.id,
                  a.name,
                  a.timePeriodId,
                  b.name            timePeriod,
                  a.details,
                  a.status
      FROM        shift a
      INNER JOIN  dropdown b
              ON  a.timePeriodId = b.id
                  AND b.dropdownTypeId = 25
    `);

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

router.get("/incentives/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      a.id,
                  a.name,
                  a.timePeriodId,
                  b.name            timePeriod,
                  a.details,
                  a.status
      FROM        shift a
      INNER JOIN  dropdown b
              ON  a.timePeriodId = b.id
                  AND b.dropdownTypeId = 25
      WHERE       a.id = $1
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

router.post("/incentive", async (req, res) => {
  const client = await pool.connect();

  try {
    const { name, timePeriodId, details, status } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO incentives
                  (
                    name,
                    timePeriodId,
                    details,
                    status
                  )
      VALUES      ($1, $2, $3, $4)
      RETURNING   id
    `, [name, timePeriodId, details, status]);
    
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

router.put("/incentive/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { name, timePeriodId, details, status } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      incentives
      SET         name = $2,
                  timePeriodId = $3,
                  details = $4,
                  status = $5
      WHERE       id = $1
    `, [id, name, timePeriodId, details, status]);

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

router.delete("/incentive/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        incentives
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