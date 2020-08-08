const connection = require("../configs/mysql");
const readQuery = `SELECT * FROM user_role_table ORDER BY user_role_name ASC`;

module.exports = {
  insertUserRole: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO user_role_table SET ?`, data);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  checkUserRoleName: (user_role_name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user_role_table WHERE user_role_name = ?`,
        user_role_name,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  readUserRole: (search_user_role, sort_by, order_by) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM user_role_table WHERE user_role_table.user_role_name LIKE '%${search_user_role}%' ORDER BY ${sort_by} ${order_by}`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  updateUserRole: (data, user_role_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE user_role_table SET ? WHERE id = ?`, [
        data,
        user_role_id,
      ]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  deleteUserRole: (user_role_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM user_role_table WHERE id = ?`,
        user_role_id
      );
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
