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
  countIklanBaris: (
    iklan_baris_id,
    search_title,
    search_category,
    sort_by,
    order_by
  ) => {
    return new Promise((resolve, reject) => {
      if (iklan_baris_id !== null) {
        connection.query(
          `SELECT count(*) as total_data FROM iklan_baris_table WHERE iklan_baris_table.id = ?`,
          iklan_baris_id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result[0].total_data);
          }
        );
      } else {
        connection.query(
          `SELECT count(*) as total_data FROM iklan_baris_table WHERE iklan_baris_table.iklan_baris_title LIKE '%${search_title}%' AND iklan_baris_table.iklan_baris_category LIKE '%${search_category}%' ORDER BY ${sort_by} ${order_by}`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result[0].total_data);
          }
        );
      }
    });
  },
  readIklanBaris: (
    iklan_baris_id,
    search_title,
    search_category,
    sort_by,
    order_by,
    start_index,
    limit
  ) => {
    return new Promise((resolve, reject) => {
      if (iklan_baris_id !== null) {
        connection.query(
          `SELECT iklan_baris_table.*, iklan_baris_category_table.iklan_baris_category_name, user_table.user_name FROM iklan_baris_table LEFT JOIN iklan_baris_category_table ON iklan_baris_table.iklan_baris_category = iklan_baris_category_table.id LEFT JOIN user_table ON iklan_baris_table.iklan_baris_author = user_table.id WHERE iklan_baris_table.id = ?`,
          iklan_baris_id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      } else {
        connection.query(
          `SELECT iklan_baris_table.*, iklan_baris_category_table.iklan_baris_category_name, user_table.user_name FROM iklan_baris_table LEFT JOIN iklan_baris_category_table ON iklan_baris_table.iklan_baris_category = iklan_baris_category_table.id LEFT JOIN user_table ON iklan_baris_table.iklan_baris_author = user_table.id WHERE iklan_baris_table.iklan_baris_title LIKE '%${search_title}%' AND iklan_baris_table.iklan_baris_category LIKE '%${search_category}%' ORDER BY ${sort_by} ${order_by} LIMIT ${start_index}, ${limit}`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      }
    });
  },
  checkId: (iklan_baris_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM iklan_baris_table WHERE id = ?`,
        iklan_baris_id,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  updateIklanBaris: (data, iklan_baris_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE iklan_baris_table SET ? WHERE id = ?`, [
        data,
        iklan_baris_id,
      ]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
