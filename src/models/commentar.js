const connection = require("../configs/mysql");

const readQuery = `SELECT commentar_table.*, news_table.news_title, user_table.user_name FROM commentar_table LEFT JOIN news_table ON commentar_table.news_id = news_table.id LEFT JOIN user_table ON commentar_table.user_id = user_table.id`;
module.exports = {
  insertCommentar: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO commentar_table SET ?", data);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
