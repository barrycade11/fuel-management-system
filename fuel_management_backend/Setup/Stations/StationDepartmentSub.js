const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/station/:stationId/department/:stationDepartmentId/subDepartments", async (req, res) => {
  try {
    const { stationId, stationDepartmentId } = req.params;

    const result = await pool.query(`
      SELECT      a.id,
                  a.subDepartmentId,
                  b.name subDepartment
      FROM        stationSubDepartment a
      INNER JOIN  subDepartment b
              ON  a.subDepartmentId = b.id
      WHERE       a.stationId = $1
                  AND a.stationDepartmentId = $2
    `, [stationId, stationDepartmentId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/station/:stationId/department/:stationDepartmentId/subDepartments/:id", async (req, res) => {
  try {
    const { stationId, stationDepartmentId, id } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.subDepartmentId,
                  b.name subDepartment
      FROM        stationSubDepartment a
      INNER JOIN  subDepartment b
              ON  a.subDepartmentId = b.id
      WHERE       a.stationId = $1
                  AND a.stationDepartmentId = $2
                  AND a.id = $3
    `, [stationId, stationDepartmentId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/station/:stationId/department/:stationDepartmentId/subDepartment", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId, stationDepartmentId } = req.params;
    const { subDepartmentId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO stationSubDepartment
                  (
                    stationDepartmentId,
                    subDepartmentId
                  )
      VALUES      ($1, $2)
      RETURNING   id
    `, [stationDepartmentId, subDepartmentId]);
    const id = result.rows[0].id;

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

router.put("/station/:stationId/department/:stationDepartmentId/subDepartment/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId, stationDepartmentId, id } = req.params;
    const { subDepartmentId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      UPDATE      stationSubDepartment
      SET         subDepartmentId = $3
      WHERE       stationId = $1
                  id = $2
    `, [stationDepartmentId, id, subDepartmentId]);

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

router.delete("/station/:stationId/department/:stationDepartmentId/subDepartment/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      DELETE
      FROM        stationSubDepartment
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