const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/stations", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT      a.id,
                  a.name,
                  a.start_time,
                  a.end_time,
                  a.details,
                  a.status_id,
                  b.name status
      FROM        station a
      INNER JOIN  status b
              ON  a.status_id = b.id
    `);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/stations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.name,
                  a.start_time,
                  a.end_time,
                  a.details,
                  a.status_id,
                  b.name status
      FROM        station a
      INNER JOIN  status b
              ON  a.status_id = b.id
      WHERE       id = $1
    `, [id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/station", async (req, res) => {
  const client = await pool.connect();

  try {
    const { name, startTime, endTime, details, statusId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO station
                  (name, start_time, end_time, details, status_id)
      VALUES      ($1, $2, $3, $4, $5)
      RETURNING   id
    `, [name, startTime, endTime, details, statusId]);
    
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

router.put("/station/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { name, startTime, endTime, details, statusId } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      station
      SET         name = $2,
                  start_time = $3,
                  end_time = $4,
                  details = $5,
                  status_id = $6
      WHERE       id = $1
    `, [id, name, startTime, endTime, details, statusId]);

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

router.delete("/station/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        station
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