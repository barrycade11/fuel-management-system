const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");

router.get("/Fuel-Sales", async (req, res) => {
    try {
        let tempData =
            [
                {
                    label: 'VPR',
                    backgroundColor: 'red',
                    data: ["10000", "23000", "35000", "50000"],
                },
                {
                    label: 'VPG',
                    backgroundColor: 'green',
                    data: ["39000", "22000", "15000", "50000"],
                },
                {
                    label: 'VPD',
                    backgroundColor: 'yellow',
                    data: ["23463", "8673", "15000", "50000"],
                },
                {
                    label: 'FSG',
                    backgroundColor: 'blue',
                    data: ["34564", "67823", "123345", "50000"],
                },
                {
                    label: 'FSD',
                    backgroundColor: 'cyan',
                    data: ["123134", "34531", "34563", "50000"],
                }
            ]

        // const { selectedStations, startDate, endDate } = req.query;
        
        // const queryResults = await Promise.all(
        //     JSON.parse(selectedStations)?.map((item) => {
        //         return new Promise(async (resolve, reject) => {
        //             const res = await pool.query(
        //                 `
        //                     SELECT 		a.fuelmasterid, b.code, CAST(SUM(a.amount) AS double precision)
        //                     FROM 		public.dailysalesinput_fuellin AS a
        //                     LEFT JOIN	public.fuelmaster AS b
        //                     ON			a.fuelmasterid = b.id
        //                     WHERE		dailysalesinputfuelhdrid IN (
        //                                     SELECT 		b.id 
        //                                     FROM 		public.dailysalesinput_hdr AS a
        //                                     LEFT JOIN	public.dailysalesinput_fuelhdr AS b
        //                                     ON			a."ID" = b.dailysalesinputid
        //                                     WHERE 		a.station_id = $1
        //                                     AND			a.effectivity_date BETWEEN $2 AND $3
        //                                     --AND			a.input_mode = 3
        //                                 )
        //                     GROUP BY a.fuelmasterid, b.code
        //                 `,
        //                 [
        //                     item,
        //                     startDate,
        //                     endDate
        //                 ]
        //             );
        //             return resolve(res.rows)
        //         })
        //     })
        // )
        res.status(201).json(tempData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query error" });
    }
});

router.get("/OtherProduct-Sales", async (req, res) => {
    try {
        let tempData =
            [
                {
                    label: "FC Lubes",
                    backgroundColor: "#0891b2",
                    data: ["10000", "23000", "35000", "11000"],
                },
                {
                    label: "Select",
                    backgroundColor: "#0ea5e9",
                    data: ["39000", "22000", "15000", "56756"],
                },
                {
                    label: "SHOC",
                    backgroundColor: "#3b82f6",
                    data: ["23463", "8673", "15000", "23464"],
                },
                {
                    label: "OCPD",
                    backgroundColor: "#6366f1",
                    data: ["34564", "67823", "123345", "34534"],
                }
            ]
        console.log(req.query)
        res.status(201).json(tempData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query error" });
    }
});

router.get("/KPI", async (req, res) => {
    try {
        let tempData1 = [
            {
                color: 'yellow',
                title: 'Total Fuel',
                total: 51316.95,
                percentage: 96,
                target: 49200.50,
                prior: 45216.06
            },
            {
                color: 'green',
                title: 'V-Power',
                total: 51316.95,
                percentage: 104,
                target: 49200.50,
                prior: 45216.06
            },
            {
                color: 'blue',
                title: 'EV Charging',
                total: 39,
                percentage: 186,
                target: 21,
                prior: 30
            },
            {
                color: 'green',
                title: 'NBS',
                total: 21,
                percentage: 100,
                target: 21,
                prior: 30
            },
            {
                color: 'blue',
                title: 'Shell Go+',
                total: 34,
                percentage: 139,
                target: 25,
                prior: 34
            },
            {
                color: 'green',
                title: 'Lubes',
                total: 145.8,
                percentage: 106,
                target: 138,
                prior: 120
            },
            {
                color: 'red',
                title: 'NFR Select',
                total: 334534.32,
                percentage: 86,
                target: 23755423,
                prior: 1230434
            },
            {
                color: 'red',
                title: 'Shell Go+',
                total: 34,
                percentage: 139,
                target: 25,
                prior: 34
            },
            {
                color: 'green',
                title: 'V-Power',
                total: 51316.95,
                percentage: 104,
                target: 49200.50,
                prior: 45216.06
            },
            {
                color: 'blue',
                title: 'EV Charging',
                total: 39,
                percentage: 186,
                target: 21,
                prior: 30
            },
            {
                color: 'red',
                title: 'NBS',
                total: 21,
                percentage: 100,
                target: 21,
                prior: 30
            },
        ]
        let tempData2 = [
            23,
            45,
            59,
            100,
            100,
            87,
            65,
            24,
            45,
            19,
            93,
            50
        ]
        let tempData3 = [
            43,
            67,
            48,
            78,
            62,
            34,
            96,
            75,
            34,
            54,
            11,
            85
        ]

        console.log(req.query)
        res.status(201).json({
            kpi: tempData1,
            thisYear: tempData2,
            lastYear: tempData3
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query error" });
    }
});

router.get("/PMTDR", async (req, res) => {
    try {
        let tempData1 = [
            {
                color: 'yellow',
                title: 'Total Fuel',
                total: 51316.95,
                percentage: 96,
                target: 49200.50,
                prior: 45216.06
            },
            {
                color: 'green',
                title: 'V-Power',
                total: 51316.95,
                percentage: 104,
                target: 49200.50,
                prior: 45216.06
            },
            {
                color: 'blue',
                title: 'EV Charging',
                total: 39,
                percentage: 186,
                target: 21,
                prior: 30
            },
            {
                color: 'green',
                title: 'NBS',
                total: 21,
                percentage: 100,
                target: 21,
                prior: 30
            },
            {
                color: 'blue',
                title: 'Shell Go+',
                total: 34,
                percentage: 139,
                target: 25,
                prior: 34
            },
            {
                color: 'green',
                title: 'Lubes',
                total: 145.8,
                percentage: 106,
                target: 138,
                prior: 120
            },
            {
                color: 'red',
                title: 'NFR Select',
                total: 334534.32,
                percentage: 86,
                target: 23755423,
                prior: 1230434
            },
            {
                color: 'red',
                title: 'Shell Go+',
                total: 34,
                percentage: 139,
                target: 25,
                prior: 34
            },
            {
                color: 'green',
                title: 'V-Power',
                total: 51316.95,
                percentage: 104,
                target: 49200.50,
                prior: 45216.06
            },
            {
                color: 'blue',
                title: 'EV Charging',
                total: 39,
                percentage: 186,
                target: 21,
                prior: 30
            },
            {
                color: 'red',
                title: 'NBS',
                total: 21,
                percentage: 100,
                target: 21,
                prior: 30
            }
        ]
        let tempData2 = [
            23,
            45,
            59,
            100,
            100,
            87,
            65,
            24,
            45,
            19,
            93,
            50
        ]
        let tempData3 = [
            43,
            67,
            48,
            78,
            62,
            34,
            96,
            75,
            34,
            54,
            11,
            85
        ]

        console.log(req.query)
        res.status(201).json({
            pmtdr: tempData1,
            thisYear: tempData2,
            lastYear: tempData3
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query error" });
    }
});

module.exports = router;