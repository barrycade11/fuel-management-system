const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/department/:departmentHdrId/subDepartments", async (req, res) => {
  const client = await pool.connect();

  try {
    const { departmentHdrId } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      a.id,
                  a.subDepartmentId,
                  b.name subDepartment
      FROM        departmentLin a
      INNER JOIN  subDepartment b
              ON  a.subDepartmentId = b.Id
      WHERE       a.departmentHdrId = $1
    `, [departmentHdrId]);

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

router.get("/departments/:departmentHdrId/subDepartments/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { departmentHdrId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      a.id,
                  a.subDepartmentId,
                  b.name subDepartment
      FROM        departmentLin a
      INNER JOIN  subDepartment b
              ON  a.subDepartmentId = b.Id
      WHERE       a.departmentHdrId = $1
                  AND a.id = $2
    `, [departmentHdrId, id]);

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

router.post("/department/:departmentHdrId/subDepartment", async (req, res) => {
  const client = await pool.connect();

  try {
    const { departmentHdrId } = req.params;
    const { subDepartmentId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO departmentLin
                  (
                    departmentHdrId,
                    subDepartmentId
                  )
      VALUES      ($1, $2)
      RETURNING   id
    `, [departmentHdrId, subDepartmentId]);

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

router.put("/department/:departmentHdrId/subDepartment/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { departmentHdrId, id } = req.params;
    const { subDepartmentId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      UPDATE      departmentLin
      SET         subDepartmentId = $3
      WHERE       departmentHdrId = $1
                  AND id = $2
    `, [departmentHdrId, id, subDepartmentId]);

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

router.delete("/department/:departmentHdrId/subDepartment/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { departmentHdrId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      DELETE
      FROM        departmentLin
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