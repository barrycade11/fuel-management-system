const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

router.get("/lubeTypes", async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT      a.id,
                    a.code,
                    a.name,
                    a.incentive,
                    a.details,
                    a.status
        FROM        lubeType a
    `);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/lubeTypes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
        SELECT      a.id,
                    a.code,
                    a.name,
                    a.incentive,
                    a.details,
                    a.status
        FROM        lubeType a
        WHERE       a.id = $1
    `, [id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/lubeType", async (req, res) => {
  const client = await pool.connect();

  try {
    const { code, name, incentive, details, status } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
        INSERT INTO lubeType
                    (
                        code,
                        name,
                        incentive,
                        details,
                        status
                    )
        VALUES      ($1, $2, $3, $4, $5)
        RETURNING   id
    `, [code, name, incentive, details, status]);

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

router.put("/lubeType/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { code, name, incentive, details, status } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
        UPDATE      lubeType
        SET         code = $2,
                    name = $3,
                    incentive = $4,
                    details = $5,
                    status = $6
        WHERE       id = $1
    `, [id, code, name, incentive, details, status]);

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

router.delete("/lubeType/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        lubeType
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