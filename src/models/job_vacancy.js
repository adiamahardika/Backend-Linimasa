const connection = require("../configs/mysql");
const readQuery = `SELECT job_vacancy_table.*, job_vacancy_category_table.job_vacancy_category_name,user_table.user_name FROM job_vacancy_table LEFT JOIN job_vacancy_category_table ON job_vacancy_table.job_vacancy_category = job_vacancy_category_table.id LEFT JOIN user_table ON job_vacancy_table.job_vacancy_author = user_table.id ORDER BY date_updated DESC`;

module.exports = {
  insertJobVacancy: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO job_vacancy_table SET ?`, data);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  countJobVacancy: (
    job_vacancy_id,
    search_title,
    search_category,
    search_city,
    sort_by,
    order_by
  ) => {
    return new Promise((resolve, reject) => {
      if (job_vacancy_id !== null) {
        connection.query(
          `SELECT count(*) as total_data FROM job_vacancy_table WHERE job_vacancy_table.id = ?`,
          job_vacancy_id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result[0].total_data);
          }
        );
      } else {
        connection.query(
          `SELECT count(*) as total_data FROM job_vacancy_table WHERE job_vacancy_table.job_vacancy_title LIKE '%${search_title}%' AND job_vacancy_table.job_vacancy_category LIKE '%${search_category}%' AND job_vacancy_table.job_vacancy_city LIKE '%${search_city}%' ORDER BY ${sort_by} ${order_by}`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result[0].total_data);
          }
        );
      }
    });
  },
  readJobVacancy: (
    job_vacancy_id,
    search_title,
    search_category,
    search_city,
    sort_by,
    order_by,
    start_index,
    limit
  ) => {
    return new Promise((resolve, reject) => {
      if (job_vacancy_id !== null) {
        connection.query(
          `SELECT job_vacancy_table.*, job_vacancy_category_table.job_vacancy_category_name,user_table.user_name FROM job_vacancy_table LEFT JOIN job_vacancy_category_table ON job_vacancy_table.job_vacancy_category = job_vacancy_category_table.id LEFT JOIN user_table ON job_vacancy_table.job_vacancy_author = user_table.id WHERE job_vacancy_table.id = ?`,
          job_vacancy_id,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      } else {
        connection.query(
          `SELECT job_vacancy_table.*, job_vacancy_category_table.job_vacancy_category_name, user_table.user_name FROM job_vacancy_table LEFT JOIN job_vacancy_category_table ON job_vacancy_table.job_vacancy_category = job_vacancy_category_table.id LEFT JOIN user_table ON job_vacancy_table.job_vacancy_author = user_table.id WHERE job_vacancy_table.job_vacancy_title LIKE '%${search_title}%' AND job_vacancy_table.job_vacancy_category LIKE '%${search_category}%' AND job_vacancy_table.job_vacancy_city LIKE '%${search_city}%' ORDER BY ${sort_by} ${order_by} LIMIT ${start_index}, ${limit}`,
          (error, result) => {
            if (error) reject(new Error(error));
            resolve(result);
          }
        );
      }
    });
  },
  updateJobVacancy: (data, job_vacancy_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE job_vacancy_table SET ? WHERE id = ?`, [
        data,
        job_vacancy_id,
      ]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  deleteJobVacancy: (job_vacancy_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM job_vacancy_table WHERE id = ?`,
        job_vacancy_id
      );
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
