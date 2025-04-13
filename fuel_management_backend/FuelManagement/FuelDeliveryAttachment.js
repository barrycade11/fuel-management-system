const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/fuelDelivery/:fuelDeliveryId/attachment", async (req, res) => {
  try {
    const { fuelDeliveryId } = req.params;

    const result = await pool.query(`
        SELECT      a.id,
                    a.filename,
                    a.uploadedBy,
                    a.dateUploaded
        FROM        fuelDelivery_attachment a
        WHERE       a.fuelDeliveryId = $1
    `, [fuelDeliveryId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/fuelDeliverys/:fuelDeliveryId/attachment/:id", async (req, res) => {
  try {
    const { fuelDeliveryId, id } = req.params;

    const result = await pool.query(`
        SELECT      a.id,
                    a.filename,
                    a.uploadedBy,
                    a.dateUploaded
        FROM        fuelDelivery_attachment a
        WHERE       a.fuelDeliveryId = $1
                    AND a.id = $2
    `, [fuelDeliveryId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/fuelDelivery/:fuelDeliveryId/attachment", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelDeliveryId } = req.params;
    const { filename, uploadedBy, dateUploaded } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
        INSERT INTO fuelDelivery_attachment
                    (
                        fuelDeliveryId,
                        filename,
                        uploadedBy,
                        dateUploaded
                    )
        VALUES      ($1, $2, $3, $4)
        RETURNING   id
    `, [fuelDeliveryId, filename, uploadedBy, dateUploaded]);

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

router.put("/fuelDelivery/:fuelDeliveryId/attachment/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelDeliveryId, id } = req.params;
    const { filename, uploadedBy, dateUploaded } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
        UPDATE      fuelDelivery_attachment
        SET         fuelId = $2,
                    newPrice = $3,
                    remarks = $4
        WHERE       id = $1
    `, [id, filename, uploadedBy, dateUploaded]);

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

router.delete("/fuelDelivery/:fuelDeliveryId/attachment/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        fuelDelivery_attachment
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