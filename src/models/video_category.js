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
  readVideoCategory: (search_video_category_name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM video_category_table WHERE video_category_table.video_category_name LIKE '%${search_video_category_name}%'`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
};
