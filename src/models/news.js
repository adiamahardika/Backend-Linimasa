const connection = require("../configs/mysql");

const readQuery = `SELECT news_table.*, news_category_table.news_category_name, user_table.user_name FROM news_table LEFT JOIN news_category_table ON news_table.news_category = news_category_table.id LEFT JOIN user_table ON news_table.news_author = user_table.id ORDER BY date_updated DESC`;
module.exports = {
  insertNews: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO news_table SET ?`, data);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  readNews: (news_id, search_title, search_category, sort_by, order_by) => {
    return new Promise((resolve, reject) => {
      if (news_id !== null) {
        connection.query(
          `SELECT news_table.*, news_category_table.news_category_name, user_table.user_name FROM news_table LEFT JOIN news_category_table ON news_table.news_category = news_category_table.id LEFT JOIN user_table ON news_table.news_author = user_table.id WHERE news_table.id = ? `,
          news_id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      } else {
        connection.query(
          `SELECT news_table.*, news_category_table.news_category_name, user_table.user_name FROM news_table LEFT JOIN news_category_table ON news_table.news_category = news_category_table.id LEFT JOIN user_table ON news_table.news_author = user_table.id WHERE news_table.news_title LIKE '%${search_title}%' AND news_table.news_category LIKE '%${search_category}%' ORDER BY ${sort_by} ${order_by}`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      }
    });
  },
  checkId: (news_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM news_table WHERE id = ?`,
        news_id,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  updateNews: (data, news_id) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE news_table SET ? WHERE id = ?", [data, news_id]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  deleteNews: (news_id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM news_table WHERE id = ?", news_id);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
