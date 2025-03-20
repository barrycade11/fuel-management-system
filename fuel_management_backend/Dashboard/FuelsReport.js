const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/fuels-sales", async (req, res) => {
    try {
        const { startDate, endDate, stations } = req.query
        let cleanStations = stations.reduce((station, accumulator)=> accumulator+= "'"+station+"'", '')
        const result = await pool.query(`
                SELECT      *
                FROM        fuelsales
                WHERE       soldat  BETWEEN'${startDate}' AND '${endDate}'
                            station IN (${cleanStations})
        `);
        res.status(201).json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query error" });
    }
});

router.get("/other-products-sales", async (req, res) => {
    try {
        const { startDate, endDate, stations } = req.query
        let cleanStations = stations.reduce((station, accumulator)=> accumulator+= "'"+station+"'", '')
        const result = await pool.query(`
                SELECT      *
                FROM        otherproducts
                WHERE       soldat  BETWEEN'${startDate}' AND '${endDate}'
                            station IN (${cleanStations})
        `);
        res.status(201).json(result.rows);
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
      SELECT      id,
                  name,
                  details,
                  status
      FROM        departmentHdr a
      WHERE       id = $1
    `, [id]);
        res.status(201).json(result.rows);
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