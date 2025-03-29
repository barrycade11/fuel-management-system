const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

router.get("/dailySalesInput/:dailySalesInputId/Fuels", async (req, res) => {
  try {
    const { dailySalesInputId } = req.params;

    const result = await pool.query(`
      SELECT      id,
                  fuelDiscount,
                  fuelTaxExemption
      FROM        dailySalesInputFuelHdr
      WHERE       dailySalesInputId = $1
    `, [dailySalesInputId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/dailySalesInputs/:dailySalesInputId/Fuels/:id", async (req, res) => {
  try {
    const { dailySalesInputId, id } = req.params;

    const result = await pool.query(`
      SELECT      id,
                  fuelDiscount,
                  fuelTaxExemption
      FROM        dailySalesInputFuelHdr
      WHERE       dailySalesInputId = $1
                  AND id = $2
    `, [dailySalesInputId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/dailySalesInput/:dailySalesInputId/Fuel", async (req, res) => {
  const client = await pool.connect();

  try {
    const { dailySalesInputId } = req.params;
    const { fuelDiscount, fuelTaxExemption } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO dailySalesInputFuelHdr
                  (
                    dailySalesInputId,
                    fuelDiscount,
                    fuelTaxExemption
                  )
      VALUES      ($1, $2, $3)
      RETURNING   id
    `, [dailySalesInputId, fuelDiscount, fuelTaxExemption]);
    
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

router.put("/dailySalesInput/:dailySalesInputId/Fuel/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { dailySalesInputId, id } = req.params;
    const { fuelDiscount, fuelTaxExemption } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      dailySalesInputFuelHdr
      SET         fuelDiscount = $2,
                  fuelTaxExemption = $3
      WHERE       dailySalesInputId = $1
                  AND id = $2
    `, [dailySalesInputId, id, fuelDiscount, fuelTaxExemption]);

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

router.delete("/dailySalesInput/:dailySalesInputId/Fuel/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        dailySalesInputFuelHdr
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