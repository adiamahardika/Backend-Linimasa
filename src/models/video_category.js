const connection = require("../configs/mysql");
const readQuery = `SELECT * FROM video_category_table`;

module.exports = {
  insertVideoCategory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO video_category_table SET ?`, data);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
