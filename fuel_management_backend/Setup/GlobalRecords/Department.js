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
                  b.id            departmentLinId,
                  c.id            subDepartmentId,
                  b.name          subDepartment
      FROM        departmentHdr a
      INNER JOIN  departmentLin b
              ON  a.id = b.departmentHdrId
      INNER JOIN  subDepartment c
              ON  b.subDepartmentId = c.Id
    `);
    const resultFormatted = {};

    result.rows.forEach(row => {
      if (!resultFormatted[row.id]) {
        formattedResult[row.id] = {
          id: row.id,
          title: row.name,
          details: row.details,
          status: row.status,
          departmentLin: []
        };
      }
      if (row.detail_id) {
        resultFormatted[row.id].departmentLin.push({
            id: row.departmentLinId,
            subDepartmentId: row.subDepartmentId,
            description: row.subDepartment
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
                  b.id            departmentLinId,
                  c.id            subDepartmentId,
                  c.name          subDepartment
      FROM        departmentHdr a
      INNER JOIN  departmentLin b
              ON  a.id = b.departmentHdrId
      INNER JOIN  subDepartment c
              ON  b.subDepartmentId = c.Id
      WHERE       a.id = $1
    `, [id]);
    const resultFormatted = {};

    result.rows.forEach(row => {
      if (!resultFormatted[row.id]) {
        formattedResult[row.id] = {
          id: row.id,
          title: row.name,
          details: row.details,
          status: row.status,
          departmentLin: []
        };
      }
      if (row.detail_id) {
        resultFormatted[row.id].departmentLin.push({
            id: row.departmentLinId,
            subDepartmentId: row.subDepartmentId,
            description: row.subDepartment
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
    const { name, details, statusId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      UPDATE      departmentHdr
      SET         name = $2
                  details = $3,
                  statusId = $4
      WHERE       id = $1
    `, [id, name, details, statusId]);

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