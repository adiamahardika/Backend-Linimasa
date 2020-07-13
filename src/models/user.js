const connection = require("../configs/mysql");

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user_table SET ?", data);
      connection.query(
        `SELECT user_table.*, user_role_table.user_role_name FROM user_table LEFT JOIN user_role_table ON user_table.user_role = user_role_table.id`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  checkEmail: (user_email) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM user_table WHERE user_email = ?`, user_email, (error, result) => {
        if (error) reject(new Error(error));
          resolve(result);
      })
    })
  }
};
