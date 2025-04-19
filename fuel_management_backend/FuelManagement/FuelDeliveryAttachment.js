const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/'); 
  },
  filename: (req, file, cb) => {
    const fileNameWithoutExt = path.basename(file.originalname, path.extname(file.originalname)); // Remove extension
    const fileName = `FDA-${req.params.fuelDeliveryId}-${fileNameWithoutExt}${path.extname(file.originalname)}`;
    cb(null, fileName); 
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
}).single('file');

router.get("/fuelDelivery/:fuelDeliveryId/attachment", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelDeliveryId } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
        SELECT      a.id,
                    a.filename,
                    a.uploadedBy,
                    a.dateUploaded
        FROM        fuelDelivery_attachment a
        WHERE       a.fuelDeliveryId = $1
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

router.get("/fuelDeliverys/:fuelDeliveryId/attachment/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { fuelDeliveryId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
        SELECT      a.id,
                    a.filename,
                    a.uploadedBy,
                    a.dateUploaded
        FROM        fuelDelivery_attachment a
        WHERE       a.fuelDeliveryId = $1
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

router.post("/fuelDelivery/:fuelDeliveryId/attachment", upload, async (req, res) => {
  const client = await pool.connect();

  const { file } = req;
  
  // if (!file) {
  //   return res.status(400).json({ message: "No file uploaded" });
  // }

  try {
    
    const FilePath = file.path;

    const { fuelDeliveryId } = req.params;
    const { filename, uploadedBy, dateUploaded } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
        INSERT INTO fuelDelivery_attachment
                    (
                        fuelDeliveryId,
                        filename,
                        filepath,
                        mimetype,
                        size,
                        uploadedBy,
                        dateUploaded
                    )
        VALUES      ($1, $2, $3, $4, $5, $6, $7)
        RETURNING   id
    `, [fuelDeliveryId, file.originalname, file.path, file.mimetype, file.size, uploadedBy, dateUploaded]);

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