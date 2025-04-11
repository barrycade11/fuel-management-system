const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

router.get("/dailySalesInput/:dailySalesInputId/Tanks", async (req, res) => {
  try {
    const { dailySalesInputId } = req.params;

    const result = await pool.query(`
      SELECT      a.id,
                  a.stationTankId,
                  b.name stationTank,
                  a.price,
                  a.dip,
                  a.volume
      FROM        dailySalesInput_Tank a
      INNER JOIN  stationTank b
              ON  a.stationTankId = b.id
      WHERE       a.dailySalesInputId = $1
    `, [dailySalesInputId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/dailySalesInputs/:dailySalesInputId/Tanks/:id", async (req, res) => {
  try {
    const { dailySalesInputId, id } = req.params;

    const result = await pool.query(`
      SELECT      a.id,
                  a.stationTankId,
                  b.name stationTank,
                  a.price,
                  a.dip,
                  a.volume
      FROM        dailySalesInput_Tank a
      INNER JOIN  stationTank b
              ON  a.stationTankId = b.id
      WHERE       a.dailySalesInputId = $1
                  AND a.id = $2
    `, [dailySalesInputId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/dailySalesInput/:dailySalesInputId/Tank", async (req, res) => {
  const client = await pool.connect();

  try {
    const { dailySalesInputId } = req.params;
    const { stationTankId, price, dip, volume } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO dailySalesInput_Tank
                  (
                    dailySalesInputId,
                    stationTankId,
                    price,
                    dip,
                    volume
                  )
      VALUES      ($1, $2, $3, $4, $5)
      RETURNING   id
    `, [dailySalesInputId, stationTankId, price, dip, volume]);
    
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

router.put("/dailySalesInput/:dailySalesInputId/Tank/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { dailySalesInputId, id } = req.params;
    const { stationTankId, price, dip, volume } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      dailySalesInput_Tank
      SET         stationTankId = $2,
                  price = $3,
                  dip = $4,
                  volume = $5
      WHERE       dailySalesInputId = $1
                  AND id = $2
    `, [dailySalesInputId, id, stationTankId, price, dip, volume]);

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

router.delete("/dailySalesInput/:dailySalesInputId/Tank/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        dailySalesInput_Tank
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