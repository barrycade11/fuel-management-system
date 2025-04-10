const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/'); 
  },
  filename: (req, file, cb) => {
    const fileName = `EMP-${req.params.employeeId}${path.extname(file.originalname)}`;
    cb(null, fileName); 
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
}).single('photo');

router.get("/employee/:employeeId/photo", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const result = await pool.query(`
      SELECT      id,
                  photo
      FROM        employeePhoto
      WHERE       employeeId = $1
    `, [employeeId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/employee/:employeeId/photo/:id", async (req, res) => {
  try {
    const { employeeId, id } = req.params;
    const result = await pool.query(`
      SELECT      id,
                  photo
      FROM        employeePhoto
      WHERE       employeeId = $1
                  AND id = $2
    `, [employeeId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/employee/:employeeId/photo", upload, async (req, res) => {
  const client = await pool.connect();

  const { employeeId } = req.params;
  const { file } = req;

  console.log(employeeId)
  console.log(file)

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const photoPath = file.path;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO employeePhoto
                  (
                    employeeId,
                    photo
                  )
      VALUES      ($1, $2)
      RETURNING   id
    `, [employeeId, photoPath]);
    
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

router.put("/employee/:employeeId/photo/:id", upload, async (req, res) => {
  const client = await pool.connect();

  try {
    const { employeeId, id } = req.params;
    const { file } = req;

    const photoPath = file.path;

    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      employeePhoto
      SET         photo = $3
      WHERE       employeeId = $1
                  AND id = $2
    `, [employeeId, id, photoPath]);

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

router.delete("/employee/:employeeId/photo/delete", async (req, res) => {
  const client = await pool.connect();

  try {
    const { employeeId } = req.params;

    console.log(`Attempting to delete photo for employee ID: ${employeeId}`);

    await client.query("BEGIN");

    console.log(`Checking for photo in database for employee ID: ${employeeId}`);
    const checkPath = await client.query(`
      SELECT photo
      FROM employeePhoto
      WHERE employeeId = $1
    `, [employeeId]);

    if (checkPath.rows.length === 0) {
      console.error(`No photo found for employee ID: ${employeeId}`);
    }

    const photoPath = checkPath.rows[0].photo;
    console.log(`Found photo for employee ID: ${employeeId}, photo path: ${photoPath}`);

    const filePath = path.join(__dirname, '..', '..', photoPath);
    console.log(`Checking if file exists at path: ${filePath}`);

    if (fs.existsSync(filePath)) {
      console.log(`File found at path: ${filePath}, deleting file.`);
      fs.unlinkSync(filePath);  
    } else {
      console.error(`File not found at path: ${filePath}`);
    }

    console.log(`Deleting photo record from database for employee ID: ${employeeId}`);
    const result = await client.query(`
      DELETE
      FROM employeePhoto
      WHERE employeeId = $1
    `, [employeeId]);

    await client.query("COMMIT");

    res.status(200).json({ message: "Photo deleted successfully." });
  } catch (err) {
    await client.query("ROLLBACK");

    console.error("Error occurred during deletion:", err);
    res.status(500).json({ error: "Error deleting photo." });
  } finally {
    client.release();
  }
});

module.exports = router;