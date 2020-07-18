const connection = require("../configs/mysql");
const readQuery = `SELECT * FROM job_vacancy_category_table ORDER BY job_vacancy_category_table.job_vacancy_category_name ASC`;

module.exports = {
  insertJobVacancyCategory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO job_vacancy_category_table SET ?`, data);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
  readJobVacancyCategory: (search_job_vacancy_category_name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM job_vacancy_category_table WHERE job_vacancy_category_table.job_vacancy_category_name LIKE '%${search_job_vacancy_category_name}%'`,
        (error, result) => {
          if (error) reject(new Error(error));
          resolve(result);
        }
      );
    });
  },
  updateJobVacancyCategory: (data, job_vacancy_category_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE job_vacancy_category_table SET ? WHERE id = ?`, [
        data,
        job_vacancy_category_id,
      ]);
      connection.query(readQuery, (error, result) => {
        if (error) reject(new Error(error));
        resolve(result);
      });
    });
  },
};
