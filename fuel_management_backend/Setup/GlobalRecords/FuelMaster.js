const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/FuelMasters", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT      a.id,
                  a.code,
                  a.name,
                  a.categoryId,
                  b.name category,
                  a.details,
                  a.color,
                  a.status
      FROM        fuelMaster a
      INNER JOIN  dropdown b
              ON  a.categoryId = b.id
    `);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/FuelMasters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.code,
                  a.name,
                  a.categoryId,
                  b.name category,
                  a.details,
                  a.color,
                  a.status
      FROM        fuelMaster a
      INNER JOIN  dropdown b
              ON  a.categoryId = b.id
      WHERE       id = $1
    `, [id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/FuelMaster", async (req, res) => {
  const client = await pool.connect();

  try {
    const { code, name, categoryId, details, color, status } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO fuelMaster
                  (
                    code,
                    name,
                    categoryId,
                    details,
                    color,
                    status
                  )
      VALUES      ($1, $2, $3, $4, $5, $6)
      RETURNING   id
    `, [code, name, categoryId, details, color, status]);

    await client.query("COMMIT");

    res.status(201).json(result.rows);
  }
  catch (err) {
    await client.query("ROLLBACK");

    res.status(500).json({ error: "Database query error" });
  }
  finally {
    client.release()
  }
});

router.put("/FuelMaster/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { code, name, categoryId, details, color, status } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      UPDATE      fuelMaster
      SET         code = $2,
                  name = $3,
                  categoryId = $4,
                  details = $5,
                  color = $6,
                  status = $7
      WHERE       id = $1
    `, [id, code, name, categoryId, details, color, status]);

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

router.delete("/FuelMaster/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      DELETE
      FROM        fuelMaster
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