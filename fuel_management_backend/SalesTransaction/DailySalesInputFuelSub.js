const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

router.get("/dailySalesInput/:dailySalesInputId/Fuel/:fuelId/items", async (req, res) => {
  try {
    const { dailySalesInputId, fuelId } = req.params;

    const result = await pool.query(`
      SELECT      a.id,
                  a.fuelMasterId,
                  b.name fuelMaster,
                  a.transCt,
                  a.volume,
                  a.amount
      FROM        dailySalesInput_FuelLin a
      INNER JOIN  fuelMaster b
              ON  a.fuelMasterId = b.id
      WHERE       a.dailySalesInputFuelHdr = $1
    `, [fuelId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/dailySalesInputs/:dailySalesInputId/Fuel/:fuelId/items/:id", async (req, res) => {
  try {
    const { dailySalesInputId, fuelId, id } = req.params;

    const result = await pool.query(`
      SELECT      a.id,
                  a.fuelMasterId,
                  b.name fuelMaster,
                  a.transCt,
                  a.volume,
                  a.amount
      FROM        dailySalesInput_FuelLin a
      INNER JOIN  fuelMaster b
              ON  a.fuelMasterId = b.id
      WHERE       a.dailySalesInputFuelHdr = $1
                  AND a.id = $2
    `, [fuelId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/dailySalesInput/:dailySalesInputId/Fuel/:fuelId/item", async (req, res) => {
  const client = await pool.connect();

  try {
    const { dailySalesInputId, fuelId } = req.params;
    const { fuelMasterId, transCt, volume, amount } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO dailySalesInput_FuelLin
                  (
                    dailySalesInputFuelHdrId,
                    fuelMasterId,
                    transCt,
                    volume,
                    amount
                  )
      VALUES      ($1, $2, $3, $4, $5, $6)
      RETURNING   id
    `, [fuelId, fuelMasterId, transCt, volume, amount]);
    
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

router.put("/dailySalesInput/:dailySalesInputId/Fuel/:fuelId/item/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { dailySalesInputId, fuelId } = req.params;
    const { fuelMasterId, transCt, volume, amount } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      dailySalesInput_FuelLin
      SET         fuelMasterId = $2,
                  transCt = $3,
                  volume = $4,
                  amount = $5
      WHERE       dailySalesInputFuelHdrId = $1
                  AND id = $2
    `, [fuelId, id, fuelMasterId, transCt, volume, amount]);

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

router.delete("/dailySalesInput/:dailySalesInputId/Fuel/:fuelId/item/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        dailySalesInput_FuelLin
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