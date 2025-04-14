const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/station/:stationId/tanks", async (req, res) => {
  try {
    const { stationId } = req.params;

    const result = await pool.query(`
      SELECT      a.id,
                  a.name,
                  b.color,
                  a.fuelMasterId,
                  b.name fuelMaster,
                  a.capacity,
                  a.capacitySafe,
                  a.details,
                  a.status
      FROM        stationTank a
      INNER JOIN  fuelMaster b
              ON  a.fuelMasterId = b.id
      WHERE       stationId = $1
    `, [stationId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/station/:stationId/tanks/:id", async (req, res) => {
  try {
    const { stationId, id } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.name,
                  a.fuelMasterId,
                  b.name fuelMaster,
                  a.capacity,
                  a.capacitySafe,
                  a.details,
                  a.status
      FROM        stationTank a
      INNER JOIN  fuelMaster b
              ON  a.fuelMasterId = b.id
      WHERE       a.stationId = $1
                  and a.id = $2
    `, [stationId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/station/:stationId/tank", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId } = req.params;
    const { tankName, productId, capacity, safeCapacity, details, status } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO stationTank
                  (
                    stationId,
                    name,
                    fuelMasterId,
                    capacity,
                    capacitySafe,
                    details,
                    status
                  )
      VALUES      ($1, $2, $3, $4, $5, $6, $7)
      RETURNING   id
    `, [stationId, tankName, productId, capacity, safeCapacity, details, status]);
    
    await client.query("COMMIT");

    res.status(201).json({ success: true, message: "Succesfully add tank"});
  }
  catch (err) {
    await client.query("ROLLBACK");

    res.status(500).json({ success: false, message: "Database query error" });
  }
  finally {
    client.release();
  }
});

router.put("/station/:stationId/tank/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId, id } = req.params;
    const { name, fuelMasterId, capacity, capacitySafe, details, status } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      stationTank
      SET         name = $3,
                  fuelMasterId = $4,
                  capacity = $5,
                  capacitySafe = $6,
                  details = $7,
                  status = $8
      WHERE       stationId = $1
                  AND id = $2
    `, [stationId, id, name, fuelMasterId, capacity, capacitySafe, details, status]);

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

router.delete("/station/:stationId/tank/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        stationTank
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
