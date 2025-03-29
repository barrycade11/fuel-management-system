const express = require("express");
const router = express.Router();
const pool = require("../../Config/Connection") ;

router.get("/users", async (req, res) => {
    try {

        res.status(201).json({
            message: "Hello world",
        })

    } catch (err) {
        res.status(500).json({
            error: "Something went wrong"
        })
    }
});

module.exports = router;