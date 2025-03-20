const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/customers", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT      a.id,
                  a.code,
                  a.name,
                  a.tin,
                  a.billingAddress,
                  a.provinceId,
                  b.name province,
                  a.cityId,
                  c.name city,
                  a.barangayId,
                  d.barangay,
                  a.contactNo,
                  a.email,
                  a.taxCodeId,
                  e.name taxCode,
                  a.customerStatusId,
                  f.name customerStatus
      FROM        customer a
      INNER JOIN  dropdown b
              ON  a.provinceId = b.id
                  AND b.dropdownTypeId = 14
      INNER JOIN  dropdown c
              ON  a.cityId = c.id
                  AND c.dropdownTypeId = 15
      INNER JOIN  dropdown d
              ON  a.barangayId = d.id
                  AND d.dropdownTypeId = 16
      INNER JOIN  dropdown e
              ON  a.taxCodeId = e.id
                  AND e.dropdownTypeId = 9
      INNER JOIN  dropdown f
              ON  a.customerStatusId = f.id
                  AND f.dropdownTypeId = 8
    `);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.code,
                  a.name,
                  a.tin,
                  a.billingAddress,
                  a.provinceId,
                  b.name province,
                  a.cityId,
                  c.name city,
                  a.barangayId,
                  d.barangay,
                  a.contactNo,
                  a.email,
                  a.taxCodeId,
                  e.name taxCode,
                  a.customerStatusId,
                  f.name customerStatus
      FROM        customer a
      INNER JOIN  dropdown b
              ON  a.provinceId = b.id
                  AND b.dropdownTypeId = 14
      INNER JOIN  dropdown c
              ON  a.cityId = c.id
                  AND c.dropdownTypeId = 15
      INNER JOIN  dropdown d
              ON  a.barangayId = d.id
                  AND d.dropdownTypeId = 16
      INNER JOIN  dropdown e
              ON  a.taxCodeId = e.id
                  AND e.dropdownTypeId = 9
      INNER JOIN  dropdown f
              ON  a.customerStatusId = f.id
                  AND f.dropdownTypeId = 8
      WHERE       id = $1
    `, [id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/customer", async (req, res) => {
  const client = await pool.connect();

  try {
    const { code, name, tin, billingAddress, provinceId, cityId, barangayId, contactNo, email, taxCodeId, customerStatusId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO customer
                  (
                    code,
                    name,
                    tin,
                    billingAddress,
                    provinceId,
                    cityId,
                    barangayId,
                    contactNo,
                    email,
                    taxCodeId,
                    customerStatusId
                  )
      VALUES      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING   id
    `, [code, name, tin, billingAddress, provinceId, cityId, barangayId, contactNo, email, taxCodeId, customerStatusId]);
    
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

router.put("/customer/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { code, name, tin, billingAddress, provinceId, cityId, barangayId, contactNo, email, taxCodeId, customerStatusId } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      shift
      SET         code = $2,
                  name = $3,
                  tin = $4,
                  billingAddress = $5,
                  provinceId = $6,
                  cityId = $7,
                  barangayId = $8,
                  contactNo = $9,
                  email = $10,
                  taxCodeId = $11
                  customerStatusId = $12,
      WHERE       id = $1
    `, [code, name, tin, billingAddress, provinceId, cityId, barangayId, contactNo, email, taxCodeId, customerStatusId]);

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

router.delete("/customer/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        customer
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