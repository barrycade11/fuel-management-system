const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/fuelPrice/:fuelPriceId/items", async (req, res) => {
  try {
    const { fuelPriceId } = req.params;

    const result = await pool.query(`
        SELECT      a.id,
                    a.fuelId,
                    b.name      fuel,
                    0           oldPrice,
                    a.newPrice  newPrice
        FROM        fuelPrice_item a
        INNER JOIN  fuelmaster b
                ON  a.fuelId = b.id
        WHERE       a.fuelPriceId = $1
    `, [fuelPriceId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/fuelPrices/:fuelPriceId/items/:id", async (req, res) => {
  try {
    const { fuelPriceId, id } = req.params;

    const result = await pool.query(`
        SELECT      a.id,
                    a.fuelId,
                    b.name      fuel,
                    0           oldPrice,
                    a.newPrice  newPrice
        FROM        fuelPrice_item a
        INNER JOIN  fuelmaster b
                ON  a.fuelId = b.id
        WHERE       a.fuelPriceId = $1
                    AND a.id = $2
    `, [fuelPriceId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/fuelPrice/:fuelPriceId/item", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelPriceId } = req.params;
    const { fuelId, newPrice, remarks } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
        INSERT INTO fuelPrice_item
                    (
                        fuelPriceId,
                        fuelId,
                        newPrice,
                        remarks
                    )
        VALUES      ($1, $2, $3, $4)
        RETURNING   id
    `, [fuelPriceId, fuelId, newPrice, remarks]);

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

router.put("/fuelPrice/:fuelPriceId/item/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelPriceId, id } = req.params;
    const { fuelId, newPrice, remarks } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
        UPDATE      fuelPrice_item
        SET         fuelId = $2,
                    newPrice = $3,
                    remarks = $4
        WHERE       id = $1
    `, [id, fuelId, newPrice, remarks]);

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

router.delete("/fuelPrice/:fuelPriceId/item/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        fuelPrice_item
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