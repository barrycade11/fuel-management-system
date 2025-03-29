const jwt = require("jsonwebtoken");

const pool = require("../Config/Connection");

exports.createToken = async (payload) => {
    try {
        // Replace 'yourSecretKey' with a secure secret key
        const secretKey = process.env.TOKEN_KEY;

        // Create the token
        const token = jwt.sign(payload, secretKey, { expiresIn: "3h" });

        // Return the token
        return token;
    } catch (error) {
        console.error("Error creating token:", error.message);
        throw new Error("Token creation failed");
    }
};

exports.saveToken = async (data) => {
    try {
        const secretKey = process.env.TOKEN_KEY;

        const result = pool.query(`
            INSERT INTO tokens (user_id, token)
            values             ($1, $2)
        `, [data.id, data.token]
        );

    } catch (error) {
        throw new Error("Unable to save token");
    }
}