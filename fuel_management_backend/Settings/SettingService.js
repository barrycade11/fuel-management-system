const pool = require("../Config/Connection");

exports.accountToJson = async (rows) => {
  const data = rows.reduce((acc, row) => {
    // Find or create the user in the accumulator
    let user = acc.find((u) => u.id === row.id);

    if (!user) {
      user = {
        id: row.id,
        username: row.username,
        firstname: row.firstname,
        lastname: row.lastname,
        roleid: row.role_id,
        rolename: row.rolename,
        stations: [],
        status: row.status
      };
      acc.push(user);
    }

    // Add module permissions to the user's permissions array
    user.stations.push({
      stationid: row.stationid,
      stationname: row.stationname
    });

    return acc;
  }, []);

  return data;
}
