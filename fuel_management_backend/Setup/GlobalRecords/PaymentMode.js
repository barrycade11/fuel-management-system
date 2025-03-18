const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/paymentModes", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT      id,
                  code,
                  name,
                  details,
                  status
      FROM        paymentMode
    `);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/paymentModes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT      id,
                  code,
                  name,
                  details,
                  status
      FROM        paymentMode
      WHERE       id = $1
    `, [id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/paymentMode", async (req, res) => {
  const client = await pool.connect();

  try {
    const { code, name, details, status } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO paymentMode
                  (
                    code,
                    name,
                    details,
                    status
                  )
      VALUES      ($1, $2, $3, $4)
      RETURNING   id
    `, [code, name, details, status]);

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

router.put("/paymentMode/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { code, name, details, status } = req.body;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      UPDATE      paymentMode
      SET         code = $2,
                  name = $3,
                  details = $4,
                  status = $5
      WHERE       id = $1
    `, [id, code, name, details, status]);

    client.query("COMMIT");

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

router.delete("/paymentMode/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      DELETE
      FROM        paymentMode
      WHERE       id = $1
    `, [id]);

    client.query("COMMIT");

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