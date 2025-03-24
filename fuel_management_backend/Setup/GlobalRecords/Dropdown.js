const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/dropdowns/:typeId", async (req, res) => {
  // const { typeId, parentId } = req.params;
  // console.log(typeId)
  // console.log(parentId)
  try {
    const { typeId } = req.params;
    // const { typeId, parentId } = req.params;
    const result = await pool.query(`
      SELECT    id,
                name
      FROM      dropdown
      WHERE     dropdownTypeId = $1
    `, 
    // [typeId, parentId]);
    [typeId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

// router.get("/dropdowns/:typeId/:parentId/:id", async (req, res) => {
router.get("/dropdowns/:typeId/:id", async (req, res) => {
  // const { typeId, id } = req.params;
  // console.log(req.params)
  try {
    // const { typeId, id, parentId } = req.params;
    const { typeId, id } = req.params;
    const result = await pool.query(`
      SELECT    id,
                name
      FROM      dropdown
      WHERE     dropdownTypeId = $1
                AND id = $2
    `, 
    // [typeId, parentId, id]);
    [typeId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/dropdown/:typeId", async (req, res) => {
  const client = await pool.connect();

  try {
    const { typeId } = req.params;
    const { name } = req.body;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      INSERT INTO dropdown
                  (dropdownTypeId, name)
      VALUES      ($1, $2)
    `, [typeId, name]);

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

router.put("/dropdown/:typeId/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { typeId, id } = req.params;
    const { name } = req.body;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      UPDATE      dropdown
      SET         name = $3
      WHERE       dropdownTypeId = $1
                  AND id = $2
    `, [typeId, id, name]);

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

router.delete("/dropdown/:typeId/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { typeId, id } = req.params;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      DELETE
      FROM        dropdown
      WHERE       dropdownTypeId = $1
                  AND id = $2
    `, [typeId, id]);

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