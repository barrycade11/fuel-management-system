const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/customer/:customerId/vehicles", async (req, res) => {
  try {
    const { customerId } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.plateNo,
                  a.vehicleMakeModelId,
                  b.name vehicleMakeModel,
                  a.details,
                  a.status
      FROM        customerVehicle a
      INNER JOIN  dropdown b
              ON  a.vehicleMakeModelId = b.id
                  AND b.dropdownTypeId = 10
      WHERE       a.customerId = $1
    `, [customerId]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.get("/customer/:customerId/vehicles/:id", async (req, res) => {
  try {
    const { customerId, id } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.plateNo,
                  a.vehicleMakeModelId,
                  b.name vehicleMakeModel,
                  a.details,
                  a.status
      FROM        customerVehicle a
      INNER JOIN  dropdown b
              ON  a.vehicleMakeModelId = b.id
                  AND b.dropdownTypeId = 10
      WHERE       a.customerId = $1
                  and a.id = $2
    `, [customerId, id]);
    res.status(201).json(result.rows);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

router.post("/customer/:customerId/vehicle", async (req, res) => {
  const client = await pool.connect();

  try {
    const { customerId } = req.params;
    const { plateNo, makeModelId, details, status } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
      INSERT INTO customerVehicle
                  (
                    customerId,
                    plateNo,
                    vehicleMakeModelId,
                    details,
                    status
                  )
      VALUES      ($1, $2, $3, $4, $5)
      RETURNING   id
    `, [customerId, plateNo, makeModelId, details, status]);
    
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

router.put("/customer/:customerId/vehicle/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { customerId, id } = req.params;
    const { plateNo, vehicleMakeModelId, details, status } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      UPDATE      customerVehicle
      SET         plateNo = $3,
                  vehicleMakeModelId = $4,
                  details = $5,
                  status = $6
      WHERE       customerId = $1
                  AND id = $2
    `, [customerId, id, plateNo, vehicleMakeModelId, details, status]);

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

router.delete("/customer/:customerId/vehicle/delete", async (req, res) => {
  const client = await pool.connect();

  try {
    const { customerId } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        customerVehicle
      WHERE       customerId = $1
    `, [customerId]);

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

module.exports = router;