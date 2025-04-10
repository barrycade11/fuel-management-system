const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/discounts", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT      a.id,
                  a.code,
                  a.name,
                  a.criteriaId        AS "criteriaId",
                  b.name              AS "criteria",
                  a.qualifierValue    AS "qualifierValue",
                  a.discountTypeId    AS "discountTypeId",
                  c.name              AS "discountType",
                  a.discountValue     AS "discountValue",
                  a.chargeToId        AS "chargeToId",
                  d.name              AS "chargeTo",
                  a.maxlimit          AS "maxLimit",
                  a.startdate         AS "startDate",
                  a.enddate           AS "endDate",
                  a.details,
                  a.status,
                  e.id                AS "discountLinId",
                  f.id                AS "applicabilityId",
                  f.name              AS "applicability"
      FROM        discountHdr a
      LEFT JOIN  dropdown b
              ON  a.criteriaId = b.id
                  AND b.dropdownTypeId = 17
      LEFT JOIN  dropdown c
              ON  a.discountTypeId = c.id
                  AND c.dropdownTypeId = 18
      LEFT JOIN  dropdown d
              ON  a.chargeToId = d.id
                  AND d.dropdownTypeId = 1
      LEFT JOIN  discountLin e
              ON  a.id = e.discountHdrId
      LEFT JOIN  departmentHdr f
              ON  e.applicabilityId = f.id
    `);
    const resultFormatted = {};

    result.rows.forEach(row => {
      if (!resultFormatted[row.id]) {
        resultFormatted[row.id] = {
          id: row.id,
          code: row.code,
          name: row.name,
          criteriaId: row.criteriaId,
          criteria: row.criteria,
          qualifierValue: row.qualifierValue,
          discountTypeId: row.discountTypeId,
          discountType: row.discountType,
          discountValue: row.discountValue,
          chargeToId: row.chargeToId,
          chargeTo: row.chargeTo,
          maxLimit: row.maxLimit,
          startDate: row.startDate,
          endDate: row.endDate,
          details: row.details,
          status: row.status,
          discountLin: []
        };
      }
      if (row.discountLinId) {
        resultFormatted[row.id].discountLin.push({
          id: row.discountLinId,
          applicabilityId: row.applicabilityId,
          applicability: row.applicability
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

router.get("/discounts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT      a.id,
                  a.code,
                  a.name,
                  a.criteriaId        AS "criteriaId",
                  b.name              AS "criteria",
                  a.qualifierValue    AS "qualifierValue",
                  a.discountTypeId    AS "discountTypeId",
                  c.name              AS "discountType",
                  a.discountValue     AS "discountValue",
                  a.chargeToId        AS "chargeToId",
                  d.name              AS "chargeTo",
                  a.maxlimit          AS "maxLimit",
                  a.startdate         AS "startDate",
                  a.enddate           AS "endDate",
                  a.details,
                  a.status,
                  e.id                AS "discountLinId",
                  f.id                AS "applicabilityId",
                  f.name              AS "applicability"
      FROM        discountHdr a
      INNER JOIN  dropdown b
              ON  a.criteriaId = b.id
                  AND b.dropdownTypeId = 17
      INNER JOIN  dropdown c
              ON  a.discountTypeId = c.id
                  AND c.dropdownTypeId = 18
      INNER JOIN  dropdown d
              ON  a.chargeToId = d.id
                  AND d.dropdownTypeId = 1
      INNER JOIN  discountLin e
              ON  a.id = e.discountHdrId
      INNER JOIN  departmentHdr f
              ON  e.applicabilityId = f.id
      WHERE       a.id = $1
    `, [id]);
    const resultFormatted = {};

    result.rows.forEach(row => {
      if (!resultFormatted[row.id]) {
        resultFormatted[row.id] = {
          id: row.id,
          code: row.code,
          name: row.name,
          criteriaId: row.criteriaId,
          criteria: row.criteria,
          qualifierValue: row.qualifierValue,
          discountTypeId: row.discountTypeId,
          discountType: row.discountType,
          discountValue: row.discountValue,
          chargeToId: row.chargeToId,
          chargeTo: row.chargeTo,
          maxLimit: row.maxLimit,
          startDate: row.startDate,
          endDate: row.endDate,
          details: row.details,
          status: row.status,
          discountLin: []
        };
      }
      if (row.discountLinId) {
        resultFormatted[row.id].discountLin.push({
          id: row.discountLinId,
          applicabilityId: row.applicabilityId,
          applicability: row.applicability
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

router.post("/discount", async (req, res) => {
  const client = await pool.connect();
  const { code, name, applicabilities, criteriaId, qualifierValue, discountTypeId, discountValue, chargeToId, maxLimit, startDate, endDate, details, status } = req.body;
  // console.log(req.body)
  try {
    // const { code, name, applicabilities, criteriaId, qualifierValue, discountTypeId, discountValue, chargeToId, maxLimit, startDate, endDate, details, status } = req.body;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      INSERT INTO discounthdr
                  (
                    code,
                    name,
                    criteriaid,
                    qualifiervalue,
                    discounttypeid,
                    discountvalue,
                    chargetoid,
                    maxlimit,
                    startdate,
                    enddate,
                    details,
                    status
                  )
      VALUES      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING   id
    `, [code, name, criteriaId, qualifierValue, discountTypeId, discountValue, chargeToId, maxLimit, startDate, endDate, details, status]);
    
    const id = result.rows[0].id;

    // console.log(id)

    // const applicabilityItems = [];
    // const applicabilityQuery = applicabilities.map((item, index) => {
    //   const base = index * 2;
    //   applicabilityItems.push(id, item.applicabilityId);

    //   return `($${base + 1}, $${base + 2})`;
    // }).join(",");
    // await client.query(`
    //   INSERT INTO discountlin
    //               (discounthdrid, applicabilityid)
    //   VALUES      ${applicabilityQuery}
    // `, applicabilityItems);

    const applicabilityItems = [];
    const values = [];

    applicabilities.forEach((item, index) => {
      applicabilityItems.push(`($${index * 2 + 1}, $${index * 2 + 2})`);
      values.push(id, item.applicabilityId);
    });

    const applicabilityQuery = applicabilityItems.join(",");

    // console.log('Applicability Query:', applicabilityQuery);
    // console.log('Applicability Values:', values);

    await client.query(`
      INSERT INTO discountlin (discounthdrid, applicabilityid)
      VALUES ${applicabilityQuery}
    `, values);

    await client.query("COMMIT");
    
    res.status(201).json(result.rows);
  }
  catch (err) {
    await client.query("ROLLBACK");

    // res.status(500).json({ error: "Database query error" });
    console.error("Error inserting discount:", err);
    res.status(500).json({ error: err.message });
  }
  finally {
    client.release();
  }
});

router.put("/discount/:id", async (req, res) => {
  const client = await pool.connect();
  const { code, name, applicabilities, criteriaId, qualifierValue, discountTypeId, discountValue, chargeToId, maxLimit, startDate, endDate, details, status } = req.body;
  // console.log(req.body)
  try {
    const { id } = req.params;
    // const { code, name, applicabilities, criteriaId, qualifierValue, discountTypeId, discountValue, chargeToId, maxLimit, startDate, endDate, details, status } = req.body;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      UPDATE      discounthdr
      SET         code = $2,
                  name = $3,
                  criteriaid = $4,
                  qualifiervalue = $5,
                  discounttypeid = $6,
                  discountvalue = $7,
                  chargetoid = $8,
                  maxlimit = $9,
                  startdate = $10,
                  enddate = $11,
                  details = $12,
                  status = $13 
      WHERE       id = $1
    `, [id, code, name, criteriaId, qualifierValue, discountTypeId, discountValue, chargeToId, maxLimit, startDate, endDate, details, status]);
    
    // console.log(id)

    await client.query(`
      DELETE
      FROM        discountlin
      WHERE       discounthdrid = $1
    `, [id]);

    const applicabilityItems = [];
    const applicabilityQuery = applicabilities.map((item, index) => {
      const base = index * 2;
      applicabilityItems.push(id, item.applicabilityId);

      return `($${base + 1}, $${base + 2})`;
    }).join(",");
    await client.query(`
      INSERT INTO discountlin
                  (discounthdrid, applicabilityid)
      VALUES      ${applicabilityQuery}
    `, applicabilityItems);

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

router.delete("/discount/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    
    await client.query("BEGIN");
    
    const result = await client.query(`
      DELETE
      FROM        discounthdr
      WHERE       id = $1
    `, [id]);

    await client.query(`
      DELETE
      FROM        discountlin
      WHERE       discounthdrid = $1
    `, [id]);
    
    await client.query("COMMIT");
    
    res.status(201).json(result.rows);
  }
  catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
    // res.status(500).json({ error: "Database query error" });
  }
  finally {
    client.release();
  }
});

module.exports = router;