const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");
 
router.get("/fuelDeliveries", async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(`
        SELECT      a.id,
                    a.effectiveDate,
                    a.stationId,
                    b.name            station,
                    b.code            stationcode,
                    a.shiftManagerId,
                    fn_getEmployeeName( cast( a.shiftManagerId as integer) ) shiftmanager,
                    a.shiftId,
                    d.name            shift,
                    a.deliveryNo      deliveryno,
                    a.hauler,
                    a.plateNo,
                    a.driver,
                    a.receiverId,
                    f.lastName        receiver
        FROM        fuelDelivery a
        INNER JOIN  station b
                ON  a.stationId = b.id
        INNER JOIN  stationShift c
                ON  b.id = c.stationId
        INNER JOIN  shift d
                ON  c.shiftId = d.id
        INNER JOIN  stationShiftCrew e
                ON  c.id = e.stationShiftId
        INNER JOIN  employee f
                ON  e.employeeId = f.id
    `);

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

router.get("/fuelDeliveries/:effectiveDate/:stationids", async (req, res) => {

  const { effectiveDate, stationids  } = req.params;
  const stationIdsArray = stationids.split(',').map(id => parseInt(id.trim()));
  try {
     // Extract effectiveDate from the path parameter

    const result = await pool.query(`
        SELECT      a.id,
                    a.effectiveDate,
                    a.stationId,
                    b.name AS station,
                    b.code AS stationcode,
                    a.shiftManagerId,
                    fn_getEmployeeName( cast( a.shiftManagerId as integer) ) shiftmanager,
                    a.shiftId,
                    d.name AS shift,
                    a.deliveryNo deliveryno,
                    a.hauler,
                    a.plateNo,
                    a.driver,
                    a.receiverId,
                    fn_getEmployeeName( cast( a.receiverId as integer) ) AS receiver
        FROM        fuelDelivery a
        INNER JOIN  station b
                ON  a.stationId = b.id
        INNER JOIN  stationShift c
                ON  b.id = c.stationId
				        AND c.shiftid = a.shiftid
        INNER JOIN  shift d
                ON  c.shiftId = d.id
        --INNER JOIN  stationShiftCrew e
        --        ON  c.id = e.stationShiftId
        --INNER JOIN  employee f
        --        ON  e.employeeId = f.id
        WHERE    1=1
        AND      a.effectiveDate <= $1
        AND      a.stationId = ANY ($2::int[])
    `, [effectiveDate, stationIdsArray]); // Use effectiveDate in the query 

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error", params: {effectiveDate, stationIdsArray} });
  }
});


router.get("/fuelDeliveries/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const result = await client.query(`
        SELECT      a.id,
                    a.effectiveDate,
                    a.stationId,
                    b.name AS station,
                    b.code AS stationcode,
                    a.shiftManagerId,
                    fn_getEmployeeName( cast( a.shiftManagerId as integer) ) shiftmanager,
                    a.shiftId,
                    d.name AS shift,
                    a.deliveryNo deliveryno,
                    a.hauler,
                    a.plateNo,
                    a.driver,
                    a.receiverId,
                    fn_getEmployeeName( cast( a.receiverId as integer) ) AS receiver
        FROM        fuelDelivery a
        INNER JOIN  station b
                ON  a.stationId = b.id
        INNER JOIN  stationShift c
                ON  b.id = c.stationId
				        AND c.shiftid = a.shiftid
        INNER JOIN  shift d
                ON  c.shiftId = d.id
        --INNER JOIN  stationShiftCrew e
        --        ON  c.id = e.stationShiftId
        --INNER JOIN  employee f
        --        ON  e.employeeId = f.id 
        WHERE       a.id = $1
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

router.post("/fuelDelivery", async (req, res) => {
  const client = await pool.connect();

  try {
  const { effectiveDate, stationId, shiftManagerId, deliveryNo, hauler, plateNo, driver, receiverId, shiftId } = req.body;

    await client.query("BEGIN");

    const result = await client.query(`
        INSERT INTO fuelDelivery
                    (
                        effectiveDate,
                        stationId,
                        shiftManagerId,
                        deliveryNo,
                        hauler,
                        plateNo,
                        driver,
                        receiverId,
                        shiftId
                    )
        VALUES      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING   id
    `, [effectiveDate, stationId, shiftManagerId, deliveryNo, hauler, plateNo, driver, receiverId,  shiftId]);

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

router.put("/fuelDelivery/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { effectiveDate, stationId, shiftManagerId, deliveryNo, hauler, plateNo, driver, receiverId } = req.body;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
        UPDATE      fuelDelivery
        SET         effectiveDate = $2,
                    stationId = $3,
                    shiftManagerId = $4,
                    deliveryNo = $5,
                    hauler = $6,
                    plateNo = $7,
                    driver = $8,
                    receiverId = $9
        WHERE       id = $1
    `, [id, effectiveDate, stationId, shiftManagerId, deliveryNo, hauler, plateNo, driver, receiverId]);

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

router.delete("/fuelDelivery/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN")
    
    const result = await client.query(`
      DELETE
      FROM        fuelDelivery
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