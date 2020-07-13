const connection = require("../configs/mysql");
const user = require("../controllers/user");

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
  },
  readUser: (user_id, search_user_name, search_role) => {
    return new Promise((resolve, reject) => {
      if(user_id !== null){
        connection.query(
          `SELECT user_table.*, user_role_table.user_role_name FROM user_table LEFT JOIN user_role_table ON user_table.user_role = user_role_table.id WHERE user_table.id = ?`,user_id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        )
      } else {
        connection.query(
          `SELECT user_table.*, user_role_table.user_role_name FROM user_table LEFT JOIN user_role_table ON user_table.user_role = user_role_table.id WHERE user_table.user_name LIKE '%${search_user_name}' AND user_role_table.id LIKE '%${search_role}'`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      }   
    })
  }
}