const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

router.get("/fuelDelivery/:fuelDeliveryId/items", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelDeliveryId } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
        SELECT      a.id,
                    a.tankId,
                    b.name      tank,
                    a.price,
                    a.beginningDip,
                    a.endDip,
                    a.grossIncrease,
                    a.interimSales,
                    a.shortOver
        FROM        stationTank b
        LEFT JOIN   fuelDelivery_item a
                ON  b.id = a.tankId
                    AND a.fuelDeliveryId = $1
    `, [fuelDeliveryId]);

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

router.get("/fuelDeliverys/:fuelDeliveryId/items/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelDeliveryId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
        SELECT      a.id,
                    a.tankId,
                    b.name      tank,
                    a.price,
                    a.beginningDip,
                    a.endDip,
                    a.grossIncrease,
                    a.interimSales,
                    a.shortOver
        FROM        stationTank b
        LEFT JOIN   fuelDelivery_item a
                ON  b.id = a.tankId
                    AND a.fuelDeliveryId = $1
                    AND a.id = $2
    `, [fuelDeliveryId, id]);

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

router.post("/fuelDelivery/:fuelDeliveryId/item", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelDeliveryId } = req.params;
    const { tankId, price, beginningDip, endDip, grossIncrease, interimSales, shortOver } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
        INSERT INTO fuelDelivery_item
                    (
                        fuelDeliveryId,
                        tankId,
                        price,
                        beginningDip,
                        endDip,
                        grossIncrease,
                        interimSales,
                        shortOver
                    )
        VALUES      ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING   id
    `, [fuelDeliveryId, tankId, price, beginningDip, endDip, grossIncrease, interimSales, shortOver]);

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

router.put("/fuelDelivery/:fuelDeliveryId/item/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelDeliveryId, id } = req.params;
    const { tankId, price, beginningDip, endDip, grossIncrease, interimSales, shortOver } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
        UPDATE      fuelDelivery_item
        SET         price = $2,
                    beginningDip = $3,
                    endDip = $4,
                    grossIncrease = $5,
                    interimSales = $6,
                    shortOver = $7
        WHERE       id = $1
    `, [id, price, beginningDip, endDip, grossIncrease, interimSales, shortOver]);

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

router.delete("/fuelDelivery/:fuelDeliveryId/item/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        fuelDelivery_item
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