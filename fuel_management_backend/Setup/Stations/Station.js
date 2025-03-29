const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/stations", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT      a.id,
                  a.code,
                  a.name,
                  a.details,
                  a.address,
                  a.provinceId,
                  b.name province,
                  a.cityId,
                  c.name city,
                  a.barangayId,
                  d.name barangay,
                  a.openingTime,
                  a.closingTime,
                  a.pumps,
                  a.nozzles,
                  a.fillingPosition,
                  a.posStation,
                  a.shipToNumber
      FROM        station a
      INNER JOIN  dropdown b
              ON  a.provinceId = b.id
                  AND b.dropdownTypeId = 14
      INNER JOIN  dropdown c
              ON  a.cityId = c.id
                  and c.dropdownTypeId = 15
      INNER JOIN  dropdown d
              ON  a.barangayId = d.id
                  AND d.dropdownTypeId = 16
    `);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/stations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.code,
                  a.name,
                  a.details,
                  a.address,
                  a.provinceId,
                  b.name province,
                  a.cityId,
                  c.name city,
                  a.barangayId,
                  d.name barangay,
                  a.openingTime,
                  a.closingTime,
                  a.pumps,
                  a.nozzles,
                  a.fillingPosition,
                  a.posStation,
                  a.shipToNumber
      FROM        station a
      INNER JOIN  dropdown b
              ON  a.provinceId = b.id
                  AND b.dropdownTypeId = 14
      INNER JOIN  dropdown c
              ON  a.cityId = c.id
                  and c.dropdownTypeId = 15
      INNER JOIN  dropdown d
              ON  a.barangayId = d.id
                  AND d.dropdownTypeId = 16
      WHERE       a.id = $1
    `, [id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/station", async (req, res) => {
  const client = await pool.connect();

  try {
    const { code, name, details, address, provinceId, cityId, barangayId, openingTime, closingTime, pumps, nozzles, fillingPosition, posStation, shipToNumber } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO station
                  (
                    code,
                    name,
                    details,
                    address,
                    provinceId,
                    cityId,
                    barangayId,
                    openingTime,
                    closingTime,
                    pumps,
                    nozzles,
                    fillingPosition,
                    posStation,
                    shipToNumber
                  )
      VALUES      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING   id
    `, [code, name, details, address, provinceId, cityId, barangayId, openingTime, closingTime, pumps, nozzles, fillingPosition, posStation, shipToNumber]);
    
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

router.put("/station/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { code, name, details, address, provinceId, cityId, barangayId, openingTime, closingTime, pumps, nozzles, fillingPosition, posStation, shipToNumber } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      station
      SET         code = $2,
                  name = $3,
                  details = $4,
                  address = $5,
                  provinceId = $6,
                  cityId = $7,
                  barangayId = $8,
                  openingTime = $9,
                  closingTime = $10,
                  pumps = $11,
                  nozzles = $12,
                  fillingPosition = $13,
                  posStation = $14,
                  shipToNumber = $15
      WHERE       id = $1
    `, [id, code, name, details, address, provinceId, cityId, barangayId, openingTime, closingTime, pumps, nozzles, fillingPosition, posStation, shipToNumber]);

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

router.delete("/station/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        station
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