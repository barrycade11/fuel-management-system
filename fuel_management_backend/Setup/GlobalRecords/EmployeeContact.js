const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/employee/:employeeId/contacts", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.relationshipId,
                  b.name relationship,
                  a.name,
                  a.contactNo contactNo2,
                  a.details
      FROM        employeeContact a
      INNER JOIN  dropdown b
              ON  a.relationshipId = b.id
                  AND b.dropdownTypeId = 6
      WHERE       a.employeeId = $1
    `, [employeeId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/employee/:employeeId/contacts/:id", async (req, res) => {
  try {
    const { employeeId, id } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.relationshipId,
                  b.name relationship,
                  a.contactNo contactNo2,
                  a.details
      FROM        employeeContact a
      INNER JOIN  dropdown b
              ON  a.relationshipId = b.id
                  AND b.dropdownTypeId = 6
      WHERE       a.employeeId = $1
                  AND a.id = $2
    `, [employeeId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/employee/:employeeId/contact", async (req, res) => {
  const client = await pool.connect();

  try {
    const { employeeId } = req.params;
    const { relationshipId, name, contactNo2, details, status } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO employeeContact
                  (
                    employeeId,
                    relationshipId,
                    name,
                    contactNo,
                    details,
                    status
                  )
      VALUES      ($1, $2, $3, $4, $5, $6)
      RETURNING   id
    `, [employeeId, relationshipId, name, contactNo2, details, status]);
    
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

router.put("/employee/:employeeId/contact/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { employeeId, id } = req.params;
    const { relationshipId, contactNo, details, status } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      employeeContact
      SET         relationshipId = $3,
                  contactNo = $4,
                  details = $5,
                  status = $6
      WHERE       employeeId = $1
                  AND id = $2
    `, [employeeId, id, relationshipId, contactNo, details, status]);

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

router.delete("/employee/:employeeId/contact/delete", async (req, res) => {
  const client = await pool.connect();

  try {
    const { employeeId, id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        employeeContact
      WHERE       employeeId = $1
                  AND id = $2
    `, [employeeId, id]);

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

router.delete("/employee/:employeeId/contact/delete", async (req, res) => {
  const client = await pool.connect();

  try {
    const { employeeId } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        employeeContact
      WHERE       employeeId = $1
    `, [employeeId]);

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