const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/employee/:employeeId/photo", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const result = await pool.query(`
      SELECT      id,
                  photo
      FROM        employeePhoto
      WHERE       employeeId = $1
    `, [employeeId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/employee/:employeeId/photo/:id", async (req, res) => {
  try {
    const { employeeId, id } = req.params;
    const result = await pool.query(`
      SELECT      id,
                  photo
      FROM        employeePhoto
      WHERE       employeeId = $1
                  AND id = $2
    `, [employeeId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/employee/:employeeId/photo", async (req, res) => {
  const client = await pool.connect();

  try {
    const { employeeId } = req.params;
    const { photo } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO employeePhoto
                  (
                    employeeId,
                    photo
                  )
      VALUES      ($1, $2)
      RETURNING   id
    `, [employeeId, photo]);
    
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

router.put("/employee/:employeeId/photo/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { employeeId, id } = req.params;
    const { photo } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      employeePhoto
      SET         photo = $3
      WHERE       employeeId = $1
                  AND id = $2
    `, [employeeId, id, photo]);

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

router.delete("/employee/:employeeId/photo/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { employeeId, id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        employeePhoto
      WHERE       employeeId = $1
                  AND id = $2
    `, [employeeId, id]);

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