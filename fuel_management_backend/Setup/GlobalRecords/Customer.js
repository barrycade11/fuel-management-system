const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/customer/generate-cus-code", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT code FROM customer
      WHERE code LIKE 'CUS-%'
      ORDER BY id DESC
      LIMIT 1
    `);

    let newCode = "CUS-00001"; 

    if (result.rows.length > 0) {
      const lastCode = result.rows[0].code; 
      const lastNumber = parseInt(lastCode.split('-')[1], 10);
      const nextNumber = lastNumber + 1;

      newCode = `CUS-${nextNumber.toString().padStart(5, '0')}`;
    }

    res.status(200).json({ code: newCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/customers", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT      a.id,
                  a.code,
                  a.name,
                  a.tin,
                  a.billingaddress AS "billingAddress",
                  a.provinceId AS "provinceId",
                  b.name province,
                  a.cityId AS "cityId",
                  c.name city,
                  a.barangayId AS "barangayId",
                  d.name barangay,
                  a.contactno AS "contactNo",
                  a.email,
                  a.taxCodeId AS "taxCodeId",
                  e.name AS "taxCode",
                  a.customerStatusId AS "customerStatusId",
                  f.name AS "customerStatus",
                  g.id AS "customerLinId",
                  h.id AS "stationId",
                  h.name AS "station" 
      FROM        customer a
      LEFT JOIN  dropdown b
              ON  a.provinceId = b.id
                  AND b.dropdownTypeId = 14
      LEFT JOIN  dropdown c
              ON  a.cityId = c.id
                  AND c.dropdownTypeId = 15
      LEFT JOIN  dropdown d
              ON  a.barangayId = d.id
                  AND d.dropdownTypeId = 16
      LEFT JOIN  dropdown e
              ON  a.taxCodeId = e.id
                  AND e.dropdownTypeId = 9
      LEFT JOIN  dropdown f
              ON  a.customerStatusId = f.id
                  AND f.dropdownTypeId = 8
      LEFT JOIN  customerLin g
              ON  a.id = g.customerid
      LEFT JOIN  station h
              ON  g.stationid = h.id
    `);
    const resultFormatted = {};

    result.rows.forEach(row => {
      if (!resultFormatted[row.id]) {
        resultFormatted[row.id] = {
          id: row.id,
          code: row.code,
          name: row.name,
          tin: row.tin,
          billingAddress: row.billingAddress, 
          provinceId: row.provinceId,
          province: row.province,
          cityId: row.cityId,
          city: row.city,
          barangayId: row.barangayId,
          barangay: row.barangay,
          contactNo: row.contactNo,
          email: row.email,
          taxCodeId: row.taxCodeId,
          taxCode: row.taxCode,
          customerStatusId: row.customerStatusId, 
          customerStatus: row.customerStatus,
          customerLin: []
        }
      }
      if (row.customerLinId) {
        resultFormatted[row.id].customerLin.push({
          id: row.customerLinId,
          stationId: row.stationId,
          station: row.station
        })
      }
    })

    res.status(201).json(Object.values(resultFormatted));
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/customer/:id", async (req, res) => {
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
                  d.name barangay,
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
  const { name, tin, stations, billingAddress, provinceId, cityId, barangayId, contactNo, email, taxCodeId, customerStatusId } = req.body;
  console.log(req.body)
  try {

    await client.query("BEGIN");
    const codeResult = await client.query(`
      SELECT code FROM customer
      WHERE code LIKE 'CUS-%'
      ORDER BY id DESC
      LIMIT 1
    `);

    let newCode = "CUS-00001";

    if (codeResult.rows.length > 0) {
      const lastCode = codeResult.rows[0].code; 
      const lastNumber = parseInt(lastCode.split('-')[1], 10);
      const nextNumber = lastNumber + 1;
      newCode = `CUS-${nextNumber.toString().padStart(5, '0')}`;
    }

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
    `, [newCode, name, tin, billingAddress, provinceId, cityId, barangayId, contactNo, email, taxCodeId, customerStatusId]);
    
    const id = result.rows[0].id;

    const stationItems = [];
    const values = [];

    stations.forEach((item, index) => {
      stationItems.push(`($${index * 2 + 1}, $${index * 2 + 2})`);
      values.push(id, item.stationId);
    });

    const stationQuery = stationItems.join(",");

    await client.query(`
      INSERT INTO customerlin (customerid, stationid)
      VALUES ${stationQuery}
    `, values);

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

router.put("/customer/:id", async (req, res) => {
  const client = await pool.connect();
  const { id } = req.params;
  const { name, tin, stations, billingAddress, provinceId, cityId, barangayId, contactNo, email, taxCodeId, customerStatusId } = req.body;
  // console.log(id)
  // console.log(req.body)
  try {
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      customer
      SET         name = $2,
                  tin = $3,
                  billingAddress = $4,
                  provinceId = $5,
                  cityId = $6,
                  barangayId = $7,
                  contactNo = $8,
                  email = $9,
                  taxCodeId = $10, 
                  customerStatusId = $11 
      WHERE       id = $1
    `, [id, name, tin, billingAddress, provinceId, cityId, barangayId, contactNo, email, taxCodeId, customerStatusId]);

    await client.query(`
      DELETE
      FROM        customerlin
      WHERE       customerid = $1
    `, [id]);

    const stationItems = [];
    const values = [];

    stations.forEach((item, index) => {
      stationItems.push(`($${index * 2 + 1}, $${index * 2 + 2})`);
      values.push(id, item.stationId);
    });

    const stationQuery = stationItems.join(",");

    await client.query(`
      INSERT INTO customerlin (customerid, stationid)
      VALUES ${stationQuery}
    `, values);

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

    await client.query(`
      DELETE
      FROM        customerlin
      WHERE       customerid = $1
    `, [id]);

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