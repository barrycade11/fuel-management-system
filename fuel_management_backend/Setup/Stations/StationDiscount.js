const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/station/:stationId/discounts", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      a.id,
                  a.discountId,
                  b.code,
                  b.name,
                  b.criteriaId,
                  c.name criteria,
                  b.qualifierValue,
                  b.discountTypeId,
                  d.name discountType,
                  b.discountValue,
                  b.chargeToId,
                  e.name chargeTo,
                  b.maxLimit,
                  b.details,
                  b.status
      FROM        stationShift a
      INNER JOIN  discountHdr b
              ON  a.discountId = b.id
      INNER JOIN  dropdown c
              ON  b.criteriaId = c.id
                  AND c.dropdownTypeId = 17
      INNER JOIN  dropdown d
              ON  b.discountTypeId = d.id
                  AND d.dropdownTypeId = 18
      INNER JOIN  dropdown e
              ON  b.chargeToId = e.id
                  AND e.dropdownTypeId = 1
      WHERE       a.stationId = $1
    `, [stationId]);

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

router.get("/station/:stationId/discounts/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId, id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
      SELECT      a.id,
                  a.discountId,
                  b.code,
                  b.name,
                  b.criteriaId,
                  c.name criteria,
                  b.qualifierValue,
                  b.discountTypeId,
                  d.name discountType,
                  b.discountValue,
                  b.chargeToId,
                  e.name chargeTo,
                  b.maxLimit,
                  b.details,
                  b.status
      FROM        stationShift a
      INNER JOIN  discountHdr b
              ON  a.discountId = b.id
      INNER JOIN  dropdown c
              ON  b.criteriaId = c.id
                  AND c.dropdownTypeId = 17
      INNER JOIN  dropdown d
              ON  b.discountTypeId = d.id
                  AND d.dropdownTypeId = 18
      INNER JOIN  dropdown e
              ON  b.chargeToId = e.id
                  AND e.dropdownTypeId = 1
      WHERE       a.stationId = $1
                  AND a.id = $2
    `, [stationId, id]);

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

router.post("/station/:stationId/discount", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId } = req.params;
    const { discountId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO stationDiscount
                  (
                    stationId,
                    discountId
                  )
      VALUES      ($1, $2)
      RETURNING   id
    `, [stationId, discountId]);
    
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

router.put("/station/:stationId/discount/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { stationId, id } = req.params;
    const { discountId } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      stationDiscount
      SET         discountId = $3
      WHERE       stationId = $1
                  AND id = $2
    `, [stationId, id, discountId]);

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

router.delete("/station/:stationId/discount/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        stationDiscount
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