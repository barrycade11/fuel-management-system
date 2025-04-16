const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/station/tank/:stationTankId/pumps", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationTankId } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      a.id,
                  a.pump,
                  a.nozzle
      FROM        stationTankPump a
      WHERE       stationTankId = $1
    `, [stationTankId]);

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

router.get("/station/tank/:stationTankId/pumps/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationTankId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      a.id,
                  a.pump,
                  a.nozzle
      FROM        stationTankPump a
      WHERE       a.stationTankId = $1
                  and a.id = $2
    `, [stationTankId, id]);

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

router.post("/station/tank/:stationTankId/pump", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationTankId } = req.params;
    const { pump, nozzle } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO stationTankPump
                  (
                    stationTankId,
                    pump,
                    nozzle
                  )
      VALUES      ($1, $2)
      RETURNING   id
    `, [stationTankId, pump, nozzle]);
    
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

router.put("/station/tank/:stationTankId/pump/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationTankId, id } = req.params;
    const { pump, nozzle } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      stationTankPump
      SET         pump = $3,
                  nozzle = $4
      WHERE       stationTankId = $1
                  AND id = $2
    `, [stationTankId, id, pump, nozzle]);

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

router.delete("/station/tank/:stationTankId/pump/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        stationTankPump
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