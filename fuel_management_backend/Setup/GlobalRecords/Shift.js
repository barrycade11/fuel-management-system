const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/shifts", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT      id,
                  name,
                  startTime,
                  endTime,
                  details,
                  status
      FROM        shift
    `);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/shifts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT      id,
                  name,
                  startTime,
                  endTime,
                  details,
                  status
      FROM        shift
      WHERE       id = $1
    `, [id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/shift", async (req, res) => {
  const client = await pool.connect();

  try {
    const { name, startTime, endTime, details, status } = req.body;
    console.log(req.body)

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO shift
                  (
                    name,
                    starttime,
                    endtime,
                    details,
                    status
                  )
      VALUES      ($1, $2, $3, $4, $5)
      RETURNING   id
    `, [name, startTime, endTime, details, status]);
    
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

router.put("/shift/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { name, startTime, endTime, details, status } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      shift
      SET         name = $2,
                  startTime = $3,
                  endTime = $4,
                  details = $5,
                  status = $6
      WHERE       id = $1
    `, [id, name, startTime, endTime, details, status]);

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

router.delete("/shift/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        shift
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