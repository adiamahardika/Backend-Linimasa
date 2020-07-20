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
};
