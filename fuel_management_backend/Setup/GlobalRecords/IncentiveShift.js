const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/incentive/:incentiveId/shift", async (req, res) => {
  try {
    const { incentiveId } = req.params;

    const result = await pool.query(`
      SELECT      a.id,
                  a.departmentId,
                  b.name        department,
                  a.value
      FROM        incentives_shift a
      INNER JOIN  department b
              ON  a.stationId = b.id
      WHERE       a.incentiveId = $1
    `, [incentiveId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/incentive/:incentiveId/stations/:id", async (req, res) => {
  try {
    const { incentiveId, id } = req.params;

    const result = await pool.query(`
      SELECT      a.id,
                  a.stationId,
                  b.name        station
      FROM        incentives_station a
      INNER JOIN  station b
              ON  a.stationId = b.id
      WHERE       a.incentiveId = $1
                  AND a.id = $2
    `, [incentiveId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/incentive/:incentiveId/station", async (req, res) => {
  const client = await pool.connect();

  try {
    const { incentiveId } = req.params;
    const { stationId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO incentives_station
                  (
                    incentiveId,
                    stationId
                  )
      VALUES      ($1, $2)
      RETURNING   id
    `, [incentiveId, stationId]);
    
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

router.put("/incentive/:incentiveId/station/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { incentiveId, id } = req.params;
    const { stationId } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      incentives_station
      SET         stationId = $2
      WHERE       id = $1
    `, [id, stationId]);

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

router.delete("/incentive/:incentiveId/station/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { incentiveId, id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        incentives_station
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