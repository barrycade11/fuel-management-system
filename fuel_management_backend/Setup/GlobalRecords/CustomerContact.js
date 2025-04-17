const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/customer/:customerId/contacts", async (req, res) => {
  const client = await pool.connect();

  try {
    const { customerId } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      id,
                  name,
                  contactNo contactNo2,
                  details
      FROM        customerContactPerson
      WHERE       customerId = $1
    `, [customerId]);

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

router.get("/customer/:customerId/contact/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { customerId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      id,
                  name,
                  contactNo,
                  details
      FROM        customerContactPerson
      WHERE       customerId = $1
                  and id = $2
    `, [customerId, id]);

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

router.post("/customer/:customerId/contact", async (req, res) => {
  const client = await pool.connect();

  try {
    const { customerId } = req.params;
    const { name, contactNo2, details } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO customerContactPerson
                  (
                    customerId,
                    name,
                    contactNo,
                    details
                  )
      VALUES      ($1, $2, $3, $4)
      RETURNING   id
    `, [customerId, name, contactNo2, details]);
    
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

router.put("/customer/:customerId/contactPerson/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { customerId, id } = req.params;
    const { name, contactNo2, details } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      customerContactPerson
      SET         name = $3,
                  contactNo = $4,
                  details = $5
      WHERE       customerId = $1
                  AND id = $2
    `, [customerId, id, name, contactNo2, details]);

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

router.delete("/customer/:customerId/contact/delete", async (req, res) => {
  const client = await pool.connect();

  try {
    const { customerId } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        customerContactPerson
      WHERE       customerId = $1
    `, [customerId]);

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

module.exports = router;