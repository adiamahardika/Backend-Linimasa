const connection = require("../configs/mysql");

const readQuery = `SELECT iklan_baris_table.*, iklan_baris_category_table.iklan_baris_category_name, user_table.user_name FROM iklan_baris_table LEFT JOIN iklan_baris_category_table ON iklan_baris_table.iklan_baris_category = iklan_baris_category_table.id LEFT JOIN user_table ON iklan_baris_table.iklan_baris_author = user_table.id ORDER BY date_updated DESC`;

module.exports = {
  insertIklanBaris: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO iklan_baris_table SET ?`, data);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
