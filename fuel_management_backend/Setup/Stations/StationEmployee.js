const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/Station/:stationId/:shiftId/Employees", async (req, res) => {
    const client = await pool.connect();

    try {
        const { stationId, shiftId } = req.params;

        await client.query("BEGIN");

        const result = await client.query(`
            SELECT 		c.id, CONCAT(c.firstname, c.lastname) AS description
            FROM 		public.stationshift AS a
            LEFT JOIN	public.stationshiftcrew AS b
            ON			a.shiftid = b.stationshiftid
            LEFT JOIN	public.employee AS c
            ON			b.employeeid = c.id
            WHERE		a.stationid = $1
            AND			a.shiftid = $2

        `, [stationId, shiftId]);

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