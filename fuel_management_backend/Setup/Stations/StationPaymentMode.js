const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/station/:stationId/paymentModes", async (req, res) => {
  try {
    const { stationId } = req.params;

    const result = await pool.query(`
      SELECT      a.id,
                  a.paymentModeId,
                  b.name paymentMode,
                  b.code,
                  b.name,
                  b.details
      FROM        stationShift a
      INNER JOIN  paymentMode b
              ON  a.paymentModeId = b.id
      WHERE       a.stationId = $1
    `, [stationId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/station/:stationId/paymentModes/:id", async (req, res) => {
  try {
    const { stationId, id } = req.params;

    const result = await pool.query(`
      SELECT      a.id,
                  a.paymentModeId,
                  b.name paymentMode,
                  b.code,
                  b.name,
                  b.details
      FROM        stationShift a
      INNER JOIN  paymentMode b
              ON  a.paymentModeId = b.id
      WHERE       a.stationId = $1
                  AND a.id = $2
    `, [stationId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/station/:stationId/paymentMode", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId } = req.params;
    const { paymentModeId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO stationPaymentMode
                  (
                    stationId,
                    paymentModeId
                  )
      VALUES      ($1, $2)
      RETURNING   id
    `, [stationId, paymentModeId]);
    
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

router.put("/station/:stationId/paymentMode/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId, id } = req.params;
    const { paymentModeId } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      stationPaymentMode
      SET         paymentModeId = $3
      WHERE       stationId = $1
                  AND id = $2
    `, [stationId, id, paymentModeId]);

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

router.delete("/station/:stationId/paymentMode/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        stationPaymentMode
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