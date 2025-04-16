const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

router.get("/dailySalesInput/:dailySalesInputId/Fuels", async (req, res) => {
  const client = await pool.connect();

  try {
    const { dailySalesInputId } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      id,
                  fuelDiscount,
                  fuelTaxExemption
      FROM        dailySalesInput_FuelHdr
      WHERE       dailySalesInputId = $1
    `, [dailySalesInputId]);

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

router.get("/dailySalesInputs/:dailySalesInputId/Fuels/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { dailySalesInputId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      id,
                  fuelDiscount,
                  fuelTaxExemption
      FROM        dailySalesInput_FuelHdr
      WHERE       dailySalesInputId = $1
                  AND id = $2
    `, [dailySalesInputId, id]);

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

router.post("/dailySalesInput/:dailySalesInputId/Fuel", async (req, res) => {
  const client = await pool.connect();

  try {
    const { dailySalesInputId } = req.params;
    const { fuelDiscount, fuelTaxExemption } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO dailySalesInput_FuelHdr
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
      UPDATE      dailySalesInput_FuelHdr
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
      FROM        dailySalesInput_FuelHdr
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