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

exports.userToJson = (rows) => {
  const data = rows.reduce((acc, row) => {
    // Find or create the user in the accumulator
    let user = acc.find((u) => u.id === row.id);

    if (!user) {
      user = {
        id: row.id,
        username: row.username,
        role_id: row.role_id,
        rolename: row.rolename,
        firstname: row.firstname,
        lastname: row.lastname,
        permissions: [],
      };
      acc.push(user);
    }

    // Add module permissions to the user's permissions array
    user.permissions.push({
      moduleid: row.moduleid,
      modulename: row.modulename,
      view: row.view,
      add: row.add,
      edit: row.edit,
      delete: row.delete,
    });

    return acc;
  }, []);

  return data;
}
