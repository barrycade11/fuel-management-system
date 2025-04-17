const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");
const { id } = require("../Stations/Params/StationSchema");

router.get("/target/:targetId/weekly/:targetWeeklyId/stations", async (req, res) => {
  const client = await pool.connect();

  try {
    const { targetWeeklyId } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      a.id,
                  a.stationId,
                  a.name        station,
                  a.percentage,
                  a.amount
      FROM        targets_weeklyStation a
      INNER JOIN  station b
              ON  a.stationId = b.id
      WHERE       a.targetWeeklyId = $1
    `, [targetWeeklyId]);

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

router.get("/target/:targetId/weekly/:targetWeeklyId/stations/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { targetWeeklyId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      a.id,
                  a.stationId,
                  a.name        station,
                  a.percentage,
                  a.amount
      FROM        targets_weeklyStation a
      INNER JOIN  station b
              ON  a.stationId = b.id
      WHERE       a.targetWeeklyId = $1
                  AND id = $2
    `, [targetWeeklyId, id]);

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

router.post("/target/:targetId/weekly/:targetWeeklyId/station", async (req, res) => {
  const client = await pool.connect();

  try {
    const { targetWeeklyId } = req.params;
    const { stationId, percentage, amount } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO targets_weeklyStation
                  (
                    targetWeeklyId,
                    stationId,
                    percentage,
                    amount
                  )
      VALUES      ($1, $2, $3, $4)
      RETURNING   id
    `, [targetWeeklyId, stationId, percentage, amount]);
    
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

router.put("/target/:targetId/weekly/:targetWeeklyId/station/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { targetWeeklyId, id } = req.params;
    const { stationId, percentage, amount } = req.body;

    await client.query("BEGIN");
    
    const result = await client.query(`
      UPDATE      targets_weeklyStation
      SET         stationId = $2,
                  percentage = $3,
                  amount = $4
      WHERE       id = $1
    `, [id, stationId, percentage, amount]);

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

router.delete("/target/:targetId/weekly/:targetWeeklyId/station/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        targets_weeklyStation
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