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
  readCommentar: (data) => {
    return new Promise((resolve, reject) => {
      if (data.commentar_id !== null) {
        connection.query(
          `SELECT commentar_table.*, news_table.news_title, user_table.user_name FROM commentar_table LEFT JOIN news_table ON commentar_table.news_id = news_table.id LEFT JOIN user_table ON commentar_table.user_id = user_table.id WHERE commentar_table.id = ?`,
          data.commentar_id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      } else {
        connection.query(
          `SELECT commentar_table.*, news_table.news_title, user_table.user_name FROM commentar_table LEFT JOIN news_table ON commentar_table.news_id = news_table.id LEFT JOIN user_table ON commentar_table.user_id = user_table.id WHERE user_table.user_name LIKE '%${data.search_user_name}%' AND commentar_table.news_id LIKE '%${data.search_news_id}%' AND commentar_table.commentar LIKE '%${data.search_commentar}%'`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      }
    });
  },
  updateCommentar: (data, commentar_id) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE commentar_table SET ? WHERE id = ?", [data, commentar_id])
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  deleteCommentar: (commentar_id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM commentar_table WHERE id = ?", commentar_id)
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  }
};
