const connection = require("../configs/mysql");

module.exports = {
  insertNewsCategory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO news_category_table SET ?`, data);
      connection.query(`SELECT * FROM news_category_table`, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  readNewsCategory: (search_news_category_name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM news_category_table WHERE news_category_table.news_category_name LIKE '%${search_news_category_name}'`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
};
