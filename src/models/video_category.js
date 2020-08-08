const connection = require("../configs/mysql");
const readQuery = `SELECT * FROM video_category_table ORDER BY video_category_name ASC`;

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
  checkVideoCategoryName: (video_category_name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM video_category_table WHERE video_category_name = ?`,
        video_category_name,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  readVideoCategory: (search_video_category_name, sort_by, order_by) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM video_category_table WHERE video_category_table.video_category_name LIKE '%${search_video_category_name}%' ORDER BY ${sort_by} ${order_by}`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  updateVideoCategory: (data, video_category_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE video_category_table SET ? WHERE id = ?`, [
        data,
        video_category_id,
      ]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  deleteVideoCategory: (video_category_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM video_category_table WHERE id = ?`,
        video_category_id
      );
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
