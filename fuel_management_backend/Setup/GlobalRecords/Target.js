const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/targets", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT      a.id,
                  a.name,
                  a.year,
                  a.stationId,
                  b.name            station,
                  a.targetFieldId,
                  c.name            targetField,
                  a.status
      FROM        shift a
      INNER JOIN  station b
              ON  a.stationId = b.id
      INNER JOIN  dropdown c
              ON  a.targetFieldId = c.id
                  AND c.dropdownTypeId = 24
    `);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/targets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.name,
                  a.year,
                  a.stationId,
                  b.name            station,
                  a.targetFieldId,
                  c.name            targetField,
                  a.status
      FROM        shift a
      INNER JOIN  station b
              ON  a.stationId = b.id
      INNER JOIN  dropdown c
              ON  a.targetFieldId = c.id
                  AND c.dropdownTypeId = 24
      WHERE       a.id = $1
    `, [id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/target", async (req, res) => {
  const client = await pool.connect();

  try {
    const { name, year, stationId, targetFieldId, status } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO targets
                  (
                    name,
                    year,
                    stationId,
                    targetFieldId,
                    status
                  )
      VALUES      ($1, $2, $3, $4, $5)
      RETURNING   id
    `, [name, year, stationId, targetFieldId, status]);
    
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

router.put("/target/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { name, year, stationId, targetFieldId, status } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      targets
      SET         name = $2,
                  year = $3,
                  stationId = $4,
                  targetFieldId = $5,
                  status = $6
      WHERE       id = $1
    `, [id, name, year, stationId, targetFieldId, status]);

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

router.delete("/target/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        targets
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