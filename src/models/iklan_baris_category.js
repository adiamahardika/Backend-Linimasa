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
};
