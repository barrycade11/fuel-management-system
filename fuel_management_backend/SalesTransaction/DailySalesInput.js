const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

router.get("/dailySalesInputs", async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      a.id,
                  a.effectiveDate,
                  a.stationId,
                  b.name station,
                  a.shiftManagerId,
                  a.stationShiftId
      FROM        dailySalesInput a
      INNER JOIN  station b
              ON  a.stationId = b.id
      INNER JOIN  stationShift c
              ON  a.stationShiftId = c.id
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

router.get("/dailySalesInputs/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      a.id,
                  a.effectiveDate,
                  a.stationId,
                  b.name station,
                  a.shiftManagerId,
                  a.stationShiftId
      FROM        dailySalesInput a
      INNER JOIN  station b
              ON  a.stationId = b.id
      INNER JOIN  stationShift c
              ON  a.stationShiftId = c.id
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

router.post("/dailySalesInput", async (req, res) => {
  const client = await pool.connect();

  try {
    const { efftiveDate, stationId, shiftManagerId, stationShiftId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO dailySalesInput
                  (
                    efftiveDate,
                    stationId,
                    shiftManagerId,
                    stationShiftId
                  )
      VALUES      ($1, $2, $3, $4)
      RETURNING   id
    `, [efftiveDate, stationId, shiftManagerId, stationShiftId]);
    
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

router.put("/dailySalesInput/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { efftiveDate, stationId, shiftManagerId, stationShiftId } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      dailySalesInput
      SET         efftiveDate = $2,
                  stationId = $3,
                  shiftManagerId = $4,
                  stationShiftId = $5
      WHERE       id = $1
    `, [id, efftiveDate, stationId, shiftManagerId, stationShiftId]);

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

router.delete("/dailySalesInput/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        dailySalesInput
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