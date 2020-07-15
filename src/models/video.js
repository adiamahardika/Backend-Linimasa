const connection = require("../configs/mysql");

const readQuery = `SELECT video_table.*, video_category_table.video_category_name, user_table.user_name FROM video_table LEFT JOIN video_category_table ON video_table.video_category = video_category_table.id LEFT JOIN user_table ON video_table.video_author = user_table.id ORDER BY date_updated DESC`;

module.exports = {
  insertVideo: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO video_table SET ?`, data);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
