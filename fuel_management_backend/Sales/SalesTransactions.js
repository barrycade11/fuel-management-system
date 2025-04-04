const express = require("express");
const router = express.Router();
const pool = require("../Config/Connection");
const fs = require('node:fs');
const { XMLParser } = require("fast-xml-parser");
const multer  = require('multer');
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

router.post("/POS-Upload", upload.single("pos"), async (req, res) => {
    const client = await pool.connect();
    const uploadedFile = req.file

    fs.readFile(uploadedFile?.path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const parser = new XMLParser();
        let parsedXml = parser.parse(data);

        for (let item of parsedXml.ArrayOfTransaction.Transaction) {
            console.log(item)
            lin = [...lin, item.TransactionItem]
        }
        // console.log(lin)
    });
    res.status(201).json({message: "Success"})
});

module.exports = router;