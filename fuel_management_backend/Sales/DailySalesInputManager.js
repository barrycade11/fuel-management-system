const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");
const multer = require('multer');
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join("Public", "Uploads"))
    },
    filename: (req, file, cb) => {
        // cb(null, Date.now() + path.extname(file.originalname)) for unique filename
        cb(null, file.originalname)
    }
})


const upload = multer({ storage: storage });

router.post("/dailySalesInputManager", upload.single("pos"), async (req, res) => {
    const client = await pool.connect();
    try {
        const uploadedFile = req.file
        const uploadedData = {
            filterData: JSON.parse(req.body?.filterData),
            fuelData: JSON.parse(req.body?.fuelData),
            tankData: JSON.parse(req.body?.tankTotal),
            vatableSales: req.body?.vatableSales,
            vatAmount: req.body?.vatAmount,
            vatExemptSales: req.body?.vatExemptSales,
            vatZeroRatedSales: req.body?.vatZeroRatedSales,
            managerTotal: req.body?.managerTotal,
            comment: req.body?.comment
        }

        console.log(uploadedData)

        await client.query("BEGIN");
        //saving main sales input header
        const mainHeaderResult = await client.query(
            `INSERT INTO dailysalesinput_hdr
                        (
                            input_mode,
                            station_id,
                            shift_id,
                            employee_id,
                            effectivity_date,
                            comment
                        )
            VALUES      ($1, $2, $3, $4, $5, $6)
            RETURNING   *`,
            [
                uploadedData.filterData?.selectedMode,
                uploadedData.filterData?.selectedStation,
                uploadedData.filterData?.selectedShift,
                uploadedData.filterData?.selectedShiftManager,
                uploadedData.filterData?.effectivityDate,
                uploadedData?.comment
            ]
        );
        let savedMainId = mainHeaderResult.rows[0].ID

        //saving fuel input header
        const fuelHeaderResult = await client.query(
            `INSERT INTO dailysalesinput_fuelhdr
                        (
                            dailysalesinputid,
                            fueldiscount,
                            fueltaxexemption
                        )
            VALUES      ($1, $2, $3)
            RETURNING   *`,
            [
                savedMainId,
                uploadedData.fuelData?.discount,
                uploadedData.fuelData?.taxExemption
            ]
        );
        let savedFuelId = fuelHeaderResult.rows[0].id

        //saving fuel line items
        await Promise.all(
            uploadedData.fuelData?.content?.map((item) => {
                return new Promise(async (resolve, reject) => {
                    await client.query(
                        `INSERT INTO dailysalesinput_fuellin
                                                    (
                                                        dailysalesinputfuelhdrid,
                                                        fuelmasterid,
                                                        transct,
                                                        volume,
                                                        amount
                                                    )
                                        VALUES      ($1, $2, $3, $4, $5)`,
                        [
                            savedFuelId,
                            item?.fuelId,
                            item?.transCt,
                            item?.volume,
                            item?.amount
                        ]
                    );
                    return resolve(true)
                })
            })
        )

        //saving tank input header
        const tankHeaderResult = await client.query(
            `INSERT INTO dailysalesinput_tankhdr
                            (
                                input_id
                            )
                VALUES      ($1)
                RETURNING   *`,
            [
                savedMainId
            ]
        );
        let savedTankId = tankHeaderResult.rows[0].ID
        //saving tank line items
        await Promise.all(
            uploadedData.tankData?.map((item) => {
                return new Promise(async (resolve, reject) => {
                    await client.query(
                        `INSERT INTO dailysalesinput_tanklin
                                        (
                                            tank_hdr,
                                            fuel_id,
                                            price,
                                            dip,
                                            volume,
                                            tank
                                        )
                            VALUES      ($1, $2, $3, $4, $5, $6)`,
                        [
                            savedTankId,
                            item?.fuelId,
                            item?.price,
                            item?.dip,
                            item?.volume,
                            item?.tank
                        ]
                    );
                    return resolve(true)
                })
            })
        )

        //saving tax totals data
        await client.query(
            `INSERT INTO dailysalesinput_taxtotals
                (
                    input_id,
                    vatables_sales,
                    vat_amount,
                    vat_exempt_sales,
                    vat_zero_rated_sales,
                    total
                )
            VALUES      ($1, $2, $3, $4, $5, $6)
            RETURNING   *`,
            [
                savedMainId,
                uploadedData.vatableSales,
                uploadedData.vatAmount,
                uploadedData.vatExemptSales,
                uploadedData.vatZeroRatedSales,
                uploadedData.managerTotal
                
            ]
        );

        await client.query("COMMIT");

        console.log("success: " + savedMainId)
        res.status(201).json({ success: true, message: "successfully saved with an id of " + savedMainId });
    }
    catch (err) {
        console.log(err)
        await client.query("ROLLBACK");

        res.status(500).json({ error: "Database query error" });
    }
    finally {
        client.release();
    }
});

router.get("/getDailySalesForecourtData", async (req, res) => {
    try {
        const { effectivityDate, selectedStation, inputId } = req.query;
        let returnData
        let query = `
            SELECT      
                        a.input_mode,
                        a.station_id,
                        a.shift_id,
                        a.employee_id,
                        a.effectivity_date,
                        a.comment,
                        b.grand_total,
                        b.department_total,
                        b.variance
            FROM        public.dailysalesinput_hdr AS a
            LEFT JOIN   public.dailysalesinput_variance AS b
                ON      a."ID" = b."input_id"
            WHERE       a."uploaded_at" =  $1
                AND     a."ID" = $2
        `
        if (selectedStation != '') {
            query += `
                AND     a."station_id" = $3
            `
        }
        let bindData = [effectivityDate, inputId]
        if (selectedStation != '') bindData.push(selectedStation)
        const result = await pool.query(query, bindData);

        //get cash data
        query = `
            SELECT      b.*
            FROM        public.dailysalesinput_hdr AS a
            LEFT JOIN   public.dailysalesinput_cashhdr AS b
                ON      a."ID" = b."input_id"
            WHERE       a."ID" = $1
        `
        let cashHeaderResult = await pool.query(query, [inputId]);
        query = `
            SELECT      b.*
            FROM        public.dailysalesinput_cashhdr AS a
            LEFT JOIN   public.dailysalesinput_cashlin AS b
                ON      a."ID" = b."cash_hdr"
            WHERE       a."input_id" = $1
        `
        let cashResult = await pool.query(query, [inputId]);
        cashResult = await Promise.all(
            cashResult.rows?.map((item) => {
                return new Promise(async (resolve, reject) => {
                    var input = item?.time;
                    var parts = input.split(':');
                    var minutes = parts[0] * 60 + parts[1];
                    var inputDate = new Date(minutes * 60 * 1000);
                    const billsQuery = await pool.query(
                        `   
                            SELECT      b.*
                            FROM        public.dailysalesinput_cashlin AS a
                            LEFT JOIN   public.dailysalesinput_cashlin_rows AS b
                                ON      a."ID" = b."cashlin_id"
                            WHERE       a."ID" = ${item?.ID}
                        `
                    );
                    let res = {
                        recievedBy: item?.recieved_id,
                        total: item?.total,
                        time: inputDate,
                        bills: billsQuery.rows
                    }
                    return resolve(res)
                })
            })
        )

        //get po data
        query = `
            SELECT      b.*
            FROM        public.dailysalesinput_hdr AS a
            LEFT JOIN   public.dailysalesinput_pohdr AS b
                ON      a."ID" = b."input_id"
            WHERE       a."ID" = $1
        `
        let poHeaderResult = await pool.query(query, [inputId]);
        query = `
            SELECT      b.*
            FROM        public.dailysalesinput_pohdr AS a
            LEFT JOIN   public.dailysalesinput_polin AS b
                ON      a."ID" = b."po_hdr"
            WHERE       a."input_id" = $1
        `
        let poResult = await pool.query(query, [inputId]);

        //get redemption data
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_hdr AS a
                LEFT JOIN   public.dailysalesinput_redemptionhdr AS b
                    ON      a."ID" = b."input_id"
                WHERE       a."ID" = $1
            `
        let redemptionHeaderResult = await pool.query(query, [inputId]);
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_redemptionhdr AS a
                LEFT JOIN   public.dailysalesinput_redemptionlin AS b
                    ON      a."ID" = b."redemption_hdr"
                WHERE       a."input_id" = $1
            `
        let redemptionResult = await pool.query(query, [inputId]);

        //get card data
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_hdr AS a
                LEFT JOIN   public.dailysalesinput_cardhdr AS b
                    ON      a."ID" = b."input_id"
                WHERE       a."ID" = $1
            `
        let cardHeaderResult = await pool.query(query, [inputId]);
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_cardhdr AS a
                LEFT JOIN   public.dailysalesinput_cardlin AS b
                    ON      a."ID" = b."card_id"
                WHERE       a."input_id" = $1
            `
        let cardResult = await pool.query(query, [inputId]);

        //get lubricant data
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_hdr AS a
                LEFT JOIN   public.dailysalesinput_lubricanthdr AS b
                    ON      a."ID" = b."input_id"
                WHERE       a."ID" = $1
            `
        let lubricantHeaderResult = await pool.query(query, [inputId]);
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_lubricanthdr AS a
                LEFT JOIN   public.dailysalesinput_lubricantlin AS b
                    ON      a."ID" = b."lubricant_hdr"
                WHERE       a."input_id" = $1
            `
        let lubricantResult = await pool.query(query, [inputId]);

        //get fuel data
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_hdr AS a
                LEFT JOIN   public.dailysalesinput_fuelhdr AS b
                    ON      a."ID" = b."dailysalesinputid"
                WHERE       a."ID" = $1
            `

        let fuelHeaderResult = await pool.query(query, [inputId]);
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_fuelhdr AS a
                LEFT JOIN   public.dailysalesinput_fuellin AS b
                    ON      a."id" = b."dailysalesinputfuelhdrid"
                WHERE       a."dailysalesinputid" = $1
            `
        let fuelResult = await pool.query(query, [inputId]);

        //get discount data
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_hdr AS a
                LEFT JOIN   public.dailysalesinput_discounthdr AS b
                    ON      a."ID" = b."input_id"
                WHERE       a."ID" = $1
            `
        let discountHeaderResult = await pool.query(query, [inputId]);
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_discounthdr AS a
                LEFT JOIN   public.dailysalesinput_discountlin AS b
                    ON      a."ID" = b."discount_hdr"
                WHERE       a."input_id" = $1
            `
        let discountResult = await pool.query(query, [inputId]);

        //get receivable data
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_hdr AS a
                LEFT JOIN   public.dailysalesinput_receivablehdr AS b
                    ON      a."ID" = b."input_id"
                WHERE       a."ID" = $1
            `
        let receivableHeaderResult = await pool.query(query, [inputId]);
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_receivablehdr AS a
                LEFT JOIN   public.dailysalesinput_receivablelin AS b
                    ON      a."ID" = b."receivable_hdr"
                WHERE       a."input_id" = $1
            `
        let receivableResult = await pool.query(query, [inputId]);

        //get check data
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_hdr AS a
                LEFT JOIN   public.dailysalesinput_checkhdr AS b
                    ON      a."ID" = b."input_id"
                WHERE       a."ID" = $1
            `
        let checkHeaderResult = await pool.query(query, [inputId]);
        query = `
                SELECT      b.*
                FROM        public.dailysalesinput_checkhdr AS a
                LEFT JOIN   public.dailysalesinput_checklin AS b
                    ON      a."ID" = b."check_hdr"
                WHERE       a."input_id" = $1
            `
        let checkResult = await pool.query(query, [inputId]);
        console.log(redemptionResult.rows)
        returnData = {
            header: result.rows[0],
            cashData: {
                content: cashResult,
                lastCash: cashHeaderResult.rows[0]?.last_cash,
                float: cashHeaderResult.rows[0]?.float,
                total: cashHeaderResult.rows[0]?.total
            },
            poData: {
                content: poResult.rows.map((item)=> {
                    return {
                        id: item?.ID,
                        invoiceNo: item?.invoice_no,
                        customerName: item?.customer_id,
                        product: item?.product_id,
                        quantity: item?.quantity,
                        poAmount: item?.amount
                    }
                }),
                total: poHeaderResult.rows[0]?.total !== null ? poHeaderResult.rows[0]?.total : 0
            },
            redemptionData: {
                content: redemptionResult.rows.map((item)=> {
                    return {
                        id: item?.ID,
                        payment: item?.payment_mode_id,
                        quantity: item?.quantity,
                        amount: item?.amount
                    }
                }),
                total: redemptionHeaderResult.rows[0]?.total !== null ? redemptionHeaderResult.rows[0]?.total : 0
            },
            cardData: {
                content: cardResult.rows,
                total: cardHeaderResult.rows[0]?.total !== null ? cardHeaderResult.rows[0]?.total : 0
            },
            lubricantData: {
                content: lubricantResult.rows,
                total: lubricantHeaderResult.rows[0]?.total !== null ? lubricantHeaderResult.rows[0]?.total : 0
            },
            fuelData: {
                content: fuelResult.rows,
                discount: fuelHeaderResult.rows[0]?.fueldiscount !== null ? fuelHeaderResult.rows[0]?.fueldiscount : 0,
                taxExemption: fuelHeaderResult.rows[0]?.fueltaxexemption !== null ? fuelHeaderResult.rows[0]?.fueltaxexemption : 0,
                //total: fuelHeaderResult.rows[0]?.total !== null ? fuelHeaderResult.rows[0]?.total : 0
            },
            discountData: {
                content: discountResult.rows,
                total: discountHeaderResult.rows[0]?.total !== null ? discountHeaderResult.rows[0]?.total : 0
            },
            receivableData: {
                content: receivableResult.rows,
                total: receivableHeaderResult.rows[0]?.total !== null ? receivableHeaderResult.rows[0]?.total : 0
            },
            checkData: {
                content: checkResult.rows,
                total: checkHeaderResult.rows[0]?.total !== null ? checkHeaderResult.rows[0]?.total : 0
            },
        }

        res.status(201).json({ success: true, message: returnData });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query error" });
    }
});

module.exports = router;