const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/dropdowns/:typeId", async (req, res) => {
  const client = await pool.connect();

  try {
    const { typeId } = req.params;

    await client.query("BEGIN");
    
    const result = await client.query(`
      SELECT    id,
                name,
                details
      FROM      dropdown
      WHERE     status = true
                AND dropdownTypeId = $1
    `, [typeId]);

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

router.get("/dropdowns/:typeId/setup", async (req, res) => {
  const client = await pool.connect();

  try {
    const { typeId } = req.params;

    await client.query("BEGIN");
    
    const result = await client.query(`
      SELECT    id,
                name,
                details,
                status
      FROM      dropdown
      WHERE     dropdownTypeId = $1
    `, [typeId]);

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

router.get("/dropdowns/:typeId/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { typeId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT    id,
                name,
                details
      FROM      dropdown
      WHERE     status = true
                AND dropdownTypeId = $1
                AND id = $2
    `, [typeId, id]);

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

router.post("/dropdown/:typeId", async (req, res) => {
  const client = await pool.connect();

  try {
    const { typeId } = req.params;
    const { name, details, status } = req.body;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      INSERT INTO dropdown
                  (dropdownTypeId, name, details, status)
      VALUES      ($1, $2, $3, $4)
    `, [typeId, name, details, status]);

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

router.put("/dropdown/:typeId/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { typeId, id } = req.params;
    const { name, details, status } = req.body;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      UPDATE      dropdown
      SET         name = $3,
                  details = $4,
                  status = $5
      WHERE       dropdownTypeId = $1
                  AND id = $2
    `, [typeId, id, name, details, status]);

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

router.delete("/dropdown/:typeId/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { typeId, id } = req.params;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      DELETE
      FROM        dropdown
      WHERE       dropdownTypeId = $1
                  AND id = $2
    `, [typeId, id]);

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