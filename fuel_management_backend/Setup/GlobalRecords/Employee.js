const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/employee/generate-emp-code", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT code FROM employee
      WHERE code LIKE 'EMP-%'
      ORDER BY id DESC
      LIMIT 1
    `);

    let newCode = "EMP-00001"; 

    if (result.rows.length > 0) {
      const lastCode = result.rows[0].code; 
      const lastNumber = parseInt(lastCode.split('-')[1], 10);
      const nextNumber = lastNumber + 1;

      newCode = `EMP-${nextNumber.toString().padStart(5, '0')}`;
    }

    res.status(200).json({ code: newCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/employees", async (req, res) => {
  try {
    // const { typeId } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.code,
                  a.firstName,
                  a.middleName, 
                  a.lastName,
                  CONCAT_WS(' ', a.firstName, a.middleName, a.lastName) AS fullName,
                  a.birthDate,
                  a.genderId,
                  b.name gender,
                  a.civilStatusId,
                  c.name civilStatus,
                  a.address,
                  a.provinceId,
                  d.name province,
                  a.cityId,
                  e.name city,
                  a.barangayId,
                  f.name barangay,
                  a.dateHired,
                  a.stationId,
                  g.name station,
                  a.departmentId,
                  h.name department,
                  a.designationId,
                  i.name designation,
                  a.employeeStatusId,
                  j.name employeeStatus,
                  a.contactNo,
                  a.email
      FROM        employee a
      INNER JOIN  dropdown b
              ON  a.genderId = b.id
                  AND b.dropdownTypeId = 4
      INNER JOIN  dropdown c
              ON  a.civilStatusId = c.id
                  AND c.dropdownTypeId = 5
      INNER JOIN  dropdown d
              ON  a.provinceId = d.id
                  AND d.dropdownTypeId = 14
      INNER JOIN  dropdown e
              ON  a.cityId = e.id
                  AND e.dropdownTypeId = 15
      INNER JOIN  dropdown f
              ON  a.barangayId = f.id
                  AND f.dropdownTypeId = 16
      INNER JOIN  station g
              ON  a.stationId = g.id
      INNER JOIN  departmenthdr h
              ON  a.departmentId = h.id
      INNER JOIN  dropdown i
              ON  a.designationId = i.id
                  AND i.dropdownTypeId = 2
      INNER JOIN  dropdown j
              ON  a.employeeStatusId = j.id
                  AND j.dropdownTypeId = 7
    `);
    // console.log(result.rows);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.code,
                  a.firstName,
                  a.middleName, 
                  a.lastName,
                  a.birthDate,
                  a.genderId,
                  b.name gender,
                  a.civilStatusId,
                  c.name civilStatus,
                  a.address,
                  a.provinceId,
                  d.name province,
                  a.cityId,
                  e.name city,
                  a.barangayId,
                  f.name barangay,
                  a.dateHired,
                  a.stationId,
                  g.name station,
                  a.departmentId,
                  h.name department,
                  a.designationId,
                  i.name designation,
                  a.employeeStatusId,
                  j.name employeeStatus,
                  a.contactNo,
                  a.email
      FROM        employee a
      INNER JOIN  dropdown b
              ON  a.genderId = b.id
                  AND b.dropdownTypeId = 4
      INNER JOIN  dropdown c
              ON  a.civilStatusId = c.id
                  AND c.dropdownTypeId = 5
      INNER JOIN  dropdown d
              ON  a.provinceId = d.id
                  AND d.dropdownTypeId = 14
      INNER JOIN  dropdown e
              ON  a.cityId = e.id
                  AND e.dropdownTypeId = 15
      INNER JOIN  dropdown f
              ON  a.barangayId = f.id
                  AND f.dropdownTypeId = 16
      INNER JOIN  stationHdr g
              ON  a.stationId = g.id
      INNER JOIN  departmentHdr h
              ON  a.departmentId = h.id
      INNER JOIN  dropdown i
              ON  a.designationId = i.id
                  AND i.dropdownTypeId = 2
      INNER JOIN  dropdown j
              ON  a.employeeStatusId = j.id
                  AND j.dropdownTypeId = 7
      WHERE       a.id = $1
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
    const { firstName, middleName, lastName, birthdate, genderId, civilStatusId, address, provinceId, cityId, barangayId, datehired, stationId, departmentId, designationId, employeeStatusId, contactNo, email } = req.body;
    
    await client.query("BEGIN");

    const codeResult = await client.query(`
      SELECT code FROM employee
      WHERE code LIKE 'EMP-%'
      ORDER BY id DESC
      LIMIT 1
    `);

    let newCode = "EMP-00001";

    if (codeResult.rows.length > 0) {
      const lastCode = codeResult.rows[0].code; 
      const lastNumber = parseInt(lastCode.split('-')[1], 10);
      const nextNumber = lastNumber + 1;
      newCode = `EMP-${nextNumber.toString().padStart(5, '0')}`;
    }
    
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
    `, [newCode, firstName, middleName, lastName, birthdate, genderId, civilStatusId, address, provinceId, cityId, barangayId, datehired, stationId, departmentId, designationId, employeeStatusId, contactNo, email]);
    
    // console.log(result.rows)

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
  const { firstName, middleName, lastName, birthdate, genderId, civilStatusId, address, provinceId, cityId, barangayId, datehired, stationId, departmentId, designationId, employeeStatusId, contactNo, email } = req.body;
  // console.log(req.body)
  const { id } = req.params;
  // console.log(id)
  try {
    const { id } = req.params;
    // const { firstName, middleName, lastName, birthdate, genderId, civilStatusId, address, provinceId, cityId, barangayId, datehired, stationId, departmentId, designationId, employeeStatusId, contactNo, email } = req.body;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      UPDATE      employee
      SET         firstName = $2,
                  middleName = $3,
                  lastName = $4,
                  birthDate = $5,
                  genderId = $6,
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
    `, [id, firstName, middleName, lastName, birthdate, genderId, civilStatusId, address, provinceId, cityId, barangayId, datehired, stationId, departmentId, designationId, employeeStatusId, contactNo, email]);
    
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