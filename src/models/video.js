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
  readVideo: (
    video_id,
    search_title,
    search_category,
    sort_by,
    order_by,
    start_index,
    limit
  ) => {
    return new Promise((resolve, reject) => {
      if (video_id !== null) {
        connection.query(
          `SELECT video_table.*, video_category_table.video_category_name, user_table.user_name FROM video_table LEFT JOIN video_category_table ON video_table.video_category = video_category_table.id LEFT JOIN user_table ON video_table.video_author = user_table.id WHERE video_table.id = ?`,
          video_id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      } else {
        connection.query(
          `SELECT video_table.*, video_category_table.video_category_name, user_table.user_name FROM video_table LEFT JOIN video_category_table ON video_table.video_category = video_category_table.id LEFT JOIN user_table ON video_table.video_author = user_table.id WHERE video_table.video_title LIKE '%${search_title}%' AND video_table.video_category LIKE '%${search_category}%' ORDER BY ${sort_by} ${order_by} LIMIT ${start_index}, ${limit}`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      }
    });
  },
  checkId: (video_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM video_table WHERE id = ?`,
        video_id,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  updateVideo: (data, video_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE video_table SET ? WHERE id = ?`, [
        data,
        video_id,
      ]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  deleteVideo: (video_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`DELETE FROM video_table WHERE id = ?`, video_id);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  countVideo: (video_id, search_title, search_category, sort_by, order_by) => {
    return new Promise((resolve, reject) => {
      if (video_id !== null) {
        connection.query(
          `SELECT count(*) as total_data FROM video_table WHERE video_table.id = ?`,
          video_id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result[0].total_data);
          }
        );
      } else {
        connection.query(
          `SELECT count(*) as total_data FROM video_table WHERE video_table.video_title LIKE '%${search_title}%' AND video_table.video_category LIKE '%${search_category}%' ORDER BY ${sort_by} ${order_by}`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result[0].total_data);
          }
        );
      }
    });
  },
};
