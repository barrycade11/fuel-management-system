const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection");

router.get("/Station/:stationId/:shiftId/Employees", async (req, res) => {
    try {
        const { stationId, shiftId } = req.params;

        const result = await pool.query(`
            SELECT 		c.id, CONCAT(c.firstname, c.lastname) AS description
            FROM 		public.stationshift AS a
            LEFT JOIN	public.stationshiftcrew AS b
            ON			a.shiftid = b.stationshiftid
            LEFT JOIN	public.employee AS c
            ON			b.employeeid = c.id
            WHERE		a.stationid = $1
            AND			a.shiftid = $2

        `, [stationId, shiftId]);
        res.status(201).json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query error" });
    }
});

module.exports = router;