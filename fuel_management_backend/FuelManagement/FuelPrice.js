const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

router.get("/fuelPrices", async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT      a.id,
                    a.effectiveDate,
                    a.stationId,
                    b.name              station,
                    a.startTime,
                    a.endTime,
                    a.reasonId,
                    c.name              reason,
                    a.details
        FROM        fuelPrice a
        INNER JOIN  station b
                ON  a.stationId = b.id
        INNER JOIN  dropdown c
                ON  a.reasonId = c.id
                    AND c.dropdownTypeId = 13
    `);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/fuelPrices/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
        SELECT      a.id,
                    a.effectiveDate,
                    a.stationId,
                    b.name              station,
                    a.startTime,
                    a.endTime,
                    a.reasonId,
                    c.name              reason,
                    a.details
        FROM        fuelPrice a
        INNER JOIN  station b
                ON  a.stationId = b.id
        INNER JOIN  dropdown c
                ON  a.reasonId = c.id
                    AND c.dropdownTypeId = 13
        WHERE       a.id = $1
    `, [id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/fuelPrice", async (req, res) => {
  const client = await pool.connect();

  try {
    const { effectiveDate, stationId, startTime, endTime, reasonId, details } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
        INSERT INTO fuelPrice
                    (
                        effectiveDate,
                        stationId,
                        startTime,
                        endTime,
                        reasonId,
                        details
                    )
        VALUES      ($1, $2, $3, $4, $5, $6)
        RETURNING   id
    `, [effectiveDate, stationId, startTime, endTime, reasonId, details]);

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

router.put("/fuelPrice/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { effectiveDate, stationId, startTime, endTime, reasonId, details } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
        UPDATE      fuelPrice
        SET         effectiveDate = $2,
                    stationId = $3,
                    startTime = $4,
                    endTime = $5,
                    reasonId = $6,
                    details = $7
        WHERE       id = $1
    `, [id, effectiveDate, stationId, startTime, endTime, reasonId, details]);

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

router.delete("/fuelPrice/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        fuelPrice
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