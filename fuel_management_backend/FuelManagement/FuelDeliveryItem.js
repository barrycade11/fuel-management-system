const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

router.get("/fuelDelivery/:fuelDeliveryId/:stationId/StationedItems", async (req, res) => {
  const client = await pool.connect();
  try {
    const { fuelDeliveryId, stationId } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT        b.id,                    
                    b.name      ,
					          c.code,
					          c.color,
                    coalesce(a.price,0) price,
                    coalesce(a.beginningdip,0) beginningdip,
                    coalesce(a.enddip,0) enddip,
                    coalesce(a.delivery,0) delivery,
                    coalesce(a.grossincrease,0) grossincrease,
                    coalesce(a.interimsales,0) interimsales,
                    coalesce(a.shortover,0) shortover
        FROM        stationTank b
		LEFT JOIN	fuelmaster c
				ON   b.fuelmasterid = c.id 				
        LEFT JOIN   fuelDelivery_item a
                ON  b.id = a.tankId
                    AND a.fuelDeliveryId = $1					
		WHERE b.stationid = $2 
    `, [fuelDeliveryId, stationId]);    

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
router.get("/fuelDelivery/:fuelDeliveryId/items", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelDeliveryId } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`        
        SELECT 
              b.id,
              b.name,
              c.code,
              c.color,
              coalesce(a.price,0) price,
              coalesce(a.beginningdip,0) beginningdip,
              coalesce(a.enddip,0) enddip,
              coalesce(a.delivery,0) delivery,
              coalesce(a.grossincrease,0) grossincrease,
              coalesce(a.interimsales,0) interimsales,
              coalesce(a.shortover,0) shortover
        FROM        stationTank b
        LEFT JOIN	fuelmaster c
            ON   b.fuelmasterid = c.id 				
        INNER JOIN   fuelDelivery_item a
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

router.get("/fuelDelivery/:fuelDeliveryId/items/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelDeliveryId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
        SELECT
              a.id,
              b.id tankId,
              b.name      ,
              c.code,
              c.color,
              coalesce(a.price,0) price,
              coalesce(a.beginningdip,0) beginningdip,
              coalesce(a.enddip,0) enddip,
              coalesce(a.delivery,0) delivery,
              coalesce(a.grossincrease,0) grossincrease,
              coalesce(a.interimsales,0) interimsales,
              coalesce(a.shortover,0) shortover
            FROM        stationTank b
        LEFT JOIN	fuelmaster c
            ON   b.fuelmasterid = c.id 				
            INNER JOIN   fuelDelivery_item a
                    ON  b.id = a.tankId
                        AND a.fuelDeliveryId = $1					
        WHERE b.id = $2 
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
    const { tankId, price, beginningdip, enddip, delivery, grossincrease, interimsales, shortover, stationId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
        INSERT INTO fuelDelivery_item
                    (
                        fuelDeliveryId,
                        tankId,
                        price,
                        beginningdip,
                        enddip,
                        delivery,
                        grossincrease,
                        interimsales,
                        shortover,
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
                    beginningdip = $3,
                    enddip = $4,
                    delivery = $5,
                    grossincrease = $6,
                    interimsales = $7,
                    shortover = $8
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