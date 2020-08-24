const connection = require("../configs/mysql");

const readQuery = `SELECT * FROM ads_table ORDER BY ads_name ASC`;

module.exports = {
  insertAds: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO ads_table SET ?", data);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  readAds: (ads_id) => {
    return new Promise((resolve, reject) => {
      if (ads_id !== null) {
        connection.query(
          `SELECT * FROM ads_table WHERE ads_table.id = ?`,
          ads_id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      } else {
        connection.query(readQuery, (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        });
      }
    });
  },
  checkId: (ads_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ads_table WHERE id = ?`,
        ads_id,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  updateAds: (data, ads_id) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE ads_table SET ? WHERE id = ?", [data, ads_id]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  deleteAds: (ads_id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM ads_table WHERE id = ?", ads_id);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
