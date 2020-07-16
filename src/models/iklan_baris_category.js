const connection = require("../configs/mysql");
const readQuery = `SELECT * FROM iklan_baris_category_table`;

module.exports = {
  insertIklanBarisCategory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO iklan_baris_category_table SET ?`, data);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  readIklanBarisCategory: (search_iklan_baris_category_name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM iklan_baris_category_table WHERE iklan_baris_category_table.iklan_baris_category_name LIKE '%${search_iklan_baris_category_name}%'`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  updateIklanBarisCategory: (data, iklan_baris_category_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE iklan_baris_category_table SET ? WHERE id = ?`, [
        data,
        iklan_baris_category_id,
      ]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
