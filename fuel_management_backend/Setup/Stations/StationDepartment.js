const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/station/:stationId/departments", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      id,
                  details
      FROM        stationDepartment
      WHERE       stationId = $1
    `, [stationId]);

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

router.get("/station/:stationId/departments/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      id,
                  details
      FROM        stationDepartment
      WHERE       stationId = $1
                  AND id = $2
    `, [stationId, id]);

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

router.post("/station/:stationId/deparment", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId } = req.params;
    const { departmentId, details } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO stationDepartment
                  (
                    stationId,
                    departmentId,
                    details
                  )
      VALUES      ($1, $2, $3)
      RETURNING   id
    `, [stationId, departmentId, details]);
    const id = result.rows[0].id;

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

router.put("/station/:stationId/department/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId, id } = req.params;
    const { details } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      UPDATE      stationDepartment
      SET         details = $3
      WHERE       stationId = $1
                  id = $2
    `, [stationId, id, details]);

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

router.delete("/station/:stationId/department/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      DELETE
      FROM        stationDepartment
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