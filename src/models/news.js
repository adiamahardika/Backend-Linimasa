const connection = require("../configs/mysql");

module.exports = {
  insertNews: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO news_table SET ?`, data);
      connection.query(`SELECT * FROM news_table`, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  readNews: (news_id, search_title, search_category) => {
    return new Promise((resolve, reject) => {
      if (news_id !== null) {
        connection.query(
          `SELECT * FROM news_table WHERE news_table.id = ? `,
          news_id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      } else {
        connection.query(
          `SELECT * FROM news_table WHERE news_table.news_title LIKE '%${search_title}'`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      }
    });
  },
};
