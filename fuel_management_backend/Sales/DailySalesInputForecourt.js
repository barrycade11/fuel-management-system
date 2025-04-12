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

router.post("/dailySalesInputForecourt", upload.single("pos"), async (req, res) => {
    const client = await pool.connect();
    try {
        const uploadedFile = req.file
        const uploadedData = {
            cashData: JSON.parse(req.body?.cashData),
            poData: JSON.parse(req.body?.poData),
            redemptionData: JSON.parse(req.body?.redemptionData),
            cardData: JSON.parse(req.body?.cardData),
            lubricantSalesData: JSON.parse(req.body?.lubricantSalesData),
            fuelData: JSON.parse(req.body?.fuelData),
            discountData: JSON.parse(req.body?.discountData),
            recievableData: JSON.parse(req.body?.recievableData),
            checkData: JSON.parse(req.body?.checkData),
            filterData: JSON.parse(req.body?.filterData),
            salesGrandTotal: req.body?.salesGrandTotal,
            netDepartmentTotal: req.body?.netDepartmentTotal,
            variance: req.body?.variance,
            comment: req.body?.comment
        }

        // console.log(uploadedData?.cashData)

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

        // saving cash input header
        const cashHeaderResult = await client.query(
            `INSERT INTO dailysalesinput_cashhdr
                        (
                            input_id,
                            total,
                            last_cash,
                            float
                        )
            VALUES      ($1, $2, $3, $4)
            RETURNING   *`,
            [
                savedMainId,
                uploadedData.cashData?.total,
                uploadedData.cashData?.lastCash,
                uploadedData.cashData?.float
            ]
        );
        let savedCashId = cashHeaderResult.rows[0].ID

        const queryResults = await Promise.all(
            uploadedData.cashData?.content.map((item) => {
                return new Promise(async (resolve, reject) => {
                    //saving cash input rows
                    const cashLinResult = await client.query(
                        `INSERT INTO dailysalesinput_cashlin
                                    (
                                        cash_hdr,
                                        total,
                                        time,
                                        recieved_id
                                    )
                        VALUES      ($1, $2, CAST($3 AS TIME), $4)
                        RETURNING   *`,
                        [
                            savedCashId,
                            item?.total,
                            item?.time.hour + ':' + item?.time.minute,
                            item?.recievedBy
                        ]
                    );
                    let savedCashLinId = cashLinResult.rows[0].ID
                    //saving bills input rows
                    const queryResults2 = await Promise.all(
                        item.bills?.map((item) => {
                            return new Promise(async (resolve, reject) => {
                                await client.query(
                                    `INSERT INTO dailysalesinput_cashlin_rows
                                                (
                                                    bill,
                                                    quantity,
                                                    total,
                                                    cashlin_id
                                                )
                                    VALUES      ($1, $2, $3, $4)`,
                                    [
                                        item?.bill,
                                        item?.quantity,
                                        item?.amount,
                                        savedCashLinId
                                    ]
                                );
                                //resolve 2nd promise
                                return resolve(true)
                            })
                        })
                    )
                    //resolve first promise
                    return resolve(true)
                })
            })
        )

        //saving po input header
        const poHeaderResult = await client.query(
            `INSERT INTO dailysalesinput_pohdr
                                (
                                    total,
                                    input_id
                                )
                    VALUES      ($1, $2)
                    RETURNING   *`,
            [
                uploadedData.poData?.total,
                savedMainId
            ]
        );
        let savedPoId = poHeaderResult.rows[0].ID
        //saving po line items
        await Promise.all(
            uploadedData.poData?.content?.map((item) => {
                return new Promise(async (resolve, reject) => {
                    await client.query(
                        `INSERT INTO dailysalesinput_polin
                                    (
                                        po_hdr,
                                        invoice_no,
                                        customer_id,
                                        tax_code,
                                        product_id,
                                        quantity,
                                        amount
                                    )
                        VALUES      ($1, $2, $3, $4, $5, $6, $7)`,
                        [
                            savedPoId,
                            item?.invoiceNo,
                            item?.customerName,
                            item?.taxCode,
                            item?.product,
                            item?.quantity,
                            item?.poAmount
                        ]
                    );
                    return resolve(true)
                })
            })
        )

        //saving redemption input header
        const redemptionHeaderResult = await client.query(
            `INSERT INTO dailysalesinput_redemptionhdr
                                        (
                                            total,
                                            input_id
                                        )
                            VALUES      ($1, $2)
                            RETURNING   *`,
            [
                uploadedData.redemptionData?.total,
                savedMainId
            ]
        );
        let savedRedemptionId = redemptionHeaderResult.rows[0].ID
        //saving redemption line items
        await Promise.all(
            uploadedData.redemptionData?.content?.map((item) => {
                return new Promise(async (resolve, reject) => {
                    await client.query(
                        `INSERT INTO dailysalesinput_redemptionlin
                                            (
                                                redemption_hdr,
                                                payment_mode_id,
                                                quantity,
                                                amount
                                            )
                                VALUES      ($1, $2, $3, $4)`,
                        [
                            savedRedemptionId,
                            item?.payment,
                            item?.quantity,
                            item?.amount
                        ]
                    );
                    return resolve(true)
                })
            })
        )

        //saving card input header
        const cardHeaderResult = await client.query(
            `INSERT INTO dailysalesinput_cardhdr
                                        (
                                            total,
                                            input_id
                                        )
                            VALUES      ($1, $2)
                            RETURNING   *`,
            [
                uploadedData.cardData?.total,
                savedMainId
            ]
        );
        let savedCardId = cardHeaderResult.rows[0].ID
        //saving card line items
        await Promise.all(
            uploadedData.cardData?.content?.map((item) => {
                return new Promise(async (resolve, reject) => {
                    await client.query(
                        `INSERT INTO dailysalesinput_cardlin
                                            (
                                                card_id,
                                                payment_mode_id,
                                                amount,
                                                details
                                            )
                                VALUES      ($1, $2, $3, $4)`,
                        [
                            savedCardId,
                            item?.payment,
                            item?.amount,
                            item?.details
                        ]
                    );
                    return resolve(true)
                })
            })
        )

        //saving lubricant input header
        const lubricantHeaderResult = await client.query(
            `INSERT INTO dailysalesinput_lubricanthdr
                                                (
                                                    total,
                                                    input_id
                                                )
                                    VALUES      ($1, $2)
                                    RETURNING   *`,
            [
                uploadedData.lubricantSalesData?.total,
                savedMainId
            ]
        );
        let savedLubricantId = lubricantHeaderResult.rows[0].ID
        //saving lubricant line items
        await Promise.all(
            uploadedData.lubricantSalesData?.content?.map((item) => {
                return new Promise(async (resolve, reject) => {
                    await client.query(
                        `INSERT INTO dailysalesinput_lubricantlin
                                                    (
                                                        lubricant_hdr,
                                                        lubricant_id,
                                                        quantity,
                                                        amount,
                                                        discount,
                                                        sold_by_id
                                                    )
                                        VALUES      ($1, $2, $3, $4, $5, $6)`,
                        [
                            savedLubricantId,
                            item?.lubricant,
                            item?.quantity,
                            item?.amount,
                            item?.discount,
                            item?.soldBy
                        ]
                    );
                    return resolve(true)
                })
            })
        )

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
        let savedFuelId = fuelHeaderResult.rows[0].ID
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

        //saving discount input header
        const discountHeaderResult = await client.query(
            `INSERT INTO dailysalesinput_discounthdr
                                                        (
                                                            total,
                                                            input_id
                                                        )
                                            VALUES      ($1, $2)
                                            RETURNING   *`,
            [
                uploadedData.discountData?.total,
                savedMainId
            ]
        );
        let savedDiscountId = discountHeaderResult.rows[0].ID
        //saving discount line items
        await Promise.all(
            uploadedData.discountData?.content?.map((item) => {
                return new Promise(async (resolve, reject) => {
                    await client.query(
                        `INSERT INTO dailysalesinput_discountlin
                                                            (
                                                                discount_hdr,
                                                                discount_id,
                                                                quantity,
                                                                amount
                                                            )
                                                VALUES      ($1, $2, $3, $4)`,
                        [
                            savedDiscountId,
                            item?.discount,
                            item?.quantity,
                            item?.amount
                        ]
                    );
                    return resolve(true)
                })
            })
        )

        //saving receivable input header
        const receivableHeaderResult = await client.query(
            `INSERT INTO dailysalesinput_receivablehdr
                            (
                                total,
                                input_id
                            )
                VALUES      ($1, $2)
                RETURNING   *`,
            [
                uploadedData.recievableData?.total,
                savedMainId
            ]
        );
        let savedReceivableId = receivableHeaderResult.rows[0].ID
        //saving receivable line items
        await Promise.all(
            uploadedData.recievableData?.content?.map((item) => {
                return new Promise(async (resolve, reject) => {
                    await client.query(
                        `INSERT INTO dailysalesinput_receivablelin
                                        (
                                            receivable_hdr,
                                            employee_id,
                                            amount,
                                            charge_id,
                                            details
                                        )
                            VALUES      ($1, $2, $3, $4, $5)`,
                        [
                            savedReceivableId,
                            item?.employee,
                            item?.amount,
                            item?.description,
                            item?.details
                        ]
                    );
                    return resolve(true)
                })
            })
        )

        //saving check input header
        const checkHeaderResult = await client.query(
            `INSERT INTO dailysalesinput_checkhdr
                                                (
                                                    total,
                                                    input_id
                                                )
                                    VALUES      ($1, $2)
                                    RETURNING   *`,
            [
                uploadedData.checkData?.total,
                savedMainId
            ]
        );
        let savedCheckId = checkHeaderResult.rows[0].ID
        //saving card line items
        await Promise.all(
            uploadedData.checkData?.content?.map((item) => {
                return new Promise(async (resolve, reject) => {
                    await client.query(
                        `INSERT INTO dailysalesinput_checklin
                                                    (
                                                        check_hdr,
                                                        payment_form,
                                                        amount,
                                                        details
                                                    )
                                        VALUES      ($1, $2, $3, $4)`,
                        [
                            savedCheckId,
                            item?.paymentForm,
                            item?.amount,
                            item?.details
                        ]
                    );
                    return resolve(true)
                })
            })
        )

        await client.query("COMMIT");

        console.log("success: "+savedMainId)
        res.status(201).json({success: true, message: "successfully saved with an id of "+savedMainId});
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

module.exports = router;