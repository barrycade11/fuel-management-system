const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

router.get("/fuelPrice/:fuelPriceId/attachment", async (req, res) => {
  try {
    const { fuelPriceId } = req.params;

    const result = await pool.query(`
        SELECT      a.id,
                    a.filename,
                    a.uploadedBy,
                    a.dateUploaded
        FROM        fuelPrice_attachment a
        WHERE       a.fuelPriceId = $1
    `, [fuelPriceId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/fuelPrices/:fuelPriceId/attachment/:id", async (req, res) => {
  try {
    const { fuelPriceId, id } = req.params;

    const result = await pool.query(`
        SELECT      a.id,
                    a.filename,
                    a.uploadedBy,
                    a.dateUploaded
        FROM        fuelPrice_attachment a
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

router.post("/fuelPrice/:fuelPriceId/attachment", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelPriceId } = req.params;
    const { filename, uploadedBy, dateUploaded } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
        INSERT INTO fuelPrice_attachment
                    (
                        fuelPriceId,
                        filename,
                        uploadedBy,
                        dateUploaded
                    )
        VALUES      ($1, $2, $3, $4)
        RETURNING   id
    `, [fuelPriceId, filename, uploadedBy, dateUploaded]);

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

router.put("/fuelPrice/:fuelPriceId/attachment/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelPriceId, id } = req.params;
    const { filename, uploadedBy, dateUploaded } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
        UPDATE      fuelPrice_attachment
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

router.delete("/fuelPrice/:fuelPriceId/attachment/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        fuelPrice_attachment
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