const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

router.get("/Lubricants", async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(`
        SELECT      a.id,
                    a.code,
                    a.name,
                    a.brandId,
                    b.name        brand,
                    a.lubeTypeId,
                    c.name        lubeType,
                    a.liters,
                    a.qty,
                    a.cost,
                    a.selling,
                    a.margins,
                    a.incentives,
                    a.netMargin,
                    a.netMarginPerc,
                    a.details,
                    a.status
        FROM        fuelLubricant a
        INNER JOIN  brand b
                ON  a.brandId = b.id
        INNER JOIN  lubeType c
                ON  a.lubeTypeId = c.id
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

router.get("/Lubricants/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
        SELECT      a.id,
                    a.code,
                    a.name,
                    a.brandId,
                    b.name        brand,
                    a.lubeTypeId,
                    c.name        lubeType,
                    a.liters,
                    a.qty,
                    a.cost,
                    a.selling,
                    a.margins,
                    a.incentives,
                    a.netMargin,
                    a.netMarginPerc,
                    a.details,
                    a.status
        FROM        fuelLubricant a
        INNER JOIN  brand b
                ON  a.brandId = b.id
        INNER JOIN  lubeType c
                ON  a.lubeTypeId = c.id
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

router.post("/Lubricant", async (req, res) => {
  const client = await pool.connect();

  try {
    const { code, name, brandId, lubeTypeId, liters, qty, cost, selling, margins, incentives, netMargin, netMarginPerc, details, status } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
        INSERT INTO fuelLubricant
                    (
                        code,
                        name,
                        brandId,
                        lubeTypeId,
                        liters,
                        qty,
                        cost,
                        selling,
                        margins,
                        incentives,
                        netMargin,
                        netMarginPerc,
                        details,
                        status
                    )
        VALUES      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING   id
    `, [code, name, brandId, lubeTypeId, liters, qty, cost, selling, margins, incentives, netMargin, netMarginPerc, details, status]);

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

router.put("/Lubricant/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { code, name, brandId, lubeTypeId, liters, qty, cost, selling, margins, incentives, netMargin, netMarginPerc, details, status } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
        UPDATE      fuelLubricant
        SET         code = $2,
                    name = $3,
                    brandId = $4,
                    lubeTypeId = $5,
                    liters = $6,
                    qty = $7,
                    cost = $8,
                    selling = $9,
                    margins = $10,
                    incentives = $11,
                    netMargin = $12,
                    netMarginPerc = $13,
                    details = $14,
                    status = $15 
        WHERE       id = $1
    `, [id, code, name, brandId, lubeTypeId, liters, qty, cost, selling, margins, incentives, netMargin, netMarginPerc, details, status]);

    await client.query("COMMIT");

    res.status(201).json(result.rows);
  }
  catch (err) {
    await client.query("ROLLBACK");

    console.log(err)
    res.status(500).json({ error: "Database query error" });
  }
  finally {
    client.release();
  }
});

router.delete("/Lubricant/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        fuelLubricant
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