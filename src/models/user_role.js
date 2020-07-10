const connection = require("../configs/mysql");

module.exports = {
  insertUserRole: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO user_role_table SET ?`, data);
      connection.query(`SELECT * FROM user_role_table`, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
