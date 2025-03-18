const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/employees", async (req, res) => {
  try {
    const { typeId } = req.params;
    const result = await pool.query(`
      SELECT    id,
                code,
                firstName,
                middleName,
                lastName
      FROM      employee
    `, [typeId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/employees/:id", async (req, res) => {
  try {
    const { typeId, id } = req.params;
    const result = await pool.query(`
      SELECT    id,
                code,
                firstName,
                middleName,
                lastName
      FROM      employee
      WHERE     id = $1
    `, [id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/employee", async (req, res) => {
  const client = await pool.connect();

  try {
    const { code, firstName, middleName, lastName, birthDate, genderId, civilStatusId, address, provinceId, cityId, barangayId, dateHired, stationId, departmentId, designationId, employeeStatusId, contactNo, email } = req.body;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      INSERT INTO employee
                  (
                    code,
                    firstName,
                    middleName, 
                    lastName,
                    birthDate,
                    genderId,
                    civilStatusId,
                    address,
                    provinceId,
                    cityId,
                    barangayId,
                    dateHired,
                    stationId,
                    departmentId,
                    designationId,
                    employeeStatusId,
                    contactNo,
                    email
                  )
      VALUES      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    `, [code, firstName, middleName, lastName, birthDate, genderId, civilStatusId, address, provinceId, cityId, barangayId, dateHired, stationId, departmentId, designationId, employeeStatusId, contactNo, email]);
    
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

router.put("/employee/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { code, firstName, middleName, lastName, birthDate, genderId, civilStatusId, address, provinceId, cityId, barangayId, dateHired, stationId, departmentId, designationId, employeeStatusId, contactNo, email } = req.body;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      UPDATE      department_hdr
      SET         firstName = $2,
                  middleName = $3,
                  lastName = $4,
                  birthDate = $5,
                  genderId = $6
                  civilStatusId = $7,
                  address = $8,
                  provinceId = $9,
                  cityId = $10,
                  barangayId = $11,
                  dateHired = $12,
                  stationId = $13,
                  departmentId = $14,
                  designationId = $15,
                  employeeStatusId = $16,
                  contactNo = $17,
                  email = $18
      WHERE       id = $1
    `, [id, code, firstName, middleName, lastName, birthDate, genderId, civilStatusId, address, provinceId, cityId, barangayId, dateHired, stationId, departmentId, designationId, employeeStatusId, contactNo, email]);
    
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

router.delete("/employee/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      DELETE
      FROM        employee
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