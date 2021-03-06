const connection = require("../configs/mysql");
const readQuery = `SELECT * FROM news_category_table ORDER BY news_category_name ASC`;

module.exports = {
  insertNewsCategory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO news_category_table SET ?`, data);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  checkNewsCategoryName: (news_category_name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM news_category_table WHERE news_category_name = ?`,
        news_category_name,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  readNewsCategory: (search_news_category_name, sort_by, order_by) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM news_category_table WHERE news_category_table.news_category_name LIKE '%${search_news_category_name}%' ORDER BY ${sort_by} ${order_by}`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  updateNewsCategory: (data, category_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE news_category_table SET ? WHERE id = ?`, [
        data,
        category_id,
      ]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  deleteNewsCategory: (category_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM news_category_table WHERE id = ?",
        category_id
      );
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
