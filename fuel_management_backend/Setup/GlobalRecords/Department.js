const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/departments", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT      a.id,
                  a.name,
                  a.details,
                  a.status,
                  b.id              as "departmentLinId",
                  b.departmentHdrId as "departmentHdrId",
                  c.id              as "subDepartmentId",
                  c.name            as "subDepartment"
      FROM        departmentHdr a
      INNER JOIN  departmentLin b
              ON  a.id = b.departmentHdrId
      INNER JOIN  dropdown c
              ON  b.subDepartmentId = c.Id
                  AND c.dropdownTypeId = 18
    `);
    const resultFormatted = {};

    result.rows.forEach(row => {
      if (!resultFormatted[row.id]) {
        resultFormatted[row.id] = {
          id: row.id,
          name: row.name,
          details: row.details,
          status: row.status,
          departmentLin: []
        };
      }
      if (row.departmentLinId) {
        resultFormatted[row.id].departmentLin.push({
          id: row.departmentLinId,
          subDepartmentId: row.subDepartmentId,
          subDepartment: row.subDepartment
        });
      }
    });

    res.status(201).json(Object.values(resultFormatted));
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/departments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.name,
                  a.details,
                  a.status,
                  b.id              as "departmentLinId",
                  b.departmentHdrId as "departmentHdrId",
                  c.id              as "subDepartmentId",
                  c.name            as "subDepartment"
      FROM        departmentHdr a
      INNER JOIN  departmentLin b
              ON  a.id = b.departmentHdrId
      INNER JOIN  dropdown c
              ON  b.subDepartmentId = c.Id
                  AND c.dropdownTypeId = 18
      WHERE       a.id = $1
    `, [id]);
    const resultFormatted = {};

    result.rows.forEach(row => {
      if (!resultFormatted[row.id]) {
        resultFormatted[row.id] = {
          id: row.id,
          name: row.name,
          details: row.details,
          status: row.status,
          departmentLin: []
        };
      }
      if (row.departmentLinId) {
        resultFormatted[row.id].departmentLin.push({
          id: row.departmentLinId,
          subDepartmentId: row.subDepartmentId,
          subDepartment: row.subDepartment
        });
      }
    });

    res.status(201).json(Object.values(resultFormatted));
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/deparment", async (req, res) => {
  const client = await pool.connect();

  try {
    const { name, subDepartments, details, status } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO departmentHdr
                  (name, details, status)
      VALUES      ($1, $2, $3)
      RETURNING   id
    `, [name, details, status]);
    const id = result.rows[0].id;
    
    const subDepartmentItems = [];
    const subDepartmentQuery = subDepartments.map((item, index) => {
      const base = index * 2;
      subDepartmentItems.push(id, item.subDepartmentId);

      return `($${base + 1}, $${base + 2})`;
    }).join(",");
    await client.query(`
      INSERT INTO departmentLin
                  (departmentHdrId, subDepartmentId)
      VALUES      ${subDepartmentQuery}
    `, subDepartmentItems);

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

router.put("/department/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { name, subDepartments, details, status } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      UPDATE      departmentHdr
      SET         name = $2
                  details = $3,
                  status = $4
      WHERE       id = $1
    `, [id, name, details, status]);

    await client.query(`
      DELETE
      FROM        departmentLin
      WHERE       departmentHdrId = $1
    `, [id]);

    const subDepartmentItems = [];
    const subDepartmentQuery = subDepartments.map((item, index) => {
      const base = index * 2;
      subDepartmentItems.push(id, item.subDepartmentId);

      return `($${base + 1}, $${base + 2})`;
    }).join(",");
    await client.query(`
      INSERT INTO departmentLin
                  (departmentHdrId, subDepartmentId)
      VALUES      ${subDepartmentQuery}
    `, subDepartmentItems);

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

router.delete("/department/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      DELETE
      FROM        departmentHdr
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