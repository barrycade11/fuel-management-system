const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");




router.get("/fuelDelivery/:fuelDeliveryId/:stationId/StationedItems", async (req, res) => {
  try {
    const { fuelDeliveryId, stationId } = req.params;

    const result = await pool.query(`
      SELECT        b.id,                    
                    b.name      ,
					          c.code,
					          c.color,
                    coalesce(a.price,0) price,
                    coalesce(a.beginningDip,0) beginningDip,
                    coalesce(a.endDip,0) endDip,
                    coalesce(a.delivery,0) delivery,
                    coalesce(a.grossIncrease,0) grossIncrease,
                    coalesce(a.interimSales,0) interimSales,
                    coalesce(a.shortOver,0) shortOver
        FROM        stationTank b
		LEFT JOIN	fuelmaster c
				ON   b.fuelmasterid = c.id 				
        LEFT JOIN   fuelDelivery_item a
                ON  b.id = a.tankId
                    AND a.fuelDeliveryId = $1					
		WHERE b.stationid = $2 
    `, [fuelDeliveryId, stationId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});


router.get("/fuelDelivery/:fuelDeliveryId/items", async (req, res) => {
  try {
    const { fuelDeliveryId } = req.params;

    const result = await pool.query(`        
        SELECT      a.id,
              b.id tankId,
              a.tankId,
              b.name      ,
              c.code,
              c.color,
              coalesce(a.price,0) price,
              coalesce(a.beginningDip,0) beginningDip,
              coalesce(a.endDip,0) endDip,
              coalesce(a.delivery,0) delivery,
              coalesce(a.grossIncrease,0) grossIncrease,
              coalesce(a.interimSales,0) interimSales,
              coalesce(a.shortOver,0) shortOver
        FROM        stationTank b
        LEFT JOIN	fuelmaster c
            ON   b.fuelmasterid = c.id 				
        INNER JOIN   fuelDelivery_item a
            ON  b.id = a.tankId
              AND a.fuelDeliveryId = $1
    `, [fuelDeliveryId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/fuelDelivery/:fuelDeliveryId/items/:id", async (req, res) => {
  try {
    const { fuelDeliveryId, id } = req.params; 
    const result = await pool.query(`
        SELECT      a.id,
              b.id tankId,
              a.tankId,
              b.name      ,
              c.code,
              c.color,
              coalesce(a.price,0) price,
              coalesce(a.beginningDip,0) beginningDip,
              coalesce(a.endDip,0) endDip,
              coalesce(a.delivery,0) delivery,
              coalesce(a.grossIncrease,0) grossIncrease,
              coalesce(a.interimSales,0) interimSales,
              coalesce(a.shortOver,0) shortOver
            FROM        stationTank b
        LEFT JOIN	fuelmaster c
            ON   b.fuelmasterid = c.id 				
            INNER JOIN   fuelDelivery_item a
                    ON  b.id = a.tankId
                        AND a.fuelDeliveryId = $1					
        WHERE b.id = $2 
    `, [fuelDeliveryId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/fuelDelivery/:fuelDeliveryId/item", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelDeliveryId } = req.params;
    const { tankId, price, beginningdip, enddip, delivery, grossincrease, interimsales, shortover, stationId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
        INSERT INTO fuelDelivery_item
                    (
                        fuelDeliveryId,
                        tankId,
                        price,
                        beginningDip,
                        endDip,
                        delivery,
                        grossIncrease,
                        interimSales,
                        shortOver,
                        stationid
                    )
        VALUES      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING   id
    `, [fuelDeliveryId, tankId, price, beginningdip, enddip, delivery, grossincrease, interimsales, shortover, stationId]);

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
    const { tankId, price, beginningdip, enddip, delivery, grossincrease, interimsales, shortover } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
        UPDATE      fuelDelivery_item
        SET         price = $2,
                    beginningDip = $3,
                    endDip = $4,
                    delivery = $5,
                    grossIncrease = $6,
                    interimSales = $7,
                    shortOver = $8
        WHERE       id = $1
    `, [id, price, beginningdip, enddip,delivery, grossincrease, interimsales, shortover]);

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


router.delete("/fuelDelivery/:fuelDeliveryId/items/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id,fuelDeliveryId } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        fuelDelivery_item
      WHERE       fueldeliveryid = $1
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